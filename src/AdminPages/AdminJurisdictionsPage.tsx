import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';

const JurisdictionManager = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countryFeatures, setCountryFeatures] = useState(null);
    const [paymentFeatures, setPaymentFeatures] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAfricanCountry, setIsAfricanCountry] = useState(false);
    const [editedCountryFeatures, setEditedCountryFeatures] = useState({});
    const [editedPaymentFeatures, setEditedPaymentFeatures] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // States for adding new general feature
    const [newGeneralFeatureName, setNewGeneralFeatureName] = useState('');
    const [newGeneralFeatureType, setNewGeneralFeatureType] = useState('boolean');
    const [newGeneralFeatureBooleanValue, setNewGeneralFeatureBooleanValue] = useState(false);
    const [newGeneralFeatureTextValue, setNewGeneralFeatureTextValue] = useState('');

    // States for adding new custom payment feature
    const [newPaymentFeatureName, setNewPaymentFeatureName] = useState('');
    const [newPaymentFeatureType, setNewPaymentFeatureType] = useState('boolean');
    const [newPaymentFeatureBooleanValue, setNewPaymentFeatureBooleanValue] = useState(false);
    const [newPaymentFeatureTextValue, setNewPaymentFeatureTextValue] = useState('');

    // States for modals
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: '', callback: null });

    // Default payment features structure
    const defaultPaymentFeatures = {
        currency: '',
        deposit: { banks: [], mobile_money: [] },
        withdrawal: { banks: [], mobile_money: [] },
    };

    // Function to show modal
    const openModal = (title, message, type = 'success', callback = null) => {
        setModalContent({ title, message, type, callback });
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setModalContent({ title: '', message: '', type: '', callback: null });
    };

    // Fetch country features and payment features on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [countryRes, paymentRes] = await Promise.all([
                    axiosInstance.get('country-features'),
                    axiosInstance.get('payment-features'),
                ]);
                setCountries(Object.keys(countryRes.data));
                setCountryFeatures(countryRes.data);
                setPaymentFeatures(paymentRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Initialize edited features when country is selected
    useEffect(() => {
        if (selectedCountry && countryFeatures) {
            const isAfrican = Object.keys(paymentFeatures || {}).includes(selectedCountry);
            setIsAfricanCountry(isAfrican);
            setEditedCountryFeatures({
                Restricted: false,
                ...countryFeatures[selectedCountry],
            });
            if (isAfrican) {
                setEditedPaymentFeatures(paymentFeatures[selectedCountry] || defaultPaymentFeatures);
            } else {
                setEditedPaymentFeatures({});
            }
        }
    }, [selectedCountry, countryFeatures, paymentFeatures]);

    // Filter countries based on search term
    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle country feature updates
    const handleFeatureChange = (key, value) => {
        setEditedCountryFeatures(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle custom payment feature updates
    const handleCustomPaymentFeatureChange = (key, value) => {
        setEditedPaymentFeatures(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle payment list item changes
    const handlePaymentFeatureChange = (type, method, index, value) => {
        setEditedPaymentFeatures(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [method]: prev[type][method].map((item, i) => (i === index ? value : item)),
            },
        }));
    };

    // Add new item to payment list
    const addPaymentEntry = async (type, method) => {
        try {
            await axiosInstance.post('/payment-features/add-entry', {
                country: selectedCountry,
                payment_type: type,
                method,
                entry: '',
            });
            setEditedPaymentFeatures(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    [method]: [...(prev[type][method] || []), ''],
                },
            }));
            const paymentRes = await axiosInstance.get('payment-features');
            setPaymentFeatures(paymentRes.data);
        } catch (error) {
            console.error('Error adding payment entry:', error);
            setError('Failed to add payment entry.');
        }
    };

    // Remove item from payment list
    const removePaymentEntry = async (type, method, index) => {
        setEditedPaymentFeatures(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [method]: prev[type][method].filter((_, i) => i !== index),
            },
        }));
        await savePaymentFeatures();
    };

    // Handle currency update
    const handleCurrencyChange = (value) => {
        setEditedPaymentFeatures(prev => ({
            ...prev,
            currency: value,
        }));
    };

    // Add new general feature
    const addNewGeneralFeature = () => {
        if (!newGeneralFeatureName) return;
        const key = newGeneralFeatureName.replace(/ /g, '_');
        const value = newGeneralFeatureType === 'boolean' ? newGeneralFeatureBooleanValue : newGeneralFeatureTextValue;
        setEditedCountryFeatures(prev => ({
            ...prev,
            [key]: value,
        }));
        setNewGeneralFeatureName('');
        setNewGeneralFeatureType('boolean');
        setNewGeneralFeatureBooleanValue(false);
        setNewGeneralFeatureTextValue('');
    };

    // Add new custom payment feature
    const addNewPaymentFeature = () => {
        if (!newPaymentFeatureName) return;
        const key = newPaymentFeatureName.replace(/ /g, '_');
        const value = newPaymentFeatureType === 'boolean' ? newPaymentFeatureBooleanValue : newPaymentFeatureTextValue;
        setEditedPaymentFeatures(prev => ({
            ...prev,
            [key]: value,
        }));
        setNewPaymentFeatureName('');
        setNewPaymentFeatureType('boolean');
        setNewPaymentFeatureBooleanValue(false);
        setNewPaymentFeatureTextValue('');
    };

    // Delete general feature
    const deleteGeneralFeature = (featureKey) => {
        if (!selectedCountry) return;
        openModal(
            'Confirm Deletion',
            `Are you sure you want to delete the feature ${featureKey.replace(/_/g, ' ')}?`,
            'confirm',
            async () => {
                setLoading(true);
                setError(null);
                try {
                    await axiosInstance.delete('/country-features/delete-field', {
                        data: { country: selectedCountry, feature_key: featureKey },
                    });
                    setEditedCountryFeatures(prev => {
                        const newFeatures = { ...prev };
                        delete newFeatures[featureKey];
                        return newFeatures;
                    });
                    setCountryFeatures(prev => {
                        const newData = { ...prev };
                        delete newData[selectedCountry][featureKey];
                        return newData;
                    });
                    openModal('Success', `Feature ${featureKey.replace(/_/g, ' ')} deleted successfully!`, 'success');
                } catch (error) {
                    console.error('Error deleting general feature:', error);
                    openModal('Error', 'Failed to delete general feature.', 'error');
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    // Delete custom payment feature
    const deletePaymentFeature = (featureKey) => {
        if (!selectedCountry || !isAfricanCountry) return;
        openModal(
            'Confirm Deletion',
            `Are you sure you want to delete the payment feature ${featureKey.replace(/_/g, ' ')}?`,
            'confirm',
            async () => {
                setLoading(true);
                setError(null);
                try {
                    await axiosInstance.delete('/payment-features/delete-field', {
                        data: { country: selectedCountry, feature_key: featureKey },
                    });
                    setEditedPaymentFeatures(prev => {
                        const newFeatures = { ...prev };
                        delete newFeatures[featureKey];
                        return newFeatures;
                    });
                    setPaymentFeatures(prev => {
                        const newData = { ...prev };
                        delete newData[selectedCountry][featureKey];
                        return newData;
                    });
                    openModal('Success', `Payment feature ${featureKey.replace(/_/g, ' ')} deleted successfully!`, 'success');
                } catch (error) {
                    console.error('Error deleting payment feature:', error);
                    openModal('Error', 'Failed to delete payment feature.', 'error');
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    // Save changes to country features
    const saveCountryFeatures = async () => {
        if (!selectedCountry) return;
        setLoading(true);
        setError(null);
        try {
            const payload = {
                country: selectedCountry,
                features: editedCountryFeatures,
            };
            await axiosInstance.put('/country-features', payload);
            setCountryFeatures(prev => ({
                ...prev,
                [selectedCountry]: editedCountryFeatures,
            }));
            openModal('Success', 'Country features updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating country features:', error);
            openModal('Error', 'Failed to update country features.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Save changes to payment features
    const savePaymentFeatures = async () => {
        if (!selectedCountry || !isAfricanCountry) return;
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.put('/payment-features', {
                country: selectedCountry,
                payment_features: editedPaymentFeatures,
            });
            setPaymentFeatures(prev => ({
                ...prev,
                [selectedCountry]: editedPaymentFeatures,
            }));
            openModal('Success', 'Payment features updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating payment features:', error);
            openModal('Error', 'Failed to update payment features.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-primary-dark">
                Jurisdiction Manager
            </h1>

            {error && <div className="text-red-600 font-medium mb-4">{error}</div>}
            {loading && <div className="text-gray-600 mb-4 animate-pulse">Loading...</div>}

            {/* Modal for Confirmations, Success, and Errors */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-out animate-in zoom-in-50">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-primary-dark">{modalContent.title}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-primary-dark transition-all duration-200 hover:scale-110 active:scale-90"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">{modalContent.message}</p>
                        <div className="flex justify-end gap-4">
                            {modalContent.type === 'confirm' ? (
                                <>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-300 active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            modalContent.callback && modalContent.callback();
                                            closeModal();
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg active:scale-95"
                                    >
                                        Confirm
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:shadow-lg active:scale-95"
                                >
                                    OK
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Country Search and Selector */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-dark transition duration-200"
                />
                <div className="mt-1 max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white">
                    {filteredCountries.map((country) => (
                        <div
                            key={country}
                            onClick={() => setSelectedCountry(country)}
                            className={`p-3 cursor-pointer hover:bg-primary-light transition duration-200 ${selectedCountry === country ? 'bg-primary-dark text-white' : 'text-gray-800'}`}
                        >
                            {country}
                        </div>
                    ))}
                    {filteredCountries.length === 0 && (
                        <div className="p-3 text-gray-500">No matching countries found</div>
                    )}
                </div>
            </div>

            {/* General Features (shown for all countries) */}
            {selectedCountry && !isAfricanCountry && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 transition duration-300 hover:shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-primary-dark">
                        General Features for {selectedCountry}
                    </h2>
                    <div className="flex items-center mb-3">
                        <label className="mr-2 w-48 text-gray-700">Restricted:</label>
                        <input
                            type="checkbox"
                            checked={editedCountryFeatures.Restricted || false}
                            onChange={(e) => handleFeatureChange('Restricted', e.target.checked)}
                            className="h-5 w-5 text-primary focus:ring-primary-dark"
                            disabled={loading}
                        />
                    </div>
                    {Object.entries(editedCountryFeatures)
                        .filter(([key]) => key !== 'Restricted')
                        .map(([key, value]) => {
                            const displayKey = key.replace(/_/g, ' ');
                            return (
                                <div key={key} className="flex items-center mb-3">
                                    <label className="mr-2 w-48 text-gray-700">{displayKey}:</label>
                                    {typeof value === 'boolean' ? (
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleFeatureChange(key, e.target.checked)}
                                            className="h-5 w-5 text-primary focus:ring-primary-dark"
                                            disabled={loading}
                                        />
                                    ) : typeof value === 'string' ? (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleFeatureChange(key, e.target.value)}
                                            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-primary-dark transition duration-200"
                                            disabled={loading}
                                        />
                                    ) : null}
                                    <button
                                        onClick={() => deleteGeneralFeature(key)}
                                        className="ml-2 text-red-600 hover:text-red-800"
                                        disabled={loading}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })}

                    {/* Add New General Feature */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-medium mb-2 text-gray-800">Add New General Feature</h3>
                        <input
                            type="text"
                            placeholder="Feature Name"
                            value={newGeneralFeatureName}
                            onChange={(e) => setNewGeneralFeatureName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-2"
                        />
                        <select
                            value={newGeneralFeatureType}
                            onChange={(e) => setNewGeneralFeatureType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-2"
                        >
                            <option value="boolean">Boolean (Check/Cross)</option>
                            <option value="text">Text</option>
                        </select>
                        {newGeneralFeatureType === 'boolean' ? (
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-gray-700">Initial Value:</label>
                                <input
                                    type="checkbox"
                                    checked={newGeneralFeatureBooleanValue}
                                    onChange={(e) => setNewGeneralFeatureBooleanValue(e.target.checked)}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="Initial Value"
                                value={newGeneralFeatureTextValue}
                                onChange={(e) => setNewGeneralFeatureTextValue(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md mb-2"
                            />
                        )}
                        <button
                            onClick={addNewGeneralFeature}
                            className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary transition duration-300"
                        >
                            Add Feature
                        </button>
                    </div>

                    <button
                        onClick={saveCountryFeatures}
                        className="mt-6 px-5 py-2 bg-white text-primary-dark border border-primary-dark rounded-md hover:bg-primary-dark hover:text-white transition duration-300 disabled:opacity-50"
                        disabled={loading}
                    >
                        Save General Features
                    </button>
                </div>
            )}

            {/* Payment Features for African Countries */}
            {selectedCountry && isAfricanCountry && editedPaymentFeatures && (
                <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-dark">
                        Payment Features for {selectedCountry}
                    </h2>

                    <div className="mb-6">
                        <label className="mr-2 w-40 inline-block text-gray-700">Currency:</label>
                        <input
                            type="text"
                            value={editedPaymentFeatures.currency || ''}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-primary-dark transition duration-200"
                            disabled={loading}
                        />
                    </div>

                    {['deposit', 'withdrawal'].map((type) => (
                        <div key={type} className="mb-6">
                            <h3 className="text-lg font-semibold capitalize text-primary mb-2">{type}</h3>
                            {['banks', 'mobile_money'].map((method) => (
                                <div key={method} className="mt-2">
                                    <h4 className="font-medium text-gray-800">
                                        {method
                                            .replace(/_/g, ' ')
                                            .replace(/\b\w/g, char => char.toUpperCase())}
                                    </h4>
                                    <ul className="list-disc pl-5 mb-2">
                                        {(editedPaymentFeatures[type]?.[method] || []).map((item, index) => (
                                            <li key={index} className="flex items-center mb-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handlePaymentFeatureChange(type, method, index, e.target.value)}
                                                    className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-primary-dark transition duration-200"
                                                    disabled={loading}
                                                />
                                                <button
                                                    onClick={() => removePaymentEntry(type, method, index)}
                                                    className="ml-2 text-red-600 hover:text-red-800"
                                                    disabled={loading}
                                                >
                                                    X
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => addPaymentEntry(type, method)}
                                        className="px-4 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                    >
                                        Add New {method.charAt(0).toUpperCase() + method.slice(1)} Entry
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Custom Payment Features */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-medium mb-2 text-gray-800">Custom Payment Features</h3>
                        {Object.entries(editedPaymentFeatures)
                            .filter(([key]) => !['currency', 'deposit', 'withdrawal'].includes(key))
                            .map(([key, value]) => {
                                const displayKey = key.replace(/_/g, ' ');
                                return (
                                    <div key={key} className="flex items-center mb-3">
                                        <label className="mr-2 w-48 text-gray-700">{displayKey}:</label>
                                        {typeof value === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handleCustomPaymentFeatureChange(key, e.target.checked)}
                                                className="h-5 w-5 text-primary focus:ring-primary-dark"
                                                disabled={loading}
                                            />
                                        ) : typeof value === 'string' ? (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleCustomPaymentFeatureChange(key, e.target.value)}
                                                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-primary-dark transition duration-200"
                                                disabled={loading}
                                            />
                                        ) : null}
                                        <button
                                            onClick={() => deletePaymentFeature(key)}
                                            className="ml-2 text-red-600 hover:text-red-800"
                                            disabled={loading}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}

                        {/* Add New Custom Payment Feature */}
                        <input
                            type="text"
                            placeholder="Feature Name"
                            value={newPaymentFeatureName}
                            onChange={(e) => setNewPaymentFeatureName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-2"
                        />
                        <select
                            value={newPaymentFeatureType}
                            onChange={(e) => setNewPaymentFeatureType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-2"
                        >
                            <option value="boolean">Boolean (Check/Cross)</option>
                            <option value="text">Text</option>
                        </select>
                        {newPaymentFeatureType === 'boolean' ? (
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-gray-700">Initial Value:</label>
                                <input
                                    type="checkbox"
                                    checked={newPaymentFeatureBooleanValue}
                                    onChange={(e) => setNewPaymentFeatureBooleanValue(e.target.checked)}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="Initial Value"
                                value={newPaymentFeatureTextValue}
                                onChange={(e) => setNewPaymentFeatureTextValue(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md mb-2"
                            />
                        )}
                        <button
                            onClick={addNewPaymentFeature}
                            className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary transition duration-300"
                        >
                            Add Feature
                        </button>
                    </div>

                    <button
                        onClick={savePaymentFeatures}
                        className="mt-6 px-5 py-2 bg-white text-primary-dark border border-primary-dark rounded-md hover:bg-primary-dark hover:text-white transition duration-300 disabled:opacity-50"
                        disabled={loading}
                    >
                        Save Payment Features
                    </button>
                </div>
            )}
        </div>
    );
};

export default JurisdictionManager;
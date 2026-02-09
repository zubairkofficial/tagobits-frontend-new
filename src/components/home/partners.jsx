import { usetagocashcontent } from '../../hooks/usetagocashcontent'

const Partners = () => {
    const { getFieldValue } = usetagocashcontent('partnership');

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
                    {getFieldValue('heading') || 'Our Partners'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
                    {/* Partner logos will be rendered here */}
                </div>
            </div>
        </div>
    );
};

export default Partners;

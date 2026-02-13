import { useHomeContent } from '../../hooks/useHomeContent'

const Partners = () => {
    const { getFieldValue } = useHomeContent('partnership');

    // return (
    //     <div className="">
    //         <div className="">
    // <h2 className="">
    //                 {/* {getFieldValue('heading') || 'Our Partners'} */}
    //             </h2>
    //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
    //                 {/* Partner logos will be rendered here */}
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Partners;

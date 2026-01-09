import HomeComponentLoader from '../utils/homecomponentsloader'
import { SendMsg } from '../utils/lazyhomecomponents'

const Contact = () => {
    return (
        <div className='bg-[#FBFDFF]'>
            <HomeComponentLoader component={SendMsg} />
        </div>
    )
}

export default Contact;
import HomeComponentLoader from '../utils/homecomponentsloader'
import { ContactHero, SendMsg } from '../utils/lazyhomecomponents'

const Contact = () => {
    return (
        <div className='bg-white dark:bg-gray-900 transition-colors duration-300'>
            <HomeComponentLoader component={ContactHero} />
            <HomeComponentLoader component={SendMsg} />
        </div>
    )
}

export default Contact;
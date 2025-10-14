import HomeComponentLoader from '../utils/homecomponentsloader'
import { ContactHero, SendMsg } from '../utils/lazyhomecomponents'

const Contact = () => {
    return (
        <div>
            <HomeComponentLoader component={ContactHero} />
            <HomeComponentLoader component={SendMsg} />
        </div>
    )
}

export default Contact;
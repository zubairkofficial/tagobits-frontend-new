import HomeComponentLoader from '../utils/homecomponentsloader'
import { AboutUsHero } from '../utils/lazyhomecomponents'

const AboutUs = () => {
    return(
        <div>
            <HomeComponentLoader component={AboutUsHero} />
        </div>
    )
}

export default AboutUs;
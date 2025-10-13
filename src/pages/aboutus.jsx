import HomeComponentLoader from '../utils/homecomponentsloader'
import { AboutUsHero, Mission, OurStory } from '../utils/lazyhomecomponents'

const AboutUs = () => {
    return(
        <div>
            <HomeComponentLoader component={AboutUsHero} />
            <HomeComponentLoader component={Mission} />
            <HomeComponentLoader component={OurStory} />
        </div>
    )
}

export default AboutUs;
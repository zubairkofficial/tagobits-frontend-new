import HomeComponentLoader from '../utils/homecomponentsloader'
import { AboutUsHero, Mission, OurStory, Values, Impact, AboutInvestors } from '../utils/lazyhomecomponents'

const AboutUs = () => {
    return(
        <div className='min-h-[calc(100vh-470px)] bg-[#FBFDFF] pb-24 md:pb-32'>
            <HomeComponentLoader component={AboutUsHero} />
            <HomeComponentLoader component={Mission} />
            <HomeComponentLoader component={Values} />
            <HomeComponentLoader component={OurStory} />
            <HomeComponentLoader component={Impact} />
            <HomeComponentLoader component={AboutInvestors} />
        </div>
    )
}

export default AboutUs;
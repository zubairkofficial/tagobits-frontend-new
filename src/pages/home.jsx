import HomeComponentLoader from '../utils/homecomponentsloader'
import { Hero, MoneySection, TagoBridge, VideoSection, NewFeatures, WhyUse, GetMore, MobileApp, Jurisdictions, HomeBlogs, NewsMedia, Whytago, Security, TagoCore, Worldwide, Investors, Partnerships, Partners } from '../utils/lazyhomecomponents'

const Home = () => {
    return (
        <div className='overflow-x-hidden'>
            <HomeComponentLoader component={Hero} />
            <HomeComponentLoader component={MoneySection} />
            <HomeComponentLoader component={TagoBridge} />
            <HomeComponentLoader component={VideoSection} />
            <HomeComponentLoader component={NewFeatures} />
            <HomeComponentLoader component={WhyUse} />
            <HomeComponentLoader component={GetMore} />
            <HomeComponentLoader component={MobileApp} />
            <HomeComponentLoader component={Jurisdictions} />
            <HomeComponentLoader component={HomeBlogs} />
            <HomeComponentLoader component={NewsMedia} />
            {/* <HomeComponentLoader component={Partnerships} /> */}
            <HomeComponentLoader component={Partners} />
            {/* 
            <HomeComponentLoader component={Whytago} />
            <HomeComponentLoader component={Security} />
            <HomeComponentLoader component={TagoCore} />
            <HomeComponentLoader component={Worldwide} />
            <HomeComponentLoader component={Investors} /> 
            */}
        </div>
    )
}

export default Home;
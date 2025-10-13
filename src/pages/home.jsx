import HomeComponentLoader from '../utils/homecomponentsloader'
import { Hero, Whytago, Security, TagoCore, Worldwide, Investors, Partnerships } from '../utils/lazyhomecomponents'

const Home = () => {
    return(
        <div className='mt-20'>
            <HomeComponentLoader component={Hero} />
            <HomeComponentLoader component={Whytago} />
            <HomeComponentLoader component={Security} />
            <HomeComponentLoader component={TagoCore} />
            <HomeComponentLoader component={Worldwide} />
            <HomeComponentLoader component={Investors} />
            <HomeComponentLoader component={Partnerships} />
        </div>
    )
}

export default Home;
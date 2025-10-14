import HomeComponentLoader from '../utils/homecomponentsloader'
import { Hero, Whytago, Security, TagoCore, Worldwide, Investors, Partnerships } from '../utils/lazyhomecomponents'

const Home = () => {
    return(
        <div className='mt-20 min-h-[calc(100vh-470px)]'>
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
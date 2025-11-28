import HomeComponentLoader from '../utils/homecomponentsloader'
import { Hero, Whytago, Security, TagoCore, Worldwide, Investors, Partnerships, Partners } from '../utils/lazyhomecomponents'

const Home = () => {
    return(
        <div className='min-h-[calc(100vh-470px)] bg-white dark:bg-transparent transition-colors duration-300 overflow-x-hidden w-full'>
            <HomeComponentLoader component={Hero} />
            <HomeComponentLoader component={Whytago} />
            <HomeComponentLoader component={Security} />
            <HomeComponentLoader component={TagoCore} />
            <HomeComponentLoader component={Worldwide} />
            <HomeComponentLoader component={Investors} />
            <HomeComponentLoader component={Partnerships} />
            <HomeComponentLoader component={Partners} />
        </div>
    )
}

export default Home;
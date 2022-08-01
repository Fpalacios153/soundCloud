import DemoUser from '../DemoUser';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './HomePage.css'

export const HomePage = () => {

    return (
        <>
            <div className='app-Container'>
                <div className='topPart'>
                    <div className='nav'>
                        <h1 className='logo'>m</h1>
                        <h1 className='logoWords'>CloudSounds</h1>
                        <div className='leftNav'>
                            <DemoUser />
                            <LoginFormModal />
                            <SignupFormModal />
                        </div>
                    </div>
                </div>
                <div className='center'>
                    {/* <button className='upload'>Upload your own</button> */}
                </div>
                <div className='trendingTracks'>
                    <div className='titleTrending'>
                        Hear what’s trending for free in the CloudSounds community
                    </div>
                </div>
                <div>
                    <div>
                    </div>
                </div>
            </div>
        </>

    )
}

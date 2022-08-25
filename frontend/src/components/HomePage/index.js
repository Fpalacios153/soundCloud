import { Route, Switch } from 'react-router-dom';
import DemoUser from '../DemoUser';
import LoginFormModal from '../ModalLoginForm';
import SignupFormModal from '../ModalSignupForm';
import GetAllSongs from '../SongAll';
import SongDetails from '../SongDetails';
import './HomePage.css'

export const HomePage = () => {


    return (
        <>
            <div className='app-Container'>
                <div className='topPart'>
                    <div className='nav'>
                        <div>
                            <h1 className='logo'>m</h1>
                            <h1 className='logoWords'>CloudSounds</h1>
                        </div>
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
                    <GetAllSongs />
                </div>
                <div className='github-containter'>
                    <div >
                        <div>
                            Never Stop listening
                        </div>
                    </div>
                </div>
                <div className='bottom-container'>
                    <div className='thanks'>
                        <h3 style={{ fontWeight: '100' }}>
                            Thanks for listening. Now join in
                        </h3>
                    </div>
                </div>
                <span className='bottom-signup'>
                    <SignupFormModal />
                </span>
                <div className='bottom-login'>
                    Already have an account?
                    <LoginFormModal />
                </div>
            </div>
        </>

    )
}

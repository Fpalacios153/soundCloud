import { Route, Switch } from 'react-router-dom';
import DemoUser from '../DemoUser';
import Footer from '../Footer/Footer';
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
                        <div className='logo-container'>
                            <h1 className='logo'></h1>
                            <h1 className='logoWords'>CLOUDSOUNDS</h1>
                        </div>
                        <div className='leftNav'>
                            <DemoUser />
                            <LoginFormModal />
                            <SignupFormModal />
                        </div>
                    </div>
                </div>
            </div>
            <div className='app'>

                <div className='app-Container'>
                    <div className='center'>
                    </div>
                    <div className='trendingTracks'>
                        <div className='titleTrending'>
                            Hear what’s trending for free in the CloudSounds community

                        </div>
                        <div style={{ width: '100%', height: '20em', overflow: 'hidden' }}>
                            <GetAllSongs />
                        </div>
                    </div>

                    {/* <div className='github-containter'>
                    <div >
                    <div>
                    Never Stop listening
                    </div>
                    </div>
                </div> */}
                    <div className='bottom-container'>
                        <div className='thanks'>
                            <div style={{ fontWeight: '100', fontSize: '36px' }}>
                                Thanks for listening. Now join in</div>
                        </div>
                        <div className='thanks' style={{ fontWeight: '100', fontSize: '24px' }}>Save tracks, follow artists and build playlists. All for free.</div>
                    </div>
                    <span className='bottom-signup'>
                        <SignupFormModal />
                    </span>
                    {/* <div className='bottom-login'>
                        Already have an account?
                        <LoginFormModal />
                    </div> */}
                    {/* <div style={{ border: 'solid 1px black' }}></div> */}
                </div>
                <Footer />
            </div>
        </>

    )
}

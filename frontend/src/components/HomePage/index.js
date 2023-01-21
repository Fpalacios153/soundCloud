import DemoUser from '../DemoUser';
import Footer from '../Footer/Footer';
import LoginFormModal from '../ModalLoginForm';
import SignupFormModal from '../ModalSignupForm';
import GetAllSongs from '../SongAll';
// import SongDetails from '../SongDetails';
import './HomePage.css'

export const HomePage = () => {
    // const [bottomLogin, setBottomLogin] = useState(false)

    return (
        <>
            <div className='app-Container'>
                <div className='topPart'>
                    <div className='nav'>
                        <div className='logo-container'>
                            <h1 className='logo'> </h1>
                            <h1 className='logoWords'>CLOUDSOUNDS</h1>
                        </div>
                        <div className='leftNav'>
                            <DemoUser />
                            <LoginFormModal whichLogin={true} />
                            <SignupFormModal top={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='app'>
                <div className='app-Container screen-adjustment'>
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
                    <div className='bottom-container'>
                        <div className='thanks'>
                            <div style={{ fontWeight: '100', fontSize: '36px' }}>
                                Thanks for listening. Now join in</div>
                        </div>
                        <div className='thanks' style={{ fontWeight: '100', fontSize: '24px' }}>Upload tracks, comment on tracks and build playlists. All for free.</div>
                    </div>
                    <span className='bottom-signup'>
                        <SignupFormModal top={false} />
                    </span>
                    <div className='bottom-login'>
                        <div className='bottom-login-text'>
                            Already have an account?
                        </div>
                        <LoginFormModal whichLogin={false} />
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}

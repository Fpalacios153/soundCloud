import './Footer.css'
export default function Footer() {

    return (
        <>
            <div className='center-footer'>
                <div className="bottom-container-footer">
                    <div className='footer-title-holder'>
                        <h2>About CloudSounds</h2>
                        <h2>About Developer</h2>
                    </div>
                    <div className="splash-about-container">
                        <div className='splash-github-link'>
                            <a className='github-links add-after' href="https://github.com/Fpalacios153/soundCloud" rel="noreferrer" target='_blank'>
                                CodeBase</a>
                            <a className='github-links add-after' href='https://github.com/Fpalacios153/soundCloud/blob/main/README.md' rel="noreferrer" target='_blank'>
                                README</a>
                        </div>
                        <div className='splash-discover-container'>
                            <a className='github-links add-after' href='https://github.com/Fpalacios153' rel="noreferrer" target="_blank">
                                {/* <i className="fa-brands fa-square-github devLinks fa-4x"></i> */}
                                github
                            </a>
                            <a className='github-links' href="https://www.linkedin.com/in/francisco-palacios-783619253/" rel="noreferrer" target="_blank">
                                {/* <i className="fa-brands fa-linkedin devLinks fa-4x"></i> */}
                                linkedin
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

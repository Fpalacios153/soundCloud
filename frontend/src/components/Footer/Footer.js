import './Footer.css'
export default function Footer() {

    return (
        <>
            <div className='center-footer'>
                <div className="bottom-container-footer">

                    <div className="splash-about-container">
                        <h1 className='footer-titles'>About CloudSounds</h1>
                        <div className='splash-github-link'>
                            <span>
                                <a className='github-links' href="https://github.com/Fpalacios153/soundCloud" rel="noreferrer" target='_blank'>
                                    CodeBase
                                </a>
                                &nbsp;⁃ &nbsp;
                            </span>
                            <a className='github-links' href='https://github.com/Fpalacios153/soundCloud/blob/main/README.md' rel="noreferrer" target='_blank'>
                                README</a>
                        </div>
                    </div>
                    <div className='splash-about-container'>
                        <h1 className='footer-titles'>About Developer</h1>
                        <div className='splash-github-link'>
                            <span>
                                <a className='github-links' href='https://github.com/Fpalacios153' rel="noreferrer" target="_blank">
                                    {/* <i className="fa-brands fa-square-github devLinks fa-4x"></i> */}
                                    Github

                                </a>
                                &nbsp;⁃&nbsp;
                            </span>
                            <a className='github-links' href="https://www.linkedin.com/in/francisco-palacios-783619253/" rel="noreferrer" target="_blank">
                                {/* <i className="fa-brands fa-linkedin devLinks fa-4x"></i> */}
                                Linkedin
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

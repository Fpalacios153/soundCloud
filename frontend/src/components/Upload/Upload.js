import CreateAlbumModal from "../AlbumCreate";
import SelectUserAlbum from "../AlbumSelect/SelectAlbum";
import './Upload.css'

function UploadHolder() {

    return (
        <div className="upload-container">
            <div className="upload-subcontainer">
                <SelectUserAlbum />
                <CreateAlbumModal />
            </div>
            <div className="upload-bottom-part">
                <div style={{ textAlign: 'start' }}>
                    Supported file type: mp3 ⁃
                    {/* Upload troubleshooting tips ⁃ Copyright FAQs */}
                    <p>
                        By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.
                    </p>

                </div>

            </div>
        </div>
    )
}
export default UploadHolder;
//  className="upload-container" style={{ background: 'orange' }}
// style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}

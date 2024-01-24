import styles from '../trailer/videoTrailer.module.css';

const VideoTrailer = ({video}) =>
{
    const {key} = video;

    return (
        <div>
            <div className={styles.video}>
                <iframe 
                    id = "player"
                    className = {styles.videoPlayer}
                    type = "text/html"
                    width = "100%"
                    height = "390"
                    src = {`https://www.youtube.com/embed/${key}?enablejsapi=0&origin=http://example.com&controls=1&rel=1`}
                    framerborder = "1">
                </iframe>
            </div>
        </div>
    )
};

export default VideoTrailer;
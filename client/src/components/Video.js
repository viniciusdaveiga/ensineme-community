import React, { useRef, useState} from "react";
import VideoFooter from './VideoFooter';
import VideoSidebar from "./VideoSidebar";
import styles from "./Video.module.css";

function Video({
    url,
    account,
    description,
    song,
    likes,
    messages,
    shares,
    }) {
    const videoRef = useRef(null);
    const [playning, setPlaying] = useState(false);

    const onVideoPress = () => {
        if (playning) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    
    };

    return(
        <div className={styles.video}>
            <video 
                className={styles.video_player} 
                loop 
                autoPlay
                OnClick={onVideoPress} 
                ref={videoRef}
                src={url}>
            </video>
            <VideoFooter 
                url=""
                account={account}
                description={description}
                song={song} 
            />
            <VideoSidebar 
                likes={likes}
                messages={messages}
                shares={shares}
            />
        </div>
    )
}

export default Video;
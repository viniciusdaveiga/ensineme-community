import React from "react";
import Disc from '../assets/disc_music.png'
import { FaMusic } from "react-icons/fa";
import styles from './VideoFooter.module.css';

function VideoFooter({ account, description, song }) {
    return (
        <div className={styles.videoFooter}>
            <div className={styles.footer_text}>
                <h3>@{account}</h3>
                <p>{description}</p>    
                <div className={styles.footer_music}>
                    <FaMusic className={styles.footer_icon} />
                    <p className={styles.name_music}>{song}</p>
                </div>
            </div>
            <img className={styles.record_logo} src={Disc}></img>
        </div>
    );
}

export default VideoFooter;
import React, { useState }from "react";
import styles from './VideoSidebar.module.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAltDetail, BiShareAlt } from "react-icons/bi";

function VideoSidebar({likes, messages, shares}) {
    const [liked, setLiked] = useState(false)
    return (
        <div className={styles.sidebar_icons}>
            <div className={styles.sidebar_button}>
                {liked ? (
                    <AiFillHeart size={40} 
                    onClick={(e) => setLiked(false)}/>
                ) : <AiOutlineHeart size={40}
                    onClick={(e) => setLiked(true)}/>
                } 
                <p>{liked ? likes + 1 : likes}</p>
            </div>
            <div className={styles.sidebar_button}>
                <BiMessageAltDetail size={40}/>
                <p>{messages}</p>
            </div>
            <div className={styles.sidebar_button}>
                <BiShareAlt size={34}/>
                <p>{shares}</p>
            </div> 
        </div>
    )
}

export default VideoSidebar;
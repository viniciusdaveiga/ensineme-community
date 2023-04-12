import React from "react";
import './styles/videos.css';
import Video from '../components/Video';
import cat from '../videos/cat.mp4';
import prog from '../videos/programing.mp4';
import tutorial from '../videos/tutorial.mp4';  

function VideoScreen() {
    return(
        <div className="app">
            <div className='app_videos'>
                <Video 
                    url={cat}
                    account="superCAT"
                    description="This a cat"
                    song="Cat - This a cat song"
                    likes={1000}
                    messages={200}
                    shares={100}
                />
                <Video 
                    url={prog}
                    account="canalsoudev"
                    description="O que é ser um programador?"
                    song="canalsoudev - audio original"
                    likes={200}
                    messages={20}
                    shares={10}
                />        
                <Video 
                    url={tutorial}
                    account="tutorial.com"
                    description="Programming tutorial"
                    song="Elton John - I'm Still Standing"
                    likes={105}
                    messages={23}
                    shares={20}
                />
            </div>   
      </div>
   
    )
}

export default VideoScreen;
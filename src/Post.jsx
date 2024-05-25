import React, { useState } from 'react';
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function Post() {
  const [heart,setHeart]=useState(0);
  const increaseHeart=()=>{
    setHeart(heart+1);
  }
  return (
    
    <div id="post">
        <div id='post_contents'>
            <h1>아기사자539</h1>
            <p>우성아파트</p>
            <div id='heart_comment'>
                <FontAwesomeIcon onClick={increaseHeart} id='heart' icon={faHeart} />
                <p id='countHeart'>{heart}</p>
                <FontAwesomeIcon id='comment' icon={faComment} />
                <p id='countComment'>0</p>
            </div>
        </div>
      
    </div>
  );
}

export default Post;
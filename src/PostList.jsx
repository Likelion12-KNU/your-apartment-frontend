
import Post from './Post'
import postData from './JSON/post.json'
import { useState } from 'react';
function PostList() {
  const [postList,setPostList]=useState([]);

  return (
  <div id='PostList_div'>
    {postData.map((v,i)=>
    <Post
    nickname={v.nickname}
    aptname={v.aptname}
    heart={v.heart}
    comment={v.comment}
    />)}
  </div>
    
  )
}

export default PostList

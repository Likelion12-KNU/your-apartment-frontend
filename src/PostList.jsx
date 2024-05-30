import React, { useState } from 'react';
import Post from './Post';
import postData from './JSON/post.json';

function PostList() {
  const [postList, setPostList] = useState(postData);

  return (
    <div id='PostList_div'>
      {postList.data.map((v, i) => (
        <Post
          key={v._id}  // 고유한 키 prop으로 v.id 사용
          id={v._id}  // 각 게시물에 고유한 ID 전달
          nickname={v.nickname}
          aptname={v.apartmentName.apartmentName}
          heart={v.likeCount}
          comment={v.commentCount}
        />
      ))}
    </div>
  );
}

export default PostList;

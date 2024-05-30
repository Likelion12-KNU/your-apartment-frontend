import React, { useState } from 'react';
import Post from './Post';
import postData from './JSON/post.json';

import Post from './Post'
import PostForm from './PostForm';
import { useState } from 'react';
import './PostList.css';
/**
 * 게시글 등록 폼, 게시글들을 관리합니다. 
 */

// 게시글 등록 함수
function PostList() {
  const [postList, setPostList] = useState(postData); 

  /**
   * 등록 폼 설정 함수 아파트 이름, 비번을 받으면,
   *  이름 생성 함수가 그 폼에대한 닉네임을 만든다.
   */
  const registerPost = (aptName, password) => {
    const generateUserName = () => {
      const randomNumber = Math.floor(Math.random() * 1000);
      return `아기사자${randomNumber}`;
    };

    // 새로운 게시글 데이터를 저장하기위한 객체
    // 각 게시물 구분을 위한 고유ID
    // 닉네임, 아파트 이름, 공감 수, 댓글들을 관리.
    const newPost = {
      id: Date.now(),// 고유 ID를 사용하여 각 게시물을 구분
      nickname: generateUserName(), // 랜덤 익명 닉네임 생성
      aptname: aptName,
      heart: 0, // 새로운 게시글의 초기 좋아요 개수는 0으로 설정
      comment: [], // 새로운 게시글의 초기 댓글 리스트는 빈 배열로 설정
    };
    setPosts([newPost, ...posts]); 
    // 새로운 게시글을 이전의 게시글 리스트 앞에 추가하는 상태 업데이트 함수이다. 
  };

  // 게시물들을 렌더링 하는 하는 부분이다. 
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

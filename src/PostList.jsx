import React, { useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import {useEffect} from 'react';
import './PostList.css';
import axios from 'axios';
/**
 * 게시글 등록 폼, 게시글들을 관리합니다. 
 */

// 게시글 등록 함수

function PostList({sortURL}) {    //API URL을 app.jsx로부터 받아옴
  const [posts, setPosts] = useState([]); //게시글 리스트 상태 - 초기값을 빈 배열로 


  // /**
  //  * 등록 폼 설정 함수 아파트 이름, 비번을 받으면,
  //  *  이름 생성 함수가 그 폼에대한 닉네임을 만든다.
  //  */
  // const registerPost = (aptName, password) => {
  //   const generateUserName = () => {
  //     const randomNumber = Math.floor(Math.random() * 1000);
  //     return `아기사자${randomNumber}`;
  //   };

  //   // 새로운 게시글 데이터를 저장하기위한 객체
  //   // 각 게시물 구분을 위한 고유ID
  //   // 닉네임, 아파트 이름, 공감 수, 댓글들을 관리.
  //   const newPost = {
  //     id: Date.now(),// 고유 ID를 사용하여 각 게시물을 구분
  //     nickname: generateUserName(), // 랜덤 익명 닉네임 생성
  //     aptname: aptName,
  //     heart: 0, // 새로운 게시글의 초기 좋아요 개수는 0으로 설정
  //     comment: [], // 새로운 게시글의 초기 댓글 리스트는 빈 배열로 설정
  //   };
  //   setPosts([newPost, ...posts]); 
  //   // 새로운 게시글을 이전의 게시글 리스트 앞에 추가하는 상태 업데이트 함수이다. 
  // };



  useEffect(() => {                     //api에서 가져온 게시물 리스트들이 변할 때마다 리렌더링!
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${sortURL}`,            //최신순을 클릭했는지, 랭킹순을 클릭했는지에 따라서 API url 주소가 바뀝니다!
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.request(config);
        setPosts(response.data.data); // posts를 api에서 가져온 데이터로 설정
      } catch (error) {
        console.error(error);
      }


    fetchData();
  }, [posts]);    //posts를 관찰!


  // 게시물들을 렌더링 하는 하는 부분이다. 
  return (
    <div id='PostList_div'>
      <div id="fixed-form-container">
        <PostForm  />
        {/* // PostForm 컴포넌트에 registerPost 함수 전달 */}
      </div>

      <div id="posts-container">
        {posts.map((post) =>    //api에서 가져온 데이터
          <Post
            sortURL={sortURL}
            key={post._id}  // React에서 리스트 항목을 고유하게 식별하기 위해 사용 --> 게시글의 댓글, 공감이 독립적으로 관리되도록한다.
            id={post._id} // 컴포넌트에 post의 ID 값을 전달하여 게시물을 식별하고 관련 데이터를 처리
            nickname={post.nickname} //닉네임을 전달
            aptname={post.apartmentName.apartmentName} //이피트 이름을 전달
            isLiked={post.isLiked} //공감이 눌렸지 안 눌렸는지 전달
            likeCount={post.likeCount}//공감 수 전달
            commentCount={post.commentCount}//댓글 개수 전달
            
          />
        )}
      </div>

    </div>
  );
}

export default PostList;

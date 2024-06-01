import React, {useState, useEffect} from 'react';
import Post from './Post';
import PostForm from './PostForm';
// import {useEffect} from 'react';
import './PostList.css';
import axios from 'axios';
/**
 * 게시글 등록 폼, 게시글들을 관리합니다. 
 */

// 게시글 등록 함수

function PostList({sortURL, postURL}) {    //API URL을 app.jsx로부터 받아옴
  const [posts, setPosts] = useState([]); //게시글 리스트 상태 - 초기값을 빈 배열로 

  const generateUserName = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `아기사자${randomNumber}`;
  };

  // const fetchData = async () => {
  //   try {
  //     const config = {
  //       method: 'get',
  //       maxBodyLength: Infinity,
  //       url: sortURL,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const response = await axios.request(config);
  //     setPosts(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };
  


  /**
   * 등록 폼 설정 함수 아파트 이름, 비번을 받으면,
   *  이름 생성 함수가 그 폼에대한 닉네임을 만든다.
   * 아파트 ID를 가져온다.
   */
  const registerPost = async (aptId, password) => {
    try {
      const newPostData =  {
        apartmentId: aptId,
        password: password,
        nickname: generateUserName(), // 랜덤 닉네임 생성
      };

      //디버깅
      console.log("POST 요청을 보낼 URL:", postURL); // URL 로그 출력
      console.log("보낼 데이터:", newPostData); // 데이터 로그 출력

      const response = await axios.post(postURL, newPostData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("서버 응답:", response);

      fetchData(); // 새로운 게시글 등록 후 게시글 목록을 다시 가져옵니다.
       //게시글 등록 중 에러 발생: 이부분이 작동합니다.. 
    } catch (error) {
      console.error("게시글 등록 중 에러 발생:", error);
      if (error.response) {
        // 서버 응답 데이터: 이부분도 작동합니다.. 
        console.error("서버 응답 데이터:", error.response.data);
      }
    }
  };


  useEffect(() => {                     //api에서 가져온 게시물 리스트들이 변할 때마다 리렌더링!
      const fetchData = async () => {
        try {
          // 무한 호출 확인
          console.log("Fetching data...");
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${sortURL}`,            //${sortURL} 최신순을 클릭했는지, 랭킹순을 클릭했는지에 따라서 API url 주소가 바뀝니다!
            headers: {
              'Content-Type': 'application/json',
            },
          };
          
          const response = await axios.request(config);
          setPosts(response.data.data); // posts를 api에서 가져온 데이터로 설정
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [sortURL]);    //posts를 관찰! sortURL


  // 게시물들을 렌더링 하는 하는 부분이다. 
  
  return (
    <div id='PostList_div'>
      <div id="fixed-form-container">
        {/*<PostForm registerPost={registerPost} />*/}
        {/* // PostForm 컴포넌트에 registerPost 함수 전달 */}
      </div>

      <div id="posts-container">
        {posts.map((post) =>    //api에서 가져온 데이터
          <Post
            // sortURL={sortURL}
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

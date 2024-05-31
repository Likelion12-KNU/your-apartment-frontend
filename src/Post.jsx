
import React, { useState, useRef,useEffect } from "react";
import "./Post.css";
import chatIcon from "./assets/chat.svg"; // chat.svg 파일을 import
import heartIcon from "./assets/heart.svg"; // heart.svg 파일을 import
import fillHeartIcon from "./assets/fillHeart.svg"; // fillHeart.svg 파일을 import
import axios from "axios";
// import postData from "./JSON/post.json";

/**
 * 좋아요 수 댓글 수를 관리합니다.
 */

function Post({ sortURL,key, id, nickname, aptname, isLiked, likeCount, commentCount }) {   //postList 컴포넌트에서 json props를 받아온다.
  // isHeartClicked 상태 변수와 setIsHeartClicked 함수: 하트 아이콘 클릭 여부를 관리
  const [isHeartClicked, setIsHeartClicked] = useState(isLiked);
  // heart 상태 변수와 setHeart 함수: 하트 숫자를 관리
  const [heartNum, setHeartNum] = useState(likeCount);     //좋아요 수 개수
//처음 렌더링될 때 해당 게시글의 현재 좋아요 개수를 보여주기 위해 0에서 heart로 변경
  const [commentSelected, setCommentSelected] = useState(false);    //댓글 이모티콘이 선택 됐는지 아닌지
  const [inputValue, setInputValue] = useState(""); 
  const inputCommentRef = useRef(null); 
  const [commentText, setCommentText] = useState([]); 


  useEffect(() => {
    fetch(`https://apt-api.blbt.app/v1/apartment/${id}/like`)
      .then((response) => response.json())
      .then((data) => {

        setHeartNum(data.likes);


        fetch( `${sortURL}`)

          .then((response) => response.json())
          .then((data) => {
            setIsHeartClicked(data.data.find((v) => v._id === id).isLiked);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const likePost = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`https://apt-api.blbt.app/v1/apartment/${id}/like`, requestOptions)
      .then(() => {
        setHeartNum(heartNum + 1);
        setIsHeartClicked(true)

      })

  };

  const unlikePost = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://apt-api.blbt.app/v1/apartment/${id}/like`, requestOptions)
      .then(() => {
        setHeartNum(heartNum - 1);
        setIsHeartClicked(false);


      })

  };


  const toggleHeart = () => {
    if (isHeartClicked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const toggleCommentSelected = () => {
    setCommentSelected(!commentSelected);
  };

  const onClickCommentAdd = () => {
    const newComment = inputCommentRef.current.value;
    setCommentText([...commentText, newComment]);
    inputCommentRef.current.value = "";
    setInputValue("");
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div id="post">
      <div id="post_contents">
        <h2 id="nickname">{nickname}</h2>
        <p id="aptname">{aptname}</p>
        <div id="heart_comment">
          <img
            src={isHeartClicked ? fillHeartIcon : heartIcon}
            onClick={toggleHeart}
            id="heart"
            alt="Heart Icon"
            className="icon"
          />
          <p id="countHeart">{heartNum}</p>
          <img
            src={chatIcon}
            onClick={toggleCommentSelected}
            id="comment"
            alt="Comment Icon"
            className="icon"
          />

          {/* 현재 댓글 숫자를 표시 */}
          <p id='countComment'>{commentCount}</p>
        </div>
        {commentSelected &&
          <div id="comment_div">
            <div id='input_comment_div'>
              <input ref={inputCommentRef} value={inputValue} onChange={onChangeInput} type='text' placeholder='댓글을 입력하세요.' id='input_comment'/>
              <button onClick={onClickCommentAdd} >댓글 추가</button>
            </div>
            <div id='comment_list'>
              {/* {comment.map((comment, i) => <p key={i} ><b>익명{i + 1} </b>{comment}</p>)} */}
            </div>
          </div>

        }

      </div>
    </div>
  );
}

export default Post;

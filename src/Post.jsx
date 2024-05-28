import React, { useState,useRef } from "react";
import "./Post.css";
import chatIcon from "./assets/chat.svg"; // chat.svg 파일을 import
import heartIcon from "./assets/heart.svg"; // heart.svg 파일을 import
import fillHeartIcon from "./assets/fillHeart.svg"; // fillHeart.svg 파일을 import
import postData from "./JSON/post.json";

function Post({nickname,aptname,heart,comment}) {   //postList 컴포넌트에서 json props를 받아온다.
  // isHeartClicked 상태 변수와 setIsHeartClicked 함수: 하트 아이콘 클릭 여부를 관리
  const [isHeartClicked, setIsHeartClicked] = useState(false);
   // heart 상태 변수와 setHeart 함수: 하트 숫자를 관리
  const [heartNum,setHeartNum]=useState(0);     //좋아요 수 개수

  const [commentSelected, setCommentSelected] = useState(false);    //댓글 이모티콘이 선택 됐는지 아닌지

  const [InputValue, setInputValue] = useState("");    //댓글 작성 부분 input
  const inputCommentRef = useRef(null) // 댓글 입력칸 초기 값 null로 설정
  const [commentText, setCommentText] = useState(postData.commentText || []);
  const toggleCommentSelected = () => { //댓글 버튼 선택 boolean을 바꿔주는 메소드
    setCommentSelected(!commentSelected);
    console.log(commentSelected);
  };
 
  const onClickCommentAdd = () => {
    const newComment = inputCommentRef.current.value;   //인풋칸에 새로 넣은 값
    setCommentText([...commentText, newComment]);   //댓글을 배열에 차곡차곡 저장
    comment.push(newComment);                       //json에 새로운 댓글을 push
    inputCommentRef.current.value = ""; // 입력 필드 초기화
    setInputValue(""); // 상태 초기화
  };

const onChangeInput=(e)=>{                          //타자를 치면 변하는 값을 저장
  setInputValue(()=>e.target.value);        
}


  // 하트 아이콘을 클릭했을 때 호출되는 함수
  const toggleHeart = () => {
    
    // 하트가 이미 클릭된 상태라면
    if (isHeartClicked) {
      // 하트 숫자를 1 감소
      setHeartNum(heartNum-1);
      heart-=1;
    } else {
      // 하트 숫자를 1 증가
      setHeartNum(heartNum+1);
      heart+=1;
    }
  
    // 하트 클릭 상태를 반전시킴 (true -> false, false -> true)
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div id="post">
      <div id="post_contents">
        <h2 id="nickname">{nickname}</h2>
        <p id="aptname">{aptname}</p>
        <div id="heart_comment">
          <img
            // 하트 클릭 상태에 따라 다른 아이콘을 표시
            src={isHeartClicked ? fillHeartIcon : heartIcon}
            // 하트 아이콘을 클릭했을 때 toggleHeart 함수 호출
            onClick={toggleHeart}
            id="heart"
            alt="Heart Icon"
            className="icon" // 인라인 스타일 대신 className 사용
          />
          {/* 현재 하트 숫자를 표시 */}
          <p id="countHeart">{heartNum}</p>
          <img
            src={chatIcon}
            onClick={toggleCommentSelected}
            id="comment"
            alt="Comment Icon"
            className="icon" // 인라인 스타일 대신 className 사용
          />
          {/* 현재 댓글 숫자를 표시 */}
          <p id='countComment'>{comment.length}</p>
            </div>
            {commentSelected && 
            <>
            <div id='input_comment_div'>
                <input ref={inputCommentRef} value={InputValue} onChange={onChangeInput} type='text' placeholder='댓글을 입력하세요.' id='input_comment'></input>
                <button onClick={onClickCommentAdd} >댓글 추가</button>
            </div>
            <div id='comment_list'>
                {comment.map((v,i)=><p><b>익명{i+1} </b>{v}</p>)}
            </div>
            </>
            
            }
        </div>
      </div>
    
  );
}

export default Post;

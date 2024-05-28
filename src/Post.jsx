import React, { useState,useRef } from "react";
import "./Post.css";
import chatIcon from "./assets/chat.svg"; // chat.svg 파일을 import
import heartIcon from "./assets/heart.svg"; // heart.svg 파일을 import
import fillHeartIcon from "./assets/fillHeart.svg"; // fillHeart.svg 파일을 import

function Post() {
 
  // isHeartClicked 상태 변수와 setIsHeartClicked 함수: 하트 아이콘 클릭 여부를 관리
  const [isHeartClicked, setIsHeartClicked] = useState(false);
   // heart 상태 변수와 setHeart 함수: 하트 숫자를 관리
  const [heart,setHeart]=useState(0);
  const[commentNicknameNum,setCommentNicknameNum]=useState(0);  //댓글을 달 때 생기는 익명 번호
  const [commentSelected, setCommentSelected] = useState(false);
  const [commentText, setCommentText] = useState([]);
  const [InpuValue, setInputValue] = useState("");
  const inputCommentRef = useRef(null) // 댓글 입력칸 초기 값 null로 설정
  
  const toggleCommentSelected = () => {
    setCommentSelected(!commentSelected);
    console.log(commentSelected);
  };
 
 const onClickCommentAdd=()=>{
    setCommentText((v)=>([...v,inputCommentRef.current.value]));
    setInputValue(" ");
    inputCommentRef.current.focus();    //여기까지 작성하다가 잠듦
 }
const onChangeInput=(e)=>{
  setInputValue(()=>e.target.value);
}
const increaseNicknameNum=()=>{
  setCommentNicknameNum(commentNicknameNum+1);
}

  // 하트 아이콘을 클릭했을 때 호출되는 함수
  const toggleHeart = () => {
    // 하트가 이미 클릭된 상태라면
    if (isHeartClicked) {
      // 하트 숫자를 1 감소
      setHeart(heart - 1);
    } else {
      // 하트 숫자를 1 증가
      setHeart(heart + 1);
    }
    // 하트 클릭 상태를 반전시킴 (true -> false, false -> true)
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div id="post">
      <div id="post_contents">
        <h2 id="nickname">아기사자539</h2>
        <p id="aptname">우성아파트</p>
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
          <p id="countHeart">{heart}</p>
          <img
            src={chatIcon}
            onClick={toggleCommentSelected}
            id="comment"
            alt="Comment Icon"
            className="icon" // 인라인 스타일 대신 className 사용
          />
          {/* 현재 댓글 숫자를 표시 */}
          <p id='countComment'>{commentText.length}</p>
            </div>
            {commentSelected && 
            <>
            <div id='input_comment_div'>
                <input ref={inputCommentRef} value={InpuValue} onChange={onChangeInput} type='text' placeholder='댓글을 입력하세요.' id='input_comment'></input>
                <button onClick={()=>{onClickCommentAdd(); increaseNicknameNum();}} >댓글 추가</button>
            </div>
            <div id='comment_list'>
                {commentText.map((v)=><p><b>익명{commentNicknameNum} </b>{v}</p>)}
            </div>
            </>
            
            }
        </div>
      </div>
    
  );
}

export default Post;

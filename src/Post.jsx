import React, { useState, useRef, useEffect } from "react";
import "./Post.css";
import chatIcon from "./assets/chat.svg";
import heartIcon from "./assets/heart.svg";
import fillHeartIcon from "./assets/fillHeart.svg";

function Post({ id, nickname, aptname, heart, comment }) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [heartNum, setHeartNum] = useState(heart);  // 초기 값을 heart prop으로 설정
  const [commentSelected, setCommentSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputCommentRef = useRef(null);
  const [commentText, setCommentText] = useState(comment || []);

  useEffect(() => {
    fetch(`https://apt-api.blbt.app/v1/apartment/${id}/like`)
      .then((response) => response.json())
      .then((data) => {

        setHeartNum(data.likes);

        fetch(`https://apt-api.blbt.app/v1/apartment?page=0&size=1000&order=newest`)
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
          <p id="countComment">{commentText.length}</p>
        </div>
        {commentSelected && (
          <>
            <div id="input_comment_div">
              <input
                ref={inputCommentRef}
                value={inputValue}
                onChange={onChangeInput}
                type="text"
                placeholder="댓글을 입력하세요."
                id="input_comment"
              />
              <button onClick={onClickCommentAdd}>댓글 추가</button>
            </div>
            <div id="comment_list">
              {commentText.map((v, i) => (
                <p key={i}>
                  <b>익명{i + 1} </b>{v}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Post;

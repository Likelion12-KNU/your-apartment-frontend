import React, { useState } from "react";
import "./PostForm.css";

function PostForm() {
  const [aptName, setAptName] = useState(""); //useState를 활용한 상태관리입니다!
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //브라우저마다 이벤트 이름부터 시작해서 이벤트 종류나 이벤트가 처리되는 방식이 달라서 이를 동일하게 처리하도록 하는 게 필요하다고 합니다.
    // 폼 제출 로직 추가 예정!
    console.log("아파트 이름:", aptName);
    console.log("비밀번호:", password); //아파트 이름과 비밀번호가 잘 찍히나 확인해보기 위해 두었습니다.
  };

  return (
    <div id="postForm">
      <form onSubmit={handleSubmit}>
        <input
          id="apt_name"
          type="text"
          placeholder="당신이 살고 있는 쌈@@뽕한 아파트의 이름은 무엇인가요?"
          value={aptName}
          onChange={(e) => setAptName(e.target.value)} //input에 입력한 정보로 변수값을 바꿔주기 위해서는 e.target.value 를 인자로 넘겨야한다!
        />
        <div id="password_div">
          <p>등록 삭제시 필요합니다.</p>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required //비밀번호를 입력하지 않으면, 폼이 제출되지 않고 입력하라는 경고란이 뜬다!
          />
          <input id="submit" type="submit" value="등록" />
        </div>
      </form>
    </div>
  );
}

export default PostForm;

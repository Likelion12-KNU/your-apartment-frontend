import React, { useState, useEffect} from "react";
import "./PostForm.css";

/**
 * 등록 폼을 관리 합니다. (입력 부분)
 */

function PostForm({registerPost}) {
  const [aptName, setAptName] = useState(""); //useState를 활용한 상태관리입니다!
  const [password, setPassword] = useState("");
   // 아파트 이름 자동완성 결과 상태 관리
  const [apartmentSearchResult, setApartmentSearchResult] = useState([]); 
 
   // 폼 제출 핸들러 함수
   // 폼이 제출될 때 실행되는 함수. 
   // 데이터 처리, 서버 요청 작업 진행
  const handleSubmit = (event) => {
    
    event.preventDefault(); //브라우저마다 이벤트 이름부터 시작해서 이벤트 종류나 이벤트가 처리되는 방식이 달라서 이를 동일하게 처리하도록 하는 게 필요하다고 합니다.

    // 아파트 이름과 비밀번호를 사용하여 게시글 등록 함수 호출
    registerPost(aptName, password);
    //폼 제출 후 
    setAptName(""); // 입력 필드 초기화
    setPassword(""); // 입력 필드 초기화

    //아파트 이름과 비밀번호가 잘 찍히나 확인해보기 위해 두었습니다.
    console.log("아파트 이름:", aptName);
    console.log("비밀번호:", password); 

  };

/**
 * 사용자가 아파트 이름을 입력할 때, 백엔드 서버에서 해당 이름과 일치하는 아파트 이름을 
 * 자동완성 목록으로 가져와 표시, 그렇게 고른 아파트 이름은 백앤드의 id로 전달됩니다. 
 * 
 * 이부분은 아직 미완성된 부분이므로 주석처리 하였습니다.  
 */
  // useEffect(() => {
  //   if (aptName) {
  //     const fetchAptNames = async () => {
  //       try {
  //         const response = await fetch(
  //           encodeURI(`https://apt-api.blbt.app/v1/apartment/name?query=${aptName}`)
  //          //https://apt-api.blbt.app/v1/apartment/name?query=${aptName}
  //         );
  //         const data = await response.json();
  //         setApartmentSearchResult(data.data); // 자동완성 결과 상태 업데이트
  //       } 
        
  //       catch (error) {
  //         console.error("Error fetching apartment names:", error);
  //       }

  //     };
  //     fetchAptNames();
  //   } 
    
  //   else {
  //     setApartmentSearchResult([]); // 입력값이 없으면 결과 초기화
  //   }
  // }, [aptName]);


  return (
    <div id="postForm">
      <form onSubmit={handleSubmit}> {/* handleSubmit 함수 호출 */}
        <input
          id="apt_name"
          type="text"
          placeholder="당신이 살고 있는 쌈@@뽕한 아파트의 이름은 무엇인가요?"
          value={aptName}
          onChange={(e) => setAptName(e.target.value)} //input에 입력한 정보로 변수값을 바꿔주기 위해서는 e.target.value 를 인자로 넘겨야한다!
          list="apartment-names" 
        />
        <datalist id="apartment-names">
          {apartmentSearchResult.map((apt) => (
            <option key={apt.id} value={apt.name} /> 
          ))}
        </datalist>
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
          {/* 입력된 비밀번호, 아파트 이름들은 등록버튼을 눌렀을 때, 바로 아래에 렌더링되며, 최신순이 가장 위에 위치하도록 해야합니다. 
            이는 PostList에 구현되어있습니다. */}

        </div>
      </form>
    </div>
  );
}

export default PostForm;

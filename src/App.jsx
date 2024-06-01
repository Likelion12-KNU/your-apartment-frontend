
import './App.css'
import PostList from './PostList'
import { useState } from 'react'



function App() {
  const [isSelectedLatest, setIsSelectedLatest] = useState(true);           //최신순 버튼 클릭을 기준 삼았습니다.
  const [sortURL, setSortURL] = useState('https://apt-api.blbt.app/v1/apartment?page=0&size=10&order=newest'); //첫 렌더링 때는 최신순으로 뜨도록 했습니다.
  const [postURL, setPostURL] = useState('https://apt-api.blbt.app/v1/apartment')

  const selectLatest = () => {
    setIsSelectedLatest(true);            //최신순이 눌리면  최신순이true
    setSortURL('https://apt-api.blbt.app/v1/apartment?page=0&size=20&order=newest');
  };

  const selectRanking = () => {
    setIsSelectedLatest(false);         //랭킹순이 눌리면  최신순이 false
    setSortURL('https://apt-api.blbt.app/v1/apartment?page=0&size=20&order=popular');
  };

  return (
    <>
      <div id='top'>
        <div id='sortBy_div'>
          <p id='sortBy_latest' onClick={selectLatest}
            style={{ color: isSelectedLatest ? 'rgb(109, 175, 255)' : 'white' }}>최신순</p>     {/**최신순의 T/F를 판단하여 버튼이 눌렸을 때 색깔이 변하도록 설정하였습니다! */}
          <p id='sortBy_ranking' onClick={selectRanking}
            style={{ color: !isSelectedLatest ? 'rgb(109, 175, 255)' : 'white' }}>랭킹순</p>
        </div>
      </div>
      <div id='mid'>
       
        <PostList
          sortURL={sortURL}
          postURL={postURL}
          // 등록URL
        />
        {/* 나중에 Post에 map()을 사용해서 등록을 한 만큼 게시물이 보이도록 할 예정 */}
      </div>

    </>

  )
}

export default App

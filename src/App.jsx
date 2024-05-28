
import './App.css'
import PostForm from './PostForm'
import Post from './Post'
import PostList from './PostList'
function App() {
  

  return (
  <>
    <div id='top'>
      <div id='sortBy_div'>
        <p id='sortBy_ranking'>랭킹순</p>
        <p id='sortBy_latest'>최신순</p>
      </div>
    </div>
    <PostForm/>
    <div id='mid'>
        <PostList/>       
        {/* 나중에 Post에 map()을 사용해서 등록을 한 만큼 게시물이 보이도록 할 예정 */}
    </div>
    
  </>
    
  )
}

export default App

import './App.css'
import SocialKakao from './components/Kakao'

function App() {

  return (
    <div className='App'>
      <header className="App-header">
        <h1>나의 닮은꼴 찾기</h1>
        {/* SocialKakao 컴포넌트 렌더링 */}
        <SocialKakao />
        <p>환영합니다! 로그인이 필요합니다.</p>
      </header>
    </div>
    
  );
}

export default App

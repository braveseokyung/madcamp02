// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ProfileModal from './profilemodal';
import First from './first';
import FriendList from './friendlist';
import ContestTab from './contesttab';
import NotificationTab from './notification';
import SocialGoogle from './LoginPage'; // SocialKakao 대신 SocialGoogle 임포트
import axios from 'axios';

type ProfileImgType = string | null;

const SidebarMenus = [
  { label: '닮음 점수' },
  { label: '내 친구' },
  { label: '콘테스트' },
  { label: '수신함' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null); // 백엔드에서 발급한 앱 토큰 (JWT 등)
  // const [kakaoAccessToken, setKakaoAccessToken] = useState<string | null>(null); // 카카오 Access Token 제거
  const [selectedMenuIdx, setSelectedMenuIdx] = useState<number>(0);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<ProfileImgType>(null);
  const [pendingImg, setPendingImg] = useState<ProfileImgType>(null);
  const [profileModalImg, setProfileModalImg] = useState<string | null>(null);

  useEffect(() => {
    // 초기 로드 시 로컬 스토리지에 토큰이 있는지 확인하여 로그인 상태 유지
    const storedUserToken = localStorage.getItem('userToken');
    // const storedKakaoAccessToken = localStorage.getItem('kakaoAccessToken'); // 카카오 Access Token 제거

    // if (storedUserToken && storedKakaoAccessToken) { // 조건 변경
    if (storedUserToken) {
      // Google 로그인 시에는 자체 userToken만 확인
      setIsLoggedIn(true);
      setUserToken(storedUserToken);
      // setKakaoAccessToken(storedKakaoAccessToken); // 카카오 Access Token 제거
    }
  }, []);

  // handleLoginSuccess 함수 시그니처 변경: Google 로그인에서는 userToken만 받음
  const handleLoginSuccess = (appToken: string) => {
    setIsLoggedIn(true);
    setUserToken(appToken);
    // setKakaoAccessToken(null); // Google 로그인 시 카카오 Access Token은 없음
    localStorage.setItem('userToken', appToken);
    // localStorage.removeItem('kakaoAccessToken'); // 기존 카카오 토큰 제거
    alert('구글 로그인 성공!');
  };

  const handleLogout = async () => {
    // 구글 로그인에서는 프론트엔드에서 직접 구글 로그아웃 API를 호출할 필요가 없습니다.
    // 백엔드에서 Refresh Token을 관리하거나, JWT 방식은 Stateless하므로 프론트엔드에서는
    // 단순히 앱의 토큰을 제거하여 로그인 상태를 해제합니다.

    // 백엔드의 구글 로그아웃 엔드포인트가 따로 있다면 호출할 수 있지만,
    // 일반적으로는 백엔드에서 구글 Access/Refresh Token을 관리하므로
    // 프론트엔드는 앱의 JWT만 삭제하면 됩니다.

    // 만약 백엔드에서 Google 토큰 해지(revoke)가 필요하다면 여기에 axios.post 호출 추가:
    /*
    try {
        // 예시: Google Access Token을 백엔드에 보내 해지 요청
        const BACKEND_GOOGLE_LOGOUT_URI: string = import.meta.env.VITE_BACKEND_GOOGLE_LOGOUT_URI || 'http://localhost:80/auth/google/logout';
        await axios.post(BACKEND_GOOGLE_LOGOUT_URI, { /* 필요한 데이터 (예: userToken) */ /* });
        console.log('백엔드 구글 로그아웃 요청됨.');
    } catch (error) {
        console.error('백엔드 구글 로그아웃 요청 중 오류 발생:', error);
        // 오류가 발생해도 사용자에게는 로그아웃된 것처럼 처리
    }
    */

    // 프론트엔드 상태 및 스토리지 클리어
    setIsLoggedIn(false);
    setUserToken(null);
    // setKakaoAccessToken(null); // 카카오 Access Token 제거
    localStorage.removeItem('userToken');
    // localStorage.removeItem('kakaoAccessToken'); // 카카오 Access Token 제거
    alert('로그아웃 되었습니다.');
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileModalImgChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileModalImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePendingImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPendingImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    // 로그인되지 않았다면 SocialGoogle 컴포넌트 렌더링
    return <SocialGoogle onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7] font-sans">
      {/* 사이드바 */}
      <aside className="w-60 bg-[#ededed] flex flex-col items-center pt-8">
        <button
          onClick={() => setShowProfile(true)}
          className="flex flex-col items-center bg-none border-none cursor-pointer mb-8 p-0"
        >
          <div className="w-36 h-36 rounded-full bg-[#3d2fd1] mb-4 overflow-hidden flex items-center justify-center">
            {profileModalImg && (
              <img
                src={profileModalImg}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-xl text-[#222]">닉네임</div>{' '}
          {/* 실제 닉네임 표시 로직 추가 필요 */}
        </button>
        {SidebarMenus.map((menu, idx) => (
          <button
            key={menu.label}
            onClick={() => setSelectedMenuIdx(idx)}
            className={`w-[90%] py-4 mb-3 rounded-lg text-lg cursor-pointer font-semibold border-none ${
              selectedMenuIdx === idx
                ? 'bg-[#3d2fd1] text-white'
                : 'bg-[#bdbdbd] text-[#222]'
            }`}
          >
            {menu.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="w-[90%] py-4 mb-3 mt-8 rounded-lg text-lg cursor-pointer font-semibold border-none bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          로그아웃
        </button>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 pt-10 flex flex-col items-center w-full">
        {selectedMenuIdx === 0 ? (
          <First
            profileImg={profileImg}
            pendingImg={pendingImg}
            handleProfileImgChange={handleProfileImgChange}
            handlePendingImgChange={handlePendingImgChange}
          />
        ) : selectedMenuIdx === 1 ? (
          <div className="w-full flex flex-col items-center mt-16 text-2xl text-gray-600">
            <FriendList />
          </div>
        ) : selectedMenuIdx === 2 ? (
          <div className="w-full flex flex-col items-center mt-16 text-2xl text-gray-600">
            <ContestTab />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-16 text-2xl text-gray-600">
            <NotificationTab />
          </div>
        )}
      </main>

      {/* 프로필 모달 */}
      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        profileImg={profileModalImg}
        handleProfileImgChange={handleProfileModalImgChange}
      />
    </div>
  );
};

export default App;

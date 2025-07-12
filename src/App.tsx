// App.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileModal from './profilemodal';
import First from './first';
import FriendList from './friendlist';
import ContestTab from './contesttab';
import NotificationTab from './notification';

type ProfileImgType = string | null;

const tabList = [
  { label: '사진 업로드', value: 'upload' },
  { label: '친구', value: 'friend' },
];

const SidebarMenus = [
  { label: '닮음 점수' },
  { label: '내 친구' },
  { label: '콘테스트' },
  { label: '수신함' },
];

const App: React.FC = () => {
  const [selectedMenuIdx, setSelectedMenuIdx] = useState<number>(0);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<ProfileImgType>(null);
  const [pendingImg, setPendingImg] = useState<ProfileImgType>(null);

  // 프로필 사진 변경
  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 상대 사진 변경
  const handlePendingImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPendingImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f7] font-sans">
      {/* 사이드바 */}
      <aside className="w-60 bg-[#ededed] flex flex-col items-center pt-8">
        <button
          onClick={() => setShowProfile(true)}
          className="flex flex-col items-center bg-none border-none cursor-pointer mb-8 p-0"
        >
          <div className="w-36 h-36 rounded-full bg-[#3d2fd1] mb-4 overflow-hidden flex items-center justify-center">
            {profileImg && (
              <img
                src={profileImg}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-xl text-[#222]">닉네임</div>
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
      </aside>

      {/* 메인 */}
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
        profileImg={profileImg}
        handleProfileImgChange={handleProfileImgChange}
      />
    </div>
  );
};

export default App;

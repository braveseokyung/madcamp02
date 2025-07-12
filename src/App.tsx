// App.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import First from './first';

type ProfileImgType = string | null;

const tabList = [
  { label: '사진 업로드', value: 'upload' },
  { label: '친구', value: 'friend' },
];

const SidebarMenus = [
  { label: '닮음 점수' },
  { label: '내 친구' },
  { label: '콘테스트' },
];

// 프로필 모달 컴포넌트
function ProfileModal({
  open,
  onClose,
  profileImg,
  handleProfileImgChange,
}: {
  open: boolean;
  onClose: () => void;
  profileImg: string | null;
  handleProfileImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>프로필 정보</DialogTitle>
          <DialogClose asChild>
            <button className="absolute top-4 right-4 text-2xl">&times;</button>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 mt-2">
          <label htmlFor="profile-modal-upload" className="cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-[#3d2fd1] overflow-hidden flex items-center justify-center">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-lg">사진 없음</span>
              )}
            </div>
            <input
              id="profile-modal-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImgChange}
            />
            <div className="text-[#2d5fff] mt-2 font-bold">사진 변경</div>
          </label>
          <div className="text-xl font-bold mt-2">닉네임</div>
          <div className="text-gray-500">이메일 등 추가 정보</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 메인 탭 컨텐츠 컴포넌트
function MainContent({
  activeTab,
  profileImg,
  pendingImg,
  handleProfileImgChange,
  handlePendingImgChange,
}: {
  activeTab: string;
  profileImg: string | null;
  pendingImg: string | null;
  handleProfileImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePendingImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8 w-full text-center">
        닉네임 님의 닮은꼴
      </h1>
      <Tabs value={activeTab} className="mb-6 w-full">
        <TabsList className="w-full flex justify-center">
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 max-w-xs"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex gap-12 w-full justify-center">
        {/* 내 사진 */}
        <Card className="flex-1 min-w-[250px] max-w-[500px] h-[340px] flex items-center justify-center rounded-2xl overflow-hidden relative">
          <label
            htmlFor="profile-upload"
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer absolute inset-0 z-10"
          >
            {profileImg ? (
              <img
                src={profileImg}
                alt="내 사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-lg">내 사진 업로드</div>
            )}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImgChange}
            />
          </label>
        </Card>
        {/* 상대 사진 */}
        <Card className="flex-1 min-w-[250px] max-w-[500px] h-[340px] flex items-center justify-center rounded-2xl overflow-hidden relative">
          <label
            htmlFor="pending-upload"
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer absolute inset-0 z-10"
          >
            {pendingImg ? (
              <img
                src={pendingImg}
                alt="상대 사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-lg">상대 사진 업로드</div>
            )}
            <input
              id="pending-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePendingImgChange}
            />
          </label>
        </Card>
      </div>
      {/* 하단 썸네일 */}
      <div className="flex gap-8 mt-10 w-full justify-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-28 h-28 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );
}

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
            내 친구 탭 컨텐츠
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-16 text-2xl text-gray-600">
            콘테스트 탭 컨텐츠
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

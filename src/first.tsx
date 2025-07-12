import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const friends = [
  { id: 1, name: '김철수' },
  { id: 2, name: '이영희' },
  { id: 3, name: '박민수' },
  { id: 4, name: '최지우' },
  { id: 5, name: '홍길동' },
  { id: 6, name: '신유진' },
  { id: 7, name: '유재석' },
  { id: 8, name: '강호동' },
  // ...친구가 많아도 스크롤 가능
];

interface FirstProps {
  profileImg: string | null;
  pendingImg: string | null;
  handleProfileImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePendingImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const tabList = [
  { label: '사진 업로드', value: 'upload' },
  { label: '친구', value: 'friend' },
];

const First: React.FC<FirstProps> = ({
  profileImg,
  pendingImg,
  handleProfileImgChange,
  handlePendingImgChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>('upload');

  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8 w-full text-center">
        닉네임 님의 닮은꼴
      </h1>
      {/* 탭 */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6 w-full"
      >
        <TabsList className="w-full flex justify-center gap-6">
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 max-w-xs gap-6"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 사진 업로드 탭 */}
        <TabsContent value="upload">
          <div className="flex gap-12 w-full justify-center">
            {/* 내 사진 */}
            <Card className="flex-1 min-w-[300px] max-w-[600px] h-[340px] flex items-center justify-center rounded-2xl overflow-hidden">
              <label
                htmlFor="profile-upload"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="내 사진"
                    className="w-full h-full object-contain"
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
            <Card className="flex-1 min-w-[300px] max-w-[600px] h-[340px] flex items-center justify-center rounded-2xl overflow-hidden">
              <label
                htmlFor="pending-upload"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                {pendingImg ? (
                  <img
                    src={pendingImg}
                    alt="상대 사진"
                    className="w-full h-full object-contain"
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
        </TabsContent>

        {/* 친구 탭 */}
        <TabsContent value="friend">
          <div className="flex gap-12 w-full justify-center">
            {/* 내 사진 */}
            <Card className="flex-1 min-w-[300px] max-w-[600px] h-[340px] flex items-center justify-center rounded-2xl overflow-hidden">
              <label
                htmlFor="profile-upload"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="내 사진"
                    className="w-full h-full object-contain"
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
            {/* 친구 리스트 */}
            <Card className="flex-1 min-w-[300px] max-w-[600px] h-[340px] flex flex-col rounded-2xl overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    className={`w-full text-left px-6 py-4 border-b border-gray-200 hover:bg-[#f0f4ff] transition
                ${
                  selectedFriend === friend.id
                    ? 'bg-[#3d2fd1] text-white font-bold'
                    : 'bg-white text-gray-900'
                }`}
                    onClick={() => setSelectedFriend(friend.id)}
                  >
                    {friend.name}
                  </button>
                ))}
              </div>
              {selectedFriend && (
                <div className="w-full py-3 text-center text-base font-semibold text-[#3d2fd1] bg-gray-50">
                  선택된 친구:{' '}
                  {friends.find((f) => f.id === selectedFriend)?.name}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 하단 썸네일 */}
      <div className="flex gap-8 mt-10 w-full justify-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-28 h-28 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );
};

export default First;

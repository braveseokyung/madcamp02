//notification.tsx
import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
// Friend 타입은 FriendList와 동일하게 맞춰주세요
interface Friend {
  id: number;
  name: string;
  email: string;
  status: string;
  avatarUrl?: string | null;
}

interface FriendRequest {
  id: number;
  name: string;
  email: string;
  status: string;
  avatarUrl?: string | null;
}

// 샘플 친구 요청 데이터
const initialRequests: FriendRequest[] = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsoo@email.com',
    status: '대기',
    avatarUrl: null,
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@email.com',
    status: '대기',
    avatarUrl: null,
  },
  {
    id: 3,
    name: '이영희',
    email: 'younghee@email.com',
    status: '대기',
    avatarUrl: null,
  },
  {
    id: 4,
    name: '이영희',
    email: 'younghee@email.com',
    status: '대기',
    avatarUrl: null,
  },
  {
    id: 5,
    name: '이영희',
    email: 'younghee@email.com',
    status: '대기',
    avatarUrl: null,
  },
  {
    id: 6,
    name: '이영희',
    email: 'younghee@email.com',
    status: '대기',
    avatarUrl: null,
  },
];

function NotificationTab() {
  // friends는 실제 FriendList와 공유하거나, props로 내려받을 수도 있음
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>(initialRequests);

  // 친구 요청 수락
  const handleAccept = (id: number) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setFriends((prev) => [...prev, { ...req, status: '온라인' }]);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // 친구 요청 거절(x)
  const handleReject = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 mt-8">
      {requests.length === 0 ? (
        <div className="text-center text-gray-400">
          새로운 친구 요청이 없습니다.
        </div>
      ) : (
        requests.map((req) => (
          <Card
            key={req.id}
            className="flex items-center justify-between px-6 py-4 gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {req.avatarUrl ? (
                  <img
                    src={req.avatarUrl}
                    alt={req.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-2xl">👤</span>
                )}
              </div>
              <div>
                <div className="font-semibold">{req.name}</div>
                <div className="text-xs text-gray-500">{req.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-1 rounded"
                onClick={() => handleAccept(req.id)}
              >
                수락
              </Button>
              <button
                className="text-gray-400 hover:text-red-400 text-lg px-2"
                aria-label="알림 삭제"
                onClick={() => handleReject(req.id)}
              >
                ×
              </button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default NotificationTab;

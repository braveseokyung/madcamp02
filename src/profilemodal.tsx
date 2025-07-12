import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileImg: string | null;
  handleProfileImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileModal({
  open,
  onClose,
  profileImg,
  handleProfileImgChange,
}: ProfileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#000000]">
        <DialogHeader>
          <DialogTitle>프로필 정보</DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 mt-2 ">
          {/* 프로필 이미지 업로드 */}
          <label
            htmlFor="profile-modal-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <div
              className="
                w-28 h-28 rounded-full bg-[#3d2fd1] overflow-hidden
                flex items-center justify-center
              "
            >
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

          {/* 닉네임 및 추가 정보 */}
          <div className="text-xl font-bold mt-2">닉네임</div>
          <div className="text-gray-500">이메일 등 추가 정보</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;

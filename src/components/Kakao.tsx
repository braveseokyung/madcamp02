// SocialKakao.tsx (또는 .jsx 파일)
import React from 'react';

const REST_API_KEY: string | undefined = import.meta.env.VITE_KAKAO_REST_API_KEY; // Vite 사용 시

const SocialKakao: React.FC = () => {
    // 환경 변수 값이 없는 경우를 대비한 유효성 검사
    if (!REST_API_KEY) {
        console.error("환경 변수 'VITE_KAKAO_REST_API_KEY'가 설정되지 않았습니다.");
        // 에러를 UI에 표시하거나 다른 처리를 할 수 있습니다.
        return <div>카카오 로그인 설정 오류</div>;
    }

    // 리다이렉트 URI는 백엔드의 콜백 엔드포인트여야 합니다.
    const redirect_uri: string = 'http://localhost:4000/auth/kakao/callback'; // 예시: 백엔드 주소

    // 카카오 OAuth 요청 URL 생성
    const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

    // 로그인 버튼 클릭 시 실행될 함수
    const handleLogin = (): void => {
        // window.location.href를 직접 변경하여 카카오 로그인 페이지로 리다이렉트
        window.location.href = kakaoURL;
    };

    return (
        <>
            <button onClick={handleLogin} style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#FEE500', // 카카오 노란색
                color: '#3C1E1E',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
            }}>
                카카오 로그인
            </button>
        </>
    );
};

export default SocialKakao;
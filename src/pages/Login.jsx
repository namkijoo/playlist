import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function Login() {
  const login = useGoogleLogin({
    flow: "implicit", // 'auth-code' 대신 'implicit' 플로우 사용
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse.access_token);
      console.log(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
  });

  return (
    <div>
      <button onClick={login}>로그인</button>
    </div>
  );
}

export default Login;

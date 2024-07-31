import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function Login() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse.access_token);
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

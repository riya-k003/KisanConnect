import { useState } from "react";
import LoginForm from "./signup/login";
import SignUpForm from "./signup/SignUp";

function AuthPage() {
  const [mode, setMode] = useState('login');

  return (
    <div>
      <h2>Welcome to KissanConnect</h2>

      <button onClick={() => setMode('login')}>Login</button>
      <button onClick={() => setMode('signup')}>Sign Up</button>

      {mode === 'login'
        ? <LoginForm onSwitch={() => setMode('signup')} />
        : <SignUpForm onSwitch={() => setMode('login')} />
      }
    </div>
  );
}

export default AuthPage;
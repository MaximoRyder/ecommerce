
import { LoginForm } from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, redirect to dashboard on any login attempt
    navigate("/dashboard");
  };

  const handleSkipLogin = () => {
    navigate("/dashboard");
  };

  const handleRegister = () => {
    // In a real app, this would navigate to registration page
    console.log("Navigate to registration");
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    console.log("Navigate to forgot password");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-700 via-purple-900/50 to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Main Title */}
      <div className="text-center mb-16">
        <h1 className="font-knewave text-6xl md:text-7xl lg:text-8xl text-yellow-400 leading-tight">
          Vive<br />Facil!
        </h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-white font-abeezee text-sm italic tracking-wide">
              CORREO ELECTRÓNICO:
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admindevs@devs23.com.ec"
                className="w-full h-12 bg-purple-900 border-none rounded-lg text-purple-300 placeholder:text-purple-300 font-roboto text-lg px-4"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-white font-abeezee text-sm italic tracking-wide">
              CONTRASEÑA:
            </label>
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className="w-full h-12 bg-purple-900 border-none rounded-lg text-purple-300 placeholder:text-purple-300 font-roboto text-4xl px-4"
              />
            </div>
          </div>

          {/* Login Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-yellow-900 font-roboto font-bold text-lg px-6 py-3 rounded-xl shadow-lg"
            >
              Ingresar
            </Button>
          </div>
        </form>

        {/* Forgot Password */}
        <div className="text-center pt-8">
          <button
            onClick={handleForgotPassword}
            className="text-white font-abeezee text-sm leading-5"
          >
            ¿Olvidaste tu contraseña?{" "}
            <span className="text-purple-300 hover:text-purple-200">
              Recupérala
            </span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center pt-8">
          <button
            onClick={handleRegister}
            className="text-white font-abeezee text-sm"
          >
            ¿Aún no estás registrado?{" "}
            <span className="text-purple-300 hover:text-purple-200">
              Regístrarte
            </span>
          </button>
        </div>

        {/* Skip Login */}
        <div className="text-center pt-4">
          <button
            onClick={handleSkipLogin}
            className="text-white font-abeezee text-sm"
          >
            ¿Solo quieres ver?{" "}
            <span className="text-purple-300 hover:text-purple-200">
              Omitir Login
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

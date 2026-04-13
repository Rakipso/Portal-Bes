import { LoginForm } from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-gray-100/50">
        <div className="bg-blue-600 px-6 py-12 text-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
          <div className="absolute top-10 -right-10 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
          
          <h1 className="text-4xl font-extrabold text-white relative z-10 tracking-tight drop-shadow-sm">Portal BES</h1>
          <p className="text-blue-100 mt-2 relative z-10 text-sm font-medium tracking-wide">Beneficios y Subsidios del Estado</p>
        </div>
        
        <div className="px-8 py-10 relative bg-white">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>
          <LoginForm />
        </div>
        
        <div className="bg-gray-50/80 px-8 py-5 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            Plataforma 100% segura e inclusiva
          </p>
        </div>
      </div>
    </div>
  );
}

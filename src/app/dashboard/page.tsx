"use client";

import { useBenefitsEngine } from "@/hooks/useBenefitsEngine";
import { BenefitCard } from "@/components/dashboard/BenefitCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { userInfo, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { eligible, ineligible } = useBenefitsEngine();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !userInfo) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-600/20 ring-2 ring-white/50">
              B
            </div>
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-gray-900 leading-none">Portal BES</h1>
              <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Gobierno de Chile</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-50/80 rounded-xl border border-gray-200/70 shadow-sm">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                 <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-900 leading-tight">{userInfo.fullName}, {userInfo.age} años</span>
                <span className="text-[11px] font-semibold text-gray-500 tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  RUT: {userInfo.rut}
                </span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <Button variant="ghost" onClick={() => logout()} className="text-gray-600 hover:text-red-700 hover:bg-red-50 font-bold px-4 rounded-xl h-10 transition-colors">
              <LogOut className="w-[18px] h-[18px] mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-14 bg-gradient-to-r from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/10 border border-blue-500 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-10 w-48 h-48 bg-indigo-400 rounded-full mix-blend-overlay filter blur-2xl opacity-30 translate-y-1/2"></div>
            
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/30 border-none transition-colors backdrop-blur-sm">
              Análisis del Registro Social de Hogares (RSH)
            </Badge>
            <h2 className="text-4xl font-extrabold text-white tracking-tight relative z-10 block drop-shadow-sm">Panel de Beneficios Ciudadanos</h2>
            <p className="text-blue-100 mt-3 text-lg relative z-10 max-w-3xl font-medium leading-relaxed drop-shadow-sm">
              Hola <span className="font-bold text-white">{userInfo.fullName.split(' ')[0]}</span>. Según los registros, tu cartola RSH indica un porcentaje del <span className="font-extrabold text-white underline decoration-blue-400 decoration-2 underline-offset-4">{userInfo.rshPercentage}%</span>. A continuación te presentamos el cruce automático con la oferta del Estado.
            </p>
        </div>

        <section className="mb-16 relative z-10">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-[22px] font-extrabold text-gray-900 flex items-center gap-3">
               Beneficios Activos Aprobados
               <span className="bg-green-100/80 text-green-700 px-3 py-0.5 rounded-full text-[13px] font-black shadow-sm ring-1 ring-green-300">
                 {eligible.length} correspondencias
               </span>
             </h3>
           </div>
           
           {eligible.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {eligible.map(b => (
                  <BenefitCard key={b.id} benefit={b} eligible={true} />
                ))}
             </div>
           ) : (
             <div className="bg-white rounded-[2rem] p-16 text-center border-dashed border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-gray-50/50">
                  <ShieldCheck className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No hay beneficios disponibles de momento</h4>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                  Tu perfil actual no cruza con los parámetros requeridos por la oferta programática abierta este mes.
                </p>
             </div>
           )}
        </section>

        <section className="pb-12 border-t border-gray-200/60 pt-12">
           <div className="mb-8">
             <h3 className="text-xl font-bold text-gray-400 flex items-center gap-3">
               Otros Beneficios en Sistema
                <span className="bg-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-gray-300">
                 {ineligible.length} no activos
               </span>
             </h3>
             <p className="text-[13px] text-gray-400 mt-1 font-medium">Revisa las causales exactas dictadas por las Entidades pertinentes para cada uno de estos ítems.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ineligible.map(b => (
                <BenefitCard key={b.id} benefit={b} eligible={false} />
              ))}
           </div>
        </section>
      </main>
    </div>
  );
}

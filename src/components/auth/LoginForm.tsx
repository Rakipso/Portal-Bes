"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatRUT, validateRUT } from "@/lib/validations/rut";
import { useAuthStore } from "@/store/useAuthStore";
import { SliderCaptcha } from "./SliderCaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { mockGovernmentDb } from "@/lib/data/mockData";

export function LoginForm() {
  const [rut, setRut] = useState("");
  const [error, setError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRut(formatRUT(raw));
    setError("");
  };

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRUT(rut)) {
      setError("El RUT o RUN ingresado no cuenta con un formato válido para el Gobierno de Chile.");
      return;
    }
    setError("");
    setShowCaptcha(true);
  };

  const handleCaptchaSuccess = () => {
    const user = mockGovernmentDb.find(u => u.rut === rut);
    if (user) {
      login(user);
    } else {
      login({
        rut,
        fullName: "Invitado de Prueba",
        age: 38,
        rshPercentage: 70,
        isStudent: false
      });
    }
    router.push("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleLoginClick} className="space-y-6 w-full">
         <div className="space-y-3">
          <Label htmlFor="rut" className="text-gray-800 font-bold tracking-tight">RUT o RUN</Label>
          <Input
            id="rut"
            type="text"
            placeholder="Ej: 12.345.678-9"
            value={rut}
            onChange={handleRutChange}
            className={`h-14 text-lg transition-colors border-2 shadow-sm ${error ? 'border-red-400 focus-visible:ring-red-500 bg-red-50/20' : 'border-gray-200 focus-visible:border-blue-400 focus-visible:ring-blue-100'}`}
            maxLength={12}
            autoComplete="off"
          />
          {error && (
            <p className="text-red-500 text-[13px] flex items-center gap-1.5 mt-2 font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
        
        <div className="pt-2">
           <Button 
             type="submit" 
             className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 rounded-xl"
             disabled={!rut}
           >
             Ingresar al Portal
           </Button>
        </div>
      </form>

      <SliderCaptcha 
        open={showCaptcha} 
        onOpenChange={setShowCaptcha} 
        onSuccess={handleCaptchaSuccess} 
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface SliderCaptchaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function SliderCaptcha({ open, onOpenChange, onSuccess }: SliderCaptchaProps) {
  const [value, setValue] = useState([0]);
  const [verified, setVerified] = useState(false);

  const handleValueChange = (newValue: number[] | readonly number[] | number) => {
    const valArray = Array.isArray(newValue) ? newValue : [newValue];
    setValue(valArray as number[]);
    if (valArray[0] === 100) {
      setVerified(true);
      setTimeout(() => {
        onSuccess();
        onOpenChange(false);
        // reset for next time just in case
        setTimeout(() => {
          setValue([0]);
          setVerified(false);
        }, 500);
      }, 800);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            Verificación de Seguridad
          </DialogTitle>
          <DialogDescription>
            Desliza el botón hasta el final para confirmar que eres humano.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-8 px-4 flex flex-col items-center justify-center space-y-6">
          <div className="w-full relative h-12 bg-gray-100 rounded-full flex items-center overflow-hidden shadow-inner px-2">
             {verified ? (
                <div className="absolute inset-0 bg-green-500 flex items-center justify-center transition-all duration-300">
                   <div className="flex items-center gap-2 text-white font-medium">
                     <CheckCircle2 className="h-6 w-6" />
                     <span>¡Verificado correctamente!</span>
                   </div>
                </div>
             ) : (
                <Slider
                  value={value}
                  onValueChange={handleValueChange}
                  max={100}
                  step={2}
                  className="w-full z-10 cursor-pointer"
                />
             )}
          </div>
          {!verified && (
            <p className="text-sm text-gray-500 text-center animate-pulse">
              Arrastra hacia la derecha 👉
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

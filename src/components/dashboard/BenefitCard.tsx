import { EvaluatedBenefit } from "@/hooks/useBenefitsEngine";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Coffee, Home, PiggyBank, Snowflake, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  "snowflake": <Snowflake className="h-6 w-6 text-blue-500" />,
  "home": <Home className="h-6 w-6 text-emerald-500" />,
  "coffee": <Coffee className="h-6 w-6 text-amber-500" />,
  "briefcase": <Briefcase className="h-6 w-6 text-indigo-500" />,
  "piggy-bank": <PiggyBank className="h-6 w-6 text-rose-500" />
};

export function BenefitCard({ benefit, eligible }: { benefit: EvaluatedBenefit, eligible: boolean }) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${eligible ? 'border-green-200 shadow-md bg-white' : 'border-gray-200 opacity-[0.85] bg-gray-50/70'}`}>
      {eligible && (
        <div className="absolute top-0 right-0 z-10 w-24">
          <div className="bg-green-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-bl-xl shadow-sm text-center tracking-wider uppercase">
            Aprobado
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2.5 rounded-xl bg-white shadow-sm ring-1 flex items-center justify-center ${eligible ? 'ring-green-100' : 'ring-gray-100 grayscale'}`}>
            {iconMap[benefit.icon] || <Snowflake className="h-6 w-6 text-gray-500" />}
          </div>
          <div className="pr-12">
            <Badge variant={eligible ? "default" : "secondary"} className={`mb-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 ${eligible ? 'bg-blue-50 text-blue-700 hover:bg-blue-50 rounded-md': ''}`}>
               {benefit.category}
            </Badge>
            <CardTitle className="text-[17px] leading-tight text-gray-900 font-extrabold">{benefit.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm mt-3 line-clamp-2 text-gray-600 font-medium">
          {benefit.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="bg-white/90 border border-gray-100 p-3 rounded-xl flex items-center justify-between mb-4 shadow-sm">
           <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Monto</span>
           <span className="font-extrabold text-gray-900 text-[14px]">{benefit.amount || "Acorde a evaluación"}</span>
        </div>
        
        {eligible ? (
           <div>
             <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Requisitos clave de Estado</span>
             <ul className="space-y-1.5 bg-green-50/50 p-3 rounded-xl border border-green-50">
               {benefit.requirements.map((req, i) => (
                 <li key={i} className="text-[12.5px] text-gray-700 flex items-start gap-2.5 leading-tight font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-[5px] flex-shrink-0" />
                   <span>{req}</span>
                 </li>
               ))}
             </ul>
           </div>
        ) : (
           <div className="bg-red-50/60 p-3.5 rounded-xl border border-red-100">
             <span className="text-[11px] font-bold text-red-600/80 uppercase tracking-widest flex items-center gap-1.5 mb-2">
               <XCircle className="w-3.5 h-3.5" /> Motivo de Rechazo
             </span>
             <p className="text-[13px] text-red-900/80 leading-tight font-medium">
               {benefit.rejectionReason}
             </p>
           </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-center bg-white h-16">
         {eligible ? (
           <a href={benefit.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
             <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold text-sm h-11 rounded-xl transition-all hover:scale-[1.02]">
               Postular en ChileAtiende
               <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
             </Button>
           </a>
         ) : (
           <Button variant="ghost" className="w-full text-gray-500 hover:bg-gray-50 font-semibold cursor-default text-sm h-11 pointer-events-none">
             Opción inhabilitada
           </Button>
         )}
      </CardFooter>
    </Card>
  );
}

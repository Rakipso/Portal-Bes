import { useAuthStore } from '@/store/useAuthStore';
import { benefitsData, Benefit } from '@/lib/data/mockData';
import { useMemo } from 'react';

export interface EvaluatedBenefit extends Benefit {
  rejectionReason?: string;
}

export function useBenefitsEngine() {
  const { userInfo } = useAuthStore();

  const benefitsResult = useMemo(() => {
    if (!userInfo) return { eligible: [], ineligible: [] };

    const eligible: EvaluatedBenefit[] = [];
    const ineligible: EvaluatedBenefit[] = [];

    benefitsData.forEach((benefit) => {
      let isEligible = true;
      let reason = "";

      // Validamos por edad
      if (benefit.rules.minAge && userInfo.age < benefit.rules.minAge) {
        isEligible = false;
        reason = `Tienes ${userInfo.age} años, pero el MIDESO exige tener como mínimo ${benefit.rules.minAge} años cumplidos para obtener este título.`;
      } 
      // Validamos por Registro Social de Hogares
      else if (benefit.rules.maxRsh && userInfo.rshPercentage > benefit.rules.maxRsh) {
        isEligible = false;
        reason = `Tu puntaje RSH (${userInfo.rshPercentage}%) sobrepasa el límite estipulado permitido, el cual requiere que te sitúes entre el 0 y el ${benefit.rules.maxRsh}%.`;
      }
      // Validamos escolaridad
      else if (benefit.rules.mustBeStudent && !userInfo.isStudent) {
        isEligible = false;
        reason = `Los registros del MINEDUC no logran certificar matrícula activa en la Educación Superior. El beneficio es estudiantil.`;
      }

      if (isEligible) {
        eligible.push(benefit);
      } else {
         ineligible.push({ ...benefit, rejectionReason: reason });
      }
    });

    return { eligible, ineligible };
  }, [userInfo]);

  return benefitsResult;
}

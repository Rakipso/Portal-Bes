export interface CitizenProfile {
  rut: string;
  fullName: string;
  age: number;
  rshPercentage: number;
  isStudent: boolean;
}

// Simulador de API Gobierno de Chile (Registro Social de Hogares + Registro Civil)
export const mockGovernmentDb: CitizenProfile[] = [
  { rut: "12.345.678-9", fullName: "Juan Pérez Gómez", age: 68, rshPercentage: 40, isStudent: false },
  { rut: "19.876.543-2", fullName: "María Camila Rojas", age: 22, rshPercentage: 60, isStudent: true },
  { rut: "15.342.111-K", fullName: "Andrea Soto Castillo", age: 35, rshPercentage: 80, isStudent: false },
];

export interface BenefitRequirementRules {
  minAge?: number;
  maxRsh?: number;
  mustBeStudent?: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: string;
  amount?: string;
  requirements: string[]; // Viñetas legibles
  rules: BenefitRequirementRules; // Reglas lógicas numéricas
  icon: string;
  applyUrl: string;
}

export const benefitsData: Benefit[] = [
  {
    id: "b1",
    title: "Bono Invierno",
    description: "Aporte económico entregado a quienes cumplen ciertos requisitos, ayuda para enfrentar los gastos propios de la época invernal.",
    category: "Aportes Económicos",
    amount: "$74.767",
    requirements: ["Tener 65 años o más", "Pertenecer al 60% más vulnerable en el RSH"],
    rules: { minAge: 65, maxRsh: 60 },
    icon: "snowflake",
    applyUrl: "https://www.chileatiende.gob.cl/fichas/102077-bono-de-invierno"
  },
  {
    id: "b2",
    title: "Subsidio de Arriendo",
    description: "Aporte temporal que entrega el Estado para ayudar a pagar parte del arriendo de una vivienda.",
    category: "Vivienda",
    amount: "Hasta 170 UF",
    requirements: ["Ser mayor de edad (18+)", "Estar dentro del 70% de vulnerabilidad del RSH"],
    rules: { minAge: 18, maxRsh: 70 },
    icon: "home",
    applyUrl: "https://www.chileatiende.gob.cl/fichas/23961-llamado-regular-subsidio-de-arriendo"
  },
  {
    id: "b3",
    title: "Beca Alimentación (BAES)",
    description: "Subsidio entregado de forma complementaria a estudiantes de educación superior para gastos de alimentación diarios.",
    category: "Educación",
    amount: "$42.000 mensual",
    requirements: ["Ser estudiante matriculado", "Estar máximo en el 60% del RSH"],
    rules: { mustBeStudent: true, maxRsh: 60 },
    icon: "coffee",
    applyUrl: "https://www.chileatiende.gob.cl/fichas/4454-beca-de-alimentacion-para-la-educacion-superior-baes"
  },
  {
    id: "b4",
    title: "Pensión Garantizada Universal (PGU)",
    description: "Beneficio del Estado que reemplaza a los de vejez del Pilar Solidario, cuyo pago mensual está a cargo del IPS.",
    category: "Pensiones",
    amount: "$214.296",
    requirements: ["Tener cumplidos 65 años o más", "No integrar el 10% más rico (hasta 90% en tu cartola RSH)"],
    rules: { minAge: 65, maxRsh: 90 },
    icon: "piggy-bank",
    applyUrl: "https://www.chileatiende.gob.cl/fichas/99710-pension-garantizada-universal-pgu"
  }
];

# 🇨🇱 Portal BES (Plataforma de Unificación de Beneficios Estatales)

![Estado: MVP](https://img.shields.io/badge/Estado-MVP%20%2F%20Piloto-success)
![Versión: 1.0.0](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-blue)

## 📌 Descripción del Proyecto
El **Portal BES** es una plataforma tecnológica con enfoque social que busca democratizar y facilitar el acceso a la información sobre las ayudas, bonos y subsidios estatales en Chile. 

Actualmente, la información se encuentra dispersa en múltiples instituciones (IPS, SENCE, Ministerio de Desarrollo Social). Este proyecto centraliza la consulta mediante un motor de clasificación lógico, reduciendo la brecha digital, ahorrando tiempo a los ciudadanos y descongestionando las filas de atención en las municipalidades (DIDECO).

## ✨ Características Principales
- **Autenticación Simplificada:** Ingreso mediante RUT y Número de Documento, o integración con Clave Única.
- **Motor de Clasificación en Tiempo Real:** Cruza el perfil del usuario (edad, RSH, cargas) con los requisitos de subsidios actuales.
- **Transparencia Total:** Muestra claramente los beneficios a los que el usuario califica y *explica los motivos* de los beneficios rechazados.
- **Seguridad y Privacidad:** Cumplimiento de la Ley N° 19.628 (Protección de Datos). No almacena historial de consultas ni datos sensibles.
- **Accesibilidad:** Diseño intuitivo, de alto contraste y 100% responsivo para dispositivos móviles, pensado para usuarios con baja alfabetización digital.

## 🛠️ Tecnologías Utilizadas

**Fase Actual (Prototipo MVP):**
- HTML5 / CSS3 (Diseño responsivo y minimalista)
- Vanilla JavaScript (Motor de validación lógica de beneficios)
- Mock Data (Base de datos en formato JSON simulando respuestas de la plataforma PIE del Estado)

**Roadmap Próxima Versión (Escalabilidad):**
- Framework: Next.js (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS

## 🚀 Instalación y Uso (Entorno Local)

Como la versión actual es un prototipo frontend nativo, no requiere instalación de dependencias complejas.

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/Rakipso/Portal-Bes.git](https://github.com/Rakipso/Portal-Bes.git)

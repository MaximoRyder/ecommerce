# Proyecto E-commerce con React, Vite y Firebase

## Visión General

Este documento describe la arquitectura y el plan de implementación para una aplicación de comercio electrónico completa (Single-Page Application). La aplicación será responsiva, multilingüe y contará con una experiencia de usuario fluida, desde la exploración de productos hasta la gestión del carrito y la autenticación de usuarios.

## Stack Tecnológico y Arquitectura

-   **Plataforma de Desarrollo:** Node.js
-   **Herramienta de Build:** Vite
-   **Lenguaje Principal:** TypeScript
-   **Framework Frontend:** React 19+ (con React Compiler y Actions)
-   **Estilos:** Tailwind CSS
-   **Componentes UI:** ShadCN UI
-   **Backend y Servicios:** Firebase (Authentication)
-   **Arquitectura:** Single-Page Application (SPA) del lado del cliente.
-   **Enrutamiento:** React Router DOM
-   **Internacionalización (i18n):** Solución manual con Context API y archivos JSON.

---

## Plan de Implementación Actual

### Fase 1: Configuración del Proyecto y Estructura Base

1.  **Inicializar Blueprint:** Crear `blueprint.md` para documentar el proyecto.
2.  **Migrar a TypeScript:**
    *   Renombrar archivos `.jsx` a `.tsx`.
    *   Instalar dependencias de TypeScript (`typescript`, `@types/react`, `@types/react-dom`).
    *   Crear y configurar el archivo `tsconfig.json`.
3.  **Instalar y Configurar Estilos:**
    *   Instalar Tailwind CSS y sus dependencias (`tailwindcss`, `postcss`, `autoprefixer`).
    *   Inicializar Tailwind CSS creando `tailwind.config.js` y `postcss.config.js`.
    *   Configurar las rutas de contenido en `tailwind.config.js`.
4.  **Instalar y Configurar ShadCN UI:**
    *   Ejecutar el comando `npx shadcn-ui@latest init` para inicializar ShadCN.
    *   Esto configurará `tailwind.config.js`, creará `src/lib/utils.ts` y el directorio `src/components/ui`.
5.  **Instalar Dependencias Adicionales:**
    *   `react-router-dom` para el enrutamiento.
    *   `firebase` para los servicios de backend.
    *   `lucide-react` para iconos.
6.  **Crear Estructura de Carpetas:**
    *   Establecer la estructura de directorios principal (`src/app`, `src/components`, `src/context`, `src/lib`, `src/locales`).
7.  **Limpieza Inicial:** Actualizar `App.tsx` y `main.tsx` para reflejar la nueva estructura y eliminar el código de demostración inicial.

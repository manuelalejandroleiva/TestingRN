# Monedero App

Aplicación móvil desarrollada en **React Native** para la gestión de un monedero virtual. Permite registrar depósitos, visualizar transacciones y calcular totales de manera sencilla.

---

## 🔹 Características

- Registro de depósitos por cuenta bancaria.  
- Visualización de historial de transacciones con fechas.  
- Modal para ingresar nuevas cantidades.  
- Validación de inputs: solo números positivos.  
- Eliminación de registros existentes.  
- Cálculo automático del total depositado.  
- Diseño moderno con **Tailwind CSS** y tarjetas personalizadas.  
- Ventanita flotante mostrando números destacados.

---

## 📦 Tecnologías utilizadas

- **React Native**  
- **Tailwind CSS** (`twrnc`)  
- **React Navigation** (Drawer y Stack)  
- **TypeScript**  
- **Hooks personalizados**: `useCoins`, `useGoBack`, `useFieldControl`  
- **Componentes reutilizables**: `Cards`, `Modals`, `TextInput`, `Button`  

---

## 🚀 Instalación

1. Clonar el repositorio:
2. te creas un archivo .env
3. le colocas esta variable de entorno API_URL_LOGIN=https://693ac0f59b80ba7262cb3b02.mockapi.io/Testing
4. usuario: admin
5. password:admin

```bash
git clone https://github.com/tu-usuario/monedero-app.git
cd monedero-app
yarn install o npm install para que instale todas las librerias
"En caso de estar en Mac presionar i para levantar el emulador de iphone sino a para el de android"





# 🏋️‍♂️ FitnessAPP - Backend API
📝
FitnessAPP es el motor de una aplicación integral diseñada para el seguimiento de rutinas, ejercicios y progreso físico. Este repositorio contiene la lógica del lado del servidor (API) que gestiona la persistencia de datos, la autenticación de usuarios y la administración de planes de entrenamiento.

Fue desarrollado originalmente como una solución para digitalizar el seguimiento en gimnasios y usuarios particulares.

### 🚀 Stack Tecnológico
Basado en la estructura del proyecto, el stack principal incluye:

* Entorno: Node.js

* Framework: Express.js

* Base de Datos: PostgreSQL / MongoDB (Ajustar según corresponda)

* ORM/ODM: Sequelize / Mongoose

* Autenticación: JSON Web Tokens (JWT)

### 📂 Estructura del Proyecto (/api)
```
api/
 ├── src/
 |    |── config/         # Configuración de BD y variables globales
 │    ├── controllers/    # Manejo de peticiones
 |    ├── errors/         # Lógica de errores
 │    ├── middlewares/    # Validaciones y seguridad (Auth)
 │    ├── models/         # Definición de esquemas de datos (Database)
 │    ├── routes/         # Definición de endpoints
 |    ├── services/       # Lógica de negocio
 |    ├── types/          # Tipos de datos
 │    └── utils/          # Funciones auxiliares y helpers
 ├── .env.example         # Plantilla de variables de entorno
 ├── app.ts               # Configuración de la aplicación
 ├── index.ts             # Punto de entrada de la aplicación
 └── package.json         # Dependencias y scripts
```

### ✨ Características Principales

* Gestión de Usuarios: Registro, inicio de sesión y perfiles personalizados.

* Catálogo de Ejercicios: Base de datos con información detallada de movimientos y grupos musculares.

* Rutinas Personalizadas: Creación y edición de planes de entrenamiento.

* Seguridad: Endpoints protegidos mediante middlewares de autenticación.

### 🛠️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:
1. Clonar el repositorio:
```bash
git clone https://github.com/lucio1907/FitnessAPP.git
cd FitnessAPP/api
```
2. Instalar dependencias:
```bash
npm install
```
3. Configurar variables de entorno: Crea un archivo .env en la raíz de la carpeta /api basándote en el archivo de ejemplo:
```bash
PORT=8080

PG_HOST=your-host
PG_USERNAME=your-db-user
PG_PASSWORD=your-db-password
PG_DB=your_db_name
PG_PORT=your_db_port

JWT_EXPIRATION=your-jwt-expiration
JWT_SECRET_KEY=your-jwt-secret
```
4. Ejecutar la api:
```bash
npm start
# O para desarrollo con recarga automática:
npm run dev
```

### 🛣️ Endpoints Principales

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Registra un nuevo usuario | No |
| `POST` | `/api/users/login` | Login y obtención de token | No |
| `GET` | `/api/progress/user-progress/:user_id` | Obtiene historial de progreso | Sí |
| `GET` | `/api/exercise` | Obtiene todos los ejercicios | Sí |
| `POST` | `/api/workouts` | Crea una nueva rutina | Sí |
| `DELETE` | `/api/workouts/:id` | Elimina una rutina específica | Sí |
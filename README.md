# Biblioteca Virtual - Frontend

Frontend del sistema **Biblioteca Virtual**, desarrollado con **Angular 20** como una Single Page Application (SPA). La aplicación permite gestionar préstamos bibliotecarios, consultar el catálogo de libros y administrar el sistema mediante una interfaz moderna, responsiva y segura.

---

## Tecnologías utilizadas

- Angular 20
- TypeScript
- Bootstrap
- RxJS
- Nginx
- Docker
- GitHub Actions

---

## Funcionalidades

- Inicio de sesión y registro de usuarios.
- Autenticación mediante JWT.
- Autenticación en dos factores (2FA).
- Catálogo de libros con búsqueda y paginación.
- Gestión de libros, autores y géneros.
- Gestión de préstamos.
- Dashboard administrativo.
- Notificaciones en tiempo real mediante WebSocket.
- Consumo de API REST mediante HttpClient.
- Protección de rutas mediante Guards e Interceptors.

---

## Roles del sistema

El sistema implementa control de acceso basado en roles:

- **USER:** Consulta el catálogo y solicita préstamos.
- **BIBLIOTECARIO:** Gestiona libros, autores, géneros y préstamos.
- **ADMIN:** Acceso completo al sistema y al dashboard administrativo.

---

## Arquitectura

El frontend está organizado siguiendo una arquitectura modular basada en componentes.

- **Features:** Módulos funcionales del sistema.
- **Core:** Servicios, Guards, Interceptors y modelos.
- **Shared:** Componentes reutilizables.
- **Auth:** Autenticación y registro de usuarios.
- **Environments:** Configuración para los distintos entornos.

---

## Requisitos

Para ejecutar el proyecto se requiere:

### Desarrollo local

- Node.js
- Angular CLI

### Docker

- Docker
- Docker Compose

---

# Instalación y ejecución

## Clonar el repositorio

```bash
git clone https://github.com/AngheloMP10/biblioteca-virtual-frontend.git
cd biblioteca-virtual-frontend
```

---

## Instalación de dependencias

```bash
npm install
```

---

## Ejecución en desarrollo

```bash
ng serve
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

## Ejecución con Docker

```bash
docker build -t biblioteca-virtual-frontend .
docker run -p 4200:80 biblioteca-virtual-frontend
```

---

## Configuración

La aplicación utiliza archivos de entorno para configurar la URL del backend en los diferentes ambientes:

- `environment.ts`
- `environment.prod.ts`
- `environment.netlify.ts`

---

## Despliegue

El proyecto se encuentra desplegado mediante:

- Frontend: Netlify
- Backend: Render
- Base de datos: Supabase PostgreSQL
- Docker
- GitHub Actions para CI/CD

```text
https://bucolic-horse-0d3efe.netlify.app/
```

---

## Autor

**Anghelo Mendoza Prado**

Estudiante de Ingeniería de Software  
Universidad Tecnológica del Perú

---

## Licencia

Proyecto desarrollado con fines académicos.

---

# Estructura del proyecto

```
biblioteca-front
├─ .angular
├─ .editorconfig
├─ angular.json
├─ Dockerfile
├─ nginx.conf
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ auth
│  │  │  ├─ auth.css
│  │  │  ├─ auth.service.ts
│  │  │  ├─ auth.spec.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  ├─ login.spec.ts
│  │  │  │  └─ login.ts
│  │  │  └─ registro
│  │  │     ├─ registro.css
│  │  │     ├─ registro.html
│  │  │     ├─ registro.spec.ts
│  │  │     └─ registro.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  ├─ auth-guard.ts
│  │  │  │  ├─ public-guard.spec.ts
│  │  │  │  ├─ public-guard.ts
│  │  │  │  ├─ staff-guard.spec.ts
│  │  │  │  └─ staff-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ auth-interceptor.spec.ts
│  │  │  │  ├─ auth-interceptor.ts
│  │  │  │  └─ error-interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ auth.interface.ts
│  │  │  │  ├─ autor.ts
│  │  │  │  ├─ dashboard-genero.ts
│  │  │  │  ├─ dashboard-libro.ts
│  │  │  │  ├─ dashboard-metricas.ts
│  │  │  │  ├─ dashboard-response.ts
│  │  │  │  ├─ genero.ts
│  │  │  │  ├─ libro.ts
│  │  │  │  ├─ page-response.ts
│  │  │  │  └─ prestamo.ts
│  │  │  └─ services
│  │  │     ├─ alert.spec.ts
│  │  │     ├─ alert.ts
│  │  │     ├─ autor.spec.ts
│  │  │     ├─ autor.ts
│  │  │     ├─ dashboard.ts
│  │  │     ├─ genero.spec.ts
│  │  │     ├─ genero.ts
│  │  │     ├─ libro.spec.ts
│  │  │     ├─ libro.ts
│  │  │     ├─ prestamo.spec.ts
│  │  │     ├─ prestamo.ts
│  │  │     ├─ token-storage.service.ts
│  │  │     ├─ token-storage.spec.ts
│  │  │     └─ websocket.service.ts
│  │  ├─ features
│  │  │  ├─ admin
│  │  │  │  └─ dashboard
│  │  │  │     ├─ dashboard.css
│  │  │  │     ├─ dashboard.html
│  │  │  │     ├─ dashboard.spec.ts
│  │  │  │     └─ dashboard.ts
│  │  │  ├─ autores
│  │  │  │  ├─ autor-form
│  │  │  │  │  ├─ autor-form.css
│  │  │  │  │  ├─ autor-form.html
│  │  │  │  │  ├─ autor-form.spec.ts
│  │  │  │  │  └─ autor-form.ts
│  │  │  │  └─ autor-list
│  │  │  │     ├─ autor-list.css
│  │  │  │     ├─ autor-list.html
│  │  │  │     ├─ autor-list.spec.ts
│  │  │  │     └─ autor-list.ts
│  │  │  ├─ catalogo
│  │  │  │  ├─ catalogo.css
│  │  │  │  ├─ catalogo.html
│  │  │  │  ├─ catalogo.spec.ts
│  │  │  │  └─ catalogo.ts
│  │  │  ├─ generos
│  │  │  │  ├─ genero-form
│  │  │  │  │  ├─ genero-form.css
│  │  │  │  │  ├─ genero-form.html
│  │  │  │  │  ├─ genero-form.spec.ts
│  │  │  │  │  └─ genero-form.ts
│  │  │  │  └─ genero-list
│  │  │  │     ├─ genero-list.css
│  │  │  │     ├─ genero-list.html
│  │  │  │     ├─ genero-list.spec.ts
│  │  │  │     └─ genero-list.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ libros
│  │  │  │  ├─ libro-form
│  │  │  │  │  ├─ libro-form.css
│  │  │  │  │  ├─ libro-form.html
│  │  │  │  │  ├─ libro-form.spec.ts
│  │  │  │  │  └─ libro-form.ts
│  │  │  │  └─ libro-list
│  │  │  │     ├─ libro-list.css
│  │  │  │     ├─ libro-list.html
│  │  │  │     ├─ libro-list.spec.ts
│  │  │  │     └─ libro-list.ts
│  │  │  ├─ not-found
│  │  │  │  ├─ not-found.css
│  │  │  │  ├─ not-found.html
│  │  │  │  ├─ not-found.spec.ts
│  │  │  │  └─ not-found.ts
│  │  │  ├─ prestamos
│  │  │  │  ├─ mis-pedidos
│  │  │  │  │  ├─ mis-pedidos.css
│  │  │  │  │  ├─ mis-pedidos.html
│  │  │  │  │  ├─ mis-pedidos.spec.ts
│  │  │  │  │  └─ mis-pedidos.ts
│  │  │  │  └─ prestamo-list
│  │  │  │     ├─ prestamo-list.css
│  │  │  │     ├─ prestamo-list.html
│  │  │  │     ├─ prestamo-list.spec.ts
│  │  │  │     └─ prestamo-list.ts
│  │  │  └─ security
│  │  │     └─ two-fa
│  │  │        ├─ two-fa.css
│  │  │        ├─ two-fa.html
│  │  │        ├─ two-fa.spec.ts
│  │  │        └─ two-fa.ts
│  │  └─ shared
│  │     └─ components
│  │        ├─ footer
│  │        │  ├─ footer.css
│  │        │  ├─ footer.html
│  │        │  ├─ footer.spec.ts
│  │        │  └─ footer.ts
│  │        └─ navbar
│  │           ├─ navbar.css
│  │           ├─ navbar.html
│  │           ├─ navbar.spec.ts
│  │           └─ navbar.ts
│  ├─ assets
│  │  └─ images
│  │     └─ biblioteca.jpg
│  ├─ environments
│  │  ├─ environment.netlify.ts
│  │  ├─ environment.prod.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles.css
│  └─ _redirects
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```

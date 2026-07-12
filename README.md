# Biblioteca Virtual - Frontend

Frontend del sistema **Biblioteca Virtual**, una aplicación web desarrollada con Angular para la gestión de préstamos bibliotecarios, consulta de catálogo y administración del sistema según roles de usuario.

La interfaz permite a los usuarios consultar libros, solicitar préstamos y gestionar su cuenta, mientras que bibliotecarios y administradores acceden a módulos de gestión y control operativo.

---

## Autor

**Anghelo M. P.**
Estudiante de Ingeniería de Software
Universidad Tecnológica del Perú

---

## Tecnologías utilizadas

- Angular 20
- TypeScript
- Bootstrap
- Nginx
- Docker

---

## Funcionalidades principales

- Landing page informativa
- Registro e inicio de sesión
- Autenticación con JWT
- Verificación en dos pasos (2FA)
- Catálogo de libros con buscador
- Solicitud y seguimiento de préstamos
- Gestión administrativa por roles
- Dashboard con métricas

---

## Roles soportados

El sistema cuenta con tres roles principales:

- **USER** → Consulta catálogo y solicita préstamos
- **BIBLIOTECARIO** → Gestiona libros y préstamos
- **ADMIN** → Acceso total, dashboard y administración general

---

## Requisitos

Para ejecutar el proyecto puedes usar una de estas opciones:

### Opción 1: Docker (recomendado)

- Docker
- Docker Compose

### Opción 2: Desarrollo local

- Node.js
- Angular CLI

---

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/AngheloMP10/biblioteca-virtual-frontend.git
cd Proyecto-FullStack-G2
```

---

## Ejecución en desarrollo

Instalar dependencias:

```bash
npm install
```

Iniciar Angular:

```bash
ng serve
```

Abrir en el navegador:

```bash
http://localhost:4200
```

---

## Ejecución con Docker

```bash
docker build -t biblioteca-front .
docker run -p 4200:80 biblioteca-front
```

---

## Estado del proyecto

Proyecto en desarrollo activo.
La aplicación continuará evolucionando con nuevas funcionalidades, mejoras de experiencia de usuario y optimizaciones de rendimiento.

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
│  │  │  │  └─ auth-interceptor.ts
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
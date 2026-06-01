# Biblioteca Virtual Frontend

Sistema web frontend para la gestión de una Biblioteca Virtual, desarrollado con Angular.

---

## Tecnologías utilizadas

- Angular 20
- TypeScript
- Nginx

---

## Autores

**Anghelo Mendoza Prado**, 
**Fernando Alania Atoche**, 
**Marcos Javier Vargas**

---

## Requisitos

Antes de iniciar, asegúrate de tener instalado:

- Docker

> No es necesario instalar Node.js ni Angular CLI localmente para ejecutar el proyecto en contenedores.

---

# Instalación y ejecución

## Clonar el repositorio

```bash
git clone https://github.com/AngheloMP10/Proyecto-FullStack-G2.git
cd Proyecto-FullStack-G2
```

---

## Ejecución en desarrollo (Angular CLI)

Si deseas trabajar en modo desarrollo:

```bash
npm install
ng serve
```

Abrir en el navegador:

```bash
http://localhost:4200
```

---

# Estructura del proyecto

```text
biblioteca-front
├── src
│   ├── app
│   │   ├── auth
│   │   ├── core
│   │   │   ├── guards
│   │   │   ├── interceptors
│   │   │   ├── models
│   │   │   └── services
│   │   ├── features
│   │   │   ├── autores
│   │   │   ├── catalogo
│   │   │   ├── generos
│   │   │   ├── landing
│   │   │   ├── libros
│   │   │   └── prestamos
│   │   └── shared
│   │       └── components
│   ├── assets
│   └── environments
├── Dockerfile
├── nginx.conf
├── angular.json
└── package.json
```

---

# Funcionalidades principales

- Autenticación y registro de usuarios
- Gestión de libros
- Gestión de autores
- Gestión de géneros
- Gestión de préstamos
- Guards de autenticación y roles
- Consumo de API REST
- Diseño responsive


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
│  │  │     └─ token-storage.spec.ts
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
│  │  │  └─ prestamos
│  │  │     ├─ mis-pedidos
│  │  │     │  ├─ mis-pedidos.css
│  │  │     │  ├─ mis-pedidos.html
│  │  │     │  ├─ mis-pedidos.spec.ts
│  │  │     │  └─ mis-pedidos.ts
│  │  │     └─ prestamo-list
│  │  │        ├─ prestamo-list.css
│  │  │        ├─ prestamo-list.html
│  │  │        ├─ prestamo-list.spec.ts
│  │  │        └─ prestamo-list.ts
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
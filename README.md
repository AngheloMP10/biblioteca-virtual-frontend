# Biblioteca Virtual Frontend — Sistema Web con Docker y CI/CD

Sistema frontend de la Biblioteca Virtual desarrollado con Angular, contenerizado y automatizado mediante CI/CD.

---

## Autor

Anghelo M. P.  
Estudiante de Ingeniería de Software  
Universidad Tecnológica del Perú

---

## Tecnologías usadas

- Angular 20
- Nginx
- Docker
- GitHub Actions (CI/CD)
- Docker Hub

---

## Requisitos

- Docker

> No se requiere Node ni Angular CLI instalados localmente.

---

## Ejecución del proyecto

### Local

Para desarrollo local usando Angular CLI:

```bash
git clone https://github.com/AngheloMP10/biblioteca-virtual-frontend.git
cd biblioteca-virtual-frontend
```

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
│  │  │  │  ├─ genero.ts
│  │  │  │  ├─ libro.ts
│  │  │  │  ├─ page-response.ts
│  │  │  │  └─ prestamo.ts
│  │  │  └─ services
│  │  │     ├─ alert.spec.ts
│  │  │     ├─ alert.ts
│  │  │     ├─ autor.spec.ts
│  │  │     ├─ autor.ts
│  │  │     ├─ genero.spec.ts
│  │  │     ├─ genero.ts
│  │  │     ├─ libro.spec.ts
│  │  │     ├─ libro.ts
│  │  │     ├─ prestamo.spec.ts
│  │  │     ├─ prestamo.ts
│  │  │     ├─ token-storage.service.ts
│  │  │     └─ token-storage.spec.ts
│  │  ├─ features
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
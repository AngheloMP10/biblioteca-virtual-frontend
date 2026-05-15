# Biblioteca Virtual Frontend

Sistema web frontend para la gestión de una Biblioteca Virtual, desarrollado con Angular.

---

## Tecnologías utilizadas

- Angular 20
- TypeScript
- Nginx

---

## Autores

**Anghelo Mendoza Prado**
**Fernando Alania Atoche**
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

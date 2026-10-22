import { fakeJwt } from './jwt';

export type Rol = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_BIBLIOTECARIO';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Simula una sesión iniciada sin pasar por la UI de login.
       * Escribe auth-token, username y role en localStorage dentro de
       * onBeforeLoad (antes de que Angular ejecute authGuard/publicGuard)
       * y visita la ruta indicada.
       */
      loginMock(
        username: string,
        role: Rol,
        path?: string,
      ): Chainable<AUTWindow>;
    }
  }
}

Cypress.Commands.add(
  'loginMock',
  (username: string, role: Rol, path: string = '/catalogo') => {
    const token = fakeJwt(username, role);

    return cy.visit(path, {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth-token', token);
        win.localStorage.setItem('username', username);
        win.localStorage.setItem('role', role);
      },
    });
  },
);

import { fakeJwt } from '../../support/jwt';

const API = 'http://localhost:8080';
// Defensivo: el front (4200) llama a otro origen (8080)
const CORS = { 'access-control-allow-origin': '*' };

describe('Autenticación: Login + 2FA', () => {
  let users: any;
  let auth: any;

  before(() => {
    cy.fixture('users').then((u) => (users = u));
    cy.fixture('auth-responses').then((a) => (auth = a));
  });

  beforeEach(() => {
    // Catch-all de GET al backend. Se declara primero para que tenga la
    // MENOR prioridad (Cypress evalúa los intercepts del último al primero).
    // Sin backend, las páginas de destino (/catalogo, /libros) recibirían
    // status 0 y el errorInterceptor abriría un Swal "Error de Conexión".
    cy.intercept('GET', `${API}/**`, (req) => {
      req.reply({
        statusCode: 200,
        headers: CORS,
        body: req.url.includes('/libros') ? auth.emptyPage : [],
      });
    });
  });

  const fillAndSubmit = (username: string, password: string) => {
    cy.get('[data-cy=login-username]').type(username);
    cy.get('[data-cy=login-password]').type(password, { log: false });
    cy.get('[data-cy=login-submit]').click();
  };

  const assertSession = (username: string, role: string) => {
    cy.window()
      .its('localStorage')
      .then((ls) => {
        expect(ls.getItem('auth-token'), 'auth-token').to.be.a('string').and.not
          .be.empty;
        expect(ls.getItem('username'), 'username').to.eq(username);
        expect(ls.getItem('role'), 'role').to.eq(role);
      });
  };

  // ---------- CP-F01: camino feliz ----------

  it('CP-F01a: credenciales correctas + OTP válido (User) -> /catalogo', () => {
    cy.intercept('POST', `${API}/auth/login`, {
      statusCode: 200,
      headers: CORS,
      body: auth.requires2FA,
    }).as('login');
    cy.intercept('POST', `${API}/auth/verify-2fa`, {
      statusCode: 200,
      headers: CORS,
      body: { ...auth.sessionUser, token: fakeJwt('user', 'ROLE_USER') },
    }).as('verify2fa');

    cy.visit('/auth/login');
    fillAndSubmit(users.user.username, users.user.password);

    cy.wait('@login').its('request.body').should('deep.equal', {
      username: users.user.username,
      password: users.user.password,
    });

    // Misma vista, cambia el estado a OTP
    cy.get('[data-cy=login-title]').should('contain.text', 'Verificación 2FA');
    cy.get('[data-cy=otp-input]').type(users.otp.valid);
    cy.get('[data-cy=otp-submit]').click();

    // El front envía code como string; el backend lo convierte a int
    cy.wait('@verify2fa').its('request.body').should('deep.equal', {
      tempToken: auth.requires2FA.tempToken,
      code: users.otp.valid,
    });

    cy.location('pathname').should('eq', '/catalogo');
    assertSession('user', 'ROLE_USER');
    cy.screenshot('CP-F01a_login_2fa_user_catalogo');
  });

  it('CP-F01b: credenciales correctas + OTP válido (Admin) -> /libros', () => {
    cy.intercept('POST', `${API}/auth/login`, {
      statusCode: 200,
      headers: CORS,
      body: auth.requires2FA,
    }).as('login');
    cy.intercept('POST', `${API}/auth/verify-2fa`, {
      statusCode: 200,
      headers: CORS,
      body: { ...auth.sessionAdmin, token: fakeJwt('admin', 'ROLE_ADMIN') },
    }).as('verify2fa');

    cy.visit('/auth/login');
    fillAndSubmit(users.admin.username, users.admin.password);
    cy.wait('@login');

    cy.get('[data-cy=otp-input]').type(users.otp.valid);
    cy.get('[data-cy=otp-submit]').click();
    cy.wait('@verify2fa');

    cy.location('pathname').should('eq', '/libros');
    assertSession('admin', 'ROLE_ADMIN');
    cy.screenshot('CP-F01b_login_2fa_admin_libros');
  });

  it('CP-F01c: login sin 2FA activado -> /catalogo directo', () => {
    cy.intercept('POST', `${API}/auth/login`, {
      statusCode: 200,
      headers: CORS,
      body: { ...auth.sessionUser, token: fakeJwt('user', 'ROLE_USER') },
    }).as('login');

    cy.visit('/auth/login');
    fillAndSubmit(users.user.username, users.user.password);
    cy.wait('@login');

    cy.get('[data-cy=otp-input]').should('not.exist');
    cy.location('pathname').should('eq', '/catalogo');
    assertSession('user', 'ROLE_USER');
  });

  // ---------- CP-F02: OTP inválido ----------

  it('CP-F02: credenciales correctas + OTP inválido -> error y sigue en 2FA', () => {
    cy.intercept('POST', `${API}/auth/login`, {
      statusCode: 200,
      headers: CORS,
      body: auth.requires2FA,
    }).as('login');
    cy.intercept('POST', `${API}/auth/verify-2fa`, {
      statusCode: 401,
      headers: CORS,
      body: auth.errors.badOtp,
    }).as('verify2fa');

    cy.visit('/auth/login');
    fillAndSubmit(users.user.username, users.user.password);
    cy.wait('@login');

    cy.get('[data-cy=otp-input]').type(users.otp.invalid);
    cy.get('[data-cy=otp-submit]').click();
    cy.wait('@verify2fa');

    cy.get('[data-cy=login-error]').should('contain.text', 'Código inválido');
    cy.get('[data-cy=login-title]').should('contain.text', 'Verificación 2FA');
    cy.get('[data-cy=otp-input]').should('be.visible');
    cy.location('pathname').should('eq', '/auth/login');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'auth-token')
      .should('be.null');
    cy.screenshot('CP-F02_otp_invalido');
  });

  // ---------- CP-F03: credenciales incorrectas ----------

  it('CP-F03: credenciales incorrectas -> mensaje genérico', () => {
    cy.intercept('POST', `${API}/auth/login`, {
      statusCode: 401,
      headers: CORS,
      body: auth.errors.badCredentials,
    }).as('login');

    cy.visit('/auth/login');
    fillAndSubmit(users.invalid.username, users.invalid.password);
    cy.wait('@login');

    // La UI no distingue si falló usuario o contraseña
    cy.get('[data-cy=login-error]').should(
      'contain.text',
      'Usuario o contraseña incorrectos',
    );
    cy.get('[data-cy=login-title]').should('contain.text', 'Iniciar Sesión');
    cy.location('pathname').should('eq', '/auth/login');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'auth-token')
      .should('be.null');
    cy.screenshot('CP-F03_credenciales_invalidas');
  });

  // ---------- CP-F04: campos vacíos ----------

  it('CP-F04: campos vacíos -> submit deshabilitado y validaciones visibles', () => {
    cy.visit('/auth/login');

    cy.get('[data-cy=login-submit]').should('be.disabled');

    // Los mensajes solo aparecen cuando el campo fue "touched" (focus + blur)
    cy.get('[data-cy=login-username]').focus().blur();
    cy.get('[data-cy=login-password]').focus().blur();
    cy.get('[data-cy=username-error]')
      .should('be.visible')
      .and('contain.text', 'El usuario es requerido');
    cy.get('[data-cy=password-error]')
      .should('be.visible')
      .and('contain.text', 'La contraseña es requerida');

    // Con un solo campo lleno sigue deshabilitado
    cy.get('[data-cy=login-username]').type(users.user.username);
    cy.get('[data-cy=login-submit]').should('be.disabled');

    // Con ambos campos se habilita
    cy.get('[data-cy=login-password]').type(users.user.password, {
      log: false,
    });
    cy.get('[data-cy=login-submit]').should('be.enabled');
    cy.screenshot('CP-F04_campos_vacios');
  });
});

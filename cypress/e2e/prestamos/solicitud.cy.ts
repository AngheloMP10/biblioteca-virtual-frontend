const API = 'http://localhost:8080';
const CORS = { 'access-control-allow-origin': '*' };

// Endpoints reales del front (LibroService / PrestamoService)
const RE_LIBROS = /localhost:8080\/libros(\?.*)?$/;
const RE_MIOS = /localhost:8080\/prestamos\/mios$/;
const RE_SOLICITAR = /localhost:8080\/prestamos\/solicitar\/\d+$/;

describe('Préstamos: Solicitud desde el catálogo', () => {
  let users: any;
  let catalogo: any;
  let prestamos: any;

  before(() => {
    cy.fixture('users').then((u) => (users = u));
    cy.fixture('catalogo').then((c) => (catalogo = c));
    cy.fixture('prestamos').then((p) => (prestamos = p));
  });

  beforeEach(() => {
    // Catch-all primero (menor prioridad): evita el Swal "Error de Conexión"
    // del errorInterceptor ante cualquier GET no previsto.
    cy.intercept('GET', `${API}/**`, {
      statusCode: 200,
      headers: CORS,
      body: [],
    });
    cy.intercept('GET', RE_LIBROS, {
      statusCode: 200,
      headers: CORS,
      body: catalogo,
    }).as('libros');
    cy.intercept('POST', RE_SOLICITAR, {
      statusCode: 200,
      headers: CORS,
      body: 'Préstamo solicitado',
    }).as('solicitar');
  });

  // Abre el catálogo como User con los préstamos indicados (GET /prestamos/mios)
  const abrirCatalogo = (misPrestamos: unknown[]) => {
    cy.intercept('GET', RE_MIOS, {
      statusCode: 200,
      headers: CORS,
      body: misPrestamos,
    }).as('mios');
    cy.loginMock(users.user.username, 'ROLE_USER', '/catalogo');
    cy.wait(['@libros', '@mios']);
  };

  const cuposDebeSer = (n: string) =>
    cy
      .get('[data-cy=cupos-disponibles]')
      .should(($el) => expect($el.text().trim()).to.eq(n));

  const card = (titulo: string) => cy.contains('[data-cy=libro-card]', titulo);

  // ---------- CP-F05: partición de equivalencia (válido) ----------

  it('CP-F05: 1 préstamo activo + libro con stock 5 -> solicitud exitosa', () => {
    abrirCatalogo(prestamos.uno);
    cuposDebeSer('2');

    card('Cien Años de Soledad').within(() => {
      cy.get('[data-cy=btn-solicitar]').should('be.enabled').click();
    });

    // Modal de confirmación (SweetAlert2)
    cy.get('.swal2-popup')
      .should('be.visible')
      .and('contain.text', 'Confirmar préstamo')
      .and('contain.text', 'Cien Años de Soledad');
    cy.get('.swal2-confirm').click();

    cy.wait('@solicitar')
      .its('request.url')
      .should('match', /\/prestamos\/solicitar\/1$/);

    // Modal de éxito
    cy.get('.swal2-popup')
      .should('be.visible')
      .and('contain.text', 'Solicitud enviada');
    cy.screenshot('CP-F05_solicitud_exitosa');
    cy.get('.swal2-confirm').click();

    // El cupo baja de 2 a 1
    cuposDebeSer('1');
  });

  it('CP-F05b: cancelar la confirmación no envía la solicitud', () => {
    abrirCatalogo(prestamos.uno);

    card('Cien Años de Soledad').within(() => {
      cy.get('[data-cy=btn-solicitar]').click();
    });
    cy.get('.swal2-popup').should('contain.text', 'Confirmar préstamo');
    cy.get('.swal2-cancel').click();

    cy.get('@solicitar.all').should('have.length', 0);
    cuposDebeSer('2');
  });

  // ---------- CP-F06: valores límite del cupo (máx. 3 activos) ----------

  it('CP-F06: 3 préstamos activos -> límite alcanzado y botones bloqueados', () => {
    abrirCatalogo(prestamos.tres);

    cy.get('[data-cy=limite-alcanzado]')
      .should('be.visible')
      .and('contain.text', 'límite de préstamos');
    cy.get('[data-cy=cupos-disponibles]').should('not.exist');
    cy.get('[data-cy=btn-solicitar]')
      .should('have.length.greaterThan', 0)
      .each(($btn) => cy.wrap($btn).should('be.disabled'));

    cy.get('@solicitar.all').should('have.length', 0);
    cy.screenshot('CP-F06_limite_alcanzado');
  });

  it('CP-F06b: 2 préstamos activos (límite - 1) -> aún puede solicitar', () => {
    abrirCatalogo(prestamos.dos);

    cuposDebeSer('1');
    cy.get('[data-cy=limite-alcanzado]').should('not.exist');
    card('Cien Años de Soledad').within(() => {
      cy.get('[data-cy=btn-solicitar]').should('be.enabled');
    });
  });

  it('CP-F06c: FINALIZADO y RECHAZADO no cuentan como activos', () => {
    abrirCatalogo(prestamos.cerrados); // 1 activo + 1 finalizado + 1 rechazado

    cuposDebeSer('2');
  });

  // ---------- CP-F07: valor límite de stock ----------

  it('CP-F07: libro con stock 0 -> "Agotado" y botón bloqueado', () => {
    abrirCatalogo(prestamos.uno);

    card('La Casa de los Espíritus').within(() => {
      cy.get('[data-cy=libro-stock]').should('contain.text', 'Agotado');
      cy.get('[data-cy=btn-solicitar]')
        .should('be.disabled')
        .and('contain.text', 'Sin Stock');
    });

    // Contraste: libro con stock disponible
    card('Cien Años de Soledad').within(() => {
      cy.get('[data-cy=libro-stock]').should('contain.text', '5 Disponibles');
      cy.get('[data-cy=btn-solicitar]')
        .should('be.enabled')
        .and('contain.text', 'Solicitar Préstamo');
    });
    cy.screenshot('CP-F07_libro_agotado');
  });
});

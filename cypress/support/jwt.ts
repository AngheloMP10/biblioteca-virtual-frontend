/**
 * JWT falso con estructura header.payload.firma.
 * El front solo hace atob(token.split('.')[1]) y revisa payload.type
 * (authGuard bloquea '2FA_TEMP'), así que no hace falta firma real.
 * Solo ASCII: btoa falla con caracteres fuera de latin1.
 */
const b64 = (obj: object): string => btoa(JSON.stringify(obj));

export const fakeJwt = (
  username: string,
  role: string,
  type: string = 'ACCESS',
): string =>
  [
    b64({ alg: 'HS256', typ: 'JWT' }),
    b64({
      sub: username,
      role,
      type,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }),
    'firma-falsa',
  ].join('.');

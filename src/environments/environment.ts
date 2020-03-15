// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  uris: {
    login: 'http://site.rent.cu/es/token',
    refresh_token: 'http://site.rent.cu/es/refresh',
    preview: 'http://site.rent.cu/es/preview',
    register: 'http://site.rent.cu/es/owner',
    api: 'http://localhost:3000',
    image: 'http://site.rent.cu/uploads/main/homestay'
  },

  secret: '800a0e540906b2fff8f3299eba5c4e65f7442d66d9127a55f4fb436dc9aa4f64',
};

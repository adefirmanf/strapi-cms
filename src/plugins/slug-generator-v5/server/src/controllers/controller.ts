import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('slug-generator-v5')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
});

export default controller;

import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'slug',
    plugin: "slug-generator-v5",
    type: 'string',
    inputSize: {
      default: 4,
      isResizable: true,
    },
  })
  // register phase
};

export default register;

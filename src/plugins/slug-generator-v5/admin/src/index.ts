import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'slug',
      plugin: PLUGIN_ID,
      pluginId: PLUGIN_ID,
      type: 'string',
      components: {
        Input: async () => await import(
        /* webpackChunkName: "input-component" */  './components/Hello'
        ),
      },
      inputSize: {
        default: 4,
        isResizable: true,
      },
      intlLabel: {
        id: getTranslation('form.label'),
        defaultMessage: 'Slug Generator 5',
      },
      intlDescription: {
        id: getTranslation('form.description'),
        defaultMessage: 'A Strapi plugin to generate slug. Supports Strapi v5!',
      },
      options: {
        base: [{
          intlLabel: {
            id: getTranslation('form.options.slugFormat'),
            defaultMessage: 'Slug Format',
          },
          name: 'options.uuid-format',
          description: {
            id: getTranslation('form.field.options.description'),
            defaultMessage:
              'Title Format: Slug will generate based on title field.',
          },
          type: 'select',
          value: "title-format",
          options: [
            {
              key: "title-format",
              defaultValue: "title-format",
              value: "title-format",
              metadatas: {
                intlLabel: {
                  id: getTranslation('form.field.options.title-format.label'),
                  defaultMessage: "Title Format",
                },
              },
            }
          ]
        }]},
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};

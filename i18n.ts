import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Don't return locale from here when using i18n routing
  const messages = (await import(`./src/messages/${locale}.json`)).default;
  return {
    messages
  };
}); 
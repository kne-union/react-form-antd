import React from 'react';
import { IntlProvider, useIntl } from '@kne/react-intl';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS
};

const withLocale = (WrappedComponent) => {
  const WithLocaleComponent = ({ locale = 'zh-CN', ...props }) => {
    const messages = localeMap[locale] || zhCN;
    return (
      <IntlProvider locale={locale} messages={messages}>
        <WrappedComponent {...props} />
      </IntlProvider>
    );
  };
  WithLocaleComponent.displayName = `withLocale(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithLocaleComponent;
};

export { useIntl };
export default withLocale;

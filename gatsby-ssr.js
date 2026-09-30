import { withPrefix } from 'gatsby';
import React from 'react';

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'de' });
  setHeadComponents([
    <link key="leagueSpartan" rel="preload" href={withPrefix("/fonts/LeagueSpartan-VF.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
  ]);
};

import { withPrefix } from 'gatsby';
import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="leagueSpartan" rel="preload" href={withPrefix("/fonts/LeagueSpartan-VF.woff")} as="font" type="font/woff" crossOrigin="anonymous" />
  ]);
};

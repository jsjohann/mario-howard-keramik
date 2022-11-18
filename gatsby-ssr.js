import React from 'react';

/*export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="preload" href="/fonts/LeagueSpartan-VF.woff" as="font" type="font/woff" crossOrigin="anonymous" key="leagueSpartan" />
  ]);
};
*/

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="leagueSpartan" rel="preload" href="/fonts/LeagueSpartan-VF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
  ]);
};

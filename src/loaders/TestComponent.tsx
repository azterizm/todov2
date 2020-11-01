import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = props => (
  <ContentLoader
    speed={2}
    width={1920}
    height={1080}
    viewBox="300 0 600 1200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="11" y="33" rx="0" ry="0" width="318" height="15" />
    <rect x="449" y="33" rx="0" ry="0" width="14" height="15" />
    <rect x="478" y="40" rx="0" ry="0" width="14" height="15" />
    <rect x="428" y="32" rx="0" ry="0" width="14" height="15" />
    <rect x="408" y="32" rx="0" ry="0" width="14" height="15" />
    <rect x="-2" y="73" rx="0" ry="0" width="483" height="5" />
    <rect x="10" y="105" rx="0" ry="0" width="318" height="15" />
    <rect x="448" y="105" rx="0" ry="0" width="14" height="15" />
    <rect x="477" y="112" rx="0" ry="0" width="14" height="15" />
    <rect x="427" y="104" rx="0" ry="0" width="14" height="15" />
    <rect x="407" y="104" rx="0" ry="0" width="14" height="15" />
    <rect x="-3" y="145" rx="0" ry="0" width="483" height="5" />
    <rect x="10" y="174" rx="0" ry="0" width="318" height="15" />
    <rect x="448" y="174" rx="0" ry="0" width="14" height="15" />
    <rect x="477" y="181" rx="0" ry="0" width="14" height="15" />
    <rect x="427" y="173" rx="0" ry="0" width="14" height="15" />
    <rect x="407" y="173" rx="0" ry="0" width="14" height="15" />
    <rect x="-3" y="214" rx="0" ry="0" width="483" height="5" />
    <rect x="9" y="246" rx="0" ry="0" width="318" height="15" />
    <rect x="447" y="246" rx="0" ry="0" width="14" height="15" />
    <rect x="426" y="245" rx="0" ry="0" width="14" height="15" />
    <rect x="406" y="245" rx="0" ry="0" width="14" height="15" />
  </ContentLoader>
);

export default MyLoader;

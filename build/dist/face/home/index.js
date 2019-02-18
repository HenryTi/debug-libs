import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';
export const homeTab = () => {
    let LoadableComponent = Loadable({
        loader: () => import('./tab'),
        loading: Loading
    });
    return React.createElement(LoadableComponent, null);
};
//# sourceMappingURL=index.js.map
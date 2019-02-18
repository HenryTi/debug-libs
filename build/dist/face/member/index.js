import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';
export const memberTab = () => {
    let LoadableComponent = Loadable({
        loader: () => import('./tab'),
        loading: Loading,
        render(loaded, props) {
            let tc = new loaded.TabController();
            tc.start();
            return React.createElement(tc.render, null);
        }
    });
    return React.createElement(LoadableComponent, null);
};
//# sourceMappingURL=index.js.map
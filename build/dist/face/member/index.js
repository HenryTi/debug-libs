import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';
export var memberTab = function () {
    var LoadableComponent = Loadable({
        loader: function () { return import('./tab'); },
        loading: Loading,
        render: function (loaded, props) {
            var tc = new loaded.TabController();
            tc.start();
            return React.createElement(tc.render, null);
        }
    });
    return React.createElement(LoadableComponent, null);
};
//# sourceMappingURL=index.js.map
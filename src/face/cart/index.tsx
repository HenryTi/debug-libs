import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';

export const cartTab = () => {
    let LoadableComponent = Loadable({
        loader: () => import('./tab'),
        loading: Loading
    });
    return <LoadableComponent />;
}

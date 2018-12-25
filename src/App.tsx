import * as React from 'react';
import Loadable from 'react-loadable';
import './App.css';

function Loading() {
  return <div>Loading.. .. ..</div>;
}

const LoadableComponent = Loadable({
  loader: () => import('./testTabs'),
  loading: Loading,
});

export default LoadableComponent;


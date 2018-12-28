import * as React from 'react';
import './App.css';
import { Page, Tabs, NavView, nav } from 'tonva-tools';
import { faceTabs } from 'face';

class App extends React.Component {
  render() {
      let page = <Page header={false}><Tabs tabs={faceTabs} /></Page>;
      return <NavView onLogined={async () => nav.push(page)} />;
  }
}

export default App;
import * as React from 'react';
import Loadable from 'react-loadable';
import { Tabs, Page, NavView, nav, Form, TabCaptionComponent } from 'tonva-tools';

function Loading() {
    return <div>Loading.. .. ..</div>;
}

class TestTabs extends React.Component {
    private color = (selected:boolean) => selected===true? 'text-primary' : 'text-muted';
    private tabs = [
        {name: 'home', label: '首页', icon: 'home', content: ()=>import('./home')},
        {name: 'member', label: '会员', icon: 'vcard', content: ()=>import('./member')},
        {name: 'cart', label: '购物车', icon: 'shopping-cart', content: ()=>import('./cart')},
        {name: 'me', label: '我的', icon: 'user', content: ()=>import('./me')}
    ].map(v => {
        let {name, label, icon, content} = v;

        return {
            name: name,
            caption: (selected:boolean) => TabCaptionComponent(label, icon, this.color(selected)),
            content: () => {
                let LoadableComponent = Loadable({
                    loader: content,
                    loading: Loading
                });
                return <LoadableComponent />;
            }
        }
    });

    render() {
        let page = <Page header={false}><Tabs tabs={this.tabs} /></Page>;
        //let page = <div className="container h-100 d-flex"><Tabs tabs={this.tabs} /></div>;
        return <NavView onLogined={async () => nav.push(page)} />;
    }
}
//<div className="row">
//<div className="col d-flex"></div>
//</div>

export default TestTabs;
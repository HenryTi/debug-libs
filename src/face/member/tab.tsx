import * as React from 'react';
import { CApp, CUq, TuidMain } from 'tonva-react-uq';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { List } from 'tonva-react-form';
import { Loading, nav } from 'tonva-tools';

const tonvaApp = 'JKDev/jkOrder';

export class TabController {
    private cApp: CApp;
    private cUq: CUq;
    private tuidProduct: TuidMain;

    @observable private items:any[];

    async start() {
        nav.logMark();
        this.cApp = new CApp({appName: tonvaApp, uqs:{}});
        await this.cApp.load();
        nav.logStep('await this.cApp.load()');
        this.cUq = this.cApp.getCUq('JKDev/jkOrder');
        this.tuidProduct = this.cUq.tuid('product');
        let ret = await this.tuidProduct.search('', 0, 100);
        nav.logStep('let ret = await this.tuidProduct.search(-, 0, 100)');
        this.items = ret;
    }

    private renderProductRow = (row:any, index:number) => {
        let {id, discription} = row;
        return <div>{id}: {discription}</div>;
    }

    private renderContent = () => {
        let userIcon = nav.user && nav.user.icon;
        return <div>
            <img src={userIcon} /> product loaded 
            {this.items.length}
            <List items={this.items} item={{render: this.renderProductRow, key:(item)=>item.id}} />
        </div>
    }

    render = observer(() => {
        return this.items === undefined? <Loading /> : this.renderContent();
    });
}


import * as React from 'react';
import { CApp, CUsq, TuidMain } from 'tonva-react-usql';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { List } from 'tonva-react-form';
import { Loading } from 'tonva-tools';

const tonvaApp = 'JKDev/jkOrder';

export class TabController {
    private cApp: CApp;
    private cUsq: CUsq;
    private tuidProduct: TuidMain;

    @observable private items:any[];

    async start() {
        console.log('start()');
        this.cApp = new CApp(tonvaApp);
        await this.cApp.load();
        console.log('await this.cApp.load();');
        this.cUsq = this.cApp.getCUsq('JKDev/jkOrder');
        this.tuidProduct = this.cUsq.tuid('product');
        let ret = await this.tuidProduct.search('', 0, 100);
        this.items = ret;
    }

    private renderProductRow = (row:any, index:number) => {
        let {id, discription} = row;
        return <div>{id}: {discription}</div>;
    }

    private renderContent = () => {
        return <div>product loaded
            {this.items.length}
            <List items={this.items} item={{render: this.renderProductRow, key:(item)=>item.id}} />
        </div>
    }

    render = observer(() => {
        return this.items === undefined? <Loading /> : this.renderContent();
    });
}

/*
export const test = (cApp: CJkOrderApp, productList:any[]) => {
    return <div>test {} {}</div>;
}
let cApp = new CJkOrderApp(27);

cApp: async () => await cApp.load(),
loadProduct: async () => {
    return ret;
}

interface MemberTabProps {
    cApp: CJkOrderApp;
}

export default class MemberTab extends React.Component<MemberTabProps> {
    private cUsq: CUsq;
    constructor(props: MemberTabProps) {
        super(props);
        let {cApp} = props;
        this.cUsq = cApp.getCUsq('JKDev/jkOrder');
        let s = null;
    }

    render() {
        return this.props.cApp.renderMain();
    }
}

/*
class CTuidController extends Controller {
    protected cUsq: CUsq;
    protected cTuid: CTuidMain;
    constructor(cUsq: CUsq, name: string) {
        super({});
    }
    protected async internalStart() {
    }
}

class CProductList extends Controller {
    protected product: CTuidMain;

    constructor(cUsq: CUsq) {
        super({});
        this.product = product;
    }

    protected async internalStart() {
    }


}
*/



import * as React from 'react';
//import {Media, PropGrid, Prop, FA, IconText, TonvaForm, FormRow, SubmitResult, Fields} from 'tonva-react-form';
import { nav } from 'tonva-tools';
import { Media, IconText, FA, PropGrid } from 'tonva-react-form';
//import {store} from 'store';
import consts from 'consts';
//import mainApi from 'mainApi';
import { About } from './about';
import ChangePasswordPage from './changePassword';
class Me extends React.Component {
    constructor() {
        super(...arguments);
        this.about = () => nav.push(React.createElement(About, null));
        this.changePassword = () => {
            nav.push(React.createElement(ChangePasswordPage, null));
        };
    }
    exit() {
        if (confirm('退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号')) {
            nav.logout();
        }
    }
    render() {
        const { user } = nav;
        let aboutRows = [
            '',
            {
                type: 'component',
                component: React.createElement(IconText, { iconClass: "text-info", icon: "envelope", text: "\u5173\u4E8E\u540C\u82B1" }),
                onClick: this.about
            },
            '',
        ];
        let logOutRows = [
            '',
            {
                type: 'component',
                bk: '',
                component: React.createElement("button", { className: "btn btn-danger w-100", onClick: this.exit },
                    React.createElement(FA, { name: "sign-out", size: "lg" }),
                    " \u9000\u51FA\u767B\u5F55")
            },
        ];
        let rows;
        if (user === undefined) {
            rows = aboutRows;
            rows.push('');
            rows.push({
                type: 'component',
                component: React.createElement("button", { className: "btn btn-success w-100", onClick: () => nav.showLogin(true) },
                    React.createElement(FA, { name: "sign-out", size: "lg" }),
                    " \u8BF7\u767B\u5F55")
            });
        }
        else {
            rows = [
                '',
                {
                    type: 'component',
                    component: React.createElement(Media, { icon: consts.appIcon, main: user.name, discription: String(user.id) })
                },
                '',
                {
                    type: 'component',
                    component: React.createElement(IconText, { iconClass: "text-info", icon: "envelope", text: "\u4FEE\u6539\u5BC6\u7801" }),
                    onClick: this.changePassword
                },
            ];
            rows.push(...aboutRows, ...logOutRows);
        }
        return React.createElement(PropGrid, { rows: rows, values: {} });
    }
}
export default Me;
//# sourceMappingURL=tab.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
//import {Media, PropGrid, Prop, FA, IconText, TonvaForm, FormRow, SubmitResult, Fields} from 'tonva-react-form';
import { nav } from 'tonva-tools';
import { Media, IconText, FA, PropGrid } from 'tonva-react-form';
//import {store} from 'store';
import consts from 'consts';
//import mainApi from 'mainApi';
import { About } from './about';
import ChangePasswordPage from './changePassword';
var Me = /** @class */ (function (_super) {
    __extends(Me, _super);
    function Me() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.about = function () { return nav.push(React.createElement(About, null)); };
        _this.changePassword = function () {
            nav.push(React.createElement(ChangePasswordPage, null));
        };
        return _this;
    }
    Me.prototype.exit = function () {
        if (confirm('退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号')) {
            nav.logout();
        }
    };
    Me.prototype.render = function () {
        var user = nav.user;
        var aboutRows = [
            '',
            {
                type: 'component',
                component: React.createElement(IconText, { iconClass: "text-info", icon: "envelope", text: "\u5173\u4E8E\u540C\u82B1" }),
                onClick: this.about
            },
            '',
        ];
        var logOutRows = [
            '',
            {
                type: 'component',
                bk: '',
                component: React.createElement("button", { className: "btn btn-danger w-100", onClick: this.exit },
                    React.createElement(FA, { name: "sign-out", size: "lg" }),
                    " \u9000\u51FA\u767B\u5F55")
            },
        ];
        var rows;
        if (user === undefined) {
            rows = aboutRows;
            rows.push('');
            rows.push({
                type: 'component',
                component: React.createElement("button", { className: "btn btn-success w-100", onClick: function () { return nav.showLogin(undefined); } },
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
            rows.push.apply(rows, aboutRows.concat(logOutRows));
        }
        return React.createElement(PropGrid, { rows: rows, values: {} });
    };
    return Me;
}(React.Component));
export default Me;
//# sourceMappingURL=tab.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page, nav, Form } from 'tonva-tools';
import center from './center';
const schema = [
    { name: 'orgPassword', type: 'string', required: true },
    { name: 'newPassword', type: 'string', required: true },
    { name: 'newPassword1', type: 'string', required: true },
    { name: 'submit', type: 'submit' },
];
const uiSchema = {
    items: {
        orgPassword: {
            widget: 'password',
            label: '原密码',
            maxLength: 60,
            placeholder: '输入原来的密码'
        },
        newPassword: {
            widget: 'password',
            label: '新密码',
            maxLength: 60,
            placeholder: '输入新设的密码'
        },
        newPassword1: {
            widget: 'password',
            label: '确认密码',
            maxLength: 60,
            placeholder: '再次输入新设密码'
        },
        submit: {
            widget: 'button',
            className: 'btn btn-primary',
            label: '提交'
        }
    }
};
export default class ChangePasswordPage extends React.Component {
    constructor() {
        super(...arguments);
        this.onSubmit = (name, context) => __awaiter(this, void 0, void 0, function* () {
            let values = context.form.data;
            let { orgPassword, newPassword, newPassword1 } = values;
            if (newPassword !== newPassword1) {
                context.setValue('newPassword', '');
                context.setValue('newPassword1', '');
                return '新密码错误，请重新输入';
            }
            let ret = yield center.changePassword({ orgPassword: orgPassword, newPassword: newPassword });
            if (ret === false) {
                context.setValue('orgPassword', '');
                return '原密码错误';
            }
            nav.replace(React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801", back: "close" },
                React.createElement("div", { className: "m-3  text-success" }, "\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01")));
            return;
        });
    }
    render() {
        return React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801" },
            React.createElement(Form, { className: "m-3", schema: schema, uiSchema: uiSchema, requiredFlag: false, onButtonClick: this.onSubmit }));
    }
}
//# sourceMappingURL=changePassword.js.map
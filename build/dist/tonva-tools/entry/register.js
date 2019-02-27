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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { nav, Page, Form, resLang, Controller, VPage } from '../ui';
//import LoginView from './login';
import userApi from './userApi';
//import RegSuccess from './regSuccess';
import '../css/va-form.css';
import { registerRes } from './res';
import { tonvaTop, getSender } from './tools';
import { TextWidget } from '../ui/form/widgets';
import { observable } from 'mobx';
var AccountInput = /** @class */ (function (_super) {
    __extends(AccountInput, _super);
    function AccountInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buttonDisabled = true;
        _this.onClick = function () {
            var onButtonClick = _this.context.form.props.onButtonClick;
            if (onButtonClick === undefined)
                return;
            onButtonClick(_this.name, _this.context);
        };
        return _this;
    }
    AccountInput.prototype.onChange = function (evt) {
        this.buttonDisabled = (evt.target.value.trim().length === 0);
    };
    AccountInput.prototype.render = function () {
        var _this = this;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "input-group" },
                React.createElement("input", { ref: function (input) { return _this.input = input; }, className: "form-control", type: this.inputType, defaultValue: this.value, onChange: function (evt) { return _this.onChange(evt); }, placeholder: '\u624B\u673A\u53F7/\u90AE\u7BB1', readOnly: this.readOnly, disabled: this.disabled, onKeyDown: this.onKeyDown, onFocus: function (evt) { return _this.onFocus(evt); }, onBlur: function (evt) { return _this.onBlur(evt); }, maxLength: this.itemSchema.maxLength }),
                React.createElement("div", { className: "input-group-append" },
                    React.createElement("button", { className: "btn btn-sm btn-outline-primary", type: "button", disabled: this.buttonDisabled, onClick: this.onClick },
                        React.createElement("small", null, "\u53D1\u9001\u9A8C\u8BC1\u7801")))),
            this.renderErrors());
    };
    __decorate([
        observable
    ], AccountInput.prototype, "buttonDisabled", void 0);
    return AccountInput;
}(TextWidget));
var RegisterController = /** @class */ (function (_super) {
    __extends(RegisterController, _super);
    function RegisterController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accountPageCaption = '账号密码';
        _this.accountLabel = '注册账号';
        _this.accountSubmitCaption = '注册新账号';
        _this.passwordPageCaption = '账号密码';
        _this.passwordSubmitCaption = '注册新账号';
        _this.successText = '注册成功';
        return _this;
    }
    RegisterController.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openVPage(AccountPage);
                return [2 /*return*/];
            });
        });
    };
    RegisterController.prototype.toVerify = function (account) {
        this.account = account;
        this.openVPage(VerifyPage);
    };
    RegisterController.prototype.toPassword = function () {
        this.openVPage(PasswordPage);
    };
    RegisterController.prototype.toSuccess = function () {
        this.openVPage(RegSuccess);
    };
    RegisterController.prototype.login = function () {
        var _this = this;
        userApi
            .login({ user: this.account, pwd: this.password, guest: nav.guest })
            .then(function (retUser) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (retUser === undefined) {
                            alert('something wrong!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nav.logined(retUser)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RegisterController.prototype.regReturn = function (registerReturn) {
        var msg;
        switch (registerReturn) {
            default: throw 'unknown return';
            case 0:
                return;
            case 1:
                msg = '用户名 ' + this.account;
                break;
            case 2:
                msg = '手机号 +' + this.account;
                break;
            case 3:
                msg = '邮箱 ' + this.account;
                break;
        }
        return msg + ' 已经被注册过了';
    };
    RegisterController.prototype.checkAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userApi.isExists(this.account)];
                    case 1:
                        ret = _a.sent();
                        error = this.accountError(ret);
                        if (error !== undefined)
                            return [2 /*return*/, error];
                        return [4 /*yield*/, userApi.setVerify(this.account, this.type)];
                    case 2:
                        ret = _a.sent();
                        this.toVerify(this.account);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.accountError = function (isExists) {
        if (isExists > 0)
            return '已经被注册使用了';
    };
    RegisterController.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            nick: undefined,
                            user: this.account,
                            pwd: this.password,
                            country: undefined,
                            mobile: undefined,
                            email: undefined,
                            verify: this.verify
                        };
                        switch (this.type) {
                            case 'mobile':
                                params.mobile = this.account;
                                break;
                            case 'email':
                                params.email = this.account;
                                break;
                        }
                        return [4 /*yield*/, userApi.register(params)];
                    case 1:
                        ret = _a.sent();
                        if (ret === 0) {
                            nav.clear();
                            this.toSuccess();
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, this.regReturn(ret)];
                }
            });
        });
    };
    return RegisterController;
}(Controller));
export { RegisterController };
var ForgetController = /** @class */ (function (_super) {
    __extends(ForgetController, _super);
    function ForgetController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accountPageCaption = '密码找回';
        _this.accountLabel = '账号';
        _this.accountSubmitCaption = '注册新账号';
        _this.passwordPageCaption = '重置密码';
        _this.passwordSubmitCaption = '提交';
        _this.successText = '成功修改密码';
        return _this;
    }
    ForgetController.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userApi.resetPassword(this.account, this.password, this.verify, this.type)];
                    case 1:
                        ret = _a.sent();
                        nav.clear();
                        this.toSuccess();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ForgetController.prototype.accountError = function (isExists) {
        if (isExists === 0)
            return '请输入正确的账号';
    };
    return ForgetController;
}(RegisterController));
export { ForgetController };
var AccountPage = /** @class */ (function (_super) {
    __extends(AccountPage, _super);
    function AccountPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.schema = [
            { name: 'user', type: 'string', required: true, maxLength: 100 },
            //{name: 'verify', type: 'string', required: true, maxLength: 6} as StringSchema,
            //{name: 'pwd', type: 'string', required: true, maxLength: 100} as StringSchema,
            //{name: 'rePwd', type: 'string', required: true, maxLength: 100} as StringSchema,
            { name: 'verify', type: 'submit' },
        ];
        _this.res = resLang(registerRes);
        _this.page = function () {
            return React.createElement(Page, { header: _this.controller.accountPageCaption },
                React.createElement("div", { className: "w-max-20c my-5 py-5", style: { marginLeft: 'auto', marginRight: 'auto' } },
                    tonvaTop,
                    React.createElement("div", { className: "h-3c" }),
                    React.createElement(Form, { schema: _this.schema, uiSchema: _this.uiSchema, onButtonClick: _this.onSubmit, requiredFlag: false })));
        };
        _this.onSubmit = function (name, context) { return __awaiter(_this, void 0, void 0, function () {
            var user, value, sender, type, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.clearContextErrors();
                        user = 'user';
                        value = context.getValue(user);
                        sender = getSender(value);
                        if (sender === undefined) {
                            context.setError(user, '必须是手机号或邮箱');
                            return [2 /*return*/];
                        }
                        type = sender.type;
                        if (type === 'mobile') {
                            if (value.length !== 11 || value[0] !== '1') {
                                context.setError(user, '请输入正确的手机号');
                                return [2 /*return*/];
                            }
                        }
                        this.controller.account = value;
                        this.controller.type = type;
                        return [4 /*yield*/, this.controller.checkAccount()];
                    case 1:
                        ret = _a.sent();
                        if (ret !== undefined)
                            context.setError(user, ret);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AccountPage.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.uiSchema = {
                    items: {
                        user: {
                            widget: 'text',
                            label: this.controller.accountLabel,
                            placeholder: '手机号或邮箱',
                        },
                        verify: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: '发送验证码' },
                    }
                };
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return AccountPage;
}(VPage));
var VerifyPage = /** @class */ (function (_super) {
    __extends(VerifyPage, _super);
    function VerifyPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.schema = [
            { name: 'verify', type: 'number', required: true, maxLength: 6 },
            { name: 'submit', type: 'submit' },
        ];
        _this.onVerifyChanged = function (context, value, prev) {
            context.setDisabled('submit', !value || (value.length != 6));
        };
        _this.uiSchema = {
            items: {
                verify: {
                    widget: 'text',
                    label: '验证码',
                    placeholder: '请输入验证码',
                    onChanged: _this.onVerifyChanged,
                },
                submit: {
                    widget: 'button',
                    className: 'btn btn-primary btn-block mt-3',
                    label: '下一步 >',
                    disabled: true
                },
            }
        };
        _this.onSubmit = function (name, context) { return __awaiter(_this, void 0, void 0, function () {
            var verify, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verify = this.controller.verify = context.getValue('verify');
                        return [4 /*yield*/, userApi.checkVerify(this.controller.account, verify)];
                    case 1:
                        ret = _a.sent();
                        if (ret === 0) {
                            context.setError('verify', '验证码错误');
                            return [2 /*return*/];
                        }
                        this.controller.toPassword();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = function () {
            var typeText, extra;
            switch (_this.controller.type) {
                case 'mobile':
                    typeText = '手机号';
                    break;
                case 'email':
                    typeText = '邮箱';
                    extra = React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "text-danger" }, "\u6CE8\u610F"),
                        ": \u6709\u53EF\u80FD\u8BEF\u4E3A\u5783\u573E\u90AE\u4EF6\uFF0C\u8BF7\u68C0\u67E5",
                        React.createElement("br", null));
                    break;
            }
            return React.createElement(Page, { header: "\u9A8C\u8BC1\u7801" },
                React.createElement("div", { className: "w-max-20c my-5 py-5", style: { marginLeft: 'auto', marginRight: 'auto' } },
                    "\u9A8C\u8BC1\u7801\u5DF2\u7ECF\u53D1\u9001\u5230",
                    typeText,
                    React.createElement("br", null),
                    React.createElement("div", { className: "py-2 px-3 my-2 text-primary bg-light" },
                        React.createElement("b", null, _this.controller.account)),
                    extra,
                    React.createElement("div", { className: "h-1c" }),
                    React.createElement(Form, { schema: _this.schema, uiSchema: _this.uiSchema, onButtonClick: _this.onSubmit, requiredFlag: false })));
        };
        return _this;
    }
    VerifyPage.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VerifyPage;
}(VPage));
var PasswordPage = /** @class */ (function (_super) {
    __extends(PasswordPage, _super);
    function PasswordPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.schema = [
            { name: 'pwd', type: 'string', required: true, maxLength: 100 },
            { name: 'rePwd', type: 'string', required: true, maxLength: 100 },
            { name: 'submit', type: 'submit' },
        ];
        _this.onSubmit = function (name, context) { return __awaiter(_this, void 0, void 0, function () {
            var values, pwd, rePwd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = context.form.data;
                        pwd = values.pwd, rePwd = values.rePwd;
                        if (!pwd || pwd !== rePwd) {
                            context.setValue('pwd', '');
                            context.setValue('rePwd', '');
                            return [2 /*return*/, '密码错误，请重新输入密码！'];
                        }
                        this.controller.password = pwd;
                        return [4 /*yield*/, this.controller.execute()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.page = function () {
            return React.createElement(Page, { header: _this.controller.passwordPageCaption },
                React.createElement("div", { className: "w-max-20c my-5 py-5", style: { marginLeft: 'auto', marginRight: 'auto' } },
                    "\u6CE8\u518C\u8D26\u53F7",
                    React.createElement("br", null),
                    React.createElement("div", { className: "py-2 px-3 my-2 text-primary bg-light" },
                        React.createElement("b", null, _this.controller.account)),
                    React.createElement("div", { className: "h-1c" }),
                    React.createElement(Form, { schema: _this.schema, uiSchema: _this.uiSchema, onButtonClick: _this.onSubmit, requiredFlag: false })));
        };
        return _this;
    }
    PasswordPage.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.uiSchema = {
                    items: {
                        pwd: { widget: 'password', placeholder: '密码', label: '密码' },
                        rePwd: { widget: 'password', placeholder: '重复密码', label: '重复密码' },
                        submit: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: this.controller.passwordSubmitCaption },
                    }
                };
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return PasswordPage;
}(VPage));
var RegSuccess = /** @class */ (function (_super) {
    __extends(RegSuccess, _super);
    function RegSuccess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = function () {
            var _a = _this.controller, account = _a.account, successText = _a.successText;
            return (React.createElement(Page, { header: false },
                React.createElement("div", { className: "container w-max-30c" },
                    React.createElement("form", { className: "my-5" },
                        React.createElement("div", { className: "py-5" },
                            "\u8D26\u53F7 ",
                            React.createElement("strong", { className: "text-primary" },
                                account,
                                " "),
                            " ",
                            successText,
                            "\uFF01"),
                        React.createElement("button", { className: "btn btn-success btn-block", onClick: function () { return _this.controller.login(); } }, "\u76F4\u63A5\u767B\u5F55")))));
        };
        return _this;
    }
    RegSuccess.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return RegSuccess;
}(VPage));
/*
export default class Register extends React.Component {
    async onSubmit(name:string, context:Context):Promise<string> {
        let values = context.form.data;
        let {user, pwd, rePwd, country, mobile, email} = values;
        if (pwd !== rePwd) {
            context.setValue('pwd', '');
            context.setValue('rePwd', '');
            return '密码错误，请重新输入密码！';
        }
        let ret = await userApi.register({
            nick: undefined,
            user: user,
            pwd: pwd,
            country: undefined,
            mobile: undefined,
            email: undefined,
        });
        let msg:any;
        switch (ret) {
            default: throw 'unknown return';
            case 0:
                nav.clear();
                nav.show(<RegSuccess user={user} pwd={pwd} />);
                return;
            case 1:
                msg = '用户名 ' + user;
                break;
            case 2:
                msg = '手机号 +' + country + ' ' + mobile;
                break;
            case 3:
                msg = '电子邮件 ' + email;
                break;
        }
        return msg + ' 已经被注册过了';
    }
    click() {
        nav.replace(<LoginView />);
    }

    render() {
        return <Page header='账号注册'>
            <div style={{
                maxWidth:'25em',
                margin: '3em auto',
                padding: '0 3em',
            }}>
                <div className='container' style={{display:'flex', position:'relative'}}>
                    <img className='App-logo' src={logo} style={{height:'60px', position:'absolute'}}/>
                    <span style={{flex:1,
                        fontSize: 'x-large',
                        alignSelf: 'center',
                        textAlign: 'center',
                        margin: '10px',
                    }}>同花</span>
                </div>
                <div style={{height:'20px'}} />
                <Form schema={schema} uiSchema={uiSchema} onButtonClick={this.onSubmit} requiredFlag={false} />
            </div>
        </Page>;
    }
}
*/ 
//# sourceMappingURL=register.js.map
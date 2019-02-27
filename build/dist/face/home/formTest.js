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
import { observable } from 'mobx';
import { Form, Field, nav } from 'tonva-tools';
import logo from './logo.svg';
import { MinusPlusWidget } from './minusPlusWidget';
import RegSuccess from 'tonva-tools/entry/regSuccess';
var schema = [
    { name: 'id', type: 'id', required: true },
    { name: 'number', type: 'number', required: true },
    { name: 'integer', type: 'integer', min: 10, max: 30 },
    { name: 'date', type: 'date' },
    { name: 'text', type: 'string', maxLength: 5 },
    {
        name: 'arr1',
        type: 'arr',
        arr: [
            { name: 'selected', type: 'boolean' },
            { name: 'arr1-c', type: 'string' },
            { name: 'arr1-b', type: 'string' },
            { name: 'arr1-a', type: 'string' },
            { name: 'n1', type: 'integer' },
            { name: 'n2', type: 'integer' },
            { name: 'n3', type: 'integer' },
            {
                name: 'subArr',
                type: 'arr',
                arr: [
                    { name: 'sa1', type: 'string' },
                    { name: 'sa2', type: 'integer' }
                ]
            }
            //{name: 'add', type: 'button'}
        ]
    },
    { name: 'submit', type: 'submit' }
];
var formData = {
    a: 'aa', b: 'bb', c: 'ccc',
    number: 2, integer: 3,
    text: '???',
    arr1: [
        {
            $a: 1, 'arr1-b': 'arb--dddd0', 'arr1-c': 'arr1-c-cc-cc0',
            n1: 1,
            subArr: [
                { sa1: 'text1', sa2: 1 },
                { sa1: 'text2', sa2: 2 },
                { sa1: 'text3', sa2: 3 },
            ]
        },
        { $a: 1, 'arr1-b': 'arb--dddd1', 'arr1-c': 'arr1-c-cc-cc1', n1: 2 },
        { $a: 1, 'arr1-b': 'arb--dddd1', 'arr1-c': 'asd fsd farr1-c-cc-cc1', n1: 3 },
    ]
};
var replacer = function (key, value) {
    if (key === '$row')
        return;
    return value;
};
var MyApp = /** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a = 1;
        _this.arr = [{ label: 'a', v: 1 }, { label: 'b', v: 2 }];
        _this.onFormButtonClick = function (name, context) { return __awaiter(_this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                if (context.isRow === false) {
                    msg = "button " + name + " clicked!\n      form data: " + JSON.stringify(context.form.data, replacer) + "\n";
                }
                else {
                    msg = "button " + context.arrName + "." + name + " clicked!\nrow data: " + JSON.stringify(context.initData, replacer) + "\nform data: " + JSON.stringify(context.form.data, replacer) + "\n";
                }
                alert(msg);
                return [2 /*return*/, 'submit error -- hi define'];
            });
        }); };
        _this.onBChange = function (row) {
            if (row.$a === 1) {
                row.$a = 0;
            }
            else {
                row.$a = 1;
            }
        };
        _this.arrTemplet = function () {
            return React.createElement("div", { className: "form-inline" },
                React.createElement(Field, { name: "selected" }),
                React.createElement(Field, { name: "arr1-c" }),
                React.createElement(Field, { name: "n1" }),
                React.createElement(Field, { name: "n2" }),
                React.createElement(Field, { name: "n3" }));
        };
        _this.arrTemplet1 = React.createElement("div", { className: "form-inline" },
            React.createElement(Field, { name: "selected" }),
            React.createElement(Field, { name: "arr1-c" }),
            React.createElement(Field, { name: "n1" }),
            React.createElement(Field, { name: "n2" }),
            React.createElement(Field, { name: "n3" }));
        /*
        <div className="font-weight-bold">{data['n1']*data['n2']}</div>
        <Field name="arr1-a" onChanged={(value:any, prev:any) => data['arr1-b']=value} />
        {data.$a !== 1? <span style={{textDecoration:'line-through'}}>a11111</span>: <span>a00000</span>} - {data['arr1-c']} -
        <input onChange={()=>this.onBChange(data)} placeholder="BBBBB Changed" />
        {data.$a && <Field name="arr1-b" />}
        {data.$a === 1? <Field name="arr1-b" />:
        */
        _this.uiSchema = {
            rules: function (context) {
                var n = context.getValue('number');
                var i = context.getValue('integer');
                if (n === i)
                    return undefined;
                return { integer: 'number must equal intege!' };
            },
            items: {
                id: { widget: 'id', pickId: function (context, name, value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        alert('输入2');
                        return [2 /*return*/, 2];
                    }); }); } },
                text: { widget: 'textarea', rows: 7 },
                a: { widget: 'text' },
                number: {
                    widget: 'custom',
                    className: 'mx-1 text-center',
                    WidgetClass: MinusPlusWidget,
                },
                integer: {
                    className: 'mx-1',
                    rules: function (value) { if (value === 19)
                        return '不能为19';
                    else
                        return undefined; },
                },
                submit: { widget: 'button', className: 'btn btn-primary', Templet: React.createElement(React.Fragment, null,
                        React.createElement("i", { className: "fa fa-diamond" }),
                        "\u00A0 \u63D0\u4EA4") },
                arr1: {
                    widget: 'arr',
                    Templet: _this.arrTemplet1,
                    //rules: (context:Context) => {return 'err'},
                    items: {
                        "arr1-c": { className: "w-max-6c" },
                        n1: { widget: 'radio', className: 'flex-grow-1', defaultValue: 2, list: [{ value: 1, title: '小提琴' }, { value: 2, title: '钢琴' }, { value: 3, title: '单簧管' }] },
                        n2: { widget: 'select', list: [{ value: null, title: ' - ' }, { value: 1, title: '数字1' }, { value: 2 }] },
                        n3: { widget: 'range' },
                        subArr: {
                            widget: 'arr',
                            Templet: React.createElement(React.Fragment, null,
                                "TTT",
                                React.createElement(Field, { name: "sa1" }),
                                " 'text1', ",
                                React.createElement(Field, { name: "sa2" }),
                                " : 1, ddd "),
                            items: {}
                        }
                    }
                }
            },
            Templet: function () { return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "form-inline" },
                    React.createElement(Field, { name: "id" }),
                    "af sasdf as fd",
                    React.createElement("b", null, "dasdf asdf sad"),
                    React.createElement(Field, { name: "number" }),
                    "\u00A0",
                    React.createElement(Field, { name: "integer" }),
                    "\u00A0 ",
                    React.createElement("i", null, "adsfas dfasdf asd fas fda"),
                    React.createElement("div", { className: "font-weight-bold text-success h3" },
                        "nnn",
                        React.createElement(Field, { name: "date" }),
                        React.createElement("br", null)),
                    React.createElement("div", { className: "font-weight-bold text-success h3" },
                        "text",
                        React.createElement(Field, { name: "text" }))),
                React.createElement(Field, { name: 'arr1' }),
                React.createElement("div", { className: "text-center" },
                    React.createElement(Field, { name: 'submit' }))); },
        };
        _this.uiSchema1 = {
            items: {
                id: { widget: 'id', pickId: function (context, name, value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, 2];
                    }); }); } },
                a: { widget: 'text' },
                submit: { widget: 'button', className: 'btn btn-primary' },
                arr1: {
                    widget: 'arr',
                    //Templet: this.change,
                    items: {
                        n1: { widget: 'radio', list: [{ title: ' - ' }, { value: 1, title: '数字1' }, { value: 2 }] },
                        n2: { widget: 'select', list: [{ value: null, title: ' - ' }, { value: 1, title: '数字1' }, { value: 2 }] },
                        n3: { widget: 'range' },
                        subArr: {
                            widget: 'arr',
                            Templet: React.createElement(React.Fragment, null,
                                "TTT",
                                React.createElement(Field, { name: "sa1" }),
                                " 'text1', ",
                                React.createElement(Field, { name: "sa2" }),
                                " : 1, ddd "),
                            items: {}
                        }
                    }
                }
            },
            selectable: true,
            deletable: true,
            restorable: true,
        };
        _this.schema3 = [
            { name: 'a', type: 'string', maxLength: 10 },
            { name: 'b', type: 'number', max: 20, min: 10 },
            { name: 'submit', type: 'submit' },
        ];
        _this.uiSchema3 = {
            items: {
                a: { widget: 'text', label: '欢迎输入a', rules: function (value) { if (value === 'a')
                        return 'a is not valid'; } },
            }
        };
        _this.fetchClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:50976/api/Center/CreateSession', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ rsaKey: null })
                        })];
                    case 1:
                        a = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.regSuccess = function () {
            nav.push(React.createElement(RegSuccess, { user: "aa", pwd: "bb" }));
        };
        return _this;
    }
    MyApp.prototype.render = function () {
        return (React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                React.createElement("h1", { className: "App-title" }, "Welcome to React")),
            React.createElement(Form, { className: "mb-3", schema: schema, uiSchema: this.uiSchema, formData: formData, onButtonClick: this.onFormButtonClick, beforeShow: function (context) {
                    //context.setDisabled('integer', true)
                } }),
            React.createElement(Form, { schema: this.schema3, uiSchema: this.uiSchema3 }),
            React.createElement("p", { className: "App-intro" },
                "To get started, edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload.",
                React.createElement("button", { onClick: this.fetchClick }, "fetch"),
                React.createElement("button", { onClick: this.regSuccess }, "fetch")),
            React.createElement("div", { className: "App-container container text-left" },
                React.createElement(Form, { className: "mb-3", schema: schema, uiSchema: this.uiSchema1, formData: formData, onButtonClick: this.onFormButtonClick, fieldLabelSize: 2, beforeShow: function (context) {
                        context.setVisible('date', false);
                    } }))));
    };
    __decorate([
        observable
    ], MyApp.prototype, "a", void 0);
    __decorate([
        observable
    ], MyApp.prototype, "arr", void 0);
    return MyApp;
}(React.Component));
export { MyApp };
export default MyApp;
//# sourceMappingURL=formTest.js.map
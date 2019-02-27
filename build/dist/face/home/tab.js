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
var _this = this;
import * as React from 'react';
import Loadable from 'react-loadable';
import { nav, Page, Loading } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import logo from './logo.svg';
var LoadableComponent = Loadable({
    loader: function () { return import('./formTest'); },
    loading: Loading
});
var showFormClick = function () {
    nav.push(React.createElement(Page, { header: "Form Test" },
        React.createElement(LoadableComponent, null)));
};
var aContent = function () {
    var products = [
        { id: 1, discription: '水', price: 2.5 },
        { id: 2, discription: '盐', price: 30.99 },
    ];
    function renderRow(item, index) {
        var id = item.id, discription = item.discription, price = item.price;
        return React.createElement("div", { className: "px-3 py-3 d-flex flex-column" },
            React.createElement("div", null,
                id,
                " ",
                discription,
                " "),
            React.createElement("div", { className: "d-flex" },
                React.createElement("div", { className: "flex-grow-1" },
                    React.createElement("span", { className: "text-danger font-weight-bold" }, price),
                    " ",
                    React.createElement("small", null, "\u5143")),
                React.createElement("div", null,
                    React.createElement("button", { className: "btn btn-outline-danger btn-sm" }, "\u52A0\u8D2D\u7269\u8F66"))));
    }
    function onClick(item) {
        var id = item.id, discription = item.discription;
        nav.push(React.createElement(Page, { header: discription },
            React.createElement("div", null, id),
            React.createElement("div", null, discription),
            React.createElement("div", null,
                React.createElement("button", { className: "btn btn-danger btn-block" }, "\u9009\u8D2D"))));
    }
    return React.createElement("div", null,
        React.createElement("div", { className: "d-flex p-2 align-items-center" },
            React.createElement("div", { className: "mr-2", onClick: function () { return nav.push(React.createElement(Page, { header: "\u767E\u7075\u5A01\u516C\u53F8\u4ECB\u7ECD" },
                    React.createElement("div", { className: "text-center cursor-pointer" }, [1, 2, 3, 4, 5, 6].map(function (v) { return React.createElement("div", { key: v },
                        React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                        "J&K, the best"); })))); } }, "\u767E\u7075\u5A01"),
            React.createElement(SearchBox, { className: "flex-grow-1", onSearch: function (key) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); } })),
        React.createElement(List, { items: products, item: { render: renderRow, onClick: onClick } }),
        React.createElement("button", { onClick: showFormClick }, "show form"),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa a sdfasdf af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "adf sf sfa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "s dfafa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "s dfsdf afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "s sd fafa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "ad fgfa af asfd ",
        React.createElement("br", null),
        "d gdfg afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null),
        "afa af asfd ",
        React.createElement("br", null));
};
export default aContent;
//# sourceMappingURL=tab.js.map
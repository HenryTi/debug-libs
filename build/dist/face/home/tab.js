var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import Loadable from 'react-loadable';
import { nav, Page, Loading } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import logo from './logo.svg';
let LoadableComponent = Loadable({
    loader: () => import('./formTest'),
    loading: Loading
});
const showFormClick = () => {
    nav.push(React.createElement(Page, { header: "Form Test" },
        React.createElement(LoadableComponent, null)));
};
const aContent = () => {
    let products = [
        { id: 1, discription: '水', price: 2.5 },
        { id: 2, discription: '盐', price: 30.99 },
    ];
    function renderRow(item, index) {
        let { id, discription, price } = item;
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
        let { id, discription } = item;
        nav.push(React.createElement(Page, { header: discription },
            React.createElement("div", null, id),
            React.createElement("div", null, discription),
            React.createElement("div", null,
                React.createElement("button", { className: "btn btn-danger btn-block" }, "\u9009\u8D2D"))));
    }
    return React.createElement("div", null,
        React.createElement("div", { className: "d-flex p-2 align-items-center" },
            React.createElement("div", { className: "mr-2", onClick: () => nav.push(React.createElement(Page, { header: "\u767E\u7075\u5A01\u516C\u53F8\u4ECB\u7ECD" },
                    React.createElement("div", { className: "text-center cursor-pointer" }, [1, 2, 3, 4, 5, 6].map(v => React.createElement("div", { key: v },
                        React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                        "J&K, the best"))))) }, "\u767E\u7075\u5A01"),
            React.createElement(SearchBox, { className: "flex-grow-1", onSearch: (key) => __awaiter(this, void 0, void 0, function* () { return; }) })),
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
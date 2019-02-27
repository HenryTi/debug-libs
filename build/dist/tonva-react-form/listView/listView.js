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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { ListRow } from './listRow';
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this.props, header = _a.header, items = _a.items, beforeLoad = _a.beforeLoad, none = _a.none, renderRow = _a.renderRow, className = _a.className, footer = _a.footer, itemClick = _a.itemClick, converter = _a.converter;
        var cn = classNames(className, 'va-list');
        var content, elHeader;
        if (items === undefined)
            content = beforeLoad === null ? null : React.createElement("li", { className: 'empty' }, beforeLoad || '...');
        else if (items.length === 0) {
            content = (React.createElement("li", { className: 'empty' }, none || '[none]'));
        }
        else if (renderRow !== undefined) {
            content = items.map(function (item, index) { return renderRow(item, index, _this.props.ex); });
        }
        else {
            content = items.map(function (item, index) {
                var onClick = item.onClick;
                if (onClick === undefined && itemClick !== undefined)
                    onClick = function () { return itemClick(item); };
                var listItem;
                if (converter !== undefined) {
                    listItem = converter(item);
                    if (listItem === undefined)
                        return null;
                }
                else {
                    listItem = __assign({}, item);
                }
                if (listItem.key === undefined)
                    listItem.key = listItem.main;
                return React.createElement(ListRow, __assign({ onClick: onClick }, listItem));
            });
        }
        if (header !== undefined) {
            if (typeof header === 'string') {
                elHeader = React.createElement("div", { className: 'va-list-header' }, header);
            }
            else {
                elHeader = header;
            }
        }
        return (React.createElement("div", { className: cn },
            elHeader,
            React.createElement("ul", null, content),
            footer));
    };
    ListView = __decorate([
        observer
    ], ListView);
    return ListView;
}(React.Component));
export { ListView };
//# sourceMappingURL=listView.js.map
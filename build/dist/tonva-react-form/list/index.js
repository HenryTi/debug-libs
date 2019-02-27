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
import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Clickable } from './clickable';
import { Static } from './static';
import { Selectable } from './selectable';
import "../css/va-list.css";
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this._$scroll = function (direct) {
            console.log('############### items scroll to ' + direct);
        };
        var item = _this.props.item;
        var onClick = item.onClick, onSelect = item.onSelect;
        if (onSelect !== undefined)
            _this.listBase = new Selectable(_this);
        else if (onClick !== undefined)
            _this.listBase = new Clickable(_this);
        else
            _this.listBase = new Static(_this);
        return _this;
    }
    List.prototype.componentWillUpdate = function (nextProps, nextState, nextContext) {
        this.listBase.updateProps(nextProps);
    };
    Object.defineProperty(List.prototype, "selectedItems", {
        get: function () {
            return this.listBase.selectedItems;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, header = _a.header, footer = _a.footer, before = _a.before, loading = _a.loading, none = _a.none, item = _a.item, selectedItems = _a.selectedItems;
        if (before === undefined)
            before = 'before';
        if (loading === undefined)
            loading = 'loading';
        if (none === undefined)
            none = 'none';
        //this.listBase.selectedItems = selectedItems;
        var _b = this.listBase, isPaged = _b.isPaged, items = _b.items, isLoading = _b.loading;
        function staticRow(row, type) {
            if (!row)
                return;
            switch (typeof row) {
                default:
                case 'string': return React.createElement("li", { className: "va-list-" + type }, row);
                case 'function': return React.createElement("li", { className: "va-list-" + type }, row());
                case 'object': return React.createElement("li", null, row);
            }
        }
        var content;
        if (items === null)
            content = staticRow(before, 'before');
        else if (items === undefined)
            content = staticRow(loading, 'loading');
        else if (items.length === 0)
            content = staticRow(none, 'none');
        else {
            content = items.map(function (item, index) {
                return _this.listBase.render(item, index);
            });
        }
        return React.createElement("ul", { className: classNames('va-list', className) },
            staticRow(header, 'header'),
            content,
            staticRow(footer, 'footer'));
    };
    List = __decorate([
        observer
    ], List);
    return List;
}(React.Component));
export { List };
//# sourceMappingURL=index.js.map
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
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
var Tab = /** @class */ (function () {
    function Tab() {
    }
    Object.defineProperty(Tab.prototype, "content", {
        get: function () {
            if (this.selected !== true)
                return this._content;
            if (this._content !== undefined)
                return this._content;
            return this._content = this.contentBuilder();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], Tab.prototype, "selected", void 0);
    return Tab;
}());
export var TabCaptionComponent = function (label, icon, color) { return React.createElement("div", { className: 'd-flex justify-content-center align-items-center flex-column cursor-pointer ' + color },
    React.createElement("div", null,
        React.createElement("i", { className: 'fa fa-lg fa-' + icon })),
    React.createElement("small", null, label)); };
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.tabs = [];
        _this.tabClick = function (tab) {
            _this.selectedTab.selected = false;
            tab.selected = true;
            _this.selectedTab = tab;
        };
        var _b = _this.props, size = _b.size, tabs = _b.tabs, tabBack = _b.tabBack, contentBack = _b.contentBack, sep = _b.sep, selected = _b.selected;
        switch (size) {
            default:
            case 'md':
                _this.size = '3.2rem';
                break;
            case 'sm':
                _this.size = '4rem';
                break;
            case 'lg':
                _this.size = '2.5rem';
                break;
        }
        (_a = _this.tabs).push.apply(_a, tabs.map(function (v) {
            var tab = new Tab();
            tab.name = v.name;
            tab.selected = false;
            tab.caption = v.caption;
            tab.contentBuilder = v.content;
            tab.notify = v.notify;
            return tab;
        }));
        _this.tabBack = tabBack || 'bg-light';
        _this.contentBack = contentBack;
        _this.sep = sep || 'border-top border-gray';
        if (selected !== undefined) {
            _this.selectedTab = _this.tabs.find(function (v) { return v.name === selected; });
        }
        if (_this.selectedTab === undefined)
            _this.selectedTab = _this.tabs[0];
        _this.selectedTab.selected = true;
        return _this;
    }
    Tabs.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "tab" },
            React.createElement("div", { className: this.contentBack, style: { height: 'calc(100% - ' + this.size + ')' } }, this.tabs.map(function (v, index) {
                var style = {
                    display: v.selected === true ? undefined : 'none'
                };
                return React.createElement("div", { key: index, style: style }, v.content);
            })),
            React.createElement("div", { className: classNames(this.tabBack, this.sep), style: { height: this.size } }, this.tabs.map(function (v, index) {
                var selected = v.selected, caption = v.caption, notify = v.notify;
                var notifyCircle;
                if (notify !== undefined) {
                    var num = notify.get();
                    if (num !== undefined) {
                        if (num > 0)
                            notifyCircle = React.createElement("u", null, num > 99 ? '99+' : num);
                        else if (num < 0)
                            notifyCircle = React.createElement("u", { className: "dot" });
                    }
                }
                return React.createElement("div", { key: index, className: "", onClick: function () { return _this.tabClick(v); } },
                    React.createElement("div", { className: "align-self-center" },
                        notifyCircle,
                        caption(selected)));
            })));
    };
    __decorate([
        observable
    ], Tabs.prototype, "selectedTab", void 0);
    __decorate([
        observable
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        observer
    ], Tabs);
    return Tabs;
}(React.Component));
export { Tabs };
;
//# sourceMappingURL=tabs.js.map
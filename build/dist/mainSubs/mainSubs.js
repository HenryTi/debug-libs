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
import * as React from 'react';
var ViewBase = /** @class */ (function () {
    function ViewBase() {
    }
    return ViewBase;
}());
export { ViewBase };
var ViewMainSubs = /** @class */ (function (_super) {
    __extends(ViewMainSubs, _super);
    function ViewMainSubs(main, sub) {
        var _this = _super.call(this) || this;
        _this.renderSubs = function () {
            return _this.subsContainer(_this.renderSubItems());
        };
        _this.main = main;
        _this.sub = sub;
        return _this;
    }
    ViewMainSubs.prototype.subsContainer = function (subViews) {
        return React.createElement("div", null, subViews);
    };
    ViewMainSubs.prototype.renderSubItems = function () {
        var _this = this;
        var subs = this.model.subs;
        if (!subs)
            return null;
        var subViews = subs.map(function (v, index) {
            return React.createElement(_this.sub, __assign({ key: index }, v));
        });
        return subViews;
    };
    ViewMainSubs.prototype.render = function () {
        var main = this.model.main;
        return React.createElement(React.Fragment, null,
            React.createElement(this.main, __assign({}, main)),
            React.createElement(this.renderSubs, null));
    };
    return ViewMainSubs;
}(ViewBase));
export { ViewMainSubs };
var ViewListMainSubs = /** @class */ (function (_super) {
    __extends(ViewListMainSubs, _super);
    function ViewListMainSubs(row, main, sub) {
        var _this = _super.call(this) || this;
        _this.row = row;
        _this.main = main;
        _this.sub = sub;
        return _this;
    }
    ViewListMainSubs.prototype.render = function () {
        var _this = this;
        return React.createElement(React.Fragment, null, this.model.map(function (v, index) {
            var view = new _this.row(_this.main, _this.sub);
            view.model = v;
            return React.createElement(React.Fragment, { key: index }, view.render());
        }));
    };
    return ViewListMainSubs;
}(ViewBase));
export { ViewListMainSubs };
//# sourceMappingURL=mainSubs.js.map
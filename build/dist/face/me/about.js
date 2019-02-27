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
import { Page, nav } from 'tonva-tools';
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showLogs = function () {
            nav.push(React.createElement(Page, { header: "Logs" },
                React.createElement("div", null,
                    "NODE_ENV: ",
                    process.env.NODE_ENV),
                nav.logs.map(function (v, i) {
                    return React.createElement("div", { key: i, className: "px-3 py-1" }, v);
                })));
        };
        return _this;
    }
    About.prototype.render = function () {
        var right = React.createElement("button", { className: 'btn btn-success btn-sm', onClick: this.showLogs }, "log");
        return React.createElement(Page, { header: "\u5173\u4E8E\u540C\u82B1", right: right },
            React.createElement("div", { className: 'm-3' }, "\u540C\u82B1"));
    };
    return About;
}(React.Component));
export { About };
//# sourceMappingURL=about.js.map
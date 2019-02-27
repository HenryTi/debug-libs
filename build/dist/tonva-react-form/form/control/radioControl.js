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
import { Control } from './control';
var RadioControl = /** @class */ (function (_super) {
    __extends(RadioControl, _super);
    function RadioControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioControl.prototype.renderControl = function () {
        var _this = this;
        return React.createElement("div", { className: "form-control-static" },
            React.createElement("div", { className: "form-control" }, this.face.list.map(function (item, index) {
                var t, v;
                if (typeof item !== 'object')
                    t = v = item;
                else {
                    t = item.text;
                    v = item.value;
                }
                return React.createElement("label", { key: index, className: "custom-control custom-radio w-25" },
                    React.createElement("input", { type: 'radio', name: _this.field.name, className: "custom-control-input" }),
                    React.createElement("span", { className: "custom-control-indicator" }),
                    React.createElement("span", { className: "custom-control-description" }, t));
            })));
    };
    return RadioControl;
}(Control));
export { RadioControl };
//# sourceMappingURL=radioControl.js.map
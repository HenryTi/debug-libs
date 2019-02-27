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
import { Control, ControlBase } from './control';
var UnknownControl = /** @class */ (function (_super) {
    __extends(UnknownControl, _super);
    function UnknownControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnknownControl.prototype.renderControl = function () {
        return React.createElement("div", { className: "form-control-plaintext" },
            React.createElement("div", { className: "alert alert-primary", role: "alert" },
                "don't know how to create control",
                React.createElement("br", null),
                "field: ",
                JSON.stringify(this.field),
                " must be object ",
                React.createElement("br", null),
                "face: ",
                JSON.stringify(this.face),
                " must be object ",
                React.createElement("br", null)));
    };
    return UnknownControl;
}(Control));
export { UnknownControl };
var EmptyControl = /** @class */ (function (_super) {
    __extends(EmptyControl, _super);
    function EmptyControl(formView, element) {
        var _this = _super.call(this, formView) || this;
        _this.element = element;
        return _this;
    }
    EmptyControl.prototype.renderControl = function () {
        return React.createElement("div", { className: "form-control-plaintext" }, this.element);
    };
    return EmptyControl;
}(ControlBase));
export { EmptyControl };
//# sourceMappingURL=unknownControl.js.map
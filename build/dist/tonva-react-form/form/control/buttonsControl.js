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
import { ControlBase } from './control';
var ButtonsControl = /** @class */ (function (_super) {
    __extends(ButtonsControl, _super);
    function ButtonsControl(props) {
        var _this = _super.call(this, props) || this;
        _this.otherClick = _this.otherClick.bind(_this);
        return _this;
    }
    ButtonsControl.prototype.otherClick = function () {
        var onOther = this.formView.props.onOther;
        if (onOther === undefined)
            return;
        var values = this.formView.readValues();
        onOther(values);
    };
    ButtonsControl.prototype.renderControl = function () {
        console.log('buttons.renderControl');
        var nothing = this.formView.nothing;
        var hasError = this.formView.hasError;
        var props = this.formView.props;
        console.log('buttons.renderControl nothing:%s hasError:%s', nothing, hasError);
        var submitButton = props.submitButton, otherButton = props.otherButton, onOther = props.onOther;
        var btnOther;
        if (otherButton !== undefined) {
            btnOther = React.createElement("button", { className: "btn btn-outline-info ml-auto", onClick: this.otherClick }, otherButton);
        }
        return React.createElement("div", { className: "d-flex justify-content-start" },
            React.createElement("button", { className: "btn btn-primary", type: "submit", disabled: nothing || hasError }, submitButton || '提交'),
            btnOther);
    };
    return ButtonsControl;
}(ControlBase));
export { ButtonsControl };
//# sourceMappingURL=buttonsControl.js.map
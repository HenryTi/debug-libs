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
import * as _ from 'lodash';
import { Control } from './control';
var CheckControl = /** @class */ (function (_super) {
    __extends(CheckControl, _super);
    function CheckControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckControl.prototype.init = function () {
        _super.prototype.init.call(this);
        var _a = this.field, trueValue = _a.trueValue, falseValue = _a.falseValue;
        if (trueValue === undefined)
            this.trueValue = 1;
        if (falseValue === undefined)
            this.falseValue = 0;
    };
    CheckControl.prototype.setProps = function () {
        _super.prototype.setProps.call(this);
        _.assign(this.props, {
            onChange: this.onChange.bind(this),
        });
    };
    CheckControl.prototype.clearValue = function () {
        this.element.checked = this.field.defaultValue === this.trueValue;
        this.value = this.getValueFromElement();
    };
    CheckControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        if (v === undefined) {
            v = this.field.defaultValue;
        }
        if (v !== undefined) {
            //this.element.checked = v === this.trueValue;
            //this.value = this.getValueFromElement();
        }
    };
    CheckControl.prototype.getValueFromElement = function () { return this.element.checked ? this.trueValue : this.falseValue; };
    CheckControl.prototype.onChange = function () {
        this.value = this.getValueFromElement();
    };
    CheckControl.prototype.renderControl = function () {
        return React.createElement("div", { className: "form-control-static" },
            React.createElement("label", { className: "form-control" },
                React.createElement("label", { className: "custom-control custom-checkbox mb-0" },
                    React.createElement("input", { type: 'checkbox', name: this.field.name, ref: this.props.ref, onChange: this.props.onChange, className: "custom-control-input" }),
                    React.createElement("span", { className: "custom-control-indicator" }),
                    React.createElement("span", { className: "custom-control-description" }, this.face.label))));
    };
    return CheckControl;
}(Control));
export { CheckControl };
//# sourceMappingURL=checkControl.js.map
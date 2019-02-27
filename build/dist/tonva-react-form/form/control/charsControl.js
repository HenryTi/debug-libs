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
import * as classNames from 'classnames';
import * as _ from 'lodash';
import { Control } from './control';
var TxtRequired = '必须填入要求内容';
var CharsControl = /** @class */ (function (_super) {
    __extends(CharsControl, _super);
    function CharsControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharsControl.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.field.required === true) {
            this.rules.push(function (v) {
                if (v === null || v === undefined || v.trim().length === 0)
                    return TxtRequired;
                return true;
            });
        }
    };
    CharsControl.prototype.getValueFromElement = function () { return this.parseValue(this.element.value); };
    CharsControl.prototype.setProps = function () {
        _super.prototype.setProps.call(this);
        _.assign(this.props, {
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            onChange: this.onChange.bind(this),
        });
        var face = this.face;
        if (face !== undefined) {
            _.assign(this.props, {
                placeholder: face.placeholder,
            });
        }
        return this.props;
    };
    ;
    CharsControl.prototype.parseValue = function (value) { return value; };
    CharsControl.prototype.onBlur = function () {
        //console.log('field %s onBlure', this.field.name);
        this.validate();
    };
    CharsControl.prototype.onChange = function () {
        console.log('onChange');
        this.validate();
    };
    CharsControl.prototype.onFocus = function () {
        this.clearErrors();
        //this.error = undefined;
        //this.formView.clearErrors();
    };
    CharsControl.prototype.className = function () {
        return classNames({
            "form-control": true,
            "has-success": this.isOK === true,
            "is-invalid": this.error !== undefined,
            "is-valid": this.error === undefined && this.isOK === true,
        });
    };
    CharsControl.prototype.renderInput = function () {
        return React.createElement("input", __assign({ className: this.className() }, this.props));
    };
    CharsControl.prototype.ref = function (element) {
        _super.prototype.ref.call(this, element);
        if (element) {
            element.value = this.value === undefined ? '' : this.value;
        }
    };
    CharsControl.prototype.renderError = function () {
        //if (this.field.name === 'name') console.log('charsControl renderControl');
        if (this.error === undefined)
            return null;
        return React.createElement("div", { className: "invalid-feedback" }, this.error);
    };
    CharsControl.prototype.clearValue = function () { _super.prototype.clearValue.call(this); this.element.value = ''; };
    CharsControl.prototype.setError = function (fieldName, error) {
        if (this.field.name === fieldName)
            this.error = error;
    };
    CharsControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        if (v === undefined)
            return;
        //this.element.value = v;
        this.value = v;
    };
    CharsControl.prototype.renderControl = function () {
        return React.createElement(React.Fragment, null,
            this.renderInput(),
            this.renderError());
    };
    return CharsControl;
}(Control));
export { CharsControl };
//# sourceMappingURL=charsControl.js.map
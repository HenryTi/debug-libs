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
import { UpdownWidget } from "tonva-tools/ui/form/widgets";
import { observable } from 'mobx';
var keys = [107, 109, 110, 187, 189];
var MinusPlusWidget = /** @class */ (function (_super) {
    __extends(MinusPlusWidget, _super);
    function MinusPlusWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minusClick = function () {
            var v = _this.getValue();
            _this.setValue(v - 1);
        };
        _this.plusClick = function () {
            var v = _this.getValue();
            _this.setValue(v + 1);
        };
        return _this;
    }
    MinusPlusWidget.prototype.isValidKey = function (key) {
        if (keys.find(function (v) { return v === key; }) !== undefined)
            return false;
        return _super.prototype.isValidKey.call(this, key);
    };
    MinusPlusWidget.prototype.onBlur = function (evt) {
        _super.prototype.onBlur.call(this, evt);
        this.hasFocus = false;
    };
    MinusPlusWidget.prototype.onFocus = function (evt) {
        _super.prototype.onFocus.call(this, evt);
        this.hasFocus = true;
    };
    MinusPlusWidget.prototype.render = function () {
        var _this = this;
        var renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined)
            return renderTemplet;
        var cn = {
        //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        var hasFocus = this.hasFocus; // document.hasFocus() && document.activeElement === this.input;
        var hasAction = this.readOnly !== true && this.disabled !== true;
        var hasValue = this.value !== NaN && this.value !== undefined && this.value > 0;
        var minus, plus, input;
        if (hasFocus === true || hasAction === true && hasValue === true) {
            minus = React.createElement("i", { className: "fa fa-minus-circle fa-2x text-danger cursor-pointer", onClick: this.minusClick });
        }
        if (hasFocus === true || hasValue === true) {
            input = React.createElement("input", { ref: function (input) { return _this.input = input; }, className: classNames(this.className, cn, 'mx-1 w-4c form-control'), type: "text", defaultValue: this.value, onChange: this.onInputChange, placeholder: this.placeholder, readOnly: this.readOnly, disabled: this.disabled, onKeyDown: this.onKeyDown, onFocus: function (evt) { return _this.onFocus(evt); }, onBlur: function (evt) { return _this.onBlur(evt); }, maxLength: 10 });
        }
        if (hasAction === true) {
            plus = React.createElement("i", { className: "fa fa-plus-circle fa-2x text-danger cursor-pointer", onClick: this.plusClick });
        }
        return React.createElement(React.Fragment, null,
            minus,
            input,
            plus,
            this.renderErrors());
    };
    __decorate([
        observable
    ], MinusPlusWidget.prototype, "value", void 0);
    __decorate([
        observable
    ], MinusPlusWidget.prototype, "hasFocus", void 0);
    return MinusPlusWidget;
}(UpdownWidget));
export { MinusPlusWidget };
//# sourceMappingURL=minusPlusWidget.js.map
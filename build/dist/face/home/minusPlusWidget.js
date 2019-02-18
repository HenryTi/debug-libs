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
const keys = [107, 109, 110, 187, 189];
export class MinusPlusWidget extends UpdownWidget {
    constructor() {
        super(...arguments);
        this.minusClick = () => {
            let v = this.getValue();
            this.setValue(v - 1);
        };
        this.plusClick = () => {
            let v = this.getValue();
            this.setValue(v + 1);
        };
    }
    isValidKey(key) {
        if (keys.find(v => v === key) !== undefined)
            return false;
        return super.isValidKey(key);
    }
    onBlur(evt) {
        super.onBlur(evt);
        this.hasFocus = false;
    }
    onFocus(evt) {
        super.onFocus(evt);
        this.hasFocus = true;
    }
    render() {
        let renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined)
            return renderTemplet;
        let cn = {
        //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        let hasFocus = this.hasFocus; // document.hasFocus() && document.activeElement === this.input;
        let hasAction = this.readOnly !== true && this.disabled !== true;
        let hasValue = this.value !== NaN && this.value !== undefined && this.value > 0;
        let minus, plus, input;
        if (hasFocus === true || hasAction === true && hasValue === true) {
            minus = React.createElement("i", { className: "fa fa-minus-circle fa-2x text-danger cursor-pointer", onClick: this.minusClick });
        }
        if (hasFocus === true || hasValue === true) {
            input = React.createElement("input", { ref: input => this.input = input, className: classNames(this.className, cn, 'mx-1 w-4c form-control'), type: "text", defaultValue: this.value, onChange: this.onInputChange, placeholder: this.placeholder, readOnly: this.readOnly, disabled: this.disabled, onKeyDown: this.onKeyDown, onFocus: (evt) => this.onFocus(evt), onBlur: (evt) => this.onBlur(evt), maxLength: 10 });
        }
        if (hasAction === true) {
            plus = React.createElement("i", { className: "fa fa-plus-circle fa-2x text-danger cursor-pointer", onClick: this.plusClick });
        }
        return React.createElement(React.Fragment, null,
            minus,
            input,
            plus,
            this.renderErrors());
    }
}
__decorate([
    observable
], MinusPlusWidget.prototype, "value", void 0);
__decorate([
    observable
], MinusPlusWidget.prototype, "hasFocus", void 0);
//# sourceMappingURL=minusPlusWidget.js.map
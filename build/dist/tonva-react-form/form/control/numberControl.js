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
import * as _ from 'lodash';
import { CharsControl } from './charsControl';
var ErrInvalidNumber = '无效的数字';
var ErrMin = '最小值为';
var ErrMax = '最大值为';
var KeyCode_Neg = 45;
var KeyCode_Dot = 46;
var NumberControl = /** @class */ (function (_super) {
    __extends(NumberControl, _super);
    function NumberControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberControl.prototype.init = function () {
        _super.prototype.init.call(this);
        this.extraChars = [];
        var _a = this.field, min = _a.min, max = _a.max;
        if (min !== undefined) {
            this.rules.push(function (v) { if (v === undefined)
                return; if (v < min)
                return ErrMin + min; return true; });
            if (min < 0)
                this.extraChars.push(KeyCode_Neg);
        }
        else {
            this.extraChars.push(KeyCode_Neg);
        }
        if (max !== undefined) {
            this.rules.push(function (v) { if (v === undefined)
                return; if (v > max)
                return ErrMax + max; return true; });
        }
        switch (this.field.type) {
            case 'dec':
            case 'number':
                this.extraChars.push(KeyCode_Dot);
                break;
        }
    };
    NumberControl.prototype.parseValue = function (value) {
        if (value === undefined)
            return undefined;
        if (value.trim().length === 0)
            return undefined;
        var n = Number.parseFloat(value);
        if (isNaN(n))
            throw new Error(ErrInvalidNumber);
        return n;
    };
    NumberControl.prototype.setProps = function () {
        _super.prototype.setProps.call(this);
        _.assign(this.props, {
            type: 'number',
            step: this.field.step,
            onKeyPress: this.onKeyPress.bind(this),
        });
    };
    NumberControl.prototype.onKeyPress = function (event) {
        var ch = event.charCode;
        if (ch === 8 || ch === 0 || ch === 13 || ch >= 48 && ch <= 57)
            return;
        if (this.extraChars !== undefined) {
            if (this.extraChars.indexOf(ch) >= 0) {
                switch (ch) {
                    case KeyCode_Dot:
                        this.onKeyDot();
                        break;
                    case KeyCode_Neg:
                        this.onKeyNeg();
                        event.preventDefault();
                        break;
                }
                return;
            }
        }
        event.preventDefault();
    };
    NumberControl.prototype.onKeyDot = function () {
        var v = this.element.value;
        var p = v.indexOf('.');
        if (p >= 0)
            this.element.value = v.replace('.', '');
    };
    NumberControl.prototype.onKeyNeg = function () {
        var v = this.element.value;
        var p = v.indexOf('-');
        if (p >= 0)
            v = v.replace('-', '');
        else
            v = '-' + v;
        this.element.value = v;
    };
    return NumberControl;
}(CharsControl));
export { NumberControl };
//# sourceMappingURL=numberControl.js.map
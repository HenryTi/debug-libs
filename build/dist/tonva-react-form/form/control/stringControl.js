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
var StringControl = /** @class */ (function (_super) {
    __extends(StringControl, _super);
    function StringControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        _.assign(p, {
            type: 'text',
            maxLength: this.field.maxLength,
        });
        return p;
    };
    ;
    StringControl.prototype.parseValue = function (value) {
        if (value === undefined)
            return undefined;
        if (value.trim().length === 0)
            return undefined;
        return value;
    };
    return StringControl;
}(CharsControl));
export { StringControl };
var PasswordControl = /** @class */ (function (_super) {
    __extends(PasswordControl, _super);
    function PasswordControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        _.assign(p, {
            type: 'password',
            maxLength: this.field.maxLength,
        });
        return p;
    };
    ;
    return PasswordControl;
}(StringControl));
export { PasswordControl };
//# sourceMappingURL=stringControl.js.map
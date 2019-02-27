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
import * as _ from 'lodash';
import { CharsControl } from './charsControl';
var TextAreaControl = /** @class */ (function (_super) {
    __extends(TextAreaControl, _super);
    function TextAreaControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        var maxLength = this.field.maxLength;
        var rows = this.face.rows;
        _.assign(p, {
            maxLength: maxLength,
            rows: rows,
        });
        return p;
    };
    ;
    TextAreaControl.prototype.renderInput = function () {
        var _this = this;
        return React.createElement("textarea", __assign({ ref: function (t) { _this.el = t; if (t !== undefined)
                t.value = ''; }, className: this.className() }, this.props));
    };
    return TextAreaControl;
}(CharsControl));
export { TextAreaControl };
//# sourceMappingURL=textAreaControl.js.map
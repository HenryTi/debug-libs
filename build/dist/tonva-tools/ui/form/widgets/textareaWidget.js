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
import { Widget } from './widget';
var TextAreaWidget = /** @class */ (function (_super) {
    __extends(TextAreaWidget, _super);
    function TextAreaWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputChange = function (evt) {
            _this.setValue(evt.currentTarget.value);
        };
        return _this;
    }
    TextAreaWidget.prototype.setElementValue = function (value) { this.input.value = value; };
    TextAreaWidget.prototype.setReadOnly = function (value) { this.input.readOnly = this.readOnly = value; };
    TextAreaWidget.prototype.setDisabled = function (value) { this.input.disabled = this.disabled = value; };
    TextAreaWidget.prototype.render = function () {
        var _this = this;
        return React.createElement("textarea", { ref: function (input) { return _this.input = input; }, rows: this.ui && this.ui.rows, maxLength: this.itemSchema.maxLength, defaultValue: this.defaultValue, onChange: this.onInputChange });
    };
    return TextAreaWidget;
}(Widget));
export { TextAreaWidget };
//# sourceMappingURL=textareaWidget.js.map
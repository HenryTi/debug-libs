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
import { observer } from 'mobx-react';
import { FormView } from './formView';
export function tonvaDebug() {
    var a = 0;
}
var TonvaForm = /** @class */ (function (_super) {
    __extends(TonvaForm, _super);
    function TonvaForm(props) {
        var _this = _super.call(this, props) || this;
        _this.formView = new FormView(_this.props);
        return _this;
    }
    TonvaForm.prototype.componentWillMount = function () {
        this.formView.setInitValues(this.props.initValues);
    };
    TonvaForm.prototype.debug = function () {
        var s = null;
    };
    TonvaForm.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, initValues = _a.initValues;
        return React.createElement("div", { className: className }, children === undefined ?
            this.formView.render() :
            React.createElement("form", { onSubmit: this.formView.onSubmit }, children));
    };
    TonvaForm = __decorate([
        observer
    ], TonvaForm);
    return TonvaForm;
}(React.Component));
export { TonvaForm };
//# sourceMappingURL=TonvaForm.js.map
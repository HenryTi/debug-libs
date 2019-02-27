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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observable } from 'mobx';
import { Control } from './control';
var PickTuidControl = /** @class */ (function (_super) {
    __extends(PickTuidControl, _super);
    function PickTuidControl(formView, field, face) {
        var _this = _super.call(this, formView, field, face) || this;
        _this.onIdChanged = _this.onIdChanged.bind(_this);
        return _this;
        //this.onClick = this.onClick.bind(this);
    }
    /*
    private async onClick() {
        let {pick, fromPicked} = this.face;
        let item = await pick(this.face, this.formView.props, this.formView.readValues());
        if (item === undefined) {
            this.value = undefined;
            return;
        }
        if (fromPicked === undefined) {
            this.value = item.id;
            return;
        }
        let {id, caption} = fromPicked(item);
        this.value = id;
        this.caption = caption;
    }*/
    PickTuidControl.prototype.onIdChanged = function (id) {
        this.value = id.id;
    };
    PickTuidControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        this.value = v;
    };
    PickTuidControl.prototype.buildContent = function () {
        var _this = this;
        //let {tuid, input} = this.face;
        return React.createElement(this.face.input.component, __assign({}, this.face, { id: this.value, 
            //ui={this.face.ui}
            //input={input}
            //entitiesUI={this.formView.props.context} 
            onFormValues: function () { return _this.formView.readValues(); }, onIdChanged: this.onIdChanged }));
    };
    PickTuidControl.prototype.renderControl = function () {
        return React.createElement("div", { className: "form-control-static " }, this.buildContent());
    };
    __decorate([
        observable
    ], PickTuidControl.prototype, "caption", void 0);
    return PickTuidControl;
}(Control));
export { PickTuidControl };
/*
<button className="form-control btn btn-outline-info"
type="button"
style={{textAlign:'left', paddingLeft:'0.75rem'}}
onClick={this.onClick}>
{this.buildContent()}
</button>
*/ 
//# sourceMappingURL=pickTuidControl.js.map
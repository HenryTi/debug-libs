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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { observable } from 'mobx';
import { Control } from './control';
var PickIdControl = /** @class */ (function (_super) {
    __extends(PickIdControl, _super);
    function PickIdControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, pick, fromPicked, item, _b, id, caption;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.face, pick = _a.pick, fromPicked = _a.fromPicked;
                        return [4 /*yield*/, pick(this.face, this.formView.props, this.formView.readValues())];
                    case 1:
                        item = _c.sent();
                        if (item === undefined) {
                            this.value = undefined;
                            return [2 /*return*/];
                        }
                        if (fromPicked === undefined) {
                            this.value = item.id;
                            return [2 /*return*/];
                        }
                        _b = fromPicked(item), id = _b.id, caption = _b.caption;
                        this.value = id;
                        this.caption = caption;
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onPicked = function (value) {
            _this.value = value.id;
        };
        return _this;
    }
    PickIdControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        this.value = v;
    };
    PickIdControl.prototype.controlContent = function () {
        var _a = this.face, itemFromId = _a.itemFromId, fromPicked = _a.fromPicked, initCaption = _a.initCaption;
        if (this.value === undefined) {
            return initCaption || '请选择Id';
        }
        if (this.caption !== undefined) {
            return this.caption;
        }
        if (itemFromId !== undefined) {
            if (fromPicked !== undefined) {
                var item = itemFromId(this.value);
                if (item) {
                    var ret = fromPicked(item);
                    if (ret !== undefined)
                        return ret.caption;
                }
            }
        }
        return String(this.value);
    };
    /*
    private buildContent():string|JSX.Element {
        let {tuid, input} = this.face;
        if (input === undefined) {
            //return <div>no input on idpick</div>;
            return <div onClick={this.onClick}>{this.controlContent()}</div>;
        }
        return <input.component id={this.value}
            tuid={tuid}
            input={input}
            entitiesUI={this.formView.props.context}
            params={this.formView.readValues()}
            onPicked={this.onPicked} />;
    }*/
    PickIdControl.prototype.renderControl = function () {
        var _a = this.face, tuid = _a.tuid, input = _a.input;
        if (input === undefined) {
            //return <div>no input on idpick</div>;
            return React.createElement("div", { className: "form-control-plaintext px-2 border text-primary rounded cursor-pointer", onClick: this.onClick }, this.controlContent());
        }
        return React.createElement("div", { className: "form-control-static " },
            React.createElement(input.component, { id: this.value, ui: tuid }));
    };
    __decorate([
        observable
    ], PickIdControl.prototype, "caption", void 0);
    return PickIdControl;
}(Control));
export { PickIdControl };
//# sourceMappingURL=pickIdControl.js.map
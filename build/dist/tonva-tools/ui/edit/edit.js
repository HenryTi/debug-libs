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
import { observer } from 'mobx-react';
import { StringItemEdit } from './stringItemEdit';
import { ImageItemEdit } from './imageItemEdit';
import { Image } from '../image';
var Edit = /** @class */ (function (_super) {
    __extends(Edit, _super);
    function Edit(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultSepClassName = "border-top edit-sep-light-gray";
        _this.defaultRowContainerClassName = "px-3 py-2 cursor-pointer bg-white";
        _this.rowClick = function (itemSchema, uiItem, label, value) { return __awaiter(_this, void 0, void 0, function () {
            var _a, onItemChanged, onItemClick, changeValue, itemEdit, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onItemChanged = _a.onItemChanged, onItemClick = _a.onItemClick;
                        if (!(onItemClick !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, onItemClick(itemSchema, uiItem, value)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2:
                        itemEdit = createItemEdit(itemSchema, uiItem, label, value);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, , 10]);
                        return [4 /*yield*/, itemEdit.start()];
                    case 4:
                        changeValue = _b.sent();
                        if (!(changeValue != value)) return [3 /*break*/, 7];
                        if (!(onItemChanged === undefined)) return [3 /*break*/, 5];
                        alert(itemSchema.name + " value changed, new: " + changeValue + ", pre: " + value);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, onItemChanged(itemSchema, changeValue, value)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, itemEdit.end()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_1 = _b.sent();
                        console.log('no value changed');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        var topBorderClassName = props.topBorderClassName, bottomBorderClassName = props.bottomBorderClassName, sepClassName = props.sepClassName, rowContainerClassName = props.rowContainerClassName, uiSchema = props.uiSchema;
        _this.topBorder = React.createElement("div", { className: topBorderClassName || _this.defaultSepClassName });
        _this.bottomBorder = React.createElement("div", { className: bottomBorderClassName || _this.defaultSepClassName });
        _this.rowContainerClassName = rowContainerClassName || _this.defaultRowContainerClassName;
        _this.sep = React.createElement("div", { className: sepClassName || _this.defaultSepClassName });
        _this.uiSchema = (uiSchema && uiSchema.items) || {};
        return _this;
    }
    Edit.prototype.render = function () {
        var elItems = [];
        var schema = this.props.schema;
        var len = schema.length;
        elItems.push(this.topBorder);
        for (var i = 0; i < len; i++) {
            if (i > 0)
                elItems.push(this.sep);
            elItems.push(this.renderRow(schema[i]));
        }
        elItems.push(this.bottomBorder);
        return React.createElement("div", null, elItems.map(function (v, index) { return React.createElement(React.Fragment, { key: index }, v); }));
    };
    Edit.prototype.renderRow = function (itemSchema) {
        var _this = this;
        var name = itemSchema.name, type = itemSchema.type;
        var divValue;
        var uiItem = this.uiSchema[name];
        var label = (uiItem && uiItem.label) || name;
        var value = this.props.data[name];
        switch (type) {
            default:
                divValue = React.createElement("b", null, value);
                break;
            case 'image':
                divValue = React.createElement(Image, { className: "w-4c h-4c", src: value });
                break;
        }
        return React.createElement("div", { className: this.rowContainerClassName, onClick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rowClick(itemSchema, uiItem, label, value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); } },
            React.createElement("div", { className: "row align-items-center" },
                React.createElement("div", { className: "col-sm-2" }, label),
                React.createElement("div", { className: "col-sm-9 text-right" }, divValue),
                React.createElement("div", { className: "col-sm-1 text-right" },
                    React.createElement("i", { className: "fa fa-chevron-right" }))));
    };
    Edit = __decorate([
        observer
    ], Edit);
    return Edit;
}(React.Component));
export { Edit };
function createItemEdit(itemSchema, uiItem, label, value) {
    var itemEdit;
    if (uiItem !== undefined) {
        switch (uiItem.widget) {
            case 'text':
                itemEdit = StringItemEdit;
                break;
            case 'image':
                itemEdit = ImageItemEdit;
                break;
        }
    }
    else {
        switch (itemSchema.type) {
            case 'string':
                itemEdit = StringItemEdit;
                break;
            case 'image':
                itemEdit = ImageItemEdit;
                break;
        }
    }
    if (itemEdit === undefined)
        return;
    return new itemEdit(itemSchema, uiItem, label, value);
}
//# sourceMappingURL=edit.js.map
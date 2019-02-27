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
import { computed } from 'mobx';
import { uid } from '../uid';
import { ButtonsControl } from './control';
import { bootstrapCreateRow, elementCreateRow } from './rowContainer';
var FormView = /** @class */ (function () {
    function FormView(props) {
        this.rows = [];
        this.uid = uid();
        this.props = props;
        this.buildRows(props);
        this.createControl = props.createControl;
        this.onSubmit = this.onSubmit.bind(this);
    }
    Object.defineProperty(FormView.prototype, "hasError", {
        get: function () {
            var ret = this.rows.map(function (v, index) { return index + ': ' + v.hasError + '\n'; });
            console.log(ret);
            return this.rows.some(function (row) { return row.hasError; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormView.prototype, "nothing", {
        get: function () {
            var ret = this.rows.every(function (row) { return !row.filled; });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    FormView.prototype.readValues = function () {
        var values = {};
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.readValues(values);
        }
        return values;
    };
    FormView.prototype.clear = function () {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.clear();
        }
    };
    FormView.prototype.clearErrors = function () {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.clearErrors();
        }
    };
    FormView.prototype.setError = function (fieldName, error) {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.setError(fieldName, error);
        }
    };
    FormView.prototype.setInitValues = function (initValues) {
        if (initValues === undefined)
            return;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.setInitValues(initValues);
        }
    };
    FormView.prototype.buildRows = function (props) {
        var formRows = props.formRows, createRow = props.createRow;
        if (formRows !== undefined) {
            for (var _i = 0, formRows_1 = formRows; _i < formRows_1.length; _i++) {
                var row = formRows_1[_i];
                this.rows.push(this.buildRow(row, createRow));
            }
            if (this.props.readOnly !== true) {
                this.buttonsRow = this.buildRow({ createControl: this.createButtons.bind(this) }, undefined);
            }
        }
        else {
            this.rows.push(elementCreateRow(this, React.createElement("div", { className: "text-warning" }, "TonvaForm need formRows defined")));
        }
    };
    FormView.prototype.buildRow = function (formRow, formRowCreator) {
        var createRow;
        var type = formRow.type;
        if (type !== undefined) {
            createRow = elementCreateRow;
        }
        else {
            createRow = formRow.createRow;
            if (createRow === undefined) {
                createRow = formRowCreator;
                if (createRow === undefined)
                    createRow = bootstrapCreateRow;
            }
        }
        var row = createRow(this, formRow);
        return row;
    };
    FormView.prototype.createButtons = function (form, row) {
        return new ButtonsControl(form);
    };
    FormView.prototype.isOk = function () {
        var isOk = true;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (!row.isOk())
                isOk = false;
        }
        return isOk;
    };
    FormView.prototype.render = function () {
        var _this = this;
        return React.createElement("form", { onSubmit: this.onSubmit },
            this.rows.map(function (row, index) { return row.render(_this.uid + index); }),
            this.buttons());
    };
    FormView.prototype.buttons = function () {
        if (this.buttonsRow === undefined)
            return;
        return this.buttonsRow.render(this.uid + this.rows.length);
    };
    FormView.prototype.onSubmit = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        if (!this.isOk())
                            return [2 /*return*/];
                        values = this.readValues();
                        return [4 /*yield*/, this.props.onSubmit(values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        computed
    ], FormView.prototype, "hasError", null);
    __decorate([
        computed
    ], FormView.prototype, "nothing", null);
    return FormView;
}());
export { FormView };
//# sourceMappingURL=formView.js.map
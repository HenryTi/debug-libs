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
import { Entity } from './entity';
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = {};
        _this.queries = {};
        return _this;
    }
    Object.defineProperty(Map.prototype, "typeName", {
        get: function () { return 'map'; },
        enumerable: true,
        configurable: true
    });
    Map.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        this.schemaFrom = this.schema.from;
        var actions = schema.actions, queries = schema.queries, keys = schema.keys;
        this.entities.buildFieldTuid(this.keys = keys);
        //let t = this.schemaStringify();
        for (var i in actions) {
            var schema_1 = actions[i];
            var name_1 = schema_1.name;
            var action = this.entities.newAction(name_1, undefined);
            action.setSchema(schema_1);
            this.actions[i] = action;
        }
        for (var i in queries) {
            var schema_2 = queries[i];
            var name_2 = schema_2.name;
            var query = this.entities.newQuery(name_2, undefined);
            query.setSchema(schema_2);
            this.queries[i] = query;
        }
    };
    Map.prototype.add = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actions.add.submit(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.del = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actions.del.submit(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.all.query({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.page = function (param, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.page.page(param, pageStart, pageSize)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.query = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.query.query(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.table = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query(params)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret) {
                            return [2 /*return*/, ret[i]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Map.prototype.obj = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table(params)];
                    case 1:
                        ret = _a.sent();
                        if (ret.length > 0)
                            return [2 /*return*/, ret[0]];
                        return [2 /*return*/];
                }
            });
        });
    };
    Map.prototype.scalar = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obj(params)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret)
                            return [2 /*return*/, ret[i]];
                        return [2 /*return*/];
                }
            });
        });
    };
    return Map;
}(Entity));
export { Map };
//# sourceMappingURL=map.js.map
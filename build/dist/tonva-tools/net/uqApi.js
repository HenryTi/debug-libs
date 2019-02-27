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
import _ from 'lodash';
import { HttpChannel } from './httpChannel';
import { HttpChannelNavUI } from './httpChannelUI';
import { appUq } from './appBridge';
import { ApiBase } from './apiBase';
import { host } from './host';
var channelUIs = {};
var channelNoUIs = {};
export function logoutApis() {
    channelUIs = {};
    channelNoUIs = {};
    logoutUnitxApis();
}
var uqLocalEntities = 'uqLocalEntities';
var CacheUqLocals = /** @class */ (function () {
    function CacheUqLocals() {
    }
    CacheUqLocals.prototype.loadAccess = function (uqApi) {
        return __awaiter(this, void 0, void 0, function () {
            var uqOwner, uqName, ls, _a, user, uqs, i, ul, ret, un, uq, value, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        uqOwner = uqApi.uqOwner, uqName = uqApi.uqName;
                        if (this.local === undefined) {
                            ls = localStorage.getItem(uqLocalEntities);
                            if (ls !== null) {
                                this.local = JSON.parse(ls);
                            }
                        }
                        if (this.local !== undefined) {
                            _a = this.local, user = _a.user, uqs = _a.uqs;
                            if (user !== loginedUserId || uqs === undefined) {
                                this.local = undefined;
                            }
                            else {
                                for (i in uqs) {
                                    ul = uqs[i];
                                    ul.isNet = undefined;
                                }
                            }
                        }
                        if (this.local === undefined) {
                            this.local = {
                                user: loginedUserId,
                                unit: undefined,
                                uqs: {}
                            };
                        }
                        ret = void 0;
                        un = uqOwner + '/' + uqName;
                        uq = this.local.uqs[un];
                        if (uq !== undefined) {
                            value = uq.value;
                            ret = value;
                        }
                        if (!(ret === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, uqApi.__loadAccess()];
                    case 1:
                        ret = _b.sent();
                        this.saveLocal(un, ret);
                        _b.label = 2;
                    case 2: return [2 /*return*/, _.cloneDeep(ret)];
                    case 3:
                        err_1 = _b.sent();
                        this.local = undefined;
                        localStorage.removeItem(uqLocalEntities);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheUqLocals.prototype.saveLocal = function (uqName, accessValue) {
        this.local.uqs[uqName] = {
            value: accessValue,
            isNet: true,
        };
        var str = JSON.stringify(this.local);
        localStorage.setItem(uqLocalEntities, str);
    };
    CacheUqLocals.prototype.checkAccess = function (uqApi) {
        return __awaiter(this, void 0, void 0, function () {
            var uqOwner, uqName, un, uq, isNet, value, ret, isMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uqOwner = uqApi.uqOwner, uqName = uqApi.uqName;
                        un = uqOwner + '/' + uqName;
                        uq = this.local.uqs[un];
                        if (uq === undefined)
                            return [2 /*return*/, false];
                        isNet = uq.isNet, value = uq.value;
                        if (isNet === true)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, uqApi.__loadAccess()];
                    case 1:
                        ret = _a.sent();
                        isMatch = _.isMatch(value, ret);
                        if (isMatch === false) {
                            this.saveLocal(un, ret);
                        }
                        return [2 /*return*/, isMatch];
                }
            });
        });
    };
    return CacheUqLocals;
}());
var localUqs = new CacheUqLocals;
var UqApi = /** @class */ (function (_super) {
    __extends(UqApi, _super);
    function UqApi(basePath, uqOwner, uqName, access, showWaiting) {
        var _this = _super.call(this, basePath, showWaiting) || this;
        if (uqName) {
            _this.uqOwner = uqOwner;
            _this.uqName = uqName;
            _this.uq = uqOwner + '/' + uqName;
        }
        _this.access = access;
        _this.showWaiting = showWaiting;
        return _this;
    }
    UqApi.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channels, channelUI, channel, uqToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.showWaiting === true || this.showWaiting === undefined) {
                            channels = channelUIs;
                            channelUI = new HttpChannelNavUI();
                        }
                        else {
                            channels = channelNoUIs;
                        }
                        channel = channels[this.uq];
                        if (channel !== undefined)
                            return [2 /*return*/, channel];
                        return [4 /*yield*/, appUq(this.uq, this.uqOwner, this.uqName)];
                    case 1:
                        uqToken = _a.sent();
                        this.token = uqToken.token;
                        channel = new HttpChannel(false, uqToken.url, uqToken.token, channelUI);
                        return [2 /*return*/, channels[this.uq] = channel];
                }
            });
        });
    };
    UqApi.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('update')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.__loadAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var acc, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        acc = this.access === undefined ?
                            '' :
                            this.access.join('|');
                        return [4 /*yield*/, this.get('access', { acc: acc })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqApi.prototype.loadAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localUqs.loadAccess(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.loadEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('entities')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.checkAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localUqs.checkAccess(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.schema = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('schema/' + name)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.schemas = function (names) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('schema', names)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidGet = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid/' + name + '/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidGetAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-all/' + name + '/')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidSave = function (name, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid/' + name, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidSearch = function (name, arr, owner, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuids/' + name, {
                            arr: arr,
                            owner: owner,
                            key: key,
                            pageStart: pageStart,
                            pageSize: pageSize
                        })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqApi.prototype.tuidArrGet = function (name, arr, owner, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-arr/' + name + '/' + owner + '/' + arr + '/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidArrGetAll = function (name, arr, owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-arr-all/' + name + '/' + owner + '/' + arr + '/')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidArrSave = function (name, arr, owner, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid-arr/' + name + '/' + owner + '/' + arr + '/', params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidArrPos = function (name, arr, owner, id, order) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid-arr-pos/' + name + '/' + owner + '/' + arr + '/', {
                            id: id,
                            $order: order
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.tuidIds = function (name, arr, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var url, ret, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = 'tuidids/' + name + '/';
                        if (arr !== undefined)
                            url += arr;
                        else
                            url += '$';
                        return [4 /*yield*/, this.post(url, ids)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UqApi.prototype.proxied = function (name, proxy, id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, ret, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = 'tuid-proxy/' + name + '/' + proxy + '/' + id;
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UqApi.prototype.sheetSave = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.sheetAction = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put('sheet/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.stateSheets = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name + '/states', data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.stateSheetCount = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/statecount')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.getSheet = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/get/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.sheetArchives = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name + '/archives', data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.sheetArchive = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/archive/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.action = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('action/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.page = function (name, pageStart, pageSize, params) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        switch (typeof params) {
                            case 'undefined':
                                p = { key: '' };
                                break;
                            default:
                                p = _.clone(params);
                                break;
                        }
                        p['$pageStart'] = pageStart;
                        p['$pageSize'] = pageSize;
                        return [4 /*yield*/, this.post('query-page/' + name, p)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.query = function (name, params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('query/' + name, params)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /*
        async history(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    
        async book(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    */
    UqApi.prototype.user = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('user')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UqApi;
}(ApiBase));
export { UqApi };
var channels = {};
export function logoutUnitxApis() {
    channels = {};
}
var UnitxApi = /** @class */ (function (_super) {
    __extends(UnitxApi, _super);
    function UnitxApi(unitId) {
        var _this = _super.call(this, 'tv/', undefined, undefined, undefined, true) || this;
        _this.unitId = unitId;
        return _this;
    }
    UnitxApi.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        channel = channels[this.unitId];
                        if (channel !== undefined)
                            return [2 /*return*/, channel];
                        _a = channels;
                        _b = this.unitId;
                        return [4 /*yield*/, this.buildChannel()];
                    case 1: return [2 /*return*/, _a[_b] = _c.sent()];
                }
            });
        });
    };
    UnitxApi.prototype.buildChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channelUI, centerAppApi, ret, token, url, urlDebug, realUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelUI = new HttpChannelNavUI();
                        centerAppApi = new CenterAppApi('tv/', undefined);
                        return [4 /*yield*/, centerAppApi.unitxUq(this.unitId)];
                    case 1:
                        ret = _a.sent();
                        token = ret.token, url = ret.url, urlDebug = ret.urlDebug;
                        realUrl = host.getUrlOrDebug(url, urlDebug);
                        this.token = token;
                        return [2 /*return*/, new HttpChannel(false, realUrl, token, channelUI)];
                }
            });
        });
    };
    return UnitxApi;
}(UqApi));
export { UnitxApi };
var centerHost;
export function setCenterUrl(url) {
    console.log('setCenterUrl %s', url);
    centerHost = url;
    centerToken = undefined;
    centerChannel = undefined;
    centerChannelUI = undefined;
}
export var centerToken = undefined;
var loginedUserId = 0;
export function setCenterToken(userId, t) {
    centerToken = t;
    console.log('setCenterToken %s', t);
    centerChannel = undefined;
    centerChannelUI = undefined;
}
var centerChannelUI;
var centerChannel;
function getCenterChannelUI() {
    if (centerChannelUI !== undefined)
        return centerChannelUI;
    return centerChannelUI = new HttpChannel(true, centerHost, centerToken, new HttpChannelNavUI());
}
function getCenterChannel() {
    if (centerChannel !== undefined)
        return centerChannel;
    return centerChannel = new HttpChannel(true, centerHost, centerToken);
}
var CenterApi = /** @class */ (function (_super) {
    __extends(CenterApi, _super);
    function CenterApi(path, showWaiting) {
        return _super.call(this, path, showWaiting) || this;
    }
    CenterApi.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.showWaiting === true || this.showWaiting === undefined) ?
                        getCenterChannelUI() :
                        getCenterChannel()];
            });
        });
    };
    return CenterApi;
}(ApiBase));
export { CenterApi };
var uqTokens = 'uqTokens';
var UqTokenApi = /** @class */ (function (_super) {
    __extends(UqTokenApi, _super);
    function UqTokenApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UqTokenApi.prototype.uq = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var unitParam, uqOwner, uqName, ls, _a, unit, user, un, nowTick, uq, tick, value, ret, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        unitParam = params.unit, uqOwner = params.uqOwner, uqName = params.uqName;
                        if (this.local === undefined) {
                            ls = localStorage.getItem(uqTokens);
                            if (ls !== null) {
                                this.local = JSON.parse(ls);
                            }
                        }
                        if (this.local !== undefined) {
                            _a = this.local, unit = _a.unit, user = _a.user;
                            if (unit !== unitParam || user !== loginedUserId)
                                this.local = undefined;
                        }
                        if (this.local === undefined) {
                            this.local = {
                                user: loginedUserId,
                                unit: params.unit,
                                uqs: {}
                            };
                        }
                        un = uqOwner + '/' + uqName;
                        nowTick = new Date().getTime();
                        uq = this.local.uqs[un];
                        if (uq !== undefined) {
                            tick = uq.tick, value = uq.value;
                            if ((nowTick - tick) < 24 * 3600 * 1000) {
                                return [2 /*return*/, value];
                            }
                        }
                        return [4 /*yield*/, this.get('app-uq', params)];
                    case 1:
                        ret = _b.sent();
                        this.local.uqs[un] = {
                            tick: nowTick,
                            value: ret,
                        };
                        localStorage.setItem(uqTokens, JSON.stringify(this.local));
                        return [2 /*return*/, ret];
                    case 2:
                        err_2 = _b.sent();
                        this.local = undefined;
                        localStorage.removeItem(uqTokens);
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UqTokenApi;
}(CenterApi));
export { UqTokenApi };
export var uqTokenApi = new UqTokenApi('tv/tie/', undefined);
var CallCenterApi = /** @class */ (function (_super) {
    __extends(CallCenterApi, _super);
    function CallCenterApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCenterApi.prototype.directCall = function (url, method, body) {
        return this.call(url, method, body);
    };
    return CallCenterApi;
}(CenterApi));
export { CallCenterApi };
export var callCenterapi = new CallCenterApi('', undefined);
var CenterAppApi = /** @class */ (function (_super) {
    __extends(CenterAppApi, _super);
    function CenterAppApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CenterAppApi.prototype.uqs = function (unit, appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, ls, rLs, rUnit, rAppOwner, rAppName, value, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ls = localStorage.getItem('appUqs');
                        if (ls !== null) {
                            rLs = JSON.parse(ls);
                            rUnit = rLs.unit, rAppOwner = rLs.appOwner, rAppName = rLs.appName, value = rLs.value;
                            if (unit === rUnit && appOwner === rAppOwner && appName === rAppName)
                                ret = value;
                        }
                        if (!(ret === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.uqsPure(unit, appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        obj = {
                            unit: unit,
                            appOwner: appOwner,
                            appName: appName,
                            value: ret,
                        };
                        localStorage.setItem('appUqs', JSON.stringify(obj));
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.cachedUqs = _.cloneDeep(ret)];
                }
            });
        });
    };
    CenterAppApi.prototype.uqsPure = function (unit, appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/app-uqs', { unit: unit, appOwner: appOwner, appName: appName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CenterAppApi.prototype.checkUqs = function (unit, appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqsPure(unit, appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, _.isMatch(this.cachedUqs, ret)];
                }
            });
        });
    };
    CenterAppApi.prototype.unitxUq = function (unit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/unitx-uq', { unit: unit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CenterAppApi;
}(CenterApi));
export { CenterAppApi };
//# sourceMappingURL=uqApi.js.map
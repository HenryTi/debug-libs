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
import { observer } from 'mobx-react';
import './App.css';
import { Page, Tabs, NavView, nav, Image, ResUploader } from 'tonva-tools';
import { faceTabs } from 'face';
import { ViewMainSubs, ViewListMainSubs, renderMainProduct, renderSubPack } from 'mainSubs';
/*
@observer
class ResUploader extends React.Component {
    private fileInput: HTMLInputElement;
    @observable private resSrc: string;

    private upload = async () => {
        let urlPath = host.getUrlOrDebug('http://101.200.46.56/res/', 'http://uqhost/res/');

        var files:FileList = this.fileInput.files;
        var data = new FormData();
        let len = files.length;
        for (let i=0; i<len; i++) {
            let file = files[i];
            data.append('files[]', file, file.name);
        }
  
        let url = urlPath + 'upload';
        try {
            let abortController = new AbortController();
            let res = await fetch(url, {
                method: "POST",
                body: data,
                signal: abortController.signal,
            });
            let json = await res.json();
            //alert (JSON.stringify(json));
            this.resSrc = ':' + json.res.id;
            //nav.push(<CompileResult {...this.props} res={res} abortController={abortController} />);
        }
        catch (e) {
            console.error('%s %s', url, e);
        }
    }
    private onSubmit = (evt:React.FormEvent<any>) => {
        evt.preventDefault();
    }
    render() {
        //return <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        return <div>
            <input ref={t=>this.fileInput=t}
                type='file' name='file' multiple={false} />
            <input type='button' name='submit' value='upload' onClick={this.upload} />
            <br/>
            <Image src={this.resSrc} />
        </div>
    }
}
*/
var Uploader = /** @class */ (function (_super) {
    __extends(Uploader, _super);
    function Uploader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.upload = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.resUploader)
                            return [2 /*return*/];
                        _a = this;
                        return [4 /*yield*/, this.resUploader.upload()];
                    case 1:
                        _a.resId = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Uploader.prototype.render = function () {
        var _this = this;
        //return <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        return React.createElement("div", null,
            React.createElement(ResUploader, { ref: function (v) { return _this.resUploader = v; } }),
            React.createElement("input", { type: 'button', name: 'submit', value: 'upload', onClick: this.upload }),
            React.createElement("br", null),
            React.createElement(Image, { src: this.resId }));
    };
    __decorate([
        observable
    ], Uploader.prototype, "resId", void 0);
    Uploader = __decorate([
        observer
    ], Uploader);
    return Uploader;
}(React.Component));
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.loadA = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('A.loadA()');
                return [2 /*return*/];
            });
        });
    };
    A.prototype.load = function () {
        return new Promise(function (resolve, reject) {
            console.log('A.load()');
            return;
        });
        //return;
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.load = function () {
        return this.loadA().then(function () {
            console.log('B.load()');
        });
        /*
        return super.load().then(() => {
            console.log('B.load()');
        });
        */
    };
    return B;
}(A));
var mainSubs = {
    main: {
        product: {
            id: 1,
            discription: 'great product'
        }
    },
    subs: [
        {
            pack: {
                id: 1,
                name: '1g',
            },
            quantity: 3,
            amount: 5,
            vipPrice: 6,
            price: 7
        },
        {
            pack: {
                id: 1,
                name: '8g',
            },
            quantity: 31,
            amount: 52,
            vipPrice: 36,
            price: 37
        }
    ]
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentWillMount = function () {
        var b = new B();
        b.load();
    };
    App.prototype.render = function () {
        var _this = this;
        var one = new ViewMainSubs(renderMainProduct, renderSubPack);
        one.model = mainSubs;
        var list = new ViewListMainSubs(ViewMainSubs, renderMainProduct, renderSubPack);
        list.model = [
            mainSubs,
            mainSubs,
        ];
        /*
        <Uploader />
        {one.render()}
        <br/>
        <br/>
        {list.render()}
        */
        var page = React.createElement(Page, { header: false },
            React.createElement(Tabs, { tabs: faceTabs }));
        return React.createElement(NavView, { onLogined: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, nav.push(page)];
            }); }); }, notLogined: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, nav.push(page)];
            }); }); } });
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map
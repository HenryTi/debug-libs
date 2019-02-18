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
import * as React from 'react';
import { CApp } from 'tonva-react-uq';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { List } from 'tonva-react-form';
import { Loading, nav } from 'tonva-tools';
const tonvaApp = 'JKDev/jkOrder';
export class TabController {
    constructor() {
        this.renderProductRow = (row, index) => {
            let { id, discription } = row;
            return React.createElement("div", null,
                id,
                ": ",
                discription);
        };
        this.renderContent = () => {
            let userIcon = nav.user && nav.user.icon;
            return React.createElement("div", null,
                React.createElement("img", { src: userIcon }),
                " product loaded",
                this.items.length,
                React.createElement(List, { items: this.items, item: { render: this.renderProductRow, key: (item) => item.id } }));
        };
        this.render = observer(() => {
            return this.items === undefined ? React.createElement(Loading, null) : this.renderContent();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            nav.logMark();
            this.cApp = new CApp(tonvaApp);
            yield this.cApp.load();
            nav.logStep('await this.cApp.load()');
            this.cUq = this.cApp.getCUq('JKDev/jkOrder');
            this.tuidProduct = this.cUq.tuid('product');
            let ret = yield this.tuidProduct.search('', 0, 100);
            nav.logStep('let ret = await this.tuidProduct.search(-, 0, 100)');
            this.items = ret;
        });
    }
}
__decorate([
    observable
], TabController.prototype, "items", void 0);
//# sourceMappingURL=tab.js.map
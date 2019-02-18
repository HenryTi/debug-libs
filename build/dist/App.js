var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import './App.css';
import { Page, Tabs, NavView, nav } from 'tonva-tools';
import { faceTabs } from 'face';
class App extends React.Component {
    render() {
        let page = React.createElement(Page, { header: false },
            React.createElement(Tabs, { tabs: faceTabs }));
        return React.createElement(NavView, { onLogined: () => __awaiter(this, void 0, void 0, function* () { return nav.push(page); }), notLogined: () => __awaiter(this, void 0, void 0, function* () { return nav.push(page); }) });
    }
}
export default App;
//# sourceMappingURL=App.js.map
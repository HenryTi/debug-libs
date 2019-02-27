import { TabCaptionComponent } from 'tonva-tools';
import { store } from './store';
import { homeTab } from './home';
import { memberTab } from './member';
import { cartTab } from './cart';
import { meTab } from './me';
//export const cApp = new CApp(tonvaApp);
var color = function (selected) { return selected === true ? 'text-primary' : 'text-muted'; };
export var faceTabs = [
    { name: 'home', label: '首页', icon: 'home', content: homeTab, notify: store.homeCount },
    { name: 'member', label: '会员', icon: 'vcard', content: memberTab },
    { name: 'cart', label: '购物车', icon: 'shopping-cart', content: cartTab, notify: store.cartCount },
    { name: 'me', label: '我的', icon: 'user', content: meTab }
].map(function (v) {
    var name = v.name, label = v.label, icon = v.icon, content = v.content, notify = v.notify;
    return {
        name: name,
        caption: function (selected) { return TabCaptionComponent(label, icon, color(selected)); },
        content: content,
        notify: notify,
    };
});
//# sourceMappingURL=index.js.map
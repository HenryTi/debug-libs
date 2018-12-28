import * as React from 'react';
import { TabCaptionComponent } from 'tonva-tools';
import {store} from './store';
import {homeTab} from './home';
import {memberTab} from './member';
import {cartTab} from './cart';
import {meTab} from './me';

const color = (selected:boolean) => selected===true? 'text-primary' : 'text-muted';
export const faceTabs = [
    {name: 'home', label: '首页', icon: 'home', content: homeTab, notify: store.homeCount},
    {name: 'member', label: '会员', icon: 'vcard', content: memberTab},
    {name: 'cart', label: '购物车', icon: 'shopping-cart', content: cartTab, notify: store.cartCount},
    {name: 'me', label: '我的', icon: 'user', content: meTab}
].map(v => {
    let {name, label, icon, content, notify} = v;
    return {
        name: name,
        caption: (selected:boolean) => TabCaptionComponent(label, icon, color(selected)),
        content: content,
        notify: notify,
    }
});

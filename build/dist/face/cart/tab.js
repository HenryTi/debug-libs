import * as React from 'react';
import { store } from 'face/store';
var cart = function () { return React.createElement("div", null,
    "cart",
    React.createElement("button", { onClick: function () { return store.cartCount.set(store.cartCount.get() + 1); } }, "click+"),
    React.createElement("button", { onClick: function () { return store.cartCount.set(store.cartCount.get() - 1); } }, "click-")); };
export default cart;
//# sourceMappingURL=tab.js.map
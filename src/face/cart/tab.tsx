import * as React from 'react';
import { store } from 'face/store';

const cart = () => <div>
    cart
    <button onClick={()=>store.cartCount.set(store.cartCount.get() + 1)}>click+</button>
    <button onClick={()=>store.cartCount.set(store.cartCount.get() - 1)}>click-</button>
</div>;

export default cart;
import * as React from 'react';
export function renderMainProduct(model) {
    var product = model.product;
    return React.createElement("div", null, product.discription);
}
export function renderSubPack(model) {
    var pack = model.pack, vipPrice = model.vipPrice, price = model.price, quantity = model.quantity, amount = model.amount;
    return React.createElement("div", null,
        pack.name,
        ", ",
        vipPrice,
        ", ",
        price,
        ", ",
        quantity,
        ", ",
        amount);
}
/*
export class ViewMainProduct extends ViewBase<MainProduct> {
    render() {
        return <div>
            {this.model.product.discription}
        </div>
    }
}

export class ViewSubPack extends ViewBase<SubPack> {
    render() {
        let {pack, vipPrice, price, quantity, amount} = this.model;
        return <div>
            {pack.name}, {vipPrice}, {price}, {quantity}, {amount}
        </div>
    }
}
*/
//# sourceMappingURL=render.js.map
import {observable} from 'mobx';

export const store = {
    homeCount: observable.box<number>(-1),
    cartCount: observable.box<number>(101),
};

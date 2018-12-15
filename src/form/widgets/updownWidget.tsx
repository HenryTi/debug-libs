import * as React from 'react';
import { WidgetBase } from './widgetBase';

const keys = [46, 8, 37, 39];
export class UpdownWidget extends WidgetBase {
    private onKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
        let key = evt.keyCode;
        event.returnValue = key===46 || key===8 || key===37 || key===39
            || key>=48 && key<=57
            || key>=96 && key<=105;
    }
    render() {
        return <input
            type="number"
            onKeyDown={this.onKeyDown}
            defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

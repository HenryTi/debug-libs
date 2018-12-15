import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class NumberWidget extends WidgetBase {
    render() {
        return <input type="number" defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

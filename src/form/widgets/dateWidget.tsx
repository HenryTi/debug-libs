import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class DateWidget extends WidgetBase {
    render() {
        return <input type="date" defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

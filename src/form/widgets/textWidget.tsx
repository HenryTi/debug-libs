import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class TextWidget extends WidgetBase {
    render() {
        return <input type="text" defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

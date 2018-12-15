import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class PasswordWidget extends WidgetBase {
    render() {
        return <input type="password" defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

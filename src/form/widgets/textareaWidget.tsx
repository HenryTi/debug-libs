import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class TextAreaWidget extends WidgetBase {
    protected onChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.value = evt.currentTarget.value;
        this.observeObj[this.itemSchema.name] = this.value;
    }

    render() {
        return <textarea defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

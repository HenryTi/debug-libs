import * as React from 'react';
import { Widget } from './widget';
import { UiTextAreaItem } from '../uiSchema';

export class TextAreaWidget extends Widget {
    protected input: HTMLTextAreaElement;
    protected ui: UiTextAreaItem;

    protected setElementValue(value:any) {this.input.value = value}
    protected onChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setValue(evt.currentTarget.value);
    }

    setReadOnly(value:boolean) {this.input.readOnly = this.readOnly = value}
    setDisabled(value:boolean) {this.input.disabled = this.disabled = value}

    render() {
        return <textarea ref={(input) => this.input=input} 
            rows={this.ui && this.ui.rows}
            defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

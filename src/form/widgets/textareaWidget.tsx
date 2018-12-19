import * as React from 'react';
import { Widget } from './widget';

export class TextAreaWidget extends Widget {
    protected input: HTMLTextAreaElement;

    protected setElementValue(value:any) {this.input.value = value}
    protected onChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setValue(evt.currentTarget.value);
    }

    render() {
        return <textarea ref={(input) => this.input=input} defaultValue={this.defaultValue} onChange={this.onChange} />
    }
}

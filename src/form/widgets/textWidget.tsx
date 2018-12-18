import * as React from 'react';
import { WidgetBase } from './widgetBase';

export class TextWidget extends WidgetBase {
    protected inputType = 'text';

    protected get placeholder() {return this.itemSchema.name}
    protected onKeyDown: (evt:React.KeyboardEvent<HTMLInputElement>)=>void;

    render() {
        return <><input 
            className={this.className}
            type={this.inputType}
            defaultValue={this.defaultValue} 
            onChange={this.onChange}
            placeholder={this.placeholder}
            onKeyDown = {this.onKeyDown} />
            <span>{this.observeObj[this.itemSchema.name]}</span>
        </>;
    }
}

import * as React from 'react';
import classNames from 'classnames';
import { WidgetBase } from './widgetBase';

export class TextWidget extends WidgetBase {
    protected inputType = 'text';

    protected get placeholder() {return this.dataItem.name}
    protected onKeyDown: (evt:React.KeyboardEvent<HTMLInputElement>)=>void;

    render() {
        let fieldClass:string;
        if (this.inNode === false) fieldClass = this.form.FieldClass;
        return <input 
            className={classNames(fieldClass, this.ui && this.ui.className, this.className)}
            type={this.inputType}
            defaultValue={this.defaultValue} 
            onChange={this.onChange}
            placeholder={this.placeholder}
            onKeyDown = {this.onKeyDown} />;
    }
}

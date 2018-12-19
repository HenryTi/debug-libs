import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { UiTextItem } from '../uiSchema';

export class TextWidget extends Widget {
    protected inputType = 'text';
    protected ui: UiTextItem;
    protected input: HTMLInputElement;

    protected setElementValue(value:any) {this.input.value = value}
    protected get placeholder() {return (this.ui && this.ui.placeholder) || this.name}
    protected onKeyDown: (evt:React.KeyboardEvent<HTMLInputElement>)=>void;

    protected onBlur = () => {
        this.errors = this.checkRules();
        //this.form.computeFields();
    }

    render() {
        return <><input ref={input=>this.input = input}
            className={classNames(this.className, 'form-control', this.errors&&'is-invalid')}
            type={this.inputType}
            defaultValue={this.defaultValue} 
            onChange={this.onChange}
            placeholder={this.placeholder}
            onKeyDown = {this.onKeyDown}
            onBlur={this.onBlur} />
            <span className="text-danger">{this.errors && this.errors.map(e=>e)}</span>
        </>;
    }
}

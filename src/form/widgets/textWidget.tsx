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
    protected onFocus = () => {
        this.errors = undefined;
        this.context.form.removeErrorWidget(this);
    }

    setReadOnly(value:boolean) {this.input.readOnly = this.readOnly = value}
    setDisabled(value:boolean) {this.input.disabled = this.disabled = value}

    render() {
        let errors;
        if (this.errors !== undefined) {
            errors = this.errors.map(err => <span className="text-danger inline-block my-1 ml-3">
                <i className="fa fa-exclamation-circle" /> &nbsp;{err}
            </span>)
        }
        let cn = {
            'form-control': true,
        };
        if (this.errors!==undefined) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        return <><input ref={input=>this.input = input}
            className={classNames(this.className, cn)}
            type={this.inputType}
            defaultValue={this.defaultValue} 
            onChange={this.onChange}
            placeholder={this.placeholder}
            readOnly={this.readOnly}
            disabled={this.disabled}
            onKeyDown = {this.onKeyDown}
            onFocus = {this.onFocus}
            onBlur={this.onBlur} />
            {errors}
        </>;
    }
}

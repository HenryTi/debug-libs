import * as React from 'react';
import classNames from 'classnames';
import { ItemSchema } from '../schema';
import { Form } from '../form';
import { UiItem } from '../uiSchema';
import { FieldProps } from '../field';

export abstract class WidgetBase {
    protected form: Form;
    protected fieldProps:FieldProps;
    protected inNode:boolean;
    protected itemSchema: ItemSchema;
    protected ui: UiItem;
    protected observeObj: any;
    protected defaultValue: any;
    protected value: any;

    constructor(form: Form, fieldProps:FieldProps, inNode:boolean, itemSchema:ItemSchema, ui: UiItem, observeObj: any, defaultValue: any) {
        this.form = form;
        this.fieldProps = fieldProps;
        this.inNode = inNode;
        this.itemSchema = itemSchema;
        this.ui = ui;
        this.observeObj = observeObj;
        this.value = this.defaultValue = defaultValue;
    }

    protected onChange = (evt: React.ChangeEvent<any>) => {
        let prev = this.value;
        this.value = evt.currentTarget.value;
        this.observeObj[this.itemSchema.name] = this.value;
        if (this.fieldProps) {
            let {onChanged} = this.fieldProps;
            if (onChanged !== undefined) onChanged(this.value, prev);
        }
    }

    protected get className():string {
        let fieldClass:string;
        if (this.inNode === false) fieldClass = this.form.FieldClass;
        return classNames(fieldClass, this.ui && this.ui.className, this.fieldProps && this.fieldProps.className);
    }

    abstract render():JSX.Element;
}

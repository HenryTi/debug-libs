import * as React from 'react';
import classNames from 'classnames';
import { UiItem } from '../uiSchema';
import { FieldProps } from '../field';
import { Context } from '../context';
import { ItemSchema } from '../schema';
import { Rule, RuleRequired } from '../rules';
import { computed, observable } from 'mobx';

export abstract class Widget {
    protected name: string;
    protected context: Context;
    protected fieldProps:FieldProps;
    protected itemSchema: ItemSchema;
    protected ui: UiItem;
    protected defaultValue: any;
    protected value: any;
    protected input: HTMLElement;
    protected rules: Rule[];
    @observable protected errors: string[];

    constructor(context:Context, itemSchema:ItemSchema, fieldProps:FieldProps) {
        this.context = context;
        let {name} = itemSchema;
        this.name = name;
        this.itemSchema = itemSchema;
        this.fieldProps = fieldProps;
        this.ui = context.getUiItem(name);
        this.value = this.defaultValue =  context.getValue(name); //defaultValue;
        this.init();
    }

    protected init() {
        this.buildRules();
    }

    protected buildRules() {
        this.rules = [];
        if (this.itemSchema.required === true) {
            this.rules.push(new RuleRequired);
        }
    }

    protected checkRules(): string[] {
        let defy:string[] = [];
        for (let r of this.rules) r.check(defy, this.value);
        if (defy.length === 0) return undefined;
        return defy;
    }

    @computed get isOk() {
        if (this.rules.length === 0) return true;
        let defy = this.checkRules;
        return defy.length === 0;
    }

    protected setElementValue(value:any) {}

    setValue(value:any) {
        this.value = value;
        this.context.data[this.name] = value;
        this.setElementValue(value);
    }

    getValue() {
        return this.context.getValue(this.name);
    }

    protected onChange = (evt: React.ChangeEvent<any>) => {
        let prev = this.value;
        //this.value = evt.currentTarget.value;
        //this.observeObj[this.itemSchema.name] = this.value;
        this.setValue(evt.currentTarget.value);
        if (this.fieldProps) {
            let {onChanged} = this.fieldProps;
            if (onChanged !== undefined) onChanged(this.value, prev);
        }
    }

    protected get className():string {
        let fieldClass:string;
        if (this.context.inNode === false) fieldClass = this.context.form.FieldClass;
        return classNames(fieldClass, this.ui && this.ui.className, this.fieldProps && this.fieldProps.className);
    }

    abstract render():JSX.Element;
}

import * as React from 'react';
import classNames from 'classnames';
import { UiItem, ChangingHandler, ChangedHandler } from '../uiSchema';
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
    protected rules: Rule[];
    @observable protected errors: string[];
    protected readOnly:boolean;
    protected disabled:boolean;

    constructor(context:Context, itemSchema:ItemSchema, fieldProps:FieldProps) {
        this.context = context;
        let {name} = itemSchema;
        this.name = name;
        this.itemSchema = itemSchema;
        this.fieldProps = fieldProps;
        this.ui = context.getUiItem(name);
        if (this.ui === undefined) {
            this.readOnly = false;
            this.disabled = false;
        }
        else {
            let {readOnly, disabled} = this.ui;
            this.readOnly = (readOnly === true);
            this.disabled = (disabled === true);
        }
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
        if (defy.length === 0) {
            this.context.form.removeErrorWidget(this);
            return undefined;
        }
        this.context.form.addErrorWidget(this);
        return defy;
    }

    @computed get isOk() {
        if (this.rules.length === 0) return true;
        let defy = this.checkRules;
        return defy.length === 0;
    }

    protected setElementValue(value:any) {}
    protected setDataValue(value:any) {
        if (this.isChanging === true) return;
        this.value = value;
        this.context.data[this.name] = value;
    }

    setValue(value:any) {
        if (this.isChanging === true) return;
        this.setDataValue(value);
        this.setElementValue(value);
    }

    getValue() {
        return this.context.getValue(this.name);
    }

    getReadOnly():boolean {return this.readOnly}
    getDisabled():boolean {return this.disabled}
    setReadOnly(value:boolean) {this.readOnly = value}
    setDisabled(value:boolean) {this.disabled = value}

    private isChanging: boolean;
    protected onChange = (evt: React.ChangeEvent<any>) => {
        let prev = this.value;
        let onChanging: ChangingHandler;
        let onChanged: ChangedHandler;
        if (this.ui !== undefined) {
            onChanging = this.ui.onChanging;
            onChanged = this.ui.onChanged;
        }
        let allowChange = true;
        if (onChanging !== undefined) {
            this.isChanging = true;
            allowChange = onChanging(this.context, this.value, prev);
            this.isChanging = false;
        }
        if (allowChange === true) {
            this.setDataValue(evt.currentTarget.value);
            if (onChanged !== undefined) {
                this.isChanging = true;
                onChanged(this.context, this.value, prev);
                this.isChanging = false;
            }
        }
    }

    protected get className():string {
        let fieldClass:string;
        if (this.context.inNode === false) fieldClass = 'form-control';
        return classNames(fieldClass, this.context.form.FieldClass, this.ui && this.ui.className);
    }

    abstract render():JSX.Element;
}

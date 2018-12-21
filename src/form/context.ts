import * as React from 'react';
import { Form } from './form';
import { UiSchema, UiArr, UiItem } from './uiSchema';
import { ArrSchema, ItemSchema } from './schema';
import { Widget as Widget } from './widgets/widget';
import { ArrRow } from './arrRow';

export abstract class Context {    
    readonly form: Form;
    readonly uiSchema: UiSchema;
    readonly data: any;
    readonly inNode: boolean;           // true: 在</> 流中定义Field
    readonly widgets: {[name:string]: Widget} = {};

    constructor(form: Form, uiSchema: UiSchema, data: any, inNode: boolean) {
        this.form = form;
        this.uiSchema = uiSchema;
        this.data = data;
        this.inNode = inNode;
    }

    abstract get isRow():boolean;
    abstract getItemSchema(itemName:string):ItemSchema;
    abstract getUiItem(itemName:string):UiItem;
    get arrName():string {return undefined}
    getValue(itemName:string):any {return this.data[itemName]}
    setValue(itemName:string, value:any) {
        this.data[itemName] = value;
        let widget = this.widgets[itemName];
        if (widget !== undefined) widget.setValue(value);
    }
    getDisabled(itemName:string):boolean {
        let widget = this.widgets[itemName];
        if (widget !== undefined) return widget.getDisabled();
        return undefined;
    }
    setDisabled(itemName:string, value:boolean) {
        let widget = this.widgets[itemName];
        if (widget !== undefined) widget.setDisabled(value);
    }
    getReadOnly(itemName:string):boolean {
        let widget = this.widgets[itemName];
        if (widget !== undefined) widget.getReadOnly();
        return undefined;
    }
    setReadOnly(itemName:string, value:boolean) {
        let widget = this.widgets[itemName];
        if (widget !== undefined) widget.setReadOnly(value);
    }
}

export class RowContext extends Context {
    readonly formContext: FormContext;
    readonly arrSchema: ArrSchema;
    readonly uiSchema: UiArr;
    readonly row: ArrRow;
    constructor(formContext:FormContext, arrSchema: ArrSchema, data: any, inNode: boolean, row:ArrRow) {
        let uiArr:UiArr;
        let {form} = formContext;
        let {uiSchema} = form;
        if (uiSchema !== undefined) {
            let {items} = uiSchema;
            if (items !== undefined) uiArr = items[arrSchema.name] as UiArr;
        }
        super(formContext.form, uiArr, data, inNode);
        this.formContext = formContext;
        this.arrSchema = arrSchema;
        this.row = row;
    }
    get isRow():boolean {return true};
    getItemSchema(itemName:string):ItemSchema {return this.arrSchema.itemSchemas[itemName]}
    getUiItem(itemName:string):UiItem {
        if (this.uiSchema === undefined) return undefined;
        let {items} = this.uiSchema;
        if (items === undefined) return undefined;
        return items[itemName]
    }
    get arrName():string {return this.arrSchema.name}
}

export class FormContext extends Context {
    constructor(form:Form, inNode:boolean) {
        super(form, form.uiSchema, form.data, inNode);
    }
    get isRow():boolean {return false};
    getItemSchema(itemName:string):ItemSchema {return this.form.itemSchemas[itemName]}
    getUiItem(itemName:string):UiItem {
        let {uiSchema} = this.form;
        if (uiSchema === undefined) return undefined;
        let {items} = uiSchema;
        if (items === undefined) return undefined;
        return items[itemName]
    }
}

export const ContextContainer = React.createContext<Context>({} as any);
//export const FormContextContainer = React.createContext<FormContext>({} as any);
//export const RowContextContainer = React.createContext<RowContext>({} as any);

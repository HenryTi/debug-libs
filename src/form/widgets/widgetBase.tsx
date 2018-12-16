import * as React from 'react';
import { DataItem } from '../schema';
import { Form } from '../form';
import { UiItem } from '../uiSchema';

export abstract class WidgetBase {
    protected form: Form;
    protected className:string;
    protected inNode:boolean;
    protected dataItem: DataItem;
    protected ui: UiItem;
    protected observeObj: any;
    protected defaultValue: any;
    protected value: any;

    constructor(form: Form, className:string, inNode:boolean, dataItem:DataItem, ui: UiItem, observeObj: any, defaultValue: any) {
        this.form = form;
        this.className = className;
        this.inNode = inNode;
        this.dataItem = dataItem;
        this.ui = ui;
        this.observeObj = observeObj;
        this.value = this.defaultValue = defaultValue;
    }

    protected onChange = (evt: React.ChangeEvent<any>) => {
        this.value = evt.currentTarget.value;
        this.observeObj[this.dataItem.name] = this.value;
    }

    abstract render():JSX.Element;
}

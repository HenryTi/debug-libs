import { StatelessComponent } from 'react';
import { ArrRow } from './arrRow';
import { Context } from './context';

export type UiType =  'form' | 'arr' | 'group' | 'button' 
    | 'text' | 'textarea' | 'password' 
    | 'date' | 'datetime' | 'select' | 'url' | 'email'
    | 'updown' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range';

export type ChangingHandler = (context:Context, value:any, prev:any) => boolean;
export type ChangedHandler = (context:Context, value:any, prev:any) => void;

export interface UiItem {
    widget?: UiType;
    readOnly?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
    onChanging?: ChangingHandler;
    onChanged?: ChangedHandler;
}

export interface UiInputItem extends UiItem {
    placeholder?: string;
}

export interface UiTextItem extends UiInputItem {
    widget: 'text';
}

export interface UiTextAreaItem extends UiInputItem {
    widget: 'textarea';
    rows?: number;
}

export interface UiRange extends UiInputItem {
    widget: 'range';
    min?: number;
    max?: number;
    step?: number;
}

export interface UiSelectBase extends UiItem {
    defaultValue: any;
    list: {value:any, title:string}[];
}

export interface UiSelect extends UiSelectBase {
    widget: 'select';
}

export interface UiRadio extends UiSelectBase {
    widget: 'radio';
}

export interface UiItemCollection {
    [field: string]: UiItem;
}

export type TempletType = StatelessComponent<any> | JSX.Element;
export interface UiSchema {
    items?: UiItemCollection;
    Templet?: TempletType;
    readonly?: boolean;
    disabled?: boolean;
    className?: string;
    selectable?: boolean;
    deletable?: boolean;
    restorable?: boolean;
}

export interface UiArr extends UiSchema, UiItem {
    widget: 'arr';
}

export interface UiGroup extends UiItem {
    widget: 'group';
    with: string[];     // field names
}

export interface UiButton extends UiItem {
    widget: 'button';
}

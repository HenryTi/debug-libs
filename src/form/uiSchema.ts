import { Form } from './form';
import { StatelessComponent } from 'react';
import { ArrRow } from './arrRow';

export type UiType =  'form' | 'arr' | 'group' | 'button' 
    | 'text' | 'textarea' | 'password' 
    | 'date' | 'datetime' | 'select' | 'url' | 'email'
    | 'updown' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range';

export interface UiItem {
    widget: UiType;
    readonly?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
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

export interface UiItemCollection {
    [field: string]: UiItem;
}

//export interface RowTempletProps {form:Form, data:any, uiArr:UiArr, rowData:any};
export type TempletType = StatelessComponent<ArrRow>;
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

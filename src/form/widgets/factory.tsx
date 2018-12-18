import * as React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import { Schema, ArrSchema, DataType, ButtonSchema, ItemSchema } from '../schema';
import { UiItem, UiArr, UiType, UiButton } from '../uiSchema';
import { ContextValue, FormContext, Form } from '../form';
import { TextWidget } from './textWidget';
import { WidgetBase } from './widgetBase';
import { TextAreaWidget } from './textareaWidget';
import { PasswordWidget } from './passwordWidget';
import { UpdownWidget } from './updownWidget';
import { NumberWidget } from './numberWidget';
import { DateWidget } from './dateWidget';
import { CheckBoxWidget } from './checkBoxWidget';
import { FieldProps } from '../field';

type WidgetClass = new (form:Form, fieldProps:FieldProps, inNode:boolean, itemSchema:ItemSchema, ui: UiItem, observeObj: any, defaultValue: any) => WidgetBase;

const widgetsFactory: {[type: string]: {widget?: WidgetClass, dataTypes?: DataType[]}} = {
    text: {
        dataTypes: ['integer', 'number', 'string'],
        widget: TextWidget
    },
    textarea: {
        dataTypes: ['string'],
        widget: TextAreaWidget
    },
    password: {
        dataTypes: ['string'],
        widget: PasswordWidget
    },
    date: {
    },
    datetime: {
    },
    select: {
    },
    url: {

    },
    email: {

    },
    number: {
        dataTypes: ['integer', 'number'],
        widget: NumberWidget
    },
    updown: {
        dataTypes: ['integer', 'number'],
        widget: UpdownWidget
    },
    color: {

    },
    checkbox: {
        dataTypes: ['boolean'],
        widget: CheckBoxWidget
    },
    checkboxes: {

    },
    radio: {

    },
    range: {

    }
}

export function factory(form: Form, fieldProps:FieldProps, itemSchema: ItemSchema, ui: UiItem, data:any, children:React.ReactNode, inNode:boolean, arrSchema?: ArrSchema):JSX.Element {
    if (itemSchema === undefined) return undefined;
    let {name, type} = itemSchema;
    let val = data[name];
    let widget: WidgetClass;
    switch (type) {
    case 'button':
        return <FormButton form={form} itemSchema={itemSchema as ButtonSchema} ui={ui as UiButton} children={children} arrSchema={arrSchema} row={data} />;
    case 'arr':
        if (arrSchema !== undefined) return undefined;
        return <ArrComponent form={form} arrSchema={itemSchema as ArrSchema} ui={ui as UiArr} data={val} children={children} />;
    default:
        break;
    }
    let fieldLabel:string;
    if (ui === undefined) {
        fieldLabel = name;
        switch(type) {
        default: widget = TextWidget; break;
        case 'integer': widget = UpdownWidget; break;
        case 'number': widget = NumberWidget; break;
        case 'string': widget = TextWidget; break;
        case 'date': widget = DateWidget; break;
        case 'boolean': widget = CheckBoxWidget; break;
        }
    }
    else {        
        let {widget:widgetType, label} = ui;
        fieldLabel = label || name;
        switch (widgetType) {
        default:
            let widgetFactory = widgetsFactory[widgetType];
            widget = widgetFactory.widget;
            if (widget === undefined) return Unknown(type, widgetType, widgetFactory.dataTypes)
            break;
        case 'group':
            return <span>impletment group</span>;
        }
    }
    
    if (arrSchema === undefined) {
        let WidgetElement = observer(() => new widget(form, fieldProps, inNode, itemSchema, ui, data, val).render());
        if (inNode === true) return <WidgetElement />;
        return form.FieldContainer(fieldLabel, <WidgetElement />, arrSchema);
    }
    else {
        let widgetElement = new widget(form, fieldProps, inNode, itemSchema, ui, data, val).render();
        if (inNode === true) return widgetElement;
        return form.FieldContainer(fieldLabel, widgetElement, arrSchema);
    }
}

const FormButton = ({form, itemSchema: di, ui, children, arrSchema: arrSchema, row}:{form: Form, itemSchema: ButtonSchema, ui: UiButton, children: React.ReactNode, arrSchema: ArrSchema, row: any}) => {
    if (ui !== undefined) {
        let {widget:widgetType} = ui;
        if (widgetType !== 'button') return Unknown(di.type, widgetType, ['button']);
    }
    let {name} = di;
    function onClick() {
        let {onButtonClick} = form.props;
        if (onButtonClick === undefined) {
            alert(`button ${name} clicked`);
            return;
        }
        let data = form.data;
        onButtonClick(name, data, arrSchema && arrSchema.name, row);
    }
    return <button className={classNames(form.ButtonClass, ui && ui.className)} type="button" onClick={onClick}>{name}</button>;
}

const ArrComponent = observer((
    {form, arrSchema, ui, data, children}:{form: Form, arrSchema: ArrSchema, ui: UiArr, data:any[], children: React.ReactNode}) => 
{
    let {name, arr, itemSchemas} = arrSchema;
    let arrLabel = name;
    let Templet:React.StatelessComponent<{form:Form, data:any, uiArr:UiArr, row:any}>;
    let selectable:boolean, deletable:boolean, restorable:boolean;
    if (ui !== undefined) {
        let {widget:widgetType, label, selectable:arrSelectable, deletable:arrDeletable, restorable:arrRestorable} = ui;
        selectable = arrSelectable;
        deletable = arrDeletable;
        restorable = arrRestorable;
        Templet = ui.Templet;
        if (widgetType !== 'arr') return Unknown(arrSchema.type, widgetType, ['arr']);
        arrLabel = label || arrLabel;
    }
    let {ArrContainer, RowContainer, RowEditContainer, uiSchema} = form;
    if (uiSchema !== undefined) {
        let {selectable:formSelectable, deletable:formDeletable, restorable:formRestorable} = uiSchema;
        if (selectable !== true) selectable = formSelectable;
        if (deletable !== true) deletable = formDeletable;
        if (restorable !== true) restorable = formRestorable;
    }
    let first = true;
    return ArrContainer(arrLabel, <>
        {data.map((row, index) => {
            let selectCheck:JSX.Element, deleteIcon:JSX.Element;
            if (selectable === true) {
                let onClick = (evt: React.MouseEvent<HTMLInputElement>)=>{
                    row.$isSelected=(evt.target as HTMLInputElement).checked;
                }
                selectCheck = <div>
                    <input className="mt-1" style={{width:'2em', height:'1.3em'}} type="checkbox" onClick={onClick} />
                </div>;
            }
            let isDeleted = !(row.$isDeleted===undefined || row.$isDeleted===false);
            if (deletable === true) {
                let icon = isDeleted? 'fa-undo' : 'fa-trash';
                let onDelClick = () => {
                    if (restorable === true) {
                        row.$isDeleted = !isDeleted;
                    }
                    else {
                        let p = data.indexOf(row);
                        if (p>=0) data.splice(p, 1);
                    }
                }
                deleteIcon = <div className="m-1 align-self-start text-info" onClick={onDelClick} style={{cursor: "pointer"}}>
                    <i className={classNames('fa', icon, 'fa-fw')} />
                </div>;
            }
            let editContainer = selectable===true || deletable===true?
                (content:any) => <fieldset disabled={isDeleted}><div className={classNames('d-flex', isDeleted?'deleted':'')}>
                    {selectCheck}<div className="flex-grow-1 container">{content}</div>{deleteIcon}
                </div></fieldset>
                :
                (content:any) => content;

            let sep = undefined;
            if (first === false) sep = form.RowSeperator;
            else first = false;
            if (children !== undefined) {
                let arrContext: ContextValue = {
                    form: form,
                    uiSchema: ui,
                    data: row,
                    inNode: true,
                    arrSchema: arrSchema,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {editContainer(<>children</>)}
                </FormContext.Provider >;
            }
            if (Templet !== undefined) {
                let arrContext: ContextValue = {
                    form: form,
                    uiSchema: ui,
                    data: row,
                    inNode: true,
                    arrSchema: arrSchema,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {editContainer(<Templet form={form} data={data} uiArr={ui} row={row} />)}
                </FormContext.Provider >;
            }
            let content = <>{
                arr.map((v, index) => {
                    let uiItem:UiItem;
                    if (ui !== undefined) {
                        let {items} = ui;
                        if (items !== undefined) uiItem = items[v.name];
                    }
                    return <React.Fragment key={index}>
                        {factory(form, undefined, v, uiItem, row, undefined, false, arrSchema)}
                    </React.Fragment>
                })}</>;
                let arrContext: ContextValue = {
                    form: form,
                    uiSchema: ui,
                    data: row,
                    inNode: false,
                    arrSchema: arrSchema,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {editContainer(RowContainer(content))}
                </FormContext.Provider>;
        })}
    </>);
});

const Unknown = (dataType:DataType, uiType:UiType, dataTypes:DataType[]) => {
    return <span className="text-danger">!!data type {dataType} only support {(dataTypes || []).join(', ')}, can't use ui {uiType}!!</span>;
};
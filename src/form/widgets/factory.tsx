import * as React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import { Schema, ArrSchema, DataType, ButtonSchema, ItemSchema } from '../schema';
import { UiItem, UiArr, UiType, UiButton, TempletType } from '../uiSchema';
//import { ContextValue, FormContext, Form } from '../form';
import { TextWidget } from './textWidget';
import { Widget } from './widget';
import { TextAreaWidget } from './textareaWidget';
import { PasswordWidget } from './passwordWidget';
import { UpdownWidget } from './updownWidget';
import { NumberWidget } from './numberWidget';
import { DateWidget } from './dateWidget';
import { CheckBoxWidget } from './checkBoxWidget';
import { FieldProps } from '../field';
import { ArrRow } from '../arrRow';
import { Context, RowContext, FormContext, ContextContainer } from '../context';

type TypeWidget = new (context:Context, itemSchema:ItemSchema, fieldProps:FieldProps) => Widget;

const widgetsFactory: {[type: string]: {widget?: TypeWidget, dataTypes?: DataType[]}} = {
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

//export function factory(form: Form, fieldProps:FieldProps, itemSchema: ItemSchema, ui: UiItem, data:any, children:React.ReactNode, inNode:boolean, arrSchema?: ArrSchema):JSX.Element {
export function factory(context: Context, itemSchema: ItemSchema, children:React.ReactNode, fieldProps?: FieldProps):JSX.Element {
    if (itemSchema === undefined) return undefined;
    let {name, type} = itemSchema;
    switch (type) {
    case 'button':
        return <FormButton context={context} itemSchema={itemSchema as ButtonSchema} children={children} />;
    case 'arr':
        let arrSchema = context.getItemSchema(name) as ArrSchema;
        return <ArrComponent formContext={context as FormContext} arrSchema={arrSchema} children={children} />;
    default:
        break;
    }
    let typeWidget: TypeWidget;
    let fieldLabel:string;
    let ui = context.getUiItem(name);
    if (ui === undefined) {
        fieldLabel = name;
        switch(type) {
        default: typeWidget = TextWidget; break;
        case 'integer': typeWidget = UpdownWidget; break;
        case 'number': typeWidget = NumberWidget; break;
        case 'string': typeWidget = TextWidget; break;
        case 'date': typeWidget = DateWidget; break;
        case 'boolean': typeWidget = CheckBoxWidget; break;
        }
    }
    else {        
        let {widget:widgetType, label} = ui;
        fieldLabel = label || name;
        switch (widgetType) {
        default:
            let widgetFactory = widgetsFactory[widgetType];
            typeWidget = widgetFactory.widget;
            if (typeWidget === undefined) return Unknown(type, widgetType, widgetFactory.dataTypes)
            break;
        case 'group':
            return <span>impletment group</span>;
        }
    }
    
    let {form, isRow, inNode, widgets} = context;
    let widget = new typeWidget(context, itemSchema, fieldProps);
    widgets[name] = widget;
    if (isRow === false) {
        let WidgetElement = observer(() => widget.render());
        if (inNode === true) return <WidgetElement />;
        return form.FieldContainer(fieldLabel, <WidgetElement />, context);
    }
    else {
        let widgetElement = widget.render();
        if (inNode === true) return widgetElement;
        return form.FieldContainer(fieldLabel, widgetElement, context);
    }
}

const FormButton = ({context, itemSchema, children}:{context: Context, itemSchema: ButtonSchema, children: React.ReactNode}) => {
    let {name} = itemSchema;
    let ui: UiButton = context.getUiItem(name) as UiButton;
    if (ui !== undefined) {
        let {widget:widgetType} = ui;
        if (widgetType !== 'button') return Unknown(itemSchema.type, widgetType, ['button']);
    }
    let {form} = context;
    function onClick() {
        let {onButtonClick} = form.props;
        if (onButtonClick === undefined) {
            alert(`button ${name} clicked`);
            return;
        }
        onButtonClick(name, context);
    }
    return <button className={classNames(form.ButtonClass, ui && ui.className)} type="button" onClick={onClick}>{name}</button>;
}

const ArrComponent = observer((
    {formContext, arrSchema, children}:{formContext: FormContext, arrSchema: ArrSchema, children: React.ReactNode}) => 
{
    let {name, arr} = arrSchema;
    let data = formContext.data[name] as any[];
    let {form} = formContext;
    let ui = formContext.getUiItem(name) as UiArr;
    let arrLabel = name;
    let Templet:TempletType;
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
    let {ArrContainer, RowContainer, uiSchema} = form;
    if (uiSchema !== undefined) {
        let {selectable:formSelectable, deletable:formDeletable, restorable:formRestorable} = uiSchema;
        if (selectable !== true) selectable = formSelectable;
        if (deletable !== true) deletable = formDeletable;
        if (restorable !== true) restorable = formRestorable;
    }
    let first = true;
    return ArrContainer(arrLabel, <>
        {data.map((row:any, index) => {
            let arrRow = row.$row;
            if (arrRow === undefined) {
                row.$row = arrRow = new ArrRow(form, arrSchema, row);
            }
            let rowKey = arrRow.key;

            let selectCheck:JSX.Element, deleteIcon:JSX.Element;
            if (selectable === true) {
                let onClick = (evt: React.MouseEvent<HTMLInputElement>)=>{
                    row.$isSelected=(evt.target as HTMLInputElement).checked;
                }
                selectCheck = <div>
                    <input className="mt-1 form-row-checkbox" type="checkbox" onClick={onClick} />
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
                deleteIcon = <div className="m-1 align-self-start text-info cursor-pointer" onClick={onDelClick}>
                    <i className={classNames('fa', icon, 'fa-fw')} />
                </div>;
            }
            let editContainer = selectable===true || deletable===true?
                (content:any) => <fieldset disabled={isDeleted}><div className={classNames('d-flex', isDeleted?'deleted':'')}>
                    {selectCheck}<div className="flex-grow-1 container">{content}</div>{deleteIcon}
                </div></fieldset>
                :
                (content:any) => content;

            let rowContext: RowContext;
            let sep = undefined;
            if (first === false) sep = form.RowSeperator;
            else first = false;
            if (children !== undefined) {
                rowContext = new RowContext(formContext, arrSchema, row, true);
                return <ContextContainer.Provider key={rowKey} value={rowContext}>
                    {sep}
                    {editContainer(<>children</>)}
                </ContextContainer.Provider >;
            }
            if (Templet !== undefined) {
                rowContext = new RowContext(formContext, arrSchema, row, true);
                return <ContextContainer.Provider key={rowKey} value={rowContext}>
                    {sep}
                    {editContainer(React.createElement(observer(Templet), arrRow))}
                </ContextContainer.Provider >;
            }
            rowContext = new RowContext(formContext, arrSchema, row, false);
            let content = <>{
                arr.map((v, index) => {
                    return <React.Fragment key={v.name}>
                        {factory(rowContext, v, undefined)}
                    </React.Fragment>
                })}</>;
                return <ContextContainer.Provider key={rowKey} value={rowContext}>
                    {sep}
                    {editContainer(RowContainer(content))}
                </ContextContainer.Provider>;
        })}
    </>, children !== undefined || Templet !== undefined);
});

const Unknown = (dataType:DataType, uiType:UiType, dataTypes:DataType[]) => {
    return <span className="text-danger">!!data type {dataType} only support {(dataTypes || []).join(', ')}, can't use ui {uiType}!!</span>;
};
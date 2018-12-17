import * as React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import { DataItem, DataArr, DataType, DataButton } from '../schema';
import { UiItem, UiArr, UiType, UiButton } from '../uiSchema';
import { FormContextValue, FormContext, Form } from '../form';
import { TextWidget } from './textWidget';
import { WidgetBase } from './widgetBase';
import { TextAreaWidget } from './textareaWidget';
import { PasswordWidget } from './passwordWidget';
import { UpdownWidget } from './updownWidget';
import { NumberWidget } from './numberWidget';
import { DateWidget } from './dateWidget';
import { CheckBoxWidget } from './checkBoxWidget';

type WidgetClass = new (form:Form, className:string, inNode:boolean, dataItem:DataItem, ui: UiItem, observeObj: any, defaultValue: any) => WidgetBase;

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

export function factory(form: Form, className:string, di: DataItem, ui: UiItem, data:any, children:React.ReactNode, inNode:boolean, diArr?: DataArr, uiArr?: UiArr):JSX.Element {
    if (di === undefined) return undefined;
    let {name, type} = di;
    let val = data[name];
    let widget: WidgetClass;
    switch (type) {
    case 'button':
        return <FormButton form={form} di={di as DataButton} ui={ui as UiButton} children={children} diArr={diArr} row={data} />;
    case 'arr':
        return <ArrContainer form={form} di={di as DataArr} ui={ui as UiArr} data={val} children={children} />;
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
    let Widget = observer(() => new widget(form, className, inNode, di, ui, data, val).render());
    if (inNode === true) return <Widget />;
    return form.FieldContainer(fieldLabel, <Widget />, diArr, uiArr);
}

export const FormButton = ({form, di, ui, children, diArr, row}:{form: Form, di: DataButton, ui: UiButton, children: React.ReactNode, diArr: DataArr, row: any}) => {
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
        onButtonClick(name, data, diArr && diArr.name, row);
    }
    return <button className={classNames(form.ButtonClass, ui && ui.className)} type="button" onClick={onClick}>{name}</button>;
}

export const ArrContainer = observer((
    {form, di, ui, data, children}:{form: Form, di: DataArr, ui: UiArr, data:any[], children: React.ReactNode}) => 
{
    let {name, arr, dict} = di;
    let arrLabel = name;
    let Templet:React.StatelessComponent<{form:Form, data:any, uiArr:UiArr, row:any}>;
    if (ui !== undefined) {
        let {widget:widgetType, label} = ui;
        Templet = ui.Templet;
        if (widgetType !== 'arr') return Unknown(di.type, widgetType, ['arr']);
        arrLabel = label || arrLabel;
    }
    let {ArrContainer, RowContainer} = form;
    let first = true;
    return ArrContainer(arrLabel, <>
        {data.map((row, index) => {
            let sep = undefined;
            if (first === false) sep = form.RowSeperator;
            else first = false;
            if (children !== undefined) {
                let arrContext: FormContextValue = {
                    form: form,
                    dict: dict,
                    uiSchema: ui,
                    data: row,
                    inNode: true,
                    diArr: di,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {children}
                </FormContext.Provider >;
            }
            if (Templet !== undefined) {
                let arrContext: FormContextValue = {
                    form: form,
                    dict: dict,
                    uiSchema: ui,
                    data: row,
                    inNode: true,
                    diArr: di,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {<Templet form={form} data={data} uiArr={ui} row={row} />}
                </FormContext.Provider >;
            }
            let content = <>{
                arr.map((v, index) => {
                    return <React.Fragment key={index}>
                        {factory(form, undefined, v, ui && ui.items && ui.items[v.name], row, undefined, false, di, ui)}
                    </React.Fragment>
                })}</>;
                let arrContext: FormContextValue = {
                    form: form,
                    dict: dict,
                    uiSchema: ui,
                    data: row,
                    inNode: false,
                    diArr: di,
                };
                return <FormContext.Provider key={index} value={arrContext}>
                    {sep}
                    {RowContainer(content)}
                </FormContext.Provider>;
        })}
    </>);
});

const Unknown = (dataType:DataType, uiType:UiType, dataTypes:DataType[]) => {
    return <span className="text-danger">!!data type {dataType} only support {(dataTypes || []).join(', ')}, can't use ui {uiType}!!</span>;
};
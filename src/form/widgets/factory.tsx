import * as React from 'react';
import {observer} from 'mobx-react';
import { DataItem, DataArr, DataType } from '../schema';
import { UiItem, UiArr, UiType } from '../uiSchema';
import { FormContextValue, FormContext, Form } from '../form';
import { TextWidget } from './textWidget';
import { WidgetBase } from './widgetBase';
import { TextAreaWidget } from './textareaWidget';
import { PasswordWidget } from './passwordWidget';
import { UpdownWidget } from './updownWidget';
import { NumberWidget } from './numberWidget';
import { DateWidget } from './dateWidget';

type WidgetClass = new (form:Form, dataItem:DataItem, ui: UiItem, observeObj: any, defaultValue: any) => WidgetBase;

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

    },
    checkboxes: {

    },
    radio: {

    },
    range: {

    }
}

export function factory(form: Form, di: DataItem, ui: UiItem, data:any, children:React.ReactNode):JSX.Element {
    if (di === undefined) return undefined;
    let {name, type} = di;
    let val = data[name];
    let widget: WidgetClass;
    if (ui === undefined) {
        switch(type) {
        default:
            widget = TextWidget;
            break;
        case 'integer':
            widget = UpdownWidget;
            break;
        case 'number':
            widget = NumberWidget;
            break;
        case 'string':
            widget = TextWidget;
            break;
        case 'date':
            widget = DateWidget;
            break;
        case 'boolean':
            widget = TextWidget;
            break;
        case 'arr':
            return <ArrContainer form={form} di={di as DataArr} ui={ui as UiArr} data={val} children={children} />
        }
    }
    else {
        let {widget:widgetType} = ui;
        switch (widgetType) {
        default:
            let widgetFactory = widgetsFactory[widgetType];
            widget = widgetFactory.widget;
            if (widget === undefined) return Unknown(type, widgetType, widgetFactory.dataTypes)
            break;
        case 'arr':
            if (type !== 'arr') return Unknown(type, widgetType, ['arr']);
            return <ArrContainer form={form} di={di as DataArr} ui={ui as UiArr} data={val} children={children} />;
        case 'group':
            return <span>impletment group</span>;
        }
    }
    let Widget = observer(() => new widget(form, di, ui, data, val).render());
    return <Widget />;
}

export const ArrContainer = observer((
    {form, di, ui, data, children}:{form: Form, di: DataArr, ui: UiArr, data:any[], children: React.ReactNode}) => 
{
    let {arr, dict} = di;
    return <>
        {data.map((row, index) => { 
            let content = children !== undefined?
                children :
                arr.map((v, index) => {
                    return <div key={index}>
                        {factory(form, v, ui && ui.items && ui.items[v.name], row, undefined)}
                    </div>
                });
            let arrContext: FormContextValue = {
                form: form,
                dict: dict,
                uiSchema: ui,
                data: row,
            };
            return <FormContext.Provider key={index} value={arrContext}>
                {content}
            </FormContext.Provider>
        })}
    </>;
});

const Unknown = (dataType:DataType, uiType:UiType, dataTypes:DataType[]) => {
    return <span className="text-danger">!!data type {dataType} only support {(dataTypes || []).join(', ')}, can't use ui {uiType}!!</span>;
};
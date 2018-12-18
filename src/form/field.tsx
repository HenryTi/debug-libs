import * as React from 'react';
import { FormContext, ContextValue, Form } from './form';
import { factory } from './widgets';
import { UiItem, UiArr } from './uiSchema';
import { ArrSchema, ItemSchema } from './schema';

export interface FieldProps {
    name: string;
    className?: string;
    children?: React.ReactNode;
    onChanging?: (value:any, prev:any) => boolean;
    onChanged?: (value:any, prev:any) => void;
}

export class Field extends React.Component<FieldProps> {
    static contextType = FormContext;
    render() {
        let {name, className, children } = this.props;
        let {form, uiSchema, data, inNode, arrSchema} = this.context as ContextValue;
        if (form === undefined) return <span className="text-danger">!only in Form!</span>;
        let ui:UiItem;
        if (uiSchema) ui = uiSchema[name]
        let itemSchemas:{[name:string]: ItemSchema} = 
            arrSchema !== undefined? arrSchema.itemSchemas : form.itemSchemas;
        let itemSchema = itemSchemas[name];
        if (itemSchema === undefined) {
            debugger;
        }
        let content = factory(form, this.props, itemSchema, ui, data, children, inNode, arrSchema);
        if (content === undefined) {
            return <span className="text-danger">!!{name} is not defined!!</span>;
        }
        return content;
    }
}

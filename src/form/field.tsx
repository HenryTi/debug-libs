import * as React from 'react';
//import { FormContext, ContextValue, Form } from './form';
import { factory } from './widgets';
import { ContextContainer, Context } from './context';

export interface FieldProps {
    name: string;
    className?: string;
    children?: React.ReactNode;
    onChanging?: (value:any, prev:any) => boolean;
    onChanged?: (value:any, prev:any) => void;
}

export class Field extends React.Component<FieldProps> {
    static contextType = ContextContainer;
    render() {
        let {name, className, children } = this.props;
        let context:Context = this.context;
        if (context === undefined) return <span className="text-danger">!only in Form!</span>;
        /*
        let ui:UiItem;
        if (uiSchema) {
            let {items} = uiSchema;
            if (items !== undefined) ui = items[name];
        }
        let itemSchemas:{[name:string]: ItemSchema} = 
            arrSchema !== undefined? arrSchema.itemSchemas : form.itemSchemas;
        let itemSchema = itemSchemas[name];
        if (itemSchema === undefined) {
            debugger;
        }
        */
        let itemSchema = context.getItemSchema(name);
        let content = factory(context, itemSchema, children, this.props);
        if (content === undefined) {
            return <span className="text-danger">!!{name} is not defined!!</span>;
        }
        return content;
    }
}

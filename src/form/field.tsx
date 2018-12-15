import * as React from 'react';
import { FormContext, FormContextValue, Form } from './form';
import { factory } from './widgets';

export interface FieldProps {
    name: string;
    children?: React.ReactNode;
}

export class Field extends React.Component<FieldProps> {
    static contextType = FormContext;
    render() {
        let {name, children} = this.props;
        let {form, dict, uiSchema, data} = this.context as FormContextValue;
        if (form === undefined) return <span className="text-danger">!only in Form!</span>
        let content = factory(form, dict[name], uiSchema && uiSchema[name], data, children);
        if (content === undefined) {
            return <span className="text-danger">!!{name} is not defined!!</span>;
        }
        return content;
    }
}

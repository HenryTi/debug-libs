import * as React from 'react';
import {observable} from 'mobx';
import classNames from 'classnames';
import { Schema, ItemSchema, ArrSchema } from './schema';
import { UiSchema, UiArr, UiItem } from './uiSchema';
import { factory } from './widgets';
import 'font-awesome/css/font-awesome.min.css';
import { ContextContainer, FormContext, Context, RowContext } from './context';

/*
export interface ContextValue {
    readonly form: Form;
    //readonly itemSchemas: {[name:string]: ItemSchema};
    readonly uiSchema: UiSchema;
    readonly data: any;
    readonly inNode: boolean;           // true: 在</> 流中定义Field
    readonly arrSchema: ArrSchema;
}

export const FormContext = React.createContext<ContextValue>({} as any);
*/
export type FormButtonClick = (name:string, context: Context) => void;

export interface FormProps {
    className?: string;
    schema: Schema;
    uiSchema: UiSchema;
    formData?: any;
    onButtonClick?: FormButtonClick;
    Container?: (content:JSX.Element, inNode:boolean) => JSX.Element;
    FieldContainer?: (label:any, content:JSX.Element, context:Context) => JSX.Element;
    FieldClass?: string;
    ArrContainer?: (label:any, content:JSX.Element, inNode:boolean) => JSX.Element;
    RowContainer?: (content:JSX.Element) => JSX.Element;
    ArrFieldContainer?: (label:any, content:JSX.Element, context:RowContext) => JSX.Element;
    ButtonClass?: string;
    RowSeperator?: JSX.Element;
}

export class Form extends React.Component<FormProps> {
    readonly schema: Schema;
    readonly itemSchemas: {[name:string]: ItemSchema};
    readonly uiSchema: UiSchema;
    readonly Container: (content:JSX.Element, inNode:boolean) => JSX.Element;
    readonly FieldContainer: (label:any, content:JSX.Element, context:Context) => JSX.Element;
    readonly FieldClass: string;
    readonly ArrContainer: (label:any, content:JSX.Element, inNode:boolean) => JSX.Element;
    readonly RowContainer: (content:JSX.Element) => JSX.Element;
    readonly ArrFieldContainer: (label:any, content:JSX.Element, context:RowContext) => JSX.Element;
    readonly ButtonClass: string;
    readonly RowSeperator: JSX.Element;
    @observable readonly data:any;

    constructor(props:FormProps) {
        super(props);
        let {schema, uiSchema, formData, 
            Container, FieldContainer, FieldClass, 
            ArrContainer, RowContainer, ArrFieldContainer, 
            ButtonClass, RowSeperator
        } = props;
        this.Container = Container || this.DefaultContainer;
        this.FieldContainer = FieldContainer || this.DefaultFieldContainer;
        this.FieldClass = FieldClass!==undefined && FieldClass!==''&&FieldClass!==null? FieldClass : this.DefaultFieldClass;
        this.ArrContainer = ArrContainer || this.DefaultArrContainer;
        this.RowContainer = RowContainer || this.DefaultRowContainer;
        this.ArrFieldContainer = ArrFieldContainer || this.DefaultArrFieldContainer;
        this.ButtonClass = ButtonClass || this.DefaultButtonClass;
        this.RowSeperator = RowSeperator || this.DefaultRowSeperator;
        this.schema = schema;
        this.itemSchemas = {};
        this.uiSchema = uiSchema;
        this.data = {};
        if (formData === undefined) formData = {};
        for (let itemSchema of schema) {
            let {name, type} = itemSchema;
            this.itemSchemas[name] = itemSchema;
            if (type === 'button') {
            }
            else if (type === 'arr') {
                let arrItem:ArrSchema = itemSchema as ArrSchema;
                let {arr:arrItems} = arrItem;
                if (arrItems === undefined) continue;
                let arrDict = arrItem.itemSchemas = {};
                for (let item of arrItems) {
                    arrDict[item.name] = item;
                }
                let val:any[] = formData[name];
                if (val === undefined) val = [{}];
                else if (Array.isArray(val) === false) val = [val];
                let arr:any[] = [];
                for (let row of val) {
                    let r = {};
                    for (let item of arrItems) {
                        let {name:nm} = item;
                        let v = row[nm];
                        if (v === undefined) v = null;
                        r[nm] = v;
                    }
                    arr.push(r);
                }
                this.data[name] = observable(arr);
            }
            else {
                this.data[name] = formData[name];
            }
        }
    }

    render() {
        let {children} = this.props;
        let content:JSX.Element, inNode:boolean;
        let formContext: FormContext;
        if (children !== undefined) {
            inNode = true;
            content = <>{children}</>;
            formContext = new FormContext(this, inNode);
        }
        else {
            let Templet: React.StatelessComponent;
            if (this.uiSchema !== undefined) {
                Templet = this.uiSchema.Templet;
            }
            if (Templet !== undefined) {
                inNode = true;
                content = <Templet />;
                formContext = new FormContext(this, inNode);
            }
            else {
                inNode = false;
                formContext = new FormContext(this, inNode);
                content = <>{this.schema.map((v, index) => {
                    return <React.Fragment key={index}>{factory(formContext, v, children)}</React.Fragment>
                })}</>;
            }
        }
        //{form: this, itemSchemas: this.itemSchemas, uiSchema: this.uiSchema, data: this.data, inNode:inNode, arrSchema:undefined }
        return <ContextContainer.Provider value={formContext}>
            {this.Container(content, inNode)}
        </ContextContainer.Provider>;
    }

    protected DefaultContainer = (content:JSX.Element, inNode:boolean): JSX.Element => {
        return <form className={classNames(inNode===true&&'form-inline', this.props.className)}>
            {content}
        </form>;
    }
    protected DefaultArrFieldContainer = (label:any, content:JSX.Element, context:RowContext): JSX.Element => {
        return <div className="col"><div className="form-group">
            <label>{label}</label>
            {content}
        </div></div>;
    }
    protected DefaultFieldContainer = (label:any, content:JSX.Element, context:Context): JSX.Element => {
        if (context.isRow === true) {
            return this.ArrFieldContainer(label, content, context as RowContext);
        }
        return <div className="form-group">
            <label>{label}</label>
            {content}
        </div>;
    }
    protected DefaultFieldClass = 'form-control';
    protected DefaultArrContainer = (label:any, content:JSX.Element, inNode:boolean): JSX.Element => {
        return <div>
            <div className={classNames('small text-muted text-center bg-light py-1 px-3 mt-4 mb-1')}>{label}</div>
            <div className="form-inline">{content}</div>
        </div>;
    }
    protected DefaultRowContainer = (content:JSX.Element): JSX.Element => {
        return <div className="row">{content}</div>;
    }
    protected DefaultButtonClass = 'btn';
    protected DefaultRowSeperator = <div className="border border-light border-top my-3" />;
}

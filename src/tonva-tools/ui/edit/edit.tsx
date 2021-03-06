import * as React from 'react';
import _ from 'lodash';
import { Schema, UiSchema, ItemSchema, UiItem, UiTextItem } from '../schema';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
import { StringItemEdit } from './stringItemEdit';
import { ImageItemEdit } from './imageItemEdit';
import { Image } from '../image';
import { RadioItemEdit } from './radioItemEdit';
import { SelectItemEdit } from './selectItemEdit';
import { UiSelectBase } from '../form/uiSchema';
import { observable } from 'mobx';

export interface EditProps {
    className?: string;
    schema: Schema;
    data: any;
    onItemClick?: (itemSchema: ItemSchema, uiItem: UiItem, value: any) => Promise<void>;
    onItemChanged?: (itemSchema: ItemSchema, newValue:any, preValue:any) => Promise<void>;
    stopEdit?: boolean;
    uiSchema?: UiSchema;
    sepClassName?: string;
    topBorderClassName?: string;
    bottomBorderClassName?: string;
    rowContainerClassName?: string;
}

@observer
export class Edit extends React.Component<EditProps> {
    private defaultSepClassName = "border-top edit-sep-light-gray";
    private defaultRowContainerClassName = "d-flex px-3 py-2 bg-white align-items-center";
    private topBorder:JSX.Element;
    private bottomBorder:JSX.Element;
    private rowContainerClassName?: string;
    private sep:JSX.Element;
    private uiSchema: {[name:string]: UiItem};
    @observable private data:any = {};

    constructor(props: EditProps) {
        super(props);
        let {topBorderClassName, bottomBorderClassName, sepClassName, rowContainerClassName, uiSchema, stopEdit} = props;
        this.topBorder = <div className={topBorderClassName || this.defaultSepClassName} />;
        this.bottomBorder = <div className={bottomBorderClassName || this.defaultSepClassName} />;
        this.rowContainerClassName = rowContainerClassName || this.defaultRowContainerClassName;
        if (stopEdit !== true) this.rowContainerClassName += ' cursor-pointer';
        this.sep = <div className={sepClassName || this.defaultSepClassName} />;
        this.uiSchema = (uiSchema && uiSchema.items) || {};
        _.mergeWith(this.data, this.props.data);
    }

    render() {
        let elItems:JSX.Element[] = [];
        let {schema} = this.props;
        let len = schema.length;

        elItems.push(this.topBorder);
        for (let i=0; i<len; i++) {
            if (i>0) elItems.push(this.sep);
            elItems.push(this.renderRow(schema[i]));
        }
        elItems.push(this.bottomBorder);

        return <div>
            {elItems.map((v, index) => <React.Fragment key={index}>{v}</React.Fragment>)}
        </div>;
    }

    private renderRow(itemSchema: ItemSchema):JSX.Element {
        let {name, type, required} = itemSchema;
        let divValue:any;
        let uiItem = this.uiSchema[name];
        let label:string = (uiItem && uiItem.label) || name;
        let value:any = this.data[name];
        if (uiItem !== undefined && value) {
            switch (uiItem.widget) {
                case 'radio':
                case 'select':
                    let {list} = uiItem as UiSelectBase;
                    divValue = <b>{list.find(v => v.value === value).title}</b>;
                    break;
            }
        }
        if (divValue === undefined) {
            switch (type) {
                default:
                    divValue = value? <b>{value}</b> : <small className="text-muted">(无)</small>;
                    break;
                case 'image':
                    divValue = <Image className="w-4c h-4c" src={value} />;
                    break;
            }
        }
        let requireFlag = required===true && <span className="text-danger">*</span>;
        return <div className={this.rowContainerClassName} onClick={async ()=>await this.rowClick(itemSchema, uiItem, label, value)}>
            <div className="w-6c">{label} {requireFlag}</div>
            <div className="flex-fill d-flex justify-content-end">{divValue}</div>
            {this.props.stopEdit!==true && <div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}
        </div>;
    }

    private rowClick = async (itemSchema: ItemSchema, uiItem: UiItem, label:string, value: any) => {
        let {onItemChanged, onItemClick, stopEdit} = this.props;
        if (stopEdit === true) return;
        let changeValue:any;
        if (onItemClick !== undefined) {
            await onItemClick(itemSchema, uiItem, value);
            return;
        }
        let itemEdit:ItemEdit = createItemEdit(itemSchema, uiItem, label, value);
        if (itemEdit === undefined) {
            alert('undefined: let itemEdit:ItemEdit = createItemEdit(itemSchema, uiItem, label, value);');
            return;
        }
        try {
            changeValue = await itemEdit.start();
            if (changeValue != value) {
                this.data[itemSchema.name] = value;
                if (onItemChanged === undefined) {
                    alert(`${itemSchema.name} value changed, new: ${changeValue}, pre: ${value}`);
                }
                else {
                    await onItemChanged(itemSchema, changeValue, value);
                }
            }
            await itemEdit.end();
        }
        catch (err) {
            // 如果直接back，会触发reject，就到这里了
            console.log('no value changed');
        }
    }
}

function createItemEdit(itemSchema: ItemSchema, uiItem:UiItem, label:string, value: any):ItemEdit {
    let itemEdit: new (itemSchema: ItemSchema, uiItem:UiItem, label:string, value: any) => ItemEdit;
    if (uiItem !== undefined) {
        switch (uiItem.widget) {
            default: break;
            case 'text': itemEdit = StringItemEdit; break;
            case 'image': itemEdit = ImageItemEdit; break;
            case 'radio': itemEdit = RadioItemEdit; break;
            case 'select': itemEdit = SelectItemEdit; break;
        }
    }
    if (itemEdit === undefined) {
        switch (itemSchema.type) {
            case 'string': itemEdit = StringItemEdit; break;
            case 'image': itemEdit = ImageItemEdit; break;
        }
    }
    if (itemEdit === undefined) return;
    return new itemEdit(itemSchema, uiItem, label, value);
}

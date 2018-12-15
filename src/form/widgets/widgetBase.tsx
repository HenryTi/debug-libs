import { DataItem } from '../schema';
import { Form } from '../form';
import { UiItem } from '../uiSchema';

export abstract class WidgetBase {
    protected dataItem: DataItem;
    protected observeObj: any;
    protected defaultValue: any;
    protected value: any;

    constructor(form: Form, dataItem:DataItem, ui: UiItem, observeObj: any, defaultValue: any) {
        this.dataItem = dataItem;
        this.observeObj = observeObj;
        this.value = this.defaultValue = defaultValue;
    }

    protected onChange = (evt: React.ChangeEvent<any>) => {
        this.value = evt.currentTarget.value;
        this.observeObj[this.dataItem.name] = this.value;
    }

    abstract render():JSX.Element;
}

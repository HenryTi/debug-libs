import * as React from 'react';
import { Edit, ItemSchema, StringSchema, UiSchema, UiSelect } from 'tonva-tools';

const schema:ItemSchema[] = [
    {name: 'a', type: 'string'} as StringSchema
];

const uiSchema: UiSchema = {
        items: {
        a: {
            label: '中国',
            widget: 'select',
            //rules: EmailFieldRule,
            defaultValue: 1,
            list: [
                {value: 1, title: 'bbb1'},
                {value: 2, title: 'bbb2'},
                {value: 3, title: 'bbb3'},
                {value: 4, title: 'bbb4'}
            ]
        } as UiSelect
    }
};

export default class EditTest extends React.Component {
    render() {
        return <div>
            <Edit schema={schema} data={{}} uiSchema={uiSchema} />
        </div>;
    }
}
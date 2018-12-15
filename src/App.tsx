import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { Form, Field, UiForm, Schema, DataArr } from './form';

const schema: Schema = [
  {name: 'number', type: 'number'}, 
  {name: 'integer', type: 'integer'}, 
  {name: 'date', type: 'date'},
  {
    name: 'arr1', 
    type: 'arr', 
    arr: [
      {name: 'arr1-c', type: 'string'},
      {name: 'arr1-b', type: 'string'}, 
    ]
  } as DataArr
];

const uiSchema: UiForm = {
  items: {
    a: {widget: 'text'}
  }
}

const formData = {
  a: 'aa', b: 'bb', c: 'ccc',
  arr1: [
    {'arr1-b': 'arb--dddd0', 'arr1-c': 'arr1-c-cc-cc0'},
    {'arr1-b': 'arb--dddd1', 'arr1-c': 'arr1-c-cc-cc1'}
  ]
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="container text-left">
          <Form className="mb-5" schema={schema} uiSchema={uiSchema} formData={formData}>
            <Field name="number"/> &nbsp;
            <Field name="integer"/>&nbsp;
            <div className="font-weight-bold text-success h3">nnn<Field name="date"/><br /></div>
            <Field name='arr1'>
              <div><Field name="arr1-b" /><Field name="arr1-c" /></div>
            </Field>
          </Form>
        </div>
      </div>
    );
  }
}

//<Form className="mb-5" schema={schema} uiSchema={uiSchema} formData={formData} />

//<Field name="arr1-b" /><Field name="arr1-c" />

export default App;

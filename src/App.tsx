import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { Form, Field, UiForm, Schema, DataArr, UiArr } from './form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const schema: Schema = [
  /*
  {name: 'number', type: 'number'}, 
  {name: 'integer', type: 'integer'}, 
  {name: 'date', type: 'date'},
  {name: 'text', type: 'string'},
  */
  {
    name: 'arr1', 
    type: 'arr', 
    arr: [
      {name: 'selected', type: 'boolean'},
      {name: 'arr1-c', type: 'string'},
      {name: 'arr1-b', type: 'string'}, 
      {name: 'arr1-a', type: 'string'},
      {name: 'add', type: 'button'}
    ]
  } as DataArr,
  {name: 'submit', type: 'button'}
];

const ArrTemplet = ({form, data, uiArr, row}:{form:Form, data:any, uiArr:UiArr, row:any}) => {
  let arr1A = row['arr1-a'];
  return <>
    <div className="d-flex" style={{textDecoration: 'line-through'}}>
      <div style={{width: '2em'}}><Field name="selected" /></div>
        asdf asdf asf sadf asd f
          {
            arr1A && arr1A.length===3? null:
            <Field name="arr1-b" className="form-control" />
          }
        <div className="form-group">
          <label>ddd</label><Field name="arr1-c" className="form-control" />
        </div>
        <div className="form-group">
          <label>dbb</label><Field name="arr1-a" className="form-control" />
        </div>
        <Field name="add" />
    </div>
</>};

const formData = {
  a: 'aa', b: 'bb', c: 'ccc',
  number: '2', integer: '3',
  text: '???',
  arr1: [
    {'arr1-b': 'arb--dddd0', 'arr1-c': 'arr1-c-cc-cc0'},
    {'arr1-b': 'arb--dddd1', 'arr1-c': 'arr1-c-cc-cc1'}
  ]
};

class App extends React.Component {
  @observable a = 1;
  @observable arr:any[] = [{label:'a', v:1}, {label:'b', v:2}];
  onFormButtonClick = (name:string, data:any, arrName:string, row:any) => {
    let msg:string;
    if (arrName === undefined) {
      msg = `button ${name} clicked!
`
    }
    else {
      msg = `button ${arrName}.${name} clicked!
row data: ${JSON.stringify(row)}
`;
    }
    msg += JSON.stringify(data);
    alert(msg);
  }

  change = observer(()=> {
    return <>{
      this.arr.map((v, index) => {
        let b = <input onChange={()=>{
          this.a = this.a === 1? 0:1;
          v.label += this.a === 1? 'a' : 'b';
        }} />;
        return <Field name="arr1" key={index}><React.Fragment key={index}>
          {this.a === 1? "a11111":"a00000"} - {v.label} -
          {b}
          <Field name="arr1-b" />
        </React.Fragment>
        </Field>
      })
    }
    </>
  });

  private uiSchema: UiForm = {
    items: {
      a: {widget: 'text'},
      submit: {widget: 'button', className: 'btn-primary'},
      arr1: {widget: 'arr', Templet: this.change} as UiArr
    }
  }
  
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
          <Form className="mb-5" 
            schema={schema} uiSchema={this.uiSchema} formData={formData} 
            onButtonClick={this.onFormButtonClick} />
        </div>
      </div>
    );
  }
}
/*
<Form className="mb-5" schema={schema} uiSchema={this.uiSchema}
formData={formData}
onButtonClick={this.onFormButtonClick}>
<div>
  af sasdf as fd<b>dasdf asdf sad</b><Field name="number"/> &nbsp;
  <Field name="integer"/>&nbsp; <i>adsfas dfasdf asd fas fda</i>
</div>
<div className="font-weight-bold text-success h3">nnn<Field name="date"/><br /></div>
<div className="font-weight-bold text-success h3">text<Field name="text"/></div>
<Field name='arr1' />
<Field name='submit' />
</Form>
*/
/*
            // {<this.change />}
          </Form>
<div className="d-flex" style={{textDecoration: 'line-through'}}>
<div style={{width: '2em'}}><Field name="selected" /></div>
  asdf asdf asf sadf asd f
    <Field name="arr1-b" className="form-control" />
  <div className="form-group">
    <label>ddd</label><Field name="arr1-c" className="form-control" />
  </div>
  <div className="form-group">
    <label>dbb</label><Field name="arr1-a" className="form-control" />
  </div>
  <Field name="add" />
</div>
</Field>
*/
//<Field name="arr1-b" /><Field name="arr1-c" />

export default App;

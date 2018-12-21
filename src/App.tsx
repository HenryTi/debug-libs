import * as React from 'react';
import { observable } from 'mobx';
import { Form, Field, UiSchema, Schema, Context, ArrSchema, UiArr, IntSchema } from './form';
import './App.css';
import logo from './logo.svg';

console.log(typeof (<a />));
console.log(typeof (()=>{}));

const schema: Schema = [
  {name: 'number', type: 'number', required: true},
  {name: 'integer', type: 'integer', min:10, max: 30} as IntSchema, 
  {name: 'date', type: 'date'},
  {name: 'text', type: 'string'},
  {
    name: 'arr1', 
    type: 'arr', 
    arr: [
      {name: 'selected', type: 'boolean'},
      {name: 'arr1-c', type: 'string'},
      {name: 'arr1-b', type: 'string'}, 
      {name: 'arr1-a', type: 'string'},
      {name: 'n1', type: 'integer'},
      {name: 'n2', type: 'integer'},
      {name: 'n3', type: 'integer'},
      //{name: 'add', type: 'button'}
    ]
  } as ArrSchema,
  {name: 'submit', type: 'submit'}
];

const formData = {
  a: 'aa', b: 'bb', c: 'ccc',
  number: '2', integer: '3',
  text: '???',
  arr1: [
    {$a:1, 'arr1-b': 'arb--dddd0', 'arr1-c': 'arr1-c-cc-cc0'},
    {$a:1, 'arr1-b': 'arb--dddd1', 'arr1-c': 'arr1-c-cc-cc1'}
  ]
};

const replacer = (key:string, value:any) => {
  if (key === '$row') return;
  return value;
}

class App extends React.Component {
  @observable a = 1;
  @observable arr:any[] = [{label:'a', v:1}, {label:'b', v:2}];
  onFormButtonClick = (name:string, context:Context) => {
    let msg:string;
    if (context.isRow === false) {
      msg = `button ${name} clicked!
      form data: ${JSON.stringify(context.form.data, replacer)}
`
    }
    else {
      msg = `button ${context.arrName}.${name} clicked!
row data: ${JSON.stringify(context.data, replacer)}
form data: ${JSON.stringify(context.form.data, replacer)}
`;
    }
    alert(msg);
  }

  private onBChange = (row:any)=>{
    if (row.$a === 1) {
      row.$a = 0;
    }
    else {
      row.$a = 1;
    } 
  };

  arrTemplet = ()=> {
    return <div className="form-inline">
      <Field name="selected" />
      <Field name="arr1-c" />
      <Field name="n1" /><Field name="n2" /><Field name="n3" />
    </div>
  };

  arrTemplet1 = <div className="form-inline">
    <Field name="selected" />
    <Field name="arr1-c" />
    <Field name="n1" /><Field name="n2" /><Field name="n3" />
  </div>;

  /*
  <div className="font-weight-bold">{data['n1']*data['n2']}</div>
  <Field name="arr1-a" onChanged={(value:any, prev:any) => data['arr1-b']=value} />
  {data.$a !== 1? <span style={{textDecoration:'line-through'}}>a11111</span>: <span>a00000</span>} - {data['arr1-c']} -
  <input onChange={()=>this.onBChange(data)} placeholder="BBBBB Changed" />
  {data.$a && <Field name="arr1-b" />}
  {data.$a === 1? <Field name="arr1-b" />:
  */
  private uiSchema: UiSchema = {
    items: {
      a: {widget: 'text'},
      submit: {widget: 'button', className: 'btn btn-primary'},
      arr1: {
        widget: 'arr', 
        Templet: this.arrTemplet1, // this.arrTemplet,
        items: {
          "arr1-c": {className: "w-max-6c" },          
          n1: {widget:'radio', className:'flex-grow-1', list:[{title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n2: {widget:'select', readOnly:true, list:[{value:null, title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n3: {widget:'range'}
        }
      } as UiArr
    },
    Templet: () => <>
      <div className="form-inline"><div>af sasdf as fd<b>dasdf asdf sad</b><Field name="number"/> &nbsp;
        <Field name="integer"/>&nbsp; <i>adsfas dfasdf asd fas fda</i>
      </div>
      <div className="font-weight-bold text-success h3">nnn<Field name="date"/><br /></div>
      <div className="font-weight-bold text-success h3">text<Field name="text"/></div>
      </div>
      <Field name='arr1' />
      <div className="text-center"><Field name='submit' /></div>
    </>,
    selectable: true,
    deletable: true,
    restorable: true,
  }
  private uiSchema1: UiSchema = {
    items: {
      a: {widget: 'text'},
      submit: {widget: 'button', className: 'btn btn-primary'},
      arr1: {
        widget: 'arr', 
        //Templet: this.change,
        items: {
          n1: {widget:'radio', list:[{title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n2: {widget:'select', list:[{value:null, title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n3: {widget:'range'}
        }
      } as UiArr
    },
    selectable: true,
    deletable: true,
    restorable: true,
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
          <Form className="mb-3" 
            schema={schema} uiSchema={this.uiSchema} formData={formData} 
            onButtonClick={this.onFormButtonClick} />
          <Form className="mb-3" 
            schema={schema} uiSchema={this.uiSchema1} formData={formData} 
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

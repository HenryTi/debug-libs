import * as React from 'react';
import { observable } from 'mobx';
import { Form, Field, UiSchema, Schema, Context, ArrSchema, UiArr, IntSchema, StringSchema, UiTextAreaItem, UiIdItem, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import logo from './logo.svg';
import { MinusPlusWidget } from './minusPlusWidget';
import RegSuccess from 'tonva-tools/entry/regSuccess';

const schema: Schema = [
  {name: 'id', type: 'id', required: true},
  {name: 'number', type: 'number', required: true},
  {name: 'integer', type: 'integer', min:10, max: 30} as IntSchema, 
  {name: 'date', type: 'date'},
  {name: 'text', type: 'string', maxLength: 5} as StringSchema,
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
      {
        name: 'subArr',
        type: 'arr',
        arr: [
          {name: 'sa1', type: 'string'},
          {name: 'sa2', type: 'integer'}
        ]
      }
      //{name: 'add', type: 'button'}
    ]
  } as ArrSchema,
  {name: 'submit', type: 'submit'}
];

const formData = {
  a: 'aa', b: 'bb', c: 'ccc',
  number: 2, integer: 3,
  text: '???',
  arr1: [
    {
      $a:1, 'arr1-b': 'arb--dddd0', 'arr1-c': 'arr1-c-cc-cc0', 
      n1:1,
      subArr: [
        {sa1: 'text1', sa2: 1},
        {sa1: 'text2', sa2: 2},
        {sa1: 'text3', sa2: 3},
      ]
    },
    {$a:1, 'arr1-b': 'arb--dddd1', 'arr1-c': 'arr1-c-cc-cc1', n1:2},
    {$a:1, 'arr1-b': 'arb--dddd1', 'arr1-c': 'asd fsd farr1-c-cc-cc1', n1:3},
  ]
};

const replacer = (key:string, value:any) => {
  if (key === '$row') return;
  return value;
}

export class MyApp extends React.Component {
  @observable a = 1;
  @observable arr:any[] = [{label:'a', v:1}, {label:'b', v:2}];
  onFormButtonClick = async (name:string, context:Context) => {
    let msg:string;
    if (context.isRow === false) {
      msg = `button ${name} clicked!
      form data: ${JSON.stringify(context.form.data, replacer)}
`
    }
    else {
      msg = `button ${context.arrName}.${name} clicked!
row data: ${JSON.stringify(context.initData, replacer)}
form data: ${JSON.stringify(context.form.data, replacer)}
`;
    }
    alert(msg);
    return 'submit error -- hi define';
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
    rules: (context:Context) => {
      let n = context.getValue('number');
      let i = context.getValue('integer');
      if (n===i) return undefined;
      return {integer: 'number must equal intege!'};
    },
    items: {
      id: {widget: 'id', pickId: async (context:Context, name:string, value:number)=>{alert('输入2');return 2;}} as UiIdItem,
      text: {widget: 'textarea', rows: 7} as UiTextAreaItem,
      a: {widget: 'text'},
      number: {
        widget: 'custom',
        className: 'mx-1 text-center',
        WidgetClass: MinusPlusWidget,
      } as UiCustom,
      integer: {
        className: 'mx-1',
        rules: (value:any) => {if (value === 19) return '不能为19';else return undefined}, 
        //Templet:(context:Context, name:string, value:any)=><>{name}: {value}</>
      },
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa fa-diamond" />&nbsp; 提交</>},
      arr1: {
        widget: 'arr', 
        Templet: this.arrTemplet1, // this.arrTemplet,
        //rules: (context:Context) => {return 'err'},
        items: {
          "arr1-c": {className: "w-max-6c" },          
          n1: {widget:'radio', className:'flex-grow-1', defaultValue:2, list:[{value:1, title:'小提琴'}, {value:2, title:'钢琴'}, {value:3, title:'单簧管'}]},
          n2: {widget:'select', list:[{value:null, title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n3: {widget:'range'},
          subArr: {
            widget: 'arr',
            Templet: <>TTT<Field name="sa1"/> 'text1', <Field name="sa2" /> : 1, ddd </>,
            items: {

            }
          } as UiArr
        }
      } as UiArr
    },
    Templet: () => <>
      <div className="form-inline">
        <Field name="id" />
        af sasdf as fd<b>dasdf asdf sad</b>
        <Field name="number"/>
        &nbsp;
        <Field name="integer" />&nbsp; <i>adsfas dfasdf asd fas fda</i>
        <div className="font-weight-bold text-success h3">
          nnn<Field name="date"/>
          <br />
        </div>
        <div className="font-weight-bold text-success h3">
          text<Field name="text"/>
        </div>
      </div>
      <Field name='arr1' />
      <div className="text-center"><Field name='submit' /></div>
    </>,
    //selectable: true,
    //deletable: true,
    //restorable: true,
  }
  private uiSchema1: UiSchema = {
    items: {
      id: {widget: 'id', pickId: async (context:Context, name:string, value:number)=>{return 2;}} as UiIdItem,
      a: {widget: 'text'},
      submit: {widget: 'button', className: 'btn btn-primary'},
      arr1: {
        widget: 'arr', 
        //Templet: this.change,
        items: {
          n1: {widget:'radio', list:[{title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n2: {widget:'select', list:[{value:null, title:' - '},{value:1, title:'数字1'}, {value:2}]},
          n3: {widget:'range'},
          subArr: {
            widget: 'arr',
            Templet: <>TTT<Field name="sa1"/> 'text1', <Field name="sa2" /> : 1, ddd </>,
            items: {

            }
          } as UiArr
        }
      } as UiArr
    },
    selectable: true,
    deletable: true,
    restorable: true,
  }

  private schema3 = [
    {name:'a', type: 'string', maxLength:10} as StringSchema,
    {name:'b', type: 'number', max: 20, min:10} as NumSchema,
    {name:'submit', type:'submit'} as ButtonSchema,
  ];

  private uiSchema3 = {
    items: {
      a: {widget: 'text', label:'欢迎输入a', rules:(value:any)=>{if (value==='a') return 'a is not valid'}} as UiTextItem,

    }
  }

  private fetchClick = async () => {
    let a = await fetch('http://localhost:50976/api/Center/CreateSession', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rsaKey: null})
    });
  }

  private regSuccess = () => {
    nav.push(<RegSuccess user="aa" pwd="bb" />);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Form className="mb-3" 
schema={schema} uiSchema={this.uiSchema} formData={formData} 
onButtonClick={this.onFormButtonClick}
beforeShow={context => {
  //context.setDisabled('integer', true)
}} />

<Form
schema={this.schema3} uiSchema={this.uiSchema3}
/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          <button onClick={this.fetchClick}>fetch</button>
          <button onClick={this.regSuccess}>fetch</button>
        </p>
        <div className="App-container container text-left">
          <Form className="mb-3" 
            schema={schema} uiSchema={this.uiSchema1} formData={formData} 
            onButtonClick={this.onFormButtonClick}
            fieldLabelSize={2}
            beforeShow={context => {
              context.setVisible('date', false)
            }} 
            />

        </div>
      </div>
    );
  }
}



export default MyApp;

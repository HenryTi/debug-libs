import * as React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './App.css';
import { Page, Tabs, NavView, nav, Image, ResUploader } from 'tonva-tools';
import { faceTabs } from 'face';
import { ViewMainSubs, ViewListMainSubs, MainProduct, SubPack, renderMainProduct, renderSubPack } from 'mainSubs';

/*
@observer
class ResUploader extends React.Component {
    private fileInput: HTMLInputElement;
    @observable private resSrc: string;

    private upload = async () => {
        let urlPath = host.getUrlOrDebug('http://101.200.46.56/res/', 'http://uqhost/res/');

        var files:FileList = this.fileInput.files;
        var data = new FormData();
        let len = files.length;
        for (let i=0; i<len; i++) {
            let file = files[i];
            data.append('files[]', file, file.name);
        }
  
        let url = urlPath + 'upload';
        try {
            let abortController = new AbortController();
            let res = await fetch(url, {
                method: "POST",
                body: data,
                signal: abortController.signal,
            });
            let json = await res.json();
            //alert (JSON.stringify(json));
            this.resSrc = ':' + json.res.id;
            //nav.push(<CompileResult {...this.props} res={res} abortController={abortController} />);
        }
        catch (e) {
            console.error('%s %s', url, e);
        }
    }
    private onSubmit = (evt:React.FormEvent<any>) => {
        evt.preventDefault();
    }
    render() {
        //return <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        return <div>
            <input ref={t=>this.fileInput=t} 
                type='file' name='file' multiple={false} />
            <input type='button' name='submit' value='upload' onClick={this.upload} />
            <br/>
            <Image src={this.resSrc} />
        </div>
    }
}
*/
@observer
class Uploader extends React.Component {
    private resUploader: ResUploader;
    @observable private resId:string;

    private upload = async () => {
        if (!this.resUploader) return;
        this.resId = await this.resUploader.upload();
    }
    render() {
        //return <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        return <div>
            <ResUploader ref={v=>this.resUploader=v} />
            <input type='button' name='submit' value='upload' onClick={this.upload} />
            <br/>
            <Image src={this.resId} />
        </div>
    }
}

class A {
    async loadA():Promise<void> {
        console.log('A.loadA()');
    }
    load():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            console.log('A.load()');
            return;
        });
        //return;
    }
}

class B extends A {
    load():Promise<void> {
        return this.loadA().then(()=>{
            console.log('B.load()');
        });
        /*
        return super.load().then(() => {
            console.log('B.load()');
        });
        */
    }
}

let mainSubs = {
    main: {
        product: {
            id: 1,
            discription: 'great product'
        }
    },
    subs: [
        {
            pack: {
                id: 1,
                name: '1g',
            },
            quantity: 3,
            amount: 5,
            vipPrice: 6,
            price: 7
        },
        {
            pack: {
                id: 1,
                name: '8g',
            },
            quantity: 31,
            amount: 52,
            vipPrice: 36,
            price: 37
        }
    ]
};

class App extends React.Component {
    componentWillMount() {
        let b = new B();
        b.load();
    }

    render() {
        let one = new ViewMainSubs<MainProduct, SubPack>(renderMainProduct, renderSubPack);
        one.model = mainSubs;
        let list = new ViewListMainSubs<MainProduct, SubPack>(
            ViewMainSubs, 
            renderMainProduct, 
            renderSubPack);
        list.model = [
            mainSubs,
            mainSubs,
        ]

        let page = <Page header={false}>
            <Uploader />
            {one.render()}
            <br/>
            <br/>
            {list.render()}
        </Page>;
        //<Tabs tabs={faceTabs} />
        return <NavView 
            onLogined={async () => nav.push(page)}
            notLogined={async () => nav.push(page)} />;
    }
}

export default App;
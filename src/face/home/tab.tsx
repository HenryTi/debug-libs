import * as React from 'react';
import Loadable from 'react-loadable';
import { nav, Page, Loading } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import logo from './logo.svg';

let LoadableComponent = Loadable({
    loader: ()=>import('./formTest'),
    loading: Loading
});

let LoadableEditComponent = Loadable({
    loader: ()=>import('./editTest'),
    loading: Loading
});

const showFormClick = () => {
    nav.push(<Page header="Form Test"><LoadableComponent /></Page>);
}

const showEditClick = () => {
    nav.push(<Page header="Edit Test"><LoadableEditComponent /></Page>);
}

const aContent = () => {
    let products = [
        {id: 1, discription: '水', price: 2.5},
        {id: 2, discription: '盐', price: 30.99},
    ]

    function renderRow(item, index) {
        let {id, discription, price} = item;
        return <div className="px-3 py-3 d-flex flex-column">
            <div>{id} {discription} </div>
            <div className="d-flex">
                <div className="flex-grow-1"><span className="text-danger font-weight-bold">{price}</span> <small>元</small></div>
                <div><button className="btn btn-outline-danger btn-sm">加购物车</button></div>
            </div>
        </div>
    }

    function onClick(item) {
        let {id, discription} = item;
        nav.push(<Page header={discription}>
            <div>{id}</div>
            <div>{discription}</div>
            <div><button className="btn btn-danger btn-block">选购</button></div>
        </Page>);
    }

    return <div>
        <div className="d-flex p-2 align-items-center">
            <div className="mr-2" onClick={()=>nav.push(<Page header="百灵威公司介绍">
                <div className="text-center cursor-pointer">
                    {[1,2,3,4,5,6].map(v => <div key={v}>
                        <img src={logo} className="App-logo" alt="logo" />
                        J&K, the best
                    </div>
                    )}
                </div>
            </Page>)}>百灵威</div>
            <SearchBox className="flex-grow-1" onSearch={async (key)=>{return}} />
        </div>
        <List items={products} item={{render:renderRow, onClick:onClick}} />
        <button onClick={showFormClick}>show form</button>
        <button onClick={showEditClick}>show edit</button>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa a sdfasdf af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        adf sf sfa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        s dfafa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        s dfsdf afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        s sd fafa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        ad fgfa af asfd <br/>
        d gdfg afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
    </div>;
}

export default aContent;
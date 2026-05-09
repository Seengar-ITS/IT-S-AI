import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import NewConv from './pages/NewConv.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';
import ApiKeys from './pages/ApiKeys.jsx';
import Nav from './components/Nav.jsx';
export default function App(){
  return React.createElement(BrowserRouter,null,
    React.createElement(Nav),
    React.createElement(Routes,null,
    React.createElement(Route,{path:'/',element:React.createElement(Home)}),
    React.createElement(Route,{path:'/new',element:React.createElement(NewConv)}),
    React.createElement(Route,{path:'/history',element:React.createElement(History)}),
    React.createElement(Route,{path:'/settings',element:React.createElement(Settings)}),
    React.createElement(Route,{path:'/api-keys',element:React.createElement(ApiKeys)})
    )
  );
}

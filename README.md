# react-module-state
A model data management method for micro front end

# Installation
npm install react-module-state

# Usage
## Basic Usage
Refer to the basic usage of [react-easy-state](https://github.com/RisingStack/react-easy-state#introduction-wave)
```
import React from 'react';
import { store, view } from 'react-module-state';

const counter = store({
  num: 0,
  increment: () => counter.num++
});

export default view(() => (
  <button onClick={counter.increment}>{counter.num}</button>
));
```
## Provider Usage
### parent component
```
import { injectModel } from 'react-module-state';
export injectModel({
    modelA: (props) => {
        return {
            num: props.num || 0,
            increment: () => counter.num++
        }
    }
})((props) => {
    return <div>
        <button onClick={props.modelA.increment}>{
            props.modelA.num
        }</button>
        <Child />
    </div>
})
```
### child component
```
import { inject } from 'react-module-state';
export default inject('modelA')(() => {
    return <div>
        <span>current num</span>
        <span>{props.modelA.num}</span>
    </div>
})
```
## model event usage
### model
```
import { BaseState } from 'react-module-state';
export default class Model extends BaseState<'eventA'|'eventB'> {
    num = 0;
    increment() {
        this.num++;
        this.$emit('eventA', num);
    }
}
```
### component
```
import {view, store} from 'react-module-state';
import Model from './model';
import {useEffect} from 'react';
const model = store(new Model);
export default (props) => {
    useEffect(() => {
        model.$on('eventA', (num) => {
            console.log(num);
        });
    }, []);
    return <div>
         <button onClick={props.modelA.increment}>{
            props.modelA.num
        }</button>
    </div>
}
```
# API

## store
Make the model monitorable

## view
Make components reactive

## injectProvider
Create a provider component, then inject a monitorable model and make the component responsive

## inject
Inject a model from the parent provider and make the component responsive

## BaseState
You can create a local event listener associated with a model
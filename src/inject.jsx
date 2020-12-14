import React from 'react';
import { view } from './view';
import { store } from './store';
const _ = require('lodash');
const EasyContext = React.createContext({});
const Provider = EasyContext.Provider;
const hoistBlackList = {
    $$typeof: 1,
    render: 1,
    compare: 1,
    type: 1,
    childContextTypes: 1,
    contextType: 1,
    contextTypes: 1,
    defaultProps: 1,
    getDefaultProps: 1,
    getDerivedStateFromError: 1,
    getDerivedStateFromProps: 1,
    mixins: 1,
    propTypes: 1
}
// function copyStaticProperties(base, target) {
//     const protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base))
//     Object.getOwnPropertyNames(base).forEach(key => {
//         if (!hoistBlackList[key] && protoProps.indexOf(key) === -1) {
//             Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key)!)
//         }
//     })
// }

function grabStoresFn(context, oldProps, names) {
    const newProps = {};
    names.forEach((key) => {
        if (oldProps[key]) return;
        if (!(key in context)) {
            throw new Error(
                "injector: Store '" +
                    key +
                    "' is not available! Make sure it is provided by some Provider"
            )
        }
        newProps[key] = context[key]
    });
    return newProps;
}
function getInjectName(component, injectNames) {
    let displayName
    const componentName =
        component.displayName ||
        component.name ||
        (component.constructor && component.constructor.name) ||
        "Component"
    if (injectNames) displayName = "inject-with-" + injectNames + "(" + componentName + ")"
    else displayName = "inject(" + componentName + ")"
    return displayName;
}
const inject = (injectNames) => {
    if (!_.isArray(injectNames)) {
        injectNames = [injectNames];
    }
    return (ComP) => {
        class Inject extends React.Component {
            NewComponent
            constructor (props) {
                super(props);
                this.NewComponent = view(ComP);
            }
            render() {
                return <EasyContext.Consumer>
                    {
                        (values) => {
                            return <this.NewComponent ref={this.props.forwardRef} {...grabStoresFn(values || {}, this.props, injectNames)} {...this.props} />
                        }
                    }
                </EasyContext.Consumer>
            }
        }
        return React.forwardRef((props, ref)=> {
            return <Inject forwardRef={ref} {...props} />
        });
    }
};
function injectModel(storeMap) {
    return (ComP) => {
        class InjectProvider extends React.Component {
            stores = {};
            NewComP;
            constructor(props) {
                super(props);
                Object.keys(storeMap).forEach(key => {
                    this.stores[key] = store(storeMap[key](props));
                });
                this.NewComP = view(ComP);

            }
            render() {
                return <EasyContext.Provider value={this.stores}>
                    <this.NewComP {...this.stores} {...this.props} ref={this.props.forwardRef} />
                </EasyContext.Provider>;
            }
        }
        // copyStaticProperties(ComP, InjectProvider);
        return React.forwardRef((props, ref) => {
            return <InjectProvider {...props} forwardRef={ref} />;
        });
    }
}
export {
    injectModel,
    inject
}
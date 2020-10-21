declare module 'react-module-state' {
  import { ComponentType, DependencyList } from 'react';

  // takes an object (optionally), wraps it in a transparent proxy and returns the proxy
  function store<Store extends object>(obj?: Store): Store;
  
  abstract class BaseState<T> {
    $emit<E extends keyof T>(eventName: E, params: T[E]): Promise<void>;
    $on<E extends keyof T>(eventName: E, callback: (params: T[E]) => any): void;
    $remove<E extends keyof T>(eventName: E, callback: (params: T[E]) => any): void;
  }

  // takes class or function component and returns a class HOC
  function view<Comp extends ComponentType<any>>(comp: Comp): Comp;
  function injectModel<Comp extends ComponentType<any>>(modules: {
    [moduleName: string]: () => any
  }): (Comp) => Comp;
  function inject(moduleName: string): (Comp) => any;
  // interface ModelMap {
  //   [modelName: string]: (props: any) => any
  // }
  // class Components<P, S> extends React.Component {
  //   props: {
  //     Model: any
  //   }
  // }
  // interface ComponentClasss<P = {}> {
  //   new (props: P, context?: any): Components<P>;
  // }
  // function createProvider(modules: ModelMap): {
  //   injectRoot: <T extends React.ComponentClass<{
  //     Model: any
  //   }>>(Comp: ComponentClasss) => any
  //   inject: <T extends {
  //     [G in keyof ModelMap]: ReturnType<ModelMap[G]>
  //   }>(Comp: React.ComponentType<T>) => any
  // }
  // function injectModel<H extends ModelMap>(storeMap: H)
  //   : <G, T extends {
  //     [G in keyof H]: ReturnType<H[G]>
  //   }>(Comp: ComponentType<G & T>) => ComponentType<G>
    // function inject(moduleName: string)
    //   : <CompT extends ComponentType<any>, T extends React.ComponentProps<CompT>>(Comp: CompT) => React.Consumer<ComponentType<
    //     {
    //       [G in keyof ModelMap]: ReturnType<ModelMap[G]>
    //     } & T
    //   >>
  // function injectModel(storeMap: ModelMap)
  //   : <CompT extends ComponentType<any>, T extends React.ComponentProps<CompT>>(Comp: CompT) => ComponentType<
  //     {
  //       [G in keyof ModelMap]: ReturnType<ModelMap[G]>
  //     } & T
  //   >
  // function inject(moduleName: string)
  //   : <CompT extends ComponentType<any>, T extends React.ComponentProps<CompT>>(Comp: CompT) => React.Consumer<ComponentType<
  //     {
  //       [G in keyof ModelMap]: ReturnType<ModelMap[G]>
  //     } & T
  //   >>
    
  // {
  //   return (Comp: CompT) => {
  //       class InjectProvider<T extends React.ComponentProps<CompT>, G extends keyof ModelMap> extends React.Component<> {
  // this runs the passed function and delays all re-renders until the function is finished running
  // function batch<T = any>(
  //   fn: (...args: any[]) => T,
  //   ctx?: any,
  //   args?: any[],
  // ): T;
  // function autoEffect(
  //   effect: () => void,
  //   deps?: DependencyList,
  // ): () => void | undefined;
  // function clearEffect(effect: () => void): void;
}
interface Events {
  update: (s: any) => void
}
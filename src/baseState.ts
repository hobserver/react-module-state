export default class BaseState {
    _____EVENTS = [];
    $on(type, callback) {
        if (!this._____EVENTS[type]) {
            this._____EVENTS[type] = [];
        }
        if (!this._____EVENTS[type].find(item => {
            return item === callback
        })) {
            this._____EVENTS[type].push(callback);
        }
    }
    $emit(type, params) {
        if (!this._____EVENTS[type]) {
            this._____EVENTS[type] = [];
        }
        this._____EVENTS[type].forEach((callback) => {
            callback.apply(null, params);
        });
    }
}
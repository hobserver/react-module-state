class BaseState {
    _events = {
    }
    async $emit(eventName, params) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        for (var i = 0; i < this._events.length; i++) {
            await this._events[eventName](params);
        }
    }
    $on(eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
            this._events[eventName].push(callback);
        } else {
            if (!this._events[eventName].find((item) => {
                return item == callback
            })) {
                this._events[eventName].push(callback);
            }
        }
    }
    $remove(eventName, callback) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(item => {
                return item !== callback
            });
        }
    }
}
export {BaseState};
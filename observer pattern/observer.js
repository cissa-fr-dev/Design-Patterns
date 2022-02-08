var _a;
var InputObservable = /** @class */ (function () {
    function InputObservable(input) {
        this.input = input;
        this.observerList = [];
    }
    InputObservable.prototype.subscribe = function () {
        var _this = this;
        var observers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observers[_i] = arguments[_i];
        }
        observers.forEach(function (observer) {
            if (!_this.observerList.includes(observer)) {
                _this.observerList.push(observer);
            }
        });
    };
    InputObservable.prototype.unsubscribe = function (oldObserver) {
        if (this.observerList.indexOf(oldObserver) !== -1) {
            var newObserverList = this.observerList.filter(function (observer) { return oldObserver !== observer; });
            this.observerList = newObserverList;
        }
    };
    InputObservable.prototype.notify = function () {
        var _this = this;
        this.observerList.forEach(function (observer) { return observer.update(_this); });
    };
    return InputObservable;
}());
var InputReadOnly = /** @class */ (function () {
    function InputReadOnly(element) {
        this.element = element;
    }
    InputReadOnly.prototype.update = function (observable) {
        if (this.element && observable.input)
            this.element.value = observable.input.value;
    };
    return InputReadOnly;
}());
var input = new InputObservable(document.querySelector('.input'));
var readOnlyInput1 = new InputReadOnly(document.querySelector('.read-only-input1'));
var readOnlyInput2 = new InputReadOnly(document.querySelector('.read-only-input2'));
var subscribeButton1 = document.querySelector('.subscribe-button1');
var subscribeButton2 = document.querySelector('.subscribe-button2');
var unsubscribeButton1 = document.querySelector('.unsubscribe-button1');
var unsubscribeButton2 = document.querySelector('.unsubscribe-button2');
var listeningMessage1 = document.querySelector('.lintening-message1');
var listeningMessage2 = document.querySelector('.lintening-message2');
var possibleListeningMessage = ['Listening...', 'Not listening'];
handleSubscribeClick(subscribeButton1, readOnlyInput1, listeningMessage1, possibleListeningMessage[0]);
handleSubscribeClick(subscribeButton2, readOnlyInput2, listeningMessage2, possibleListeningMessage[0]);
handleUnsubscribeClick(unsubscribeButton1, readOnlyInput1, listeningMessage1, possibleListeningMessage[1]);
handleUnsubscribeClick(unsubscribeButton2, readOnlyInput2, listeningMessage2, possibleListeningMessage[1]);
function subscribeElement(element) {
    input.subscribe(element);
}
function unsubscribeElement(element) {
    input.unsubscribe(element);
}
(_a = input.input) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', function () {
    input.notify();
});
function handleSubscribeClick(button, element, elementListener, elementListenerText) {
    button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
        subscribeElement(element);
        if (elementListener)
            elementListener.innerHTML = elementListenerText;
    });
}
function handleUnsubscribeClick(button, element, elementListener, elementListenerText) {
    button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
        unsubscribeElement(element);
        if (elementListener)
            elementListener.innerHTML = elementListenerText;
    });
}

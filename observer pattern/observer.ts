interface IObservable {
  subscribe(...newObserver: IObserver[]): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}

interface IObserver {
  update(...args: InputObservable[]): void;
}

class InputObservable implements IObservable {
  private observerList: IObserver[] = [];

  constructor(public input: HTMLInputElement | null) {}

  subscribe(...observers: IObserver[]): void {
    observers.forEach((observer) => {
      if (!this.observerList.includes(observer)) {
        this.observerList.push(observer);
      }
    });
  }

  unsubscribe(oldObserver: IObserver): void {
    if (this.observerList.indexOf(oldObserver) !== -1) {
      const newObserverList = this.observerList.filter(
        (observer) => oldObserver !== observer
      );

      this.observerList = newObserverList;
    }
  }

  notify(): void {
    this.observerList.forEach((observer) => observer.update(this));
  }
}

class InputReadOnly implements IObserver {
  constructor(public element: HTMLInputElement | null) {}

  update(observable: InputObservable): void {
    if (this.element && observable.input)
      this.element.value = observable.input.value;
  }
}

const input = new InputObservable(document.querySelector('.input'));
const readOnlyInput1 = new InputReadOnly(
  document.querySelector('.read-only-input1')
);
const readOnlyInput2 = new InputReadOnly(
  document.querySelector('.read-only-input2')
);

const subscribeButton1 = document.querySelector('.subscribe-button1');
const subscribeButton2 = document.querySelector('.subscribe-button2');

const unsubscribeButton1 = document.querySelector('.unsubscribe-button1');
const unsubscribeButton2 = document.querySelector('.unsubscribe-button2');

const listeningMessage1 = document.querySelector('.lintening-message1');
const listeningMessage2 = document.querySelector('.lintening-message2');

const possibleListeningMessage = ['Listening...', 'Not listening'];

handleSubscribeClick(
  subscribeButton1,
  readOnlyInput1,
  listeningMessage1,
  possibleListeningMessage[0]
);

handleSubscribeClick(
  subscribeButton2,
  readOnlyInput2,
  listeningMessage2,
  possibleListeningMessage[0]
);

handleUnsubscribeClick(
  unsubscribeButton1,
  readOnlyInput1,
  listeningMessage1,
  possibleListeningMessage[1]
);

handleUnsubscribeClick(
  unsubscribeButton2,
  readOnlyInput2,
  listeningMessage2,
  possibleListeningMessage[1]
);

function subscribeElement(element: IObserver) {
  input.subscribe(element);
}

function unsubscribeElement(element: IObserver) {
  input.unsubscribe(element);
}

input.input?.addEventListener('keyup', function () {
  input.notify();
});

function handleSubscribeClick(
  button: Element | null,
  element: InputReadOnly,
  elementListener: Element | null,
  elementListenerText: string
) {
  button?.addEventListener('click', function () {
    subscribeElement(element);

    if (elementListener) elementListener.innerHTML = elementListenerText;
  });
}

function handleUnsubscribeClick(
  button: Element | null,
  element: InputReadOnly,
  elementListener: Element | null,
  elementListenerText: string
) {
  button?.addEventListener('click', function () {
    unsubscribeElement(element);

    if (elementListener) elementListener.innerHTML = elementListenerText;
  });
}

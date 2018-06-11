export default class EventHub<EventList> {
  protected subscribers: Map<keyof EventList, Function[]>;

  constructor() {
    this.subscribers = new Map<keyof EventList, Function[]>();
  }

  send<K extends keyof EventList>(key: K, value: EventList[K]): void {
    this.getSubscribers(key).forEach((callbackFn) => {
      callbackFn(value);
    });
  }

  subscribe<K extends keyof EventList>(key: K, subscriber: (value: EventList[K]) => void): boolean {
    const subscribers = this.getSubscribers(key);
    if (subscribers.indexOf(subscriber) === -1) {
      subscribers.push(subscriber);
      return true;
    }
    return false;
  }

  subscribeOnce<K extends keyof EventList>(key: K, subscriber: (value: EventList[K]) => void): void {
    const container = (value: EventList[K]) => {
      subscriber(value);
      this.unsubscribe(key, container);
    };
    this.subscribe(key, container);
  }

  unsubscribe<K extends keyof EventList>(key: K, subscriber: (value: EventList[K]) => void): boolean {
    const subscribers = this.getSubscribers(key);
    const index = subscribers.indexOf(subscriber);
    if (index === -1) {
      return false;
    } else {
      subscribers.splice(index, 1);
      return true;
    }
  }

  protected getSubscribers<K extends keyof EventList>(key: K): ((value: EventList[K]) => void)[] {
    const subscribers = this.subscribers.get(key);
    if (subscribers !== undefined) {
      return subscribers as ((value: EventList[K]) => void)[];
    } else {
      const newList: ((value: EventList[K]) => void)[] = [];
      this.subscribers.set(key, newList);
      return newList;
    }
  }
}
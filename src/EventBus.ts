import { batchCall } from './batchCall';

export class EventBus<T extends Record<string, any>> {
  private _handleMap = new Map<keyof T, Function[]>();
  private _delegatorList: ((key: any, ev: any) => any)[] = [];

  emit<K extends keyof T>(type: K, ev: T[K]) {
    const handlers = this._handleMap.get(type);
    if (handlers && handlers.length > 0) batchCall(handlers, ev);
    if (this._delegatorList.length > 0) batchCall(this._delegatorList, type, ev);
  }

  listen<K extends keyof T>(type: K, handler: (ev: T[K]) => any) {
    this._handleMap.set(type, (this._handleMap.get(type) || []).concat(handler));
    return () => this.remove(type, handler);
  }

  has<K extends keyof T>(type: K, handler?: Function) {
    if (handler) return this._handleMap.get(type)?.includes(handler);
    return this._handleMap.has(type);
  }

  remove<K extends keyof T>(type?: K, handler?: Function) {
    // 卸载指定 handler
    if (type && handler) {
      this._handleMap.set(
        type,
        (this._handleMap.get(type) || []).filter(h => h !== handler)
      );
    }

    // 卸载指定 type 的 handler
    else if (type) this._handleMap.delete(type);
    // 卸载所有
    else this._handleMap.clear();
  }

  delegate(handler: <K extends keyof T>(type: K, ev: T[K]) => any) {
    this._delegatorList.push(handler);

    return () => {
      const idx = this._delegatorList.indexOf(handler);
      if (idx >= 0) this._delegatorList.splice(idx, 1);
    };
  }

  delegateReceiver(scope: string) {
    return (type: any, ev: any) => {
      this.emit(scope + type, ev);
    };
  }

  get delegatorCnt() {
    return this._delegatorList.length;
  }

  clear() {
    this._handleMap.clear();
    this._delegatorList.length = 0;
  }
}

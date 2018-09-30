'use strict';

export default class {
	constructor (object, watchers) {
		const context = this;
		context.watchers = watchers || [];

		const handler = {
			get(target, property, receiver) {
				try {
					return new Proxy(target[property], handler);
				} catch (err) {
					return Reflect.get(target, property, receiver);
				}
			},
			defineProperty(target, property, descriptor) {
				context.watchers.forEach(watcher => {
					watcher.call(null, target, property, descriptor)
				});
				return Reflect.defineProperty(target, property, descriptor);
			},
			deleteProperty(target, property) {
				context.watchers.forEach(watcher => {
					watcher.call(null, target, property, descriptor)
				});
				return Reflect.deleteProperty(target, property);
			}
		};
	
		return new Proxy(object, handler);
	}
}	
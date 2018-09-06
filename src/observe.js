'use strict';

module.exports = (object, watchers) => {
	const handler = {
		get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target, property, descriptor) {
			console.log(target, property, descriptor);
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target, property) {
			console.log(target, property)
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};
declare global {
    interface Object {
        assign<T, U>(target: T, source: U): T & U;
        assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
    }
}

if (typeof Object.assign != 'function') {
    Object.assign = function(target: any, constArgs: any) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        const to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
            const nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (const nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

export {}

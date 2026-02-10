(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    typeof document === "object" ? document.currentScript : undefined,
    {"otherChunks":["static/chunks/[turbopack]_browser_dev_hmr-client_hmr-client_ts_bae88007._.js","static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js","static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js","static/chunks/node_modules_next_dist_compiled_next-devtools_index_1dd7fb59.js","static/chunks/node_modules_next_dist_compiled_a0e4c7b4._.js","static/chunks/node_modules_next_dist_client_aaee43fe._.js","static/chunks/node_modules_next_dist_7a8122d0._.js","static/chunks/node_modules_@swc_helpers_cjs_d80fb378._.js"],"runtimeModuleIds":["[project]/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/runtime.js [app-client] (ecmascript)","[project]/node_modules/next/dist/client/app-next-turbopack.js [app-client] (ecmascript)"]}
]);
(() => {
if (!Array.isArray(globalThis.TURBOPACK)) {
    return;
}

const CHUNK_BASE_PATH = "/_next/";
const CHUNK_SUFFIX_PATH = "";
const RELATIVE_ROOT_PATH = "/ROOT";
const RUNTIME_PUBLIC_PATH = "/_next/";
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
/**
 * Define a property on an object if that object does not already have an own property with the same name.
 * @param {Object} obj - Target object on which to define the property.
 * @param {string|symbol} name - Property name or symbol.
 * @param {PropertyDescriptor} options - Property descriptor passed to `Object.defineProperty`.
 */
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
/**
 * Ensure a module object exists in the module cache for the given id, creating and storing a new module object if none is present.
 * @param {Object} moduleCache - Map from module id to module object.
 * @param {string|number} id - Module identifier.
 * @returns {Object} The module object associated with the id.
 */
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        // This is invoked when a module is merged into another module, thus it wasn't invoked via
        // instantiateModule and the cache entry wasn't created yet.
        module = createModuleObject(id);
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Create a standardized module descriptor with canonical properties for runtime bookkeeping.
 * @param {string|number} id - Module identifier assigned to the created module.
 * @returns {{exports: Object, error: any|undefined, id: string|number, namespaceObject: Object|undefined}} The new module object with default properties.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
const BindingTag_Value = 0;
/**
 * Install ES module-compatible properties onto an exports object and seal it.
 *
 * This marks the object as an ES module, optionally sets a Symbol.toStringTag of "Module", and defines each export either as a value property or as an accessor (getter, optionally with a setter) based on the provided bindings descriptor, then seals the exports object.
 *
 * @param {object} exports - The module exports object to populate.
 * @param {Array} bindings - A flat descriptor array describing export entries. The array is interpreted as repeated tuples: [propName, tagOrGetter, (setterOrValue)?]. If `tagOrGetter` is the numeric tag `BindingTag_Value` the following item is the property value; otherwise `tagOrGetter` is treated as a getter function and an optional setter function may follow.
 */ function esm(exports, bindings) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    Object.seal(exports);
}
/**
 * Mark the current module (or an overwritten module when `id` is provided) as an ES module and install the given exports.
 *
 * @param {Object} bindings - An object mapping export names to values or descriptors to install on the module's exports.
 * @param {string|number|null} [id] - Optional overwritten module identifier; when provided, the target module is resolved from the overwrite map instead of using the current module.
 */ function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
}
contextPrototype.s = esmExport;
/**
 * Ensure the module uses a dynamic proxy namespace that can surface properties from re-exported objects.
 *
 * If the module has not yet been set up for dynamic re-exports, this replaces module.exports and
 * module.namespaceObject with a Proxy that reflects the original exports while also exposing
 * properties from objects added to the returned re-export list.
 *
 * @param {object} module - The module record to prepare for dynamic re-exports (will be mutated).
 * @param {object} exports - The original exports object that the proxy should base its own properties on.
 * @returns {object[]} The array used to track objects whose properties will be dynamically re-exported for the module.
 */
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                for (const obj of reexportedObjects){
                    const value = Reflect.get(obj, prop);
                    if (value !== undefined) return value;
                }
                return undefined;
            },
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Register a source object's properties to be dynamically re-exported from this module or from a replaced module.
 *
 * When given an object, the function adds it to the module's dynamic reexport sources so its properties become available on the module's export namespace.
 *
 * @param {object} object - The source object whose properties should be re-exported; non-object values are ignored.
 * @param {string|number} [id] - Optional id of an overwritten module whose exports will receive the dynamic reexports; when omitted, the current module is used.
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
/**
 * Assigns a value as the `exports` object for the current module or for an overwritten module when an id is provided.
 *
 * When `id` is not null, the function targets the overwritten module identified by `id` within this context; otherwise it sets the current context's module exports.
 * @param {*} value - The value to assign to `module.exports`.
 * @param {string|number|null} [id] - Optional identifier of an overwritten module to update; if omitted or `null`, the current module is used.
 */
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
/**
 * Assigns the provided namespace object as the module's exports and namespaceObject.
 * @param {*} namespace - The namespace object to expose as the module's exports.
 * @param {string|number|null|undefined} [id] - Optional overwritten module identifier; when provided, the target module is the overwritten module for this id, otherwise the current module is used.
 */
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
/**
 * Create a zero-argument function that, when called, returns the current value of a property on an object.
 * @param {Object} obj - The source object containing the property.
 * @param {string|symbol} key - The property key to read from `obj`.
 * @returns {Function} A function with no arguments that returns `obj[key]` when invoked.
 */
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * Create and install ES module-style bindings on a namespace object from a raw export value.
 *
 * Populates the given `ns` with properties that mirror `raw` (preserving iteration order)
 * and ensures a `default` export according to `allowExportDefault`.
 *
 * @param {*} raw - The original module export value (CommonJS or other raw export).
 * @param {Object} ns - The namespace object to populate with ES module bindings.
 * @param {boolean} allowExportDefault - If `true`, prefer `raw.default` as the namespace `default` export; if `false`, expose the entire `raw` object as the namespace `default`.
 * @returns {Object} The provided `ns` object populated with ES module-compatible bindings.
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
/**
 * Create a namespace-like representation for a raw module export.
 *
 * If `raw` is a function, returns a wrapper function that forwards calls to the original function while preserving `this` and arguments.
 * Otherwise returns a plain object with no prototype suitable for use as a namespace object.
 *
 * @param {*} raw - The raw export value to wrap or convert into a namespace.
 * @returns {Function|Object} A function wrapper when `raw` is a function; otherwise a plain object with no prototype.
 */
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
/**
 * Ensures a resolved module has an ES module namespace and returns that namespace.
 *
 * @param {string|number} id - Module identifier to resolve relative to the current module.
 * @returns {object} The module's namespace object.
 */
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
/**
 * Invoke the async loader registered for a module identifier.
 * @param {string|number} moduleId - The identifier of the module to load.
 * @returns {*} The value returned by the module's loader (typically a module namespace or loader-specific result).
 */
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
/**
 * Require a CommonJS module by id relative to the current module and return its exports.
 * @param {string|number} id - Identifier of the module to require.
 * @returns {*} The required module's `exports` object.
 */
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Create a require.context-like resolver for a fixed module map.
 *
 * The returned callable looks up modules by key and exposes utility methods:
 * - `keys()` returns available keys.
 * - `resolve(id)` returns the module's resolution id.
 * - `import(id)` asynchronously imports the module.
 *
 * @param {Object<string, {module: function(): any, id: function(): string}>} map - Mapping from module key to an object with a `module()` factory and an `id()` resolver.
 * @returns {function(string): any} A function that when called with a module key returns that module's exports and has `keys`, `resolve`, and `import` methods.
 * @throws {Error} Throws an Error with `code = 'MODULE_NOT_FOUND'` if a requested key is not present in `map`.
 */ function moduleContext(map) {
    /**
     * Resolve a module identifier using the context map and return the module's exports.
     * @param {string} id - The module identifier to resolve.
     * @returns {*} The resolved module's exported value.
     * @throws {Error} If the module id is not present in the context map; the error has `code = 'MODULE_NOT_FOUND'`.
     */
    function moduleContext(id) {
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Get the chunk path from chunk data.
 * @param {string|{path: string}} chunkData - A chunk identifier: either a string path or an object containing a `path` property.
 * @returns {string} The resolved chunk path.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
/**
 * Determines whether a value is a thenable (Promise-like) object.
 * @param {*} maybePromise - The value to test.
 * @returns {boolean} `true` if the value is an object with a callable `then` property, `false` otherwise.
 */
function isPromise(maybePromise) {
    return maybePromise != null && typeof maybePromise === 'object' && 'then' in maybePromise && typeof maybePromise.then === 'function';
}
/**
 * Determines whether a value represents a Turbopack async module extension.
 * @param {*} obj - The value to test.
 * @returns {boolean} `true` if the value is a Turbopack async module extension, `false` otherwise.
 */
function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
}
/**
 * Create a promise together with its external resolve and reject functions.
 * @returns {{promise: Promise<any>, resolve: (value?: any) => void, reject: (reason?: any) => void}} An object containing `promise`, and the `resolve` and `reject` functions that settle it. 
 */
function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        reject = rej;
        resolve = res;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
/**
 * Registers module factory functions from a compressed chunk array into the runtime's module factory map.
 *
 * Parses chunkModules starting at the given offset where entries are laid out as one or more module ids
 * followed by a factory function. For each group, the factory function is associated with every module id
 * in that group and stored in moduleFactories. If a group's primary id already exists in moduleFactories,
 * the entire group is skipped. Throws if the chunk format is malformed (no factory function found for a group).
 *
 * @param {Array<number|Function>} chunkModules - Array containing module ids (numbers) and factory functions; groups consist of one or more ids followed by their factory.
 * @param {number} offset - Index in chunkModules at which parsing should begin.
 * @param {Map<number, Function>} moduleFactories - Map to populate from module id to factory function.
 * @param {(id:number)=>void} [newModuleId] - Optional callback invoked with each primary module id when a new factory is registered.
 * @throws {Error} If a factory function is not found for a module id group (malformed chunk format).
 */
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let moduleId = chunkModules[i];
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Each chunk item has a 'primary id' and optional additional ids. If the primary id is already
        // present we know all the additional ids are also present, so we don't need to check.
        if (!moduleFactories.has(moduleId)) {
            const moduleFactoryFn = chunkModules[end];
            applyModuleFactoryName(moduleFactoryFn);
            newModuleId?.(moduleId);
            for(; i < end; i++){
                moduleId = chunkModules[i];
                moduleFactories.set(moduleId, moduleFactoryFn);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
// everything below is adapted from webpack
// https://github.com/webpack/webpack/blob/6be4065ade1e252c1d8dcba4af0f43e32af1bdc1/lib/runtime/AsyncModuleRuntimeModule.js#L13
const turbopackQueues = Symbol('turbopack queues');
const turbopackExports = Symbol('turbopack exports');
const turbopackError = Symbol('turbopack error');
/**
 * Mark a pending queue as resolved and invoke any tasks whose countdown reaches zero.
 *
 * Decrements the `queueCount` of every function in `queue`. For each function whose
 * count becomes zero as a result, invoke the function. Also sets `queue.status = 1`.
 *
 * @param {Array<Function> & { status?: number }} queue - Array of callables that have a mutable `queueCount` numeric property; may be falsy to no-op.
 */
function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
        queue.status = 1;
        queue.forEach((fn)=>fn.queueCount--);
        queue.forEach((fn)=>fn.queueCount-- ? fn.queueCount++ : fn());
    }
}
/**
 * Wraps dependency entries into Turbopack-compatible runtime wrappers.
 *
 * @param {Array<any>} deps - Array of dependency entries which may be plain values, Promises, or Turbopack async-module extension objects.
 * @returns {Array<object>} An array of wrapper objects: plain values are wrapped as objects exposing `turbopackExports` and a no-op `turbopackQueues`; Promises are wrapped so that `turbopackExports` is populated when the promise settles and `turbopackError` is set on rejection while queued resolvers are invoked; objects that are already async-module extensions are returned unchanged.
 */
function wrapDeps(deps) {
    return deps.map((dep)=>{
        if (dep !== null && typeof dep === 'object') {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
                const queue = Object.assign([], {
                    status: 0
                });
                const obj = {
                    [turbopackExports]: {},
                    [turbopackQueues]: (fn)=>fn(queue)
                };
                dep.then((res)=>{
                    obj[turbopackExports] = res;
                    resolveQueue(queue);
                }, (err)=>{
                    obj[turbopackError] = err;
                    resolveQueue(queue);
                });
                return obj;
            }
        }
        return {
            [turbopackExports]: dep,
            [turbopackQueues]: ()=>{}
        };
    });
}
/**
 * Wraps a module body to provide asynchronous module semantics and replaces the module's exports and namespace with a promise-like exports object.
 *
 * The provided `body` is invoked with two helpers:
 * - a dependency helper that accepts dependency descriptors and returns either the resolved dependency values or a promise that resolves to them when ready,
 * - and a completion callback to resolve or reject the module-level exports promise.
 *
 * When `hasAwait` is true, the runtime installs a dependency queue to defer final resolution until async dependencies settle; the module's `exports` and `namespaceObject` are set to a promise-like object that carries Turbopack-specific metadata used by the runtime.
 *
 * @param {(handleDeps: (deps: any) => any, done: (err?: any) => void) => void} body - Module body invoked to execute module logic. It receives a dependency helper and a completion callback.
 * @param {boolean} hasAwait - Whether the module contains `await` (or otherwise requires async deferral). When true, a dependency queue is enabled to coordinate resolution with dependent async modules.
 */
function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait ? Object.assign([], {
        status: -1
    }) : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
        [turbopackExports]: module.exports,
        [turbopackQueues]: (fn)=>{
            queue && fn(queue);
            depQueues.forEach(fn);
            promise['catch'](()=>{});
        }
    });
    const attributes = {
        get () {
            return promise;
        },
        set (v) {
            // Calling `esmExport` leads to this.
            if (v !== promise) {
                promise[turbopackExports] = v;
            }
        }
    };
    Object.defineProperty(module, 'exports', attributes);
    Object.defineProperty(module, 'namespaceObject', attributes);
    function handleAsyncDependencies(deps) {
        const currentDeps = wrapDeps(deps);
        const getResult = ()=>currentDeps.map((d)=>{
                if (d[turbopackError]) throw d[turbopackError];
                return d[turbopackExports];
            });
        const { promise, resolve } = createPromise();
        const fn = Object.assign(()=>resolve(getResult), {
            queueCount: 0
        });
        function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
                depQueues.add(q);
                if (q && q.status === 0) {
                    fn.queueCount++;
                    q.push(fn);
                }
            }
        }
        currentDeps.map((dep)=>dep[turbopackQueues](fnQueue));
        return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
        if (err) {
            reject(promise[turbopackError] = err);
        } else {
            resolve(promise[turbopackExports]);
        }
        resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
        queue.status = 0;
    }
}
contextPrototype.a = asyncModule;
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Assert unreachable code paths and raise an error with a computed message.
 * @param {*} never - The value that should be impossible; passed to `computeMessage` to produce diagnostic context.
 * @param {(val: any) => string} computeMessage - Function that returns the error message given the unexpected `never` value.
 * @throws {Error} An error with the message prefixed by "Invariant: " produced by `computeMessage(never)`.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * Provide a non-functional `require` placeholder for ESM environments.
 *
 * @throws {Error} Always throws when invoked to indicate dynamic `require` usage is not supported.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
/**
 * Assigns a readable name to a module factory to improve stack traces.
 * @param {Function} factory - The module factory function to rename.
 */
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/**
 * This file contains runtime types and functions that are shared between all
 * Turbopack *development* ECMAScript runtimes.
 *
 * It will be appended to the runtime code of each runtime right after the
 * shared runtime utils.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../base/globals.d.ts" />
/// <reference path="../../../shared/runtime-utils.ts" />
// Used in WebWorkers to tell the runtime about the chunk base path
const browserContextPrototype = Context.prototype;
var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    /**
   * The module was instantiated because it was included in a chunk's hot module
   * update.
   * SourceData is an array of ModuleIds or undefined.
   */ SourceType[SourceType["Update"] = 2] = "Update";
    return SourceType;
}(SourceType || {});
const moduleFactories = new Map();
contextPrototype.M = moduleFactories;
const availableModules = new Map();
const availableModuleChunks = new Map();
/**
 * Build a user-facing message explaining why a module's factory is missing.
 *
 * @param {string|number} moduleId - The identifier of the module.
 * @param {number} sourceType - Numeric code describing instantiation source: `0` = runtime chunk entry, `1` = required from another module, `2` = HMR update.
 * @param {string|number} sourceData - Additional context for the source: chunk path when `sourceType` is `0`, parent module id when `sourceType` is `1`, ignored when `sourceType` is `2`.
 * @returns {string} A message stating how the module was instantiated and that its factory is not available.
 */
function factoryNotAvailableMessage(moduleId, sourceType, sourceData) {
    let instantiationReason;
    switch(sourceType){
        case 0:
            instantiationReason = `as a runtime entry of chunk ${sourceData}`;
            break;
        case 1:
            instantiationReason = `because it was required from module ${sourceData}`;
            break;
        case 2:
            instantiationReason = 'because of an HMR update';
            break;
        default:
            invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
    }
    return `Module ${moduleId} was instantiated ${instantiationReason}, but the module factory is not available.`;
}
/**
 * Loads the specified chunk using the caller module's id as the requesting context.
 * @param {any} chunkData - Chunk descriptor (path, URL, or registration data) used to locate and register the chunk.
 * @returns {any} The result produced by the internal chunk loader.
function loadChunk(chunkData) {
    return loadChunkInternal(1, this.m.id, chunkData);
}
browserContextPrototype.l = loadChunk;
/**
 * Load and register an initial chunk identified by chunkPath.
 * @param {string} chunkPath - Runtime path or identifier of the chunk to load.
 * @param {*} chunkData - Chunk payload or registration data provided by the bootstrap (format consumed by the loader).
 * @returns {*} The registration result produced by the internal chunk loader.
 */
function loadInitialChunk(chunkPath, chunkData) {
    return loadChunkInternal(0, chunkPath, chunkData);
}
/**
 * Ensures the specified chunk and any modules or module-chunks it lists are loaded, skipping work for items already loaded or in-flight.
 *
 * If `chunkData` is a string, delegates to loadChunkPath. If `chunkData` is an object, it will:
 * - honor `included` (module ids) and `moduleChunks` (chunk ids) to avoid redundant loads,
 * - register loading promises in the runtime maps for deduplication,
 * and wait for the necessary loads to complete before returning.
 *
 * @param {string} sourceType - Loader source type passed to the backend loader.
 * @param {*} sourceData - Loader-specific data passed to loadChunkPath.
 * @param {string|{path:string, included?:string[], moduleChunks?:string[]}} chunkData - Either a chunk path string or an object describing the chunk to load.
 */
async function loadChunkInternal(sourceType, sourceData, chunkData) {
    if (typeof chunkData === 'string') {
        return loadChunkPath(sourceType, sourceData, chunkData);
    }
    const includedList = chunkData.included || [];
    const modulesPromises = includedList.map((included)=>{
        if (moduleFactories.has(included)) return true;
        return availableModules.get(included);
    });
    if (modulesPromises.length > 0 && modulesPromises.every((p)=>p)) {
        // When all included items are already loaded or loading, we can skip loading ourselves
        await Promise.all(modulesPromises);
        return;
    }
    const includedModuleChunksList = chunkData.moduleChunks || [];
    const moduleChunksPromises = includedModuleChunksList.map((included)=>{
        // TODO(alexkirsz) Do we need this check?
        // if (moduleFactories[included]) return true;
        return availableModuleChunks.get(included);
    }).filter((p)=>p);
    let promise;
    if (moduleChunksPromises.length > 0) {
        // Some module chunks are already loaded or loading.
        if (moduleChunksPromises.length === includedModuleChunksList.length) {
            // When all included module chunks are already loaded or loading, we can skip loading ourselves
            await Promise.all(moduleChunksPromises);
            return;
        }
        const moduleChunksToLoad = new Set();
        for (const moduleChunk of includedModuleChunksList){
            if (!availableModuleChunks.has(moduleChunk)) {
                moduleChunksToLoad.add(moduleChunk);
            }
        }
        for (const moduleChunkToLoad of moduleChunksToLoad){
            const promise = loadChunkPath(sourceType, sourceData, moduleChunkToLoad);
            availableModuleChunks.set(moduleChunkToLoad, promise);
            moduleChunksPromises.push(promise);
        }
        promise = Promise.all(moduleChunksPromises);
    } else {
        promise = loadChunkPath(sourceType, sourceData, chunkData.path);
        // Mark all included module chunks as loading if they are not already loaded or loading.
        for (const includedModuleChunk of includedModuleChunksList){
            if (!availableModuleChunks.has(includedModuleChunk)) {
                availableModuleChunks.set(includedModuleChunk, promise);
            }
        }
    }
    for (const included of includedList){
        if (!availableModules.has(included)) {
            // It might be better to race old and new promises, but it's rare that the new promise will be faster than a request started earlier.
            // In production it's even more rare, because the chunk optimization tries to deduplicate modules anyway.
            availableModules.set(included, promise);
        }
    }
    await promise;
}
const loadedChunk = Promise.resolve(undefined);
const instrumentedBackendLoadChunks = new WeakMap();
/**
 * Initiates loading of the chunk at the specified URL for the current module.
 * @param {string} chunkUrl - The URL of the chunk to load.
 * @returns {Promise<unknown>} Resolves when the chunk is successfully loaded and registered, rejects with an error if loading fails.
 */
function loadChunkByUrl(chunkUrl) {
    return loadChunkByUrlInternal(1, this.m.id, chunkUrl);
}
browserContextPrototype.L = loadChunkByUrl;
/**
 * Obtain a cached, instrumented loader promise for a chunk URL.
 *
 * @param {0|1|2} sourceType - Origin of the load: `0` = runtime dependency of a chunk, `1` = from a module, `2` = from an HMR update.
 * @param {string|number} sourceData - Identifier associated with the source (chunk id, module id, or update id) used for error messages.
 * @param {string} chunkUrl - URL of the chunk to load.
 * @returns {Promise<any>} A promise that resolves to the loaded chunk entry produced by the backend.
 * @throws {Error} When the backend fails to load the chunk; the error message includes the chunk URL and the load origin and the original error is set as the cause when available.
 */
function loadChunkByUrlInternal(sourceType, sourceData, chunkUrl) {
    const thenable = BACKEND.loadChunkCached(sourceType, chunkUrl);
    let entry = instrumentedBackendLoadChunks.get(thenable);
    if (entry === undefined) {
        const resolve = instrumentedBackendLoadChunks.set.bind(instrumentedBackendLoadChunks, thenable, loadedChunk);
        entry = thenable.then(resolve).catch((error)=>{
            let loadReason;
            switch(sourceType){
                case 0:
                    loadReason = `as a runtime dependency of chunk ${sourceData}`;
                    break;
                case 1:
                    loadReason = `from module ${sourceData}`;
                    break;
                case 2:
                    loadReason = 'from an HMR update';
                    break;
                default:
                    invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
            }
            throw new Error(`Failed to load chunk ${chunkUrl} ${loadReason}${error ? `: ${error}` : ''}`, error ? {
                cause: error
            } : undefined);
        });
        instrumentedBackendLoadChunks.set(thenable, entry);
    }
    return entry;
}
/**
 * Load a chunk by its logical chunk path.
 *
 * Must not be declared `async` — callers (such as React) rely on referential equality of the returned Promise.
 *
 * @param {string} sourceType - Source type hint for the loader (environment-specific).
 * @param {*} sourceData - Additional source metadata passed to the loader.
 * @param {string} chunkPath - Logical path of the chunk to load.
 * @returns {Promise<any>} The loader's result for the requested chunk.
function loadChunkPath(sourceType, sourceData, chunkPath) {
    const url = getChunkRelativeUrl(chunkPath);
    return loadChunkByUrlInternal(sourceType, sourceData, url);
}
/**
 * Resolve an asset path from the given module identifier.
 * @param {string|number} moduleId - Module identifier to resolve.
 * @returns {*} The module's default export (typically an asset URL) if present, otherwise the module's exported value.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    return exported?.default ?? exported;
}
browserContextPrototype.R = resolvePathFromModule;
/**
 * Produce an absolute runtime path for a module in browser environments.
 * @param {string|undefined} modulePath - Module path relative to the runtime root; may be undefined or empty.
 * @returns {string} The path prefixed with `/ROOT/`. If `modulePath` is undefined or empty, returns `/ROOT/`.
 */ function resolveAbsolutePath(modulePath) {
    return `/ROOT/${modulePath ?? ''}`;
}
browserContextPrototype.P = resolveAbsolutePath;
/**
 * Create a blob URL for a worker script that bootstraps loading the provided chunks.
 *
 * @param {string[]} chunks - Array of chunk identifiers or paths used to compute chunk URLs to import in the worker.
 * @returns {string} A blob URL pointing to a generated worker script which imports the specified chunks.
 */ function getWorkerBlobURL(chunks) {
    // It is important to reverse the array so when bootstrapping we can infer what chunk is being
    // evaluated by poping urls off of this array.  See `getPathFromScript`
    let bootstrap = `self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(chunks.reverse().map(getChunkRelativeUrl), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`;
    let blob = new Blob([
        bootstrap
    ], {
        type: 'text/javascript'
    });
    return URL.createObjectURL(blob);
}
browserContextPrototype.b = getWorkerBlobURL;
/**
 * Instantiate the specified runtime module from a runtime chunk.
 * @param {number|string} moduleId - The id of the module to instantiate.
 * @param {string} chunkPath - The runtime chunk path that contains the module.
 * @returns {object} The instantiated module object (module record with its exports and metadata).
 */ function instantiateRuntimeModule(moduleId, chunkPath) {
    return instantiateModule(moduleId, 0, chunkPath);
}
/**
 * Constructs a relative URL path for a chunk by joining and URL-encoding its path segments.
 * @param {string} chunkPath - The chunk path as '/'-separated segments (may include nested directories).
 * @returns {string} The relative URL beginning with CHUNK_BASE_PATH and ending with CHUNK_SUFFIX_PATH where each segment is URL-encoded.
 */ function getChunkRelativeUrl(chunkPath) {
    return `${CHUNK_BASE_PATH}${chunkPath.split('/').map((p)=>encodeURIComponent(p)).join('/')}${CHUNK_SUFFIX_PATH}`;
}
/**
 * Resolve a chunk's module path from a script element or a string input.
 *
 * If passed a string, the input is returned unchanged. If passed a script
 * element, the function reads the chunk URL either from the global
 * `TURBOPACK_NEXT_CHUNK_URLS` array (popping the last entry) or from the
 * element's `src` attribute, then decodes the URL, removes any query string
 * or fragment, and strips the CHUNK_BASE_PATH prefix when present.
 *
 * @param {string|Element} chunkScript - A chunk path string or the script element that loaded the chunk.
 * @returns {string} The normalized chunk path with query/fragment removed and CHUNK_BASE_PATH trimmed when applicable.
 */
function getPathFromScript(chunkScript) {
    if (typeof chunkScript === 'string') {
        return chunkScript;
    }
    const chunkUrl = typeof TURBOPACK_NEXT_CHUNK_URLS !== 'undefined' ? TURBOPACK_NEXT_CHUNK_URLS.pop() : chunkScript.getAttribute('src');
    const src = decodeURIComponent(chunkUrl.replace(/[?#].*$/, ''));
    const path = src.startsWith(CHUNK_BASE_PATH) ? src.slice(CHUNK_BASE_PATH.length) : src;
    return path;
}
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Determines whether the provided path or URL refers to a JavaScript file (ends with `.js`, allowing an optional query string or fragment).
 * @param {string} chunkUrlOrPath - The chunk path or URL to test.
 * @returns {boolean} `true` if the path/URL ends with `.js` optionally followed by a query (`?`) or fragment (`#`), `false` otherwise.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
const regexCssUrl = /\.css(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Determine whether the given path or URL refers to a CSS file.
 *
 * @param {string} chunkUrl - The path or URL to test.
 * @returns {boolean} `true` if `chunkUrl` ends with `.css`, optionally followed by a query string or fragment, `false` otherwise.
 */ function isCss(chunkUrl) {
    return regexCssUrl.test(chunkUrl);
}
/**
 * Instructs the runtime backend to load (and possibly instantiate) a WebAssembly asset for the specified chunk.
 * @param {string} chunkPath - Path or identifier of the chunk containing the WebAssembly asset.
 * @param {boolean} [edgeModule] - When true, treat the module as an edge-specific WebAssembly module (if supported by the backend).
 * @param {Object} [importsObj] - Table of imports to provide to the WebAssembly module upon instantiation.
 * @returns {any} The backend's load result (for example, a compiled/instantiated WebAssembly module or a backend-specific value). */
function loadWebAssembly(chunkPath, edgeModule, importsObj) {
    return BACKEND.loadWebAssembly(1, this.m.id, chunkPath, edgeModule, importsObj);
}
contextPrototype.w = loadWebAssembly;
/**
 * Load a WebAssembly module for the specified chunk via the backend.
 * @param {string} chunkPath - Path to the WebAssembly chunk to load.
 * @param {boolean|any} [edgeModule] - Optional flag or metadata forwarded to the backend to indicate edge-module handling.
 * @returns {any} The loaded WebAssembly module or a backend-specific load result.
 */
function loadWebAssemblyModule(chunkPath, edgeModule) {
    return BACKEND.loadWebAssemblyModule(1, this.m.id, chunkPath, edgeModule);
}
contextPrototype.u = loadWebAssemblyModule;
/// <reference path="./dev-globals.d.ts" />
/// <reference path="./dev-protocol.d.ts" />
/// <reference path="./dev-extensions.ts" />
const devContextPrototype = Context.prototype;
/**
 * This file contains runtime types and functions that are shared between all
 * Turbopack *development* ECMAScript runtimes.
 *
 * It will be appended to the runtime code of each runtime right after the
 * shared runtime utils.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ const devModuleCache = Object.create(null);
devContextPrototype.c = devModuleCache;
class UpdateApplyError extends Error {
    name = 'UpdateApplyError';
    dependencyChain;
    constructor(message, dependencyChain){
        super(message);
        this.dependencyChain = dependencyChain;
    }
}
/**
 * Module IDs that are instantiated as part of the runtime of a chunk.
 */ const runtimeModules = new Set();
/**
 * Map from module ID to the chunks that contain this module.
 *
 * In HMR, we need to keep track of which modules are contained in which so
 * chunks. This is so we don't eagerly dispose of a module when it is removed
 * from chunk A, but still exists in chunk B.
 */ const moduleChunksMap = new Map();
/**
 * Map from a chunk path to all modules it contains.
 */ const chunkModulesMap = new Map();
/**
 * Chunk lists that contain a runtime. When these chunk lists receive an update
 * that can't be reconciled with the current state of the page, we need to
 * reload the runtime entirely.
 */ const runtimeChunkLists = new Set();
/**
 * Map from a chunk list to the chunk paths it contains.
 */ const chunkListChunksMap = new Map();
/**
 * Map from a chunk path to the chunk lists it belongs to.
 */ const chunkChunkListsMap = new Map();
/**
 * Maps module IDs to persisted data between executions of their hot module
 * implementation (`hot.data`).
 */ const moduleHotData = new Map();
/**
 * Maps module instances to their hot module state.
 */ const moduleHotState = new Map();
/**
 * Modules that call `module.hot.invalidate()` (while being updated).
 */ const queuedInvalidatedModules = new Set();
/**
 * Gets or instantiates a runtime module.
 */ /**
 * Retrieve a runtime module from the dev cache or instantiate it for the given chunk.
 *
 * @param {string} chunkPath - Path of the runtime chunk that contains the module.
 * @param {number|string} moduleId - Identifier of the module to retrieve or instantiate.
 * @returns {object} The runtime module instance (module record) for the requested moduleId.
 * @throws {*} The cached module's stored error if the cached module is in an errored state.
 */
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module = devModuleCache[moduleId];
    if (module) {
        if (module.error) {
            throw module.error;
        }
        return module;
    }
    // @ts-ignore
    return instantiateModule(moduleId, SourceType.Runtime, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore Defined in `runtime-utils.ts`
const getOrInstantiateModuleFromParent = (id, sourceModule)=>{
    if (!sourceModule.hot.active) {
        console.warn(`Unexpected import of module ${id} from module ${sourceModule.id}, which was deleted by an HMR update`);
    }
    const module = devModuleCache[id];
    if (sourceModule.children.indexOf(id) === -1) {
        sourceModule.children.push(id);
    }
    if (module) {
        if (module.error) {
            throw module.error;
        }
        if (module.parents.indexOf(sourceModule.id) === -1) {
            module.parents.push(sourceModule.id);
        }
        return module;
    }
    return instantiateModule(id, SourceType.Parent, sourceModule.id);
};
/**
 * Creates a development module execution context that carries a refresh callback.
 * @constructor
 * @param {Function} refresh - Callback invoked to trigger a development refresh (used by runtime tooling to schedule module refresh/invalidation).
 */
function DevContext(module, exports, refresh) {
    Context.call(this, module, exports);
    this.k = refresh;
}
DevContext.prototype = Context.prototype;
/**
 * Create and initialize a development-time module instance for the given module id.
 *
 * @param {string|number} moduleId - The identifier of the module to instantiate.
 * @param {Symbol} sourceType - The source origin of the instantiation (e.g., `SourceType.Runtime`, `SourceType.Parent`, `SourceType.Update`).
 * @param {any} [sourceData] - Additional data for instantiation: when `SourceType.Parent` this is the parent module id; when `SourceType.Update` this is an array of parent ids (or undefined); ignored for runtime origins.
 * @returns {object} The created module object containing at least `exports`, `parents`, `children`, and `hot`.
 * @throws {Error} If no module factory is available for the given id (e.g., removed by an HMR update), or if executing the module factory throws. When execution fails, the thrown error is recorded on `module.error` before it is rethrown.
 */
function instantiateModule(moduleId, sourceType, sourceData) {
    // We are in development, this is always a string.
    let id = moduleId;
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        throw new Error(factoryNotAvailableMessage(id, sourceType, sourceData) + ' It might have been deleted in an HMR update.');
    }
    const hotData = moduleHotData.get(id);
    const { hot, hotState } = createModuleHot(id, hotData);
    let parents;
    switch(sourceType){
        case SourceType.Runtime:
            runtimeModules.add(id);
            parents = [];
            break;
        case SourceType.Parent:
            // No need to add this module as a child of the parent module here, this
            // has already been taken care of in `getOrInstantiateModuleFromParent`.
            parents = [
                sourceData
            ];
            break;
        case SourceType.Update:
            parents = sourceData || [];
            break;
        default:
            invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
    }
    const module = createModuleObject(id);
    const exports = module.exports;
    module.parents = parents;
    module.children = [];
    module.hot = hot;
    devModuleCache[id] = module;
    moduleHotState.set(module, hotState);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        runModuleExecutionHooks(module, (refresh)=>{
            const context = new DevContext(module, exports, refresh);
            moduleFactory(context, module, exports);
        });
    } catch (error) {
        module.error = error;
        throw error;
    }
    if (module.namespaceObject && module.exports !== module.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module.exports, module.namespaceObject);
    }
    return module;
}
const DUMMY_REFRESH_CONTEXT = {
    register: (_type, _id)=>{},
    signature: ()=>(_type)=>{},
    registerExports: (_module, _helpers)=>{}
};
/**
 * Invoke a module's execution while wiring React Refresh interception hooks when present.
 *
 * If the global React Refresh intercept is installed, this calls it with the module id,
 * executes the provided callback with a refresh context ({ register, signature, registerExports }),
 * and always cleans up the intercept. If the intercept is not installed, the callback is
 * invoked with a dummy refresh context.
 *
 * @param {object} module - The runtime module object (must include an `id` property) being executed.
 * @param {(refreshContext: {register: Function, signature: Function, registerExports: Function}) => void} executeModule - Callback that performs the module execution.
 */ function runModuleExecutionHooks(module, executeModule) {
    if (typeof globalThis.$RefreshInterceptModuleExecution$ === 'function') {
        const cleanupReactRefreshIntercept = globalThis.$RefreshInterceptModuleExecution$(module.id);
        try {
            executeModule({
                register: globalThis.$RefreshReg$,
                signature: globalThis.$RefreshSig$,
                registerExports: registerExportsAndSetupBoundaryForReactRefresh
            });
        } finally{
            // Always cleanup the intercept, even if module execution failed.
            cleanupReactRefreshIntercept();
        }
    } else {
        // If the react refresh hooks are not installed we need to bind dummy functions.
        // This is expected when running in a Web Worker.  It is also common in some of
        // our test environments.
        executeModule(DUMMY_REFRESH_CONTEXT);
    }
}
/**
 * Registers a module's exports with React Refresh and configures Hot Module Replacement behavior
 * for React Refresh boundaries, scheduling updates or invalidating the module as appropriate.
 *
 * This registers the current exports for React Refresh, marks the module as accepted when it
 * forms a refresh boundary, preserves previous exports across updates to compare signatures,
 * and either schedules a refresh update or invalidates the module when boundaries become
 * incompatible.
 *
 * @param {object} module - The runtime module object. Expected shape: `{ exports, id, hot }`,
 *   where `hot` exposes `.dispose(fn)`, `.accept()`, and `.invalidate()`.
 * @param {object} helpers - React Refresh helper functions:
 *   - `registerExportsForReactRefresh(exports, id)` to register exports,
 *   - `isReactRefreshBoundary(exports)` to test boundary eligibility,
 *   - `getRefreshBoundarySignature(exports)` to obtain a boundary signature,
 *   - `shouldInvalidateReactRefreshBoundary(prevSig, nextSig)` to compare signatures,
 *   - `scheduleUpdate()` to enqueue a refresh update when compatible.
 */ function registerExportsAndSetupBoundaryForReactRefresh(module, helpers) {
    const currentExports = module.exports;
    const prevExports = module.hot.data.prevExports ?? null;
    helpers.registerExportsForReactRefresh(currentExports, module.id);
    // A module can be accepted automatically based on its exports, e.g. when
    // it is a Refresh Boundary.
    if (helpers.isReactRefreshBoundary(currentExports)) {
        // Save the previous exports on update, so we can compare the boundary
        // signatures.
        module.hot.dispose((data)=>{
            data.prevExports = currentExports;
        });
        // Unconditionally accept an update to this module, we'll check if it's
        // still a Refresh Boundary later.
        module.hot.accept();
        // This field is set when the previous version of this module was a
        // Refresh Boundary, letting us know we need to check for invalidation or
        // enqueue an update.
        if (prevExports !== null) {
            // A boundary can become ineligible if its exports are incompatible
            // with the previous exports.
            //
            // For example, if you add/remove/change exports, we'll want to
            // re-execute the importing modules, and force those components to
            // re-render. Similarly, if you convert a class component to a
            // function, we want to invalidate the boundary.
            if (helpers.shouldInvalidateReactRefreshBoundary(helpers.getRefreshBoundarySignature(prevExports), helpers.getRefreshBoundarySignature(currentExports))) {
                module.hot.invalidate();
            } else {
                helpers.scheduleUpdate();
            }
        }
    } else {
        // Since we just executed the code for the module, it's possible that the
        // new exports made it ineligible for being a boundary.
        // We only care about the case when we were _previously_ a boundary,
        // because we already accepted this update (accidental side effect).
        const isNoLongerABoundary = prevExports !== null;
        if (isNoLongerABoundary) {
            module.hot.invalidate();
        }
    }
}
/**
 * Format a dependency chain into a human-readable string.
 * @param {string[]} dependencyChain - Ordered list of module identifiers representing the dependency chain.
 * @returns {string} A string beginning with "Dependency chain: " followed by the chain items joined with " -> ".
 */
function formatDependencyChain(dependencyChain) {
    return `Dependency chain: ${dependencyChain.join(' -> ')}`;
}
/**
 * Determine which modules are outdated given newly added and modified module entries and prepare new module factories.
 *
 * @param {Iterable<[string|number, any]>} added - Iterable of [moduleId, moduleEntry] pairs for modules added in the update; entries may be null to indicate no factory.
 * @param {Iterable<[string|number, any]>} modified - Iterable of [moduleId, moduleEntry] pairs for modules that were modified in the update.
 * @returns {{outdatedModules: Set<string|number>, newModuleFactories: Map<string|number, Function>}} An object containing:
 *   - `outdatedModules`: the set of module ids determined to be outdated based on the modified entries,
 *   - `newModuleFactories`: a Map from module id to the evaluated module factory function for added and modified entries.
 */
function computeOutdatedModules(added, modified) {
    const newModuleFactories = new Map();
    for (const [moduleId, entry] of added){
        if (entry != null) {
            newModuleFactories.set(moduleId, _eval(entry));
        }
    }
    const outdatedModules = computedInvalidatedModules(modified.keys());
    for (const [moduleId, entry] of modified){
        newModuleFactories.set(moduleId, _eval(entry));
    }
    return {
        outdatedModules,
        newModuleFactories
    };
}
/**
 * Computes the set of modules that become outdated as a result of the given invalidated modules.
 *
 * @param {Iterable<string|number>} invalidated - Module IDs that were invalidated.
 * @returns {Set<string|number>} A set containing IDs of modules that must be treated as outdated.
 * @throws {UpdateApplyError} If any invalidated module is unaccepted or self-declined; the error includes the dependency chain.
 */
function computedInvalidatedModules(invalidated) {
    const outdatedModules = new Set();
    for (const moduleId of invalidated){
        const effect = getAffectedModuleEffects(moduleId);
        switch(effect.type){
            case 'unaccepted':
                throw new UpdateApplyError(`cannot apply update: unaccepted module. ${formatDependencyChain(effect.dependencyChain)}.`, effect.dependencyChain);
            case 'self-declined':
                throw new UpdateApplyError(`cannot apply update: self-declined module. ${formatDependencyChain(effect.dependencyChain)}.`, effect.dependencyChain);
            case 'accepted':
                for (const outdatedModuleId of effect.outdatedModules){
                    outdatedModules.add(outdatedModuleId);
                }
                break;
            // TODO(alexkirsz) Dependencies: handle dependencies effects.
            default:
                invariant(effect, (effect)=>`Unknown effect type: ${effect?.type}`);
        }
    }
    return outdatedModules;
}
/**
 * Collects modules from the provided set that are self-accepted and not self-invalidated.
 * @param {Iterable<number|string>} outdatedModules - Iterable of module IDs to inspect for self-acceptance.
 * @returns {{moduleId: number|string, errorHandler: Function}[]} An array of objects each containing `moduleId` and `errorHandler` for modules that are self-accepted and not self-invalidated.
 */
function computeOutdatedSelfAcceptedModules(outdatedModules) {
    const outdatedSelfAcceptedModules = [];
    for (const moduleId of outdatedModules){
        const module = devModuleCache[moduleId];
        const hotState = moduleHotState.get(module);
        if (module && hotState.selfAccepted && !hotState.selfInvalidated) {
            outdatedSelfAcceptedModules.push({
                moduleId,
                errorHandler: hotState.selfAccepted
            });
        }
    }
    return outdatedSelfAcceptedModules;
}
/**
 * Update chunk membership by adding modules to chunks and removing modules from chunks, then report modules removed from all chunks.
 * @param {Iterable<[string, Iterable<string|number>]>} chunksAddedModules - Pairs of chunk path and an iterable of module IDs to add to that chunk.
 * @param {Iterable<[string, Iterable<string|number>]>} chunksDeletedModules - Pairs of chunk path and an iterable of module IDs to remove from that chunk.
 * @returns {{disposedModules: Set<string|number>}} An object containing `disposedModules`, a set of module IDs that were removed from all chunks.
 */ function updateChunksPhase(chunksAddedModules, chunksDeletedModules) {
    for (const [chunkPath, addedModuleIds] of chunksAddedModules){
        for (const moduleId of addedModuleIds){
            addModuleToChunk(moduleId, chunkPath);
        }
    }
    const disposedModules = new Set();
    for (const [chunkPath, addedModuleIds] of chunksDeletedModules){
        for (const moduleId of addedModuleIds){
            if (removeModuleFromChunk(moduleId, chunkPath)) {
                disposedModules.add(moduleId);
            }
        }
    }
    return {
        disposedModules
    };
}
/**
 * Disposes modules scheduled for replacement or removal and records their previous parents.
 *
 * Invokes disposeModule for each id in `outdatedModules` with mode `"replace"` and for each id
 * in `disposedModules` with mode `"clear"`, removes `outdatedModules` entries from the development
 * module cache, and collects a map of each outdated module id to its former parents.
 *
 * @param {Iterable<string|number>} outdatedModules - Module ids that will be replaced.
 * @param {Iterable<string|number>} disposedModules - Module ids that will be cleared.
 * @returns {{outdatedModuleParents: Map<string|number, any>}} A map from each outdated module id to the module's previous `parents` value (or `undefined` if none).
 */
function disposePhase(outdatedModules, disposedModules) {
    for (const moduleId of outdatedModules){
        disposeModule(moduleId, 'replace');
    }
    for (const moduleId of disposedModules){
        disposeModule(moduleId, 'clear');
    }
    // Removing modules from the module cache is a separate step.
    // We also want to keep track of previous parents of the outdated modules.
    const outdatedModuleParents = new Map();
    for (const moduleId of outdatedModules){
        const oldModule = devModuleCache[moduleId];
        outdatedModuleParents.set(moduleId, oldModule?.parents);
        delete devModuleCache[moduleId];
    }
    // TODO(alexkirsz) Dependencies: remove outdated dependency from module
    // children.
    return {
        outdatedModuleParents
    };
}
/**
 * Dispose a module instance and update its parents, children, and hot state.
 *
 * Runs any registered dispose handlers with a persistent data object, marks the
 * module's hot state inactive, removes the module from its children's parent
 * lists, and either clears or preserves hot data based on the provided mode.
 *
 * @param {string|number} moduleId - Identifier of the module instance to dispose.
 * @param {'clear'|'replace'} mode - Disposal mode:
 *   - `clear`: remove the module and its hot data from the dev cache and storage.
 *   - `replace`: preserve the persistent hot data so it can be reused by the next module instance.
 * @returns {Object|undefined} The persistent hot data to keep for the next module instance when `mode` is `replace`; otherwise `undefined`.
 */ function disposeModule(moduleId, mode) {
    const module = devModuleCache[moduleId];
    if (!module) {
        return;
    }
    const hotState = moduleHotState.get(module);
    const data = {};
    // Run the `hot.dispose` handler, if any, passing in the persistent
    // `hot.data` object.
    for (const disposeHandler of hotState.disposeHandlers){
        disposeHandler(data);
    }
    // This used to warn in `getOrInstantiateModuleFromParent` when a disposed
    // module is still importing other modules.
    module.hot.active = false;
    moduleHotState.delete(module);
    // TODO(alexkirsz) Dependencies: delete the module from outdated deps.
    // Remove the disposed module from its children's parent list.
    // It will be added back once the module re-instantiates and imports its
    // children again.
    for (const childId of module.children){
        const child = devModuleCache[childId];
        if (!child) {
            continue;
        }
        const idx = child.parents.indexOf(module.id);
        if (idx >= 0) {
            child.parents.splice(idx, 1);
        }
    }
    switch(mode){
        case 'clear':
            delete devModuleCache[module.id];
            moduleHotData.delete(module.id);
            break;
        case 'replace':
            moduleHotData.set(module.id, data);
            break;
        default:
            invariant(mode, (mode)=>`invalid mode: ${mode}`);
    }
}
/**
 * Apply updated module factories and re-instantiate modules that self-accepted updates.
 *
 * Installs new module factories into the runtime, then attempts to re-run each module listed
 * in `outdatedSelfAcceptedModules`. If a module throws during re-instantiation and an
 * `errorHandler` was provided for that module, the handler is invoked with the thrown error
 * and contextual info; any errors thrown by the handler or the original error are forwarded
 * to `reportError`.
 *
 * @param {Array<{moduleId: number|string, errorHandler?: function}>} outdatedSelfAcceptedModules - Modules that accepted their own updates; each entry may include an `errorHandler` to handle instantiation errors for that module.
 * @param {Map<number|string, Function>} newModuleFactories - Map of module IDs to new factory functions to install into the runtime.
 * @param {Map<number|string, any>} outdatedModuleParents - Map providing parent/source data used when re-instantiating updated modules.
 * @param {function(Error): void} reportError - Callback invoked with any errors that should be reported to the runtime.
 */
function applyPhase(outdatedSelfAcceptedModules, newModuleFactories, outdatedModuleParents, reportError) {
    // Update module factories.
    for (const [moduleId, factory] of newModuleFactories.entries()){
        applyModuleFactoryName(factory);
        moduleFactories.set(moduleId, factory);
    }
    // TODO(alexkirsz) Run new runtime entries here.
    // TODO(alexkirsz) Dependencies: call accept handlers for outdated deps.
    // Re-instantiate all outdated self-accepted modules.
    for (const { moduleId, errorHandler } of outdatedSelfAcceptedModules){
        try {
            instantiateModule(moduleId, SourceType.Update, outdatedModuleParents.get(moduleId));
        } catch (err) {
            if (typeof errorHandler === 'function') {
                try {
                    errorHandler(err, {
                        moduleId,
                        module: devModuleCache[moduleId]
                    });
                } catch (err2) {
                    reportError(err2);
                    reportError(err);
                }
            } else {
                reportError(err);
            }
        }
    }
}
/**
 * Dispatches an update based on its `type` to the corresponding handler.
 * @param {{type: string}} update - Update object with a `type` property; currently supports `'ChunkListUpdate'`.
 */
function applyUpdate(update) {
    switch(update.type){
        case 'ChunkListUpdate':
            applyChunkListUpdate(update);
            break;
        default:
            invariant(update, (update)=>`Unknown update type: ${update.type}`);
    }
}
/**
 * Apply a chunk list update by handling merged updates and per-chunk changes.
 *
 * Processes any merged update entries (delegating to the appropriate merged-update handler)
 * and applies per-chunk actions such as loading, reloading, unloading, or validating partial instructions.
 *
 * @param {Object} update - Update payload describing merged updates and per-chunk changes.
 * @param {Array<Object>} [update.merged] - Array of merged update descriptors (e.g., EcmascriptMergedUpdate).
 * @param {Object<string, Object>} [update.chunks] - Map from chunk path to chunk update descriptor. Chunk update descriptors contain a `type` field with values like `"added"`, `"total"`, `"deleted"`, or `"partial"`.
 */
function applyChunkListUpdate(update) {
    if (update.merged != null) {
        for (const merged of update.merged){
            switch(merged.type){
                case 'EcmascriptMergedUpdate':
                    applyEcmascriptMergedUpdate(merged);
                    break;
                default:
                    invariant(merged, (merged)=>`Unknown merged type: ${merged.type}`);
            }
        }
    }
    if (update.chunks != null) {
        for (const [chunkPath, chunkUpdate] of Object.entries(update.chunks)){
            const chunkUrl = getChunkRelativeUrl(chunkPath);
            switch(chunkUpdate.type){
                case 'added':
                    BACKEND.loadChunkCached(SourceType.Update, chunkUrl);
                    break;
                case 'total':
                    DEV_BACKEND.reloadChunk?.(chunkUrl);
                    break;
                case 'deleted':
                    DEV_BACKEND.unloadChunk?.(chunkUrl);
                    break;
                case 'partial':
                    invariant(chunkUpdate.instruction, (instruction)=>`Unknown partial instruction: ${JSON.stringify(instruction)}.`);
                    break;
                default:
                    invariant(chunkUpdate, (chunkUpdate)=>`Unknown chunk update type: ${chunkUpdate.type}`);
            }
        }
    }
}
/**
 * Apply an ECMAScript merged update by computing changed modules, preparing outdated state, and performing the update lifecycle.
 *
 * @param {Object} update - Merged update payload describing module and chunk changes.
 * @param {Object} [update.entries] - Map of entry updates keyed by module id or entry name.
 * @param {Object} [update.chunks] - Map of chunk updates keyed by chunk path, describing added/modified/deleted modules per chunk.
 */
function applyEcmascriptMergedUpdate(update) {
    const { entries = {}, chunks = {} } = update;
    const { added, modified, chunksAdded, chunksDeleted } = computeChangedModules(entries, chunks);
    const { outdatedModules, newModuleFactories } = computeOutdatedModules(added, modified);
    const { disposedModules } = updateChunksPhase(chunksAdded, chunksDeleted);
    applyInternal(outdatedModules, disposedModules, newModuleFactories);
}
/**
 * Merges any modules queued for invalidation into the provided set of outdated modules and clears the queue.
 * @param {Set<number|string>} outdatedModules - Set of module ids to augment with queued invalidations.
 * @returns {Set<number|string>} The same `outdatedModules` set with queued invalidated module ids added.
 */
function applyInvalidatedModules(outdatedModules) {
    if (queuedInvalidatedModules.size > 0) {
        computedInvalidatedModules(queuedInvalidatedModules).forEach((moduleId)=>{
            outdatedModules.add(moduleId);
        });
        queuedInvalidatedModules.clear();
    }
    return outdatedModules;
}
/**
 * Coordinates application of module updates by processing queued invalidations, disposing outdated modules, and installing new module factories.
 * @param {Set<string|number>} outdatedModules - Set of module ids marked as outdated.
 * @param {Array<string|number>} disposedModules - List of module ids that have been disposed prior to applying new factories.
 * @param {Map<string|number,Function>} newModuleFactories - Mapping of module ids to their new factory functions to install.
 * @throws {Error} Throws the first error encountered while applying updates after attempting all apply steps.
 */
function applyInternal(outdatedModules, disposedModules, newModuleFactories) {
    outdatedModules = applyInvalidatedModules(outdatedModules);
    const outdatedSelfAcceptedModules = computeOutdatedSelfAcceptedModules(outdatedModules);
    const { outdatedModuleParents } = disposePhase(outdatedModules, disposedModules);
    // we want to continue on error and only throw the error after we tried applying all updates
    let error;
    function reportError(err) {
        if (!error) error = err;
    }
    applyPhase(outdatedSelfAcceptedModules, newModuleFactories, outdatedModuleParents, reportError);
    if (error) {
        throw error;
    }
    if (queuedInvalidatedModules.size > 0) {
        applyInternal(new Set(), [], new Map());
    }
}
/**
 * Compute which modules and chunk mappings were added, deleted, or modified by a set of merged chunk updates.
 *
 * Builds maps of module IDs to their entry data for added and modified modules, a set of deleted module IDs,
 * and maps of chunk paths to the sets of module IDs that were added to or removed from those chunks.
 *
 * @param {Object<string, any>} entries - Mapping from module ID to module entry metadata (new source/code).
 * @param {Object<string, {type: string, modules?: string[], added?: string[], deleted?: string[]}>} updates - Merged chunk updates keyed by chunk path. Each update has a `type` of `"added" | "deleted" | "partial"` and corresponding module lists.
 * @returns {{
 *   added: Map<string, any>,
 *   deleted: Set<string>,
 *   modified: Map<string, any>,
 *   chunksAdded: Map<string, Set<string>>,
 *   chunksDeleted: Map<string, Set<string>>
 * }} An object containing:
 *   - `added`: map of module IDs added in this update to their entry data,
 *   - `deleted`: set of module IDs removed in this update,
 *   - `modified`: map of module IDs whose code changed (not newly added) to their entry data,
 *   - `chunksAdded`: map of chunk paths to sets of module IDs added into those chunks,
 *   - `chunksDeleted`: map of chunk paths to sets of module IDs removed from those chunks.
 */
function computeChangedModules(entries, updates) {
    const chunksAdded = new Map();
    const chunksDeleted = new Map();
    const added = new Map();
    const modified = new Map();
    const deleted = new Set();
    for (const [chunkPath, mergedChunkUpdate] of Object.entries(updates)){
        switch(mergedChunkUpdate.type){
            case 'added':
                {
                    const updateAdded = new Set(mergedChunkUpdate.modules);
                    for (const moduleId of updateAdded){
                        added.set(moduleId, entries[moduleId]);
                    }
                    chunksAdded.set(chunkPath, updateAdded);
                    break;
                }
            case 'deleted':
                {
                    // We could also use `mergedChunkUpdate.modules` here.
                    const updateDeleted = new Set(chunkModulesMap.get(chunkPath));
                    for (const moduleId of updateDeleted){
                        deleted.add(moduleId);
                    }
                    chunksDeleted.set(chunkPath, updateDeleted);
                    break;
                }
            case 'partial':
                {
                    const updateAdded = new Set(mergedChunkUpdate.added);
                    const updateDeleted = new Set(mergedChunkUpdate.deleted);
                    for (const moduleId of updateAdded){
                        added.set(moduleId, entries[moduleId]);
                    }
                    for (const moduleId of updateDeleted){
                        deleted.add(moduleId);
                    }
                    chunksAdded.set(chunkPath, updateAdded);
                    chunksDeleted.set(chunkPath, updateDeleted);
                    break;
                }
            default:
                invariant(mergedChunkUpdate, (mergedChunkUpdate)=>`Unknown merged chunk update type: ${mergedChunkUpdate.type}`);
        }
    }
    // If a module was added from one chunk and deleted from another in the same update,
    // consider it to be modified, as it means the module was moved from one chunk to another
    // AND has new code in a single update.
    for (const moduleId of added.keys()){
        if (deleted.has(moduleId)) {
            added.delete(moduleId);
            deleted.delete(moduleId);
        }
    }
    for (const [moduleId, entry] of Object.entries(entries)){
        // Modules that haven't been added to any chunk but have new code are considered
        // to be modified.
        // This needs to be under the previous loop, as we need it to get rid of modules
        // that were added and deleted in the same update.
        if (!added.has(moduleId)) {
            modified.set(moduleId, entry);
        }
    }
    return {
        added,
        deleted,
        modified,
        chunksAdded,
        chunksDeleted
    };
}
/**
 * Determines the effect of updating a given module by walking its parent graph to find whether the update is accepted, self-declined, or unaccepted.
 * @param {string|number} moduleId - The id of the module to analyze for update effects.
 * @returns {{type: 'accepted', moduleId: string|number, outdatedModules: Set<string|number>} | {type: 'unaccepted', dependencyChain: Array<string|number>} | {type: 'self-declined', dependencyChain: Array<string|number>, moduleId: string|number}}
 * - If `type` is `'accepted'`: `moduleId` is the originally inspected module and `outdatedModules` is the set of modules that must be replaced/re-executed.
 * - If `type` is `'unaccepted'`: the update reached the runtime without any accept handlers; `dependencyChain` shows the path from the updated module to the runtime.
 * - If `type` is `'self-declined'`: a module on the path explicitly declined its own update; `dependencyChain` gives the path to that module and `moduleId` is the declined module.
 */
function getAffectedModuleEffects(moduleId) {
    const outdatedModules = new Set();
    const queue = [
        {
            moduleId,
            dependencyChain: []
        }
    ];
    let nextItem;
    while(nextItem = queue.shift()){
        const { moduleId, dependencyChain } = nextItem;
        if (moduleId != null) {
            if (outdatedModules.has(moduleId)) {
                continue;
            }
            outdatedModules.add(moduleId);
        }
        // We've arrived at the runtime of the chunk, which means that nothing
        // else above can accept this update.
        if (moduleId === undefined) {
            return {
                type: 'unaccepted',
                dependencyChain
            };
        }
        const module = devModuleCache[moduleId];
        const hotState = moduleHotState.get(module);
        if (// The module is not in the cache. Since this is a "modified" update,
        // it means that the module was never instantiated before.
        !module || hotState.selfAccepted && !hotState.selfInvalidated) {
            continue;
        }
        if (hotState.selfDeclined) {
            return {
                type: 'self-declined',
                dependencyChain,
                moduleId
            };
        }
        if (runtimeModules.has(moduleId)) {
            queue.push({
                moduleId: undefined,
                dependencyChain: [
                    ...dependencyChain,
                    moduleId
                ]
            });
            continue;
        }
        for (const parentId of module.parents){
            const parent = devModuleCache[parentId];
            if (!parent) {
                continue;
            }
            // TODO(alexkirsz) Dependencies: check accepted and declined
            // dependencies here.
            queue.push({
                moduleId: parentId,
                dependencyChain: [
                    ...dependencyChain,
                    moduleId
                ]
            });
        }
    }
    return {
        type: 'accepted',
        moduleId,
        outdatedModules
    };
}
/**
 * Apply a chunk-list update by dispatching based on the update's type.
 *
 * Processes three update kinds:
 * - "partial": applies the provided update instruction via applyUpdate.
 * - "restart": triggers a full application restart via DEV_BACKEND.restart.
 * - "notFound": if the chunk list is a runtime list, triggers restart; otherwise disposes the chunk list.
 *
 * @param {string} chunkListPath - The path/identifier of the chunk list being updated.
 * @param {{type: 'partial', instruction: any} | {type: 'restart'} | {type: 'notFound'}} update - The update descriptor.
 * @throws {Error} If `update.type` is not one of "partial", "restart", or "notFound".
 */
function handleApply(chunkListPath, update) {
    switch(update.type){
        case 'partial':
            {
                // This indicates that the update is can be applied to the current state of the application.
                applyUpdate(update.instruction);
                break;
            }
        case 'restart':
            {
                // This indicates that there is no way to apply the update to the
                // current state of the application, and that the application must be
                // restarted.
                DEV_BACKEND.restart();
                break;
            }
        case 'notFound':
            {
                // This indicates that the chunk list no longer exists: either the dynamic import which created it was removed,
                // or the page itself was deleted.
                // If it is a dynamic import, we simply discard all modules that the chunk has exclusive access to.
                // If it is a runtime chunk list, we restart the application.
                if (runtimeChunkLists.has(chunkListPath)) {
                    DEV_BACKEND.restart();
                } else {
                    disposeChunkList(chunkListPath);
                }
                break;
            }
        default:
            throw new Error(`Unknown update type: ${update.type}`);
    }
}
/**
 * Create a Hot Module Replacement (HMR) API object and its associated state for a module.
 *
 * @param {string|number} moduleId - The identifier of the module the hot API is for.
 * @param {Object} [hotData] - An optional data object that is preserved across module replacements and provided to dispose handlers.
 * @returns {{hot: Object, hotState: {selfAccepted: boolean|Function, selfDeclined: boolean, selfInvalidated: boolean, disposeHandlers: Function[]}}}
 * @description
 * Returns an object with:
 * - `hot`: a HMR management API exposing `active`, `data`, `accept`, `decline`, `dispose`,
 *   `addDisposeHandler`, `removeDisposeHandler`, `invalidate`, `status`, `addStatusHandler`,
 *   `removeStatusHandler`, and `check`. `accept` supports either no arguments (mark self-accepted)
 *   or a function callback; `decline` supports no arguments (mark self-declined); `dispose` and
 *   the handler methods manage dispose callbacks; `invalidate` marks the module as invalidated
 *   and enqueues it for processing; `status` returns `"idle"` and `check` resolves to `null`.
 * - `hotState`: a plain state container with `selfAccepted`, `selfDeclined`, `selfInvalidated`,
 *   and `disposeHandlers` that reflect the current HMR state for the module.
 */
function createModuleHot(moduleId, hotData) {
    const hotState = {
        selfAccepted: false,
        selfDeclined: false,
        selfInvalidated: false,
        disposeHandlers: []
    };
    const hot = {
        // TODO(alexkirsz) This is not defined in the HMR API. It was used to
        // decide whether to warn whenever an HMR-disposed module required other
        // modules. We might want to remove it.
        active: true,
        data: hotData ?? {},
        // TODO(alexkirsz) Support full (dep, callback, errorHandler) form.
        accept: (modules, _callback, _errorHandler)=>{
            if (modules === undefined) {
                hotState.selfAccepted = true;
            } else if (typeof modules === 'function') {
                hotState.selfAccepted = modules;
            } else {
                throw new Error('unsupported `accept` signature');
            }
        },
        decline: (dep)=>{
            if (dep === undefined) {
                hotState.selfDeclined = true;
            } else {
                throw new Error('unsupported `decline` signature');
            }
        },
        dispose: (callback)=>{
            hotState.disposeHandlers.push(callback);
        },
        addDisposeHandler: (callback)=>{
            hotState.disposeHandlers.push(callback);
        },
        removeDisposeHandler: (callback)=>{
            const idx = hotState.disposeHandlers.indexOf(callback);
            if (idx >= 0) {
                hotState.disposeHandlers.splice(idx, 1);
            }
        },
        invalidate: ()=>{
            hotState.selfInvalidated = true;
            queuedInvalidatedModules.add(moduleId);
        },
        // NOTE(alexkirsz) This is part of the management API, which we don't
        // implement, but the Next.js React Refresh runtime uses this to decide
        // whether to schedule an update.
        status: ()=>'idle',
        // NOTE(alexkirsz) Since we always return "idle" for now, these are no-ops.
        addStatusHandler: (_handler)=>{},
        removeStatusHandler: (_handler)=>{},
        // NOTE(jridgewell) Check returns the list of updated modules, but we don't
        // want the webpack code paths to ever update (the turbopack paths handle
        // this already).
        check: ()=>Promise.resolve(null)
    };
    return {
        hot,
        hotState
    };
}
/**
 * Remove the mapping between a module and a chunk.
 *
 * @param {string|number} moduleId - Identifier of the module to remove.
 * @param {string} chunkPath - Path of the chunk to remove the module from.
 * @returns {boolean} `true` if the module is no longer included in any chunk, `false` otherwise.
 */ function removeModuleFromChunk(moduleId, chunkPath) {
    const moduleChunks = moduleChunksMap.get(moduleId);
    moduleChunks.delete(chunkPath);
    const chunkModules = chunkModulesMap.get(chunkPath);
    chunkModules.delete(moduleId);
    const noRemainingModules = chunkModules.size === 0;
    if (noRemainingModules) {
        chunkModulesMap.delete(chunkPath);
    }
    const noRemainingChunks = moduleChunks.size === 0;
    if (noRemainingChunks) {
        moduleChunksMap.delete(moduleId);
    }
    return noRemainingChunks;
}
/**
 * Remove a chunk list registration and dispose any chunks that become unreferenced as a result.
 * 
 * Unregisters the chunk list from internal maps, removes the chunk list reference from each associated
 * chunk, disposes chunks that are no longer referenced by any chunk list, and requests the backend to
 * unload the chunk list asset so it can be reloaded later.
 * @param {string} chunkListPath - The identifier/path of the chunk list to dispose.
 * @returns {boolean} `true` if the chunk list was found and disposed, `false` if no registration existed.
 */ function disposeChunkList(chunkListPath) {
    const chunkPaths = chunkListChunksMap.get(chunkListPath);
    if (chunkPaths == null) {
        return false;
    }
    chunkListChunksMap.delete(chunkListPath);
    for (const chunkPath of chunkPaths){
        const chunkChunkLists = chunkChunkListsMap.get(chunkPath);
        chunkChunkLists.delete(chunkListPath);
        if (chunkChunkLists.size === 0) {
            chunkChunkListsMap.delete(chunkPath);
            disposeChunk(chunkPath);
        }
    }
    // We must also dispose of the chunk list's chunk itself to ensure it may
    // be reloaded properly in the future.
    const chunkListUrl = getChunkRelativeUrl(chunkListPath);
    DEV_BACKEND.unloadChunk?.(chunkListUrl);
    return true;
}
/**
 * Unload a chunk and dispose modules that are no longer associated with any chunk.
 *
 * Triggers the runtime backend to unload the chunk's assets and removes the chunk from internal
 * maps; any modules that become unreferenced by other chunks are disposed and removed from the
 * available module registry.
 *
 * @param {string} chunkPath - The chunk path identifier to unload.
 * @returns {boolean} `true` if the chunk was present and removed, `false` otherwise.
 */ function disposeChunk(chunkPath) {
    const chunkUrl = getChunkRelativeUrl(chunkPath);
    // This should happen whether the chunk has any modules in it or not.
    // For instance, CSS chunks have no modules in them, but they still need to be unloaded.
    DEV_BACKEND.unloadChunk?.(chunkUrl);
    const chunkModules = chunkModulesMap.get(chunkPath);
    if (chunkModules == null) {
        return false;
    }
    chunkModules.delete(chunkPath);
    for (const moduleId of chunkModules){
        const moduleChunks = moduleChunksMap.get(moduleId);
        moduleChunks.delete(chunkPath);
        const noRemainingChunks = moduleChunks.size === 0;
        if (noRemainingChunks) {
            moduleChunksMap.delete(moduleId);
            disposeModule(moduleId, 'clear');
            availableModules.delete(moduleId);
        }
    }
    return true;
}
/**
 * Register a module as part of a chunk.
 *
 * Adds the chunkPath to the set of chunks for the given moduleId and adds the moduleId to the set of modules for the given chunkPath, updating the runtime's module/chunk maps.
 * @param {string|number} moduleId - The module identifier to add to the chunk.
 * @param {string} chunkPath - The chunk path to which the module should be added.
 */ function addModuleToChunk(moduleId, chunkPath) {
    let moduleChunks = moduleChunksMap.get(moduleId);
    if (!moduleChunks) {
        moduleChunks = new Set([
            chunkPath
        ]);
        moduleChunksMap.set(moduleId, moduleChunks);
    } else {
        moduleChunks.add(chunkPath);
    }
    let chunkModules = chunkModulesMap.get(chunkPath);
    if (!chunkModules) {
        chunkModules = new Set([
            moduleId
        ]);
        chunkModulesMap.set(chunkPath, chunkModules);
    } else {
        chunkModules.add(moduleId);
    }
}
/**
 * Mark a chunk list as a runtime chunk list.
 * Runtime chunk lists are treated as always loaded; multiple chunk lists may be marked as runtime.
 * @param {string} chunkListPath - The chunk list path to mark as runtime.
 */ function markChunkListAsRuntime(chunkListPath) {
    runtimeChunkLists.add(chunkListPath);
}
/**
 * Register a chunk described by a runtime registration array with the backend.
 *
 * The first element of `registration` is the script path used to derive the chunk path.
 * If `registration` has exactly two elements the second is treated as runtime parameters
 * and forwarded to the backend; otherwise the remainder is treated as compressed module
 * factory data which will be installed before delegating to the backend.
 *
 * @param {Array} registration - Chunk registration array: [scriptPath, runtimeParams?] or a compressed factory payload starting at index 1.
 * @returns {*} The value returned by BACKEND.registerChunk for the registered chunk.
 */
function registerChunk(registration) {
    const chunkPath = getPathFromScript(registration[0]);
    let runtimeParams;
    // When bootstrapping we are passed a single runtimeParams object so we can distinguish purely based on length
    if (registration.length === 2) {
        runtimeParams = registration[1];
    } else {
        runtimeParams = undefined;
        installCompressedModuleFactories(registration, /* offset= */ 1, moduleFactories, (id)=>addModuleToChunk(id, chunkPath));
    }
    return BACKEND.registerChunk(chunkPath, runtimeParams);
}
/**
 * Register a chunk list for update notifications and associate its chunks with runtime maps.
 *
 * @param {Object} chunkList - Chunk list descriptor.
 * @param {string} chunkList.script - Script URL or identifier used to derive the chunk-list path.
 * @param {Array<Object>} chunkList.chunks - Array of chunk descriptors; each entry is passed to getChunkPath to derive the chunk path.
 * @param {string} [chunkList.source] - Optional source marker; when equal to `'entry'`, the chunk list is marked as a runtime chunk list.
 */ function registerChunkList(chunkList) {
    const chunkListScript = chunkList.script;
    const chunkListPath = getPathFromScript(chunkListScript);
    // The "chunk" is also registered to finish the loading in the backend
    BACKEND.registerChunk(chunkListPath);
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS.push([
        chunkListPath,
        handleApply.bind(null, chunkListPath)
    ]);
    // Adding chunks to chunk lists and vice versa.
    const chunkPaths = new Set(chunkList.chunks.map(getChunkPath));
    chunkListChunksMap.set(chunkListPath, chunkPaths);
    for (const chunkPath of chunkPaths){
        let chunkChunkLists = chunkChunkListsMap.get(chunkPath);
        if (!chunkChunkLists) {
            chunkChunkLists = new Set([
                chunkListPath
            ]);
            chunkChunkListsMap.set(chunkPath, chunkChunkLists);
        } else {
            chunkChunkLists.add(chunkListPath);
        }
    }
    if (chunkList.source === 'entry') {
        markChunkListAsRuntime(chunkListPath);
    }
}
globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS ??= [];
/**
 * This file contains the runtime code specific to the Turbopack development
 * ECMAScript DOM runtime.
 *
 * It will be appended to the base development runtime code.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../../../browser/runtime/base/runtime-base.ts" />
/// <reference path="../../../shared/runtime-types.d.ts" />
let BACKEND;
/**
 * Maps chunk paths to the corresponding resolver.
 */ const chunkResolvers = new Map();
(()=>{
    BACKEND = {
        async registerChunk (chunkPath, params) {
            const chunkUrl = getChunkRelativeUrl(chunkPath);
            const resolver = getOrCreateResolver(chunkUrl);
            resolver.resolve();
            if (params == null) {
                return;
            }
            for (const otherChunkData of params.otherChunks){
                const otherChunkPath = getChunkPath(otherChunkData);
                const otherChunkUrl = getChunkRelativeUrl(otherChunkPath);
                // Chunk might have started loading, so we want to avoid triggering another load.
                getOrCreateResolver(otherChunkUrl);
            }
            // This waits for chunks to be loaded, but also marks included items as available.
            await Promise.all(params.otherChunks.map((otherChunkData)=>loadInitialChunk(chunkPath, otherChunkData)));
            if (params.runtimeModuleIds.length > 0) {
                for (const moduleId of params.runtimeModuleIds){
                    getOrInstantiateRuntimeModule(chunkPath, moduleId);
                }
            }
        },
        /**
     * Loads the given chunk, and returns a promise that resolves once the chunk
     * has been loaded.
     */ loadChunkCached (sourceType, chunkUrl) {
            return doLoadChunk(sourceType, chunkUrl);
        },
        async loadWebAssembly (_sourceType, _sourceData, wasmChunkPath, _edgeModule, importsObj) {
            const req = fetchWebAssembly(wasmChunkPath);
            const { instance } = await WebAssembly.instantiateStreaming(req, importsObj);
            return instance.exports;
        },
        async loadWebAssemblyModule (_sourceType, _sourceData, wasmChunkPath, _edgeModule) {
            const req = fetchWebAssembly(wasmChunkPath);
            return await WebAssembly.compileStreaming(req);
        }
    };
    /**
     * Create or retrieve a resolver object that tracks loading state for a chunk URL.
     * @param {string} chunkUrl - The chunk's URL used as the resolver key.
     * @returns {{resolved: boolean, loadingStarted: boolean, promise: Promise<void>, resolve: function(): void, reject: function(*=): void}} The resolver: `resolved` indicates completion, `loadingStarted` marks if load began, `promise` settles when resolved/rejected, `resolve()` marks success, and `reject(reason)` marks failure.
     */
    function getOrCreateResolver(chunkUrl) {
        let resolver = chunkResolvers.get(chunkUrl);
        if (!resolver) {
            let resolve;
            let reject;
            const promise = new Promise((innerResolve, innerReject)=>{
                resolve = innerResolve;
                reject = innerReject;
            });
            resolver = {
                resolved: false,
                loadingStarted: false,
                promise,
                resolve: ()=>{
                    resolver.resolved = true;
                    resolve();
                },
                reject: reject
            };
            chunkResolvers.set(chunkUrl, resolver);
        }
        return resolver;
    }
    /**
     * Start loading a chunk URL into the current environment and wait for it to become available.
     *
     * @param {SourceType} sourceType - Origin of the chunk (e.g., Runtime vs. normal); affects whether existing DOM assets are assumed present.
     * @param {string} chunkUrl - The URL of the chunk to load.
     * @returns {Promise<void>} Resolves when the chunk is loaded and ready for instantiation (CSS chunks are considered loaded once applied; JS chunks are considered loaded once their script has executed and registered). Rejects if the asset fails to load.
     * @throws {Error} If the chunk type cannot be inferred from the URL in the current environment (worker vs DOM).
     */ function doLoadChunk(sourceType, chunkUrl) {
        const resolver = getOrCreateResolver(chunkUrl);
        if (resolver.loadingStarted) {
            return resolver.promise;
        }
        if (sourceType === SourceType.Runtime) {
            // We don't need to load chunks references from runtime code, as they're already
            // present in the DOM.
            resolver.loadingStarted = true;
            if (isCss(chunkUrl)) {
                // CSS chunks do not register themselves, and as such must be marked as
                // loaded instantly.
                resolver.resolve();
            }
            // We need to wait for JS chunks to register themselves within `registerChunk`
            // before we can start instantiating runtime modules, hence the absence of
            // `resolver.resolve()` in this branch.
            return resolver.promise;
        }
        if (typeof importScripts === 'function') {
            // We're in a web worker
            if (isCss(chunkUrl)) {
            // ignore
            } else if (isJs(chunkUrl)) {
                self.TURBOPACK_NEXT_CHUNK_URLS.push(chunkUrl);
                importScripts(TURBOPACK_WORKER_LOCATION + chunkUrl);
            } else {
                throw new Error(`can't infer type of chunk from URL ${chunkUrl} in worker`);
            }
        } else {
            // TODO(PACK-2140): remove this once all filenames are guaranteed to be escaped.
            const decodedChunkUrl = decodeURI(chunkUrl);
            if (isCss(chunkUrl)) {
                const previousLinks = document.querySelectorAll(`link[rel=stylesheet][href="${chunkUrl}"],link[rel=stylesheet][href^="${chunkUrl}?"],link[rel=stylesheet][href="${decodedChunkUrl}"],link[rel=stylesheet][href^="${decodedChunkUrl}?"]`);
                if (previousLinks.length > 0) {
                    // CSS chunks do not register themselves, and as such must be marked as
                    // loaded instantly.
                    resolver.resolve();
                } else {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = chunkUrl;
                    link.onerror = ()=>{
                        resolver.reject();
                    };
                    link.onload = ()=>{
                        // CSS chunks do not register themselves, and as such must be marked as
                        // loaded instantly.
                        resolver.resolve();
                    };
                    // Append to the `head` for webpack compatibility.
                    document.head.appendChild(link);
                }
            } else if (isJs(chunkUrl)) {
                const previousScripts = document.querySelectorAll(`script[src="${chunkUrl}"],script[src^="${chunkUrl}?"],script[src="${decodedChunkUrl}"],script[src^="${decodedChunkUrl}?"]`);
                if (previousScripts.length > 0) {
                    // There is this edge where the script already failed loading, but we
                    // can't detect that. The Promise will never resolve in this case.
                    for (const script of Array.from(previousScripts)){
                        script.addEventListener('error', ()=>{
                            resolver.reject();
                        });
                    }
                } else {
                    const script = document.createElement('script');
                    script.src = chunkUrl;
                    // We'll only mark the chunk as loaded once the script has been executed,
                    // which happens in `registerChunk`. Hence the absence of `resolve()` in
                    // this branch.
                    script.onerror = ()=>{
                        resolver.reject();
                    };
                    // Append to the `head` for webpack compatibility.
                    document.head.appendChild(script);
                }
            } else {
                throw new Error(`can't infer type of chunk from URL ${chunkUrl}`);
            }
        }
        resolver.loadingStarted = true;
        return resolver.promise;
    }
    /**
     * Fetches a WebAssembly chunk using the runtime-resolved URL for the given chunk path.
     * @param {string} wasmChunkPath - The runtime-local chunk path to resolve (e.g., relative chunk identifier).
     * @returns {Promise<Response>} A promise that resolves to the fetch Response for the requested WebAssembly chunk.
     */
    function fetchWebAssembly(wasmChunkPath) {
        return fetch(getChunkRelativeUrl(wasmChunkPath));
    }
})();
/**
 * This file contains the runtime code specific to the Turbopack development
 * ECMAScript DOM runtime.
 *
 * It will be appended to the base development runtime code.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../base/runtime-base.ts" />
/// <reference path="../base/dev-base.ts" />
/// <reference path="./runtime-backend-dom.ts" />
/// <reference path="../../../shared/require-type.d.ts" />
let DEV_BACKEND;
(()=>{
    DEV_BACKEND = {
        unloadChunk (chunkUrl) {
            deleteResolver(chunkUrl);
            // TODO(PACK-2140): remove this once all filenames are guaranteed to be escaped.
            const decodedChunkUrl = decodeURI(chunkUrl);
            if (isCss(chunkUrl)) {
                const links = document.querySelectorAll(`link[href="${chunkUrl}"],link[href^="${chunkUrl}?"],link[href="${decodedChunkUrl}"],link[href^="${decodedChunkUrl}?"]`);
                for (const link of Array.from(links)){
                    link.remove();
                }
            } else if (isJs(chunkUrl)) {
                // Unloading a JS chunk would have no effect, as it lives in the JS
                // runtime once evaluated.
                // However, we still want to remove the script tag from the DOM to keep
                // the HTML somewhat consistent from the user's perspective.
                const scripts = document.querySelectorAll(`script[src="${chunkUrl}"],script[src^="${chunkUrl}?"],script[src="${decodedChunkUrl}"],script[src^="${decodedChunkUrl}?"]`);
                for (const script of Array.from(scripts)){
                    script.remove();
                }
            } else {
                throw new Error(`can't infer type of chunk from URL ${chunkUrl}`);
            }
        },
        reloadChunk (chunkUrl) {
            return new Promise((resolve, reject)=>{
                if (!isCss(chunkUrl)) {
                    reject(new Error('The DOM backend can only reload CSS chunks'));
                    return;
                }
                const decodedChunkUrl = decodeURI(chunkUrl);
                const previousLinks = document.querySelectorAll(`link[rel=stylesheet][href="${chunkUrl}"],link[rel=stylesheet][href^="${chunkUrl}?"],link[rel=stylesheet][href="${decodedChunkUrl}"],link[rel=stylesheet][href^="${decodedChunkUrl}?"]`);
                if (previousLinks.length === 0) {
                    reject(new Error(`No link element found for chunk ${chunkUrl}`));
                    return;
                }
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                if (navigator.userAgent.includes('Firefox')) {
                    // Firefox won't reload CSS files that were previously loaded on the current page,
                    // we need to add a query param to make sure CSS is actually reloaded from the server.
                    //
                    // I believe this is this issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1037506
                    //
                    // Safari has a similar issue, but only if you have a `<link rel=preload ... />` tag
                    // pointing to the same URL as the stylesheet: https://bugs.webkit.org/show_bug.cgi?id=187726
                    link.href = `${chunkUrl}?ts=${Date.now()}`;
                } else {
                    link.href = chunkUrl;
                }
                link.onerror = ()=>{
                    reject();
                };
                link.onload = ()=>{
                    // First load the new CSS, then remove the old ones. This prevents visible
                    // flickering that would happen in-between removing the previous CSS and
                    // loading the new one.
                    for (const previousLink of Array.from(previousLinks))previousLink.remove();
                    // CSS chunks do not register themselves, and as such must be marked as
                    // loaded instantly.
                    resolve();
                };
                // Make sure to insert the new CSS right after the previous one, so that
                // its precedence is higher.
                previousLinks[0].parentElement.insertBefore(link, previousLinks[0].nextSibling);
            });
        },
        restart: ()=>self.location.reload()
    };
    /**
     * Remove the resolver entry associated with a chunk URL.
     * @param {string} chunkUrl - The chunk URL whose resolver should be deleted from the resolver map.
     */
    function deleteResolver(chunkUrl) {
        chunkResolvers.delete(chunkUrl);
    }
})();
/**
 * Evaluate a code string after appending a synthetic sourceURL and an optional inline source map to aid debugging.
 *
 * @param {string} code - The JavaScript source to evaluate.
 * @param {string} url - Chunk-relative path used to construct the appended `sourceURL`.
 * @param {string} [map] - Optional source map JSON; when provided it is encoded and appended as an inline `sourceMappingURL`.
 * @returns {*} The value produced by executing the evaluated code.
 */
function _eval({ code, url, map }) {
    code += `\n\n//# sourceURL=${encodeURI(location.origin + CHUNK_BASE_PATH + url + CHUNK_SUFFIX_PATH)}`;
    if (map) {
        code += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(// btoa doesn't handle nonlatin characters, so escape them as \x sequences
        // See https://stackoverflow.com/a/26603875
        unescape(encodeURIComponent(map)))}`;
    }
    // eslint-disable-next-line no-eval
    return eval(code);
}
const chunksToRegister = globalThis.TURBOPACK;
globalThis.TURBOPACK = { push: registerChunk };
chunksToRegister.forEach(registerChunk);
const chunkListsToRegister = globalThis.TURBOPACK_CHUNK_LISTS || [];
globalThis.TURBOPACK_CHUNK_LISTS = { push: registerChunkList };
chunkListsToRegister.forEach(registerChunkList);
})();


//# sourceMappingURL=_45210fd5._.js.map
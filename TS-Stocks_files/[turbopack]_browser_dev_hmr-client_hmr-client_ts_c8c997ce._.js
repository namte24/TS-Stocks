(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
/**
 * Initialize the Turbopack HMR client: register an incoming message handler, process HMR messages,
 * apply aggregated updates, and expose a global chunk update listener registry.
 *
 * @param {Object} options - Connection utilities.
 * @param {(cb: (msg: any) => void) => void} options.addMessageListener - Registers a callback to receive socket messages.
 * @param {(msg: any) => void} options.sendMessage - Sends a message to the HMR server.
 * @param {(err: unknown) => void} [options.onUpdateError=console.error] - Called when applying updates fails.
 * @throws {Error} If a previous non-array TURBOPACK_CHUNK_UPDATE_LISTENERS handler is already registered on globalThis.
 */
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
/**
 * Serialize a value to JSON and send it using the provided messaging function.
 * @param {function(string): void} sendMessage - Function that delivers a string message to the receiver.
 * @param {*} message - Value to serialize with JSON.stringify before sending.
 */
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
/**
 * Produce a stable string key for a resource using its path and headers.
 *
 * @param {{path: string, headers?: Record<string, any>|null}} resource - Resource descriptor; `path` is the resource path and `headers` are optional request headers or metadata.
 * @returns {string} A string key representing the resource, suitable for use as a Map key or identifier.
 */
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
/**
 * Subscribe to updates for a resource over the provided message channel.
 * @param {Object} resource - Identification for the subscription (e.g., `path` and optional `headers`) used to target the resource to subscribe to.
 * @returns {Function} A function that, when called, unsubscribes from updates for the same resource.
 */
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
/**
 * Re-subscribes to updates for all resources currently tracked in the client registry.
 * 
 * Iterates over the tracked resource keys and issues subscription requests so the server
 * will resume sending update notifications for each resource.
 * @param {function} sendMessage - Function used to send messages to the HMR server (e.g., subscription requests).
 */
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
/**
 * Merge an incoming chunk-list update into the pending aggregated updates for its resource.
 *
 * If there is an existing pending update for the resource, combines the new instruction with the
 * stored one; otherwise stores the incoming update as the pending update.
 *
 * @param {Object} msg - Update message containing the resource identifier and instruction.
 * @param {string} msg.resource - The resource path or descriptor to derive the aggregation key.
 * @param {Object} msg.instruction - The chunk-list update instruction to aggregate.
 */
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
/**
 * Apply any queued chunk-list updates: run pre-refresh hooks, deliver each aggregated update, and finalize the refresh.
 *
 * If there are no pending updates this function does nothing.
 */
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
/**
 * Combine two ChunkListUpdate objects into a single consolidated ChunkListUpdate.
 * 
 * Merges per-chunk updates and merges any Ecmascript merged updates into a single
 * merged entry when both inputs provide merged arrays. If only one input provides
 * a field, that field is preserved; if neither provides it, the field is omitted.
 *
 * @param {Object} updateA - First chunk list update to merge.
 * @param {Object} updateB - Second chunk list update to merge.
 * @returns {Object} A new `ChunkListUpdate` with combined `chunks` and `merged` fields.
 */
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
/**
 * Merge two per-chunk update maps into a single map of chunk updates.
 *
 * When a chunk exists in both inputs, the two updates are merged; if the merge
 * produces `undefined`, that chunk is omitted from the result. Chunks present
 * in only one input are copied through unchanged.
 *
 * @param {Object<string, any>} chunksA - Map from chunk path to chunk update.
 * @param {Object<string, any>} chunksB - Map from chunk path to chunk update.
 * @returns {Object<string, any>} A map from chunk path to the merged chunk update.
 */
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
/**
 * Merge two per-chunk update records into a single coherent update.
 * @param {Object} updateA - First chunk update with a `type` field: `"added"`, `"deleted"`, or `"partial"`. If `type` is `"partial"`, an `instruction` property is expected.
 * @param {Object} updateB - Second chunk update with the same shape as `updateA`.
 * @returns {Object|undefined} The merged chunk update, or `undefined` when the updates cancel each other or cannot be merged (for example, an `"added"` combined with a `"deleted"`).
 * @throws {Error} If a `"partial"` update is missing its required `instruction`.
 */
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
/**
 * Combine two Ecmascript merged-update records into a single merged update.
 * @param {object} mergedA - First `EcmascriptMergedUpdate`-shaped record to merge.
 * @param {object} mergedB - Second `EcmascriptMergedUpdate`-shaped record to merge.
 * @returns {object} A new `EcmascriptMergedUpdate` object containing the merged `entries` and `chunks`.
 */
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
/**
 * Merge two ECMAScript chunk entry maps, with properties from the second map overriding the first.
 * @param {Object<string, any>} entriesA - Mapping of entry keys to entry descriptors (base entries).
 * @param {Object<string, any>} entriesB - Mapping of entry keys to entry descriptors to merge (overrides).
 * @returns {Object<string, any>} The merged entries map where keys from `entriesB` replace those from `entriesA`.
 */
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
/**
 * Merge two mappings of Ecmascript chunk updates into a single mapping.
 *
 * For chunk paths present in both inputs, their updates are combined into a single update.
 * Chunk paths present in only one input are preserved. If an input is `null` or `undefined`,
 * the other input is returned as-is.
 *
 * @param {Object<string, any>|null|undefined} chunksA - Mapping from chunk path to an Ecmascript chunk update (or `null`/`undefined`).
 * @param {Object<string, any>|null|undefined} chunksB - Mapping from chunk path to an Ecmascript chunk update (or `null`/`undefined`).
 * @returns {Object<string, any>|undefined} A merged mapping of chunk paths to Ecmascript chunk updates, or `undefined` if no chunks remain after merging.
 */
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
/**
 * Merge two Ecmascript chunk updates into a single update representing their combined effect.
 *
 * @param {Object} updateA - The first update to merge. Expected shape: `{ type: 'added'|'deleted'|'partial', modules?: string[], added?: string[], deleted?: string[] }`.
 * @param {Object} updateB - The second update to merge. Same expected shape as `updateA`. `updateB` represents a later update and takes precedence in conflict resolution.
 * @returns {Object|undefined} The merged update (with `type` of `'added'`, `'deleted'`, or `'partial'`) or `undefined` when the updates cancel each other out or the combination is invalid.
 */
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
/**
 * Throws an error with the provided message.
 * @param {string} message - The message to include in the thrown error.
 * @throws {Error} An Error whose message is prefixed with "Invariant: " followed by the provided message.
 */
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
/**
 * Orders two items according to their positions in a reference list.
 * @param {Array<*>} list - Reference list defining the desired ordering; items not present are considered after listed items.
 * @param {*} a - First item to compare.
 * @param {*} b - Second item to compare.
 * @returns {number} A negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or `0` if they have equal ordering.
 */
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
/**
 * Collects, deduplicates, sorts, and emits the consolidated list of current issues.
 *
 * Scans the per-chunk issue registry, removes duplicate issues (by `formatted` text), sorts the unique issues using `sortIssues`, and forwards the resulting list to `hooks.issues`.
 */
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
/**
 * Record and emit issues for a resource, and report whether any are critical.
 * 
 * @param {{resource: import('./path/to/types').ResourceLike, issues: Array<{severity: string}>}} msg - Update containing the resource identifier and its list of issues; `issues` may be empty to clear prior issues for the resource.
 * @returns {boolean} `true` if at least one issue in `msg.issues` has a severity listed in `CRITICAL`, `false` otherwise.
 */
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
/**
 * Sorts an array of issue objects in-place by severity then category using predefined orderings.
 * @param {Array<{severity: string, category: string}>} issues - The array of issues to sort; elements are compared by `severity` then `category`.
 */
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
/**
 * Merge provided lifecycle callback handlers into the existing hooks object.
 * @param {Object} newHooks - An object containing one or more hook handlers (e.g., `beforeRefresh`, `refresh`, `buildOk`, `issues`). Provided properties replace the corresponding existing handlers.
 */
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
/**
 * Handle an incoming HMR socket message by processing issues, aggregating partial updates, or triggering a single update.
 *
 * Processes the message's `issues` then:
 * - if `msg.type` is "issues", only updates issue state;
 * - if `msg.type` is "partial", merges the update into the aggregated pending updates;
 * - otherwise, triggers the single update and, when there are no pending aggregated updates, invokes refresh lifecycle hooks before and after the update.
 *
 * @param {{type: string, issues?: Array, [key: string]: any}} msg - The socket message. Must include `type`; may include `issues` and update payload fields consumed by aggregation/trigger logic.
 */
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
/**
 * Finalizes an applied HMR update by invoking lifecycle hooks and notifying any test harness.
 *
 * Calls the configured refresh and buildOk hooks; if a global Next.js HMR callback
 * (globalThis.__NEXT_HMR_CB) is present, invokes it once and clears the global reference.
 */
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
/**
 * Subscribe to updates for a chunk list resource.
 * @param {string} chunkListPath - Path identifying the chunk list to subscribe to.
 * @param {Function} sendMessage - Function used to send JSON messages to the HMR server.
 * @param {Function} callback - Called with update messages for the chunk list.
 * @returns {Function} An unsubscribe function that stops receiving updates for the specified chunk list.
 */
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
/**
 * Subscribe to updates for a given resource and register a callback to be invoked on each update.
 * 
 * Registers the callback in a per-resource listener set and ensures a single underlying
 * subscription is maintained for that resource. When the returned unsubscribe function is
 * called, the callback is removed and the underlying subscription is cancelled if no callbacks remain.
 * 
 * @param {{path: string, headers?: Record<string,string>}} resource - Resource identifier used to derive the subscription key.
 * @param {(msg: any) => void} sendMessage - Function used to send subscription/unsubscription messages to the server.
 * @param {(update: any) => void} callback - Callback invoked for each update message for the resource.
 * @returns {() => void} A function that removes the registered callback; when the last callback for the resource is removed, the subscription is cancelled.
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
/**
 * Invoke all registered callbacks for the given resource update and remove stored callbacks when the resource is reported as not found.
 *
 * @param {Object} msg - Update message. Must include a `resource` descriptor used to locate callbacks; may include a `type` field (e.g., `'notFound'`) and additional update details that will be passed to callbacks.
 */
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
]);

//# sourceMappingURL=%5Bturbopack%5D_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js.map
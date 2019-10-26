"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPMethods_1 = require("./HTTPMethods");
var MetadataKeys_1 = require("./MetadataKeys");
// Route Binder
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
exports.get = routeBinder(HTTPMethods_1.HTTPMethods.GET);
exports.put = routeBinder(HTTPMethods_1.HTTPMethods.PUT);
exports.post = routeBinder(HTTPMethods_1.HTTPMethods.POST);
exports.del = routeBinder(HTTPMethods_1.HTTPMethods.DELETE);
exports.patch = routeBinder(HTTPMethods_1.HTTPMethods.PATCH);

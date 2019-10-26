"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routerPrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        // Loop through all methods in class where decorator exist and add route handler association
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
            // Applied HTTP Methods enum so Router definition know what method will be injected in router computed property
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
            // pull off the middlewares if there's one
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            // if path found then add route handler and middleware association
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routerPrefix + path], middlewares, [routeHandler]));
            }
        }
    };
}
exports.controller = controller;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter = /** @class */ (function () {
    function Sorter(collection) {
        var _this = this;
        this.collection = collection;
        this.sort = function () {
            var _a = _this.collection, length = _a.length, compare = _a.compare, swap = _a.swap;
            for (var i = 0; i < length; i++) {
                for (var j = 0; j < length - i - 1; j++) {
                    // [10, 3, -5, 0]
                    // type guard to restore access to specific types properties associated that's been restricted by union type
                    if (compare(j, j + 1)) {
                        swap(j, j + 1);
                    }
                }
            }
        };
    }
    return Sorter;
}());
exports.Sorter = Sorter;

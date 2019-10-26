"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringToDate = function (dateString) {
    // 28/10/2018
    var _a = dateString
        .split('/')
        .map(function (value) { return parseInt(value); }), Day = _a[0], Month = _a[1], Year = _a[2];
    return new Date(Year, Month - 1, Day);
};

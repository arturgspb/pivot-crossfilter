// Pivot-js
// Copyright 2015 Peter Moresi

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.pivot = pivot;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crossfilter = require('crossfilter');

var _crossfilter2 = _interopRequireDefault(_crossfilter);

function pivot(facts, row, col) {
    var rowDim = facts.dimension(function (d) {
        return d[row];
    }),
        colDim = facts.dimension(function (d) {
        return d[col];
    }),
        rowColDim = facts.dimension(function (d) {
        return d[row] + '|' + d[col];
    }),
        rows = rowDim.group().all(),
        rowMap = {},
        cols = colDim.group().all(),
        colMap = {},
        product = rowColDim.group().all(),
        productMap = {},
        out = {};

    var m = function m(rows, map) {
        rows.forEach(function (r) {
            map[r.key] = r.value;
        });
    };

    m(rows, rowMap);
    m(cols, colMap);
    m(product, productMap);

    out['' + row] = rowMap;
    out['' + col] = colMap;
    out[row + '|' + col] = productMap;

    return out;
}
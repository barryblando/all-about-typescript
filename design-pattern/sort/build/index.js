"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter_1 = require("./Sorter");
var LinkedList_1 = require("./LinkedList");
// const numbersCollection = new NumbersCollection([10, 3, -5, 0])
// const charactersCollection = new CharactersCollection('ShaminA')
// const numberSorter = new Sorter(numbersCollection)
// const characterSorter = new Sorter(charactersCollection)
// numberSorter.sort()
// characterSorter.sort()
// console.log(charactersCollection.data);
// console.log(numbersCollection.data);
var linkedList = new LinkedList_1.LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);
var sorter = new Sorter_1.Sorter(linkedList);
sorter.sort();
linkedList.print();

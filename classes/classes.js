"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = (function () {
    function Person(name, username, typeF, age) {
        if (age === void 0) { age = 25; }
        this.username = username;
        this.name = name;
        this.typeF = typeF;
        this.age = age;
    }
    Person.prototype.printAge = function () {
        console.log(this.age);
        this.setType(this.typeF);
    };
    Person.prototype.setType = function (typeF) {
        if (typeF === 3)
            console.log("Old Guy");
    };
    return Person;
}());
var Barry = (function (_super) {
    __extends(Barry, _super);
    function Barry(username, typeF) {
        var _this = _super.call(this, "Barry", username, typeF) || this;
        _this.age = 31;
        return _this;
    }
    return Barry;
}(Person));
var Plant = (function () {
    function Plant() {
        this._species = "Default";
    }
    Object.defineProperty(Plant.prototype, "species", {
        get: function () {
            return this._species;
        },
        set: function (value) {
            if (value.length > 3) {
                this._species = value;
            }
            this.species;
        },
        enumerable: true,
        configurable: true
    });
    return Plant;
}());
var plant = new Plant();
plant.species = "Green";
plant.species;
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.calcCircumference = function (diameter) {
        return this.PI * diameter;
    };
    Helpers.PI = 3.14;
    return Helpers;
}());
2 * Helpers.PI;
Helpers.calcCircumference(8);
var Project = (function () {
    function Project() {
        this.projectName = "Default";
        this.budget = 2;
    }
    Project.prototype.calcBudget = function () {
        return this.budget * 2;
    };
    return Project;
}());
var ITProject = (function (_super) {
    __extends(ITProject, _super);
    function ITProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ITProject.prototype.changeName = function (name) {
        this.projectName = name;
    };
    return ITProject;
}(Project));
var newITProject = new ITProject();
newITProject.changeName("ABE Construction");
newITProject;
var OnlyOne = (function () {
    function OnlyOne(name) {
        this.name = name;
    }
    OnlyOne.getInstance = function () {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne('The Only One');
        }
        return OnlyOne.instance;
    };
    return OnlyOne;
}());
var right = OnlyOne.getInstance();
var Car = (function () {
    function Car(name) {
        this.acceleration = 0;
        this.name = name;
    }
    Car.prototype.honk = function () {
        console.log('Tooooot!');
    };
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var carInstance = new Car("BMW");
carInstance.honk();
console.log(carInstance.acceleration);
carInstance.accelerate(20);
console.log(carInstance.acceleration);
var BaseObject = (function () {
    function BaseObject() {
        this.width = 0;
        this.length = 0;
    }
    return BaseObject;
}());
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.calcSize = function () {
        return this.width * this.length;
    };
    return Rectangle;
}(BaseObject));
var rectangleInstance = new Rectangle();
rectangleInstance.width = 5;
rectangleInstance.length = 10;
rectangleInstance.calcSize();
var PersonGetterSetter = (function () {
    function PersonGetterSetter() {
        this._firstName = "";
    }
    Object.defineProperty(PersonGetterSetter.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            if (value.length > 3) {
                this._firstName = value;
            }
            else {
                this._firstName = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return PersonGetterSetter;
}());
var personInstance = new PersonGetterSetter();
personInstance.firstName = "He";
personInstance.firstName;

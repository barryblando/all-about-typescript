"use strict";
var MyMath;
(function (MyMath) {
    var PI = 3.14;
    var Circle;
    (function (Circle) {
        function calculateCircumference(diameter) {
            return diameter * PI;
        }
        Circle.calculateCircumference = calculateCircumference;
    })(Circle = MyMath.Circle || (MyMath.Circle = {}));
})(MyMath || (MyMath = {}));

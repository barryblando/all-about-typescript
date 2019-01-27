/// <reference path="rectangleMath.ts" />
/// <reference path="circleMath.ts" />

// you can access nested namespace using import (this is not import like on ES6)
import CircleMath = MyMath.Circle;

MyMath.calculateRectangle(25, 30);
CircleMath.calculateCircumference(2);
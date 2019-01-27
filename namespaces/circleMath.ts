// namespace makes sure that not everything is registered on own scope or global scope
// which tends to get polluted pretty quickly
// - great tool for smaller applications
namespace MyMath {
  const PI = 3.14; // only exist on namespace unless exported

  // 2nd level namespace - make sure not to overdo it if you want to keep it somehow manageable
  export namespace Circle {
    export function calculateCircumference(diameter: number) {
      return diameter * PI;
    }
  }
}



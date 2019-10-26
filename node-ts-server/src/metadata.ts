import 'reflect-metadata'
// INFO: https://github.com/rbuckton/reflect-metadata/

// const plane = {
//   color: 'red'
// }

// Reflect.defineMetadata('note', 'hi there', plane)

// const note = Reflect.getMetadata('note', plane)

// console.log(note)

@controller
class Plane {
  color: string =  'red'

  @get('/login')
  fly(): void {
    console.log('Vrrrrr');
  }
}

function get(path: string) {
  return function(target: Plane, key: any) {
    // NOTE: Define metadata accepts four arguments 
    // 1st: Metadata Key to match
    // 2nd: Metadata Value
    // 3rd: Target Object where it will be injected
    // 4th: PropertyKey or method name where decorator gets assign
    Reflect.defineMetadata('path', path, target, key)
  }
}

function controller(target: typeof Plane) { // Make plane a function type using `typeof` or use `Function`
  for (let key in target.prototype) {
    // NOTE: Get Metadata accepts three arguments
    // 1st: Metadata Key
    // 2nd: Target Object where decorator located
    // 3rd: Property Key or method name where decorator was assigned
    const path = Reflect.getMetadata('path', target.prototype, key)
    console.log(path);
  }
}
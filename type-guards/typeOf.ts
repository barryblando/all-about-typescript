const android = {
  name: 'barry',
  age: 104
}

type Android = typeof android // returns object type
type AndroidKeys = keyof Android // returns string literal type
type AndroidTypes = Android[AndroidKeys] // Lookup returns union type


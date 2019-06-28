// Sometimes we want to make sure that object properties are read-only. Take a look at the following example:

type AB = { a: number; b: string };

const readOnlyNone = (o: AB) => {
  o.a = 100; // No Error!
  return o;
};

// We can rewrite our a property to readonly a and ensure that a is read-only now.

type ReadOnlyA = { readonly a: number; b: string };

const readOnlyA = (o: ReadOnlyA) => {
  // o.a = 100; // !Error!
  o.b = "test"; // No Error!
  return o;
};

// Now if we want to make our object readonly, we can use the built in Readonly type.

type ReadOnlyAB = Readonly<{ a: number, b: string }>;

const readOnlyAB = (o: ReadOnlyAB) => {
  // o.a = 100; // !Error!
  // o.b = 'test' // !Error!
  return o
}
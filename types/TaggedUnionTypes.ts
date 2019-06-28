// MODULE: TS 2.0 implements a rather useful feature:
// tagged union types, which you might know as sum types or discriminated union types from other programming languages.
// A tagged union type is a union type whose member types all define a discriminant property of a literal type.

// Modelling Payment Methods with Tagged Union Types
// Let's say we want to model the following payment methods that users of a system can choose from:
// - Cash without further information,
// - PayPal with a given email address, or
// - Credit card with a given card number and security code.

interface Cash {
  kind: "cash";
}

interface PayPal {
  kind: "paypal";
  email: string;
}

interface CreditCard {
  kind: "credit";
  cardNumber: string;
  securityCode: string;
}

// Note that, in addition to the required information, each 'type' has a kind property — the so-called discriminant property.
// It's of a string literal type in each case here. We'll look at the discriminant property in a minute.

// Let's now also define a PaymentMethod type that is the union of the three types we just defined.
// This way, we're stating that every payment method must have exactly one of the three given constituent types:

type PaymentMethod = Cash | PayPal | CreditCard;

// Now that our types are in place, let's write a function that accepts a payment method and returns a human-readable description of it:

function describePaymentMethod1(method: PaymentMethod) {
  switch (method.kind) {
    case "cash":
      // Here, method has type Cash
      return "Cash";

    case "paypal":
      // Here, method has type PayPal
      return `PayPal (${method.email})`;

    case "credit":
      // Here, method has type CreditCard
      return `Credit card (${method.cardNumber})`;
  }
}

// First of all, notice how few type annotations the function contains — just a single one for its method parameter! Besides that, the body of the function is pure ES2015 code.

// Within each case of the switch statement, the TypeScript compiler narrows the union type to one of its member types.
// For instance, within the "paypal" case, the type of the method parameter is narrowed from PaymentMethod to PayPal.
// Therefore, we can access the email property without having to add a type assertion.

// In essence, the compiler tracks the program control flow to narrow the tagged union types.
// Other than switch statements, it understands conditions as well as the effects of assignments and returns:

function describePaymentMethod2(method: PaymentMethod) {
  if (method.kind === "cash") {
    // Here, method has type Cash
    return "Cash";
  }

  // Here, method has type PayPal | CreditCard

  if (method.kind === "paypal") {
    // Here, method has type PayPal
    return `PayPal (${method.email})`;
  }

  // Here, method has type CreditCard
  return `Credit card (${method.cardNumber})`;
}

// MODULE: Modelling Redux Actions with Tagged Union Types

// Another use case where tagged union types really shine is when you're using Redux in your TypeScript applications.
// Let's construct another quick example, consisting of a model, two actions, and a reducer for — you guessed it — a todo application.

// Here's a simplified Todo type that represents a single todo.
// NOTE: how we're using the readonly modifier to have the TypeScript compiler check for unintended property mutation:

interface Todo {
  readonly text: string;
  readonly done: boolean;
}

// Users can add new todos and toggle the completion status of existing ones.
// For these requirements, we're going to need two Redux actions, which we can type as follows:

interface AddTodo {
  type: "ADD_TODO";
  text: string;
}

interface ToggleTodo {
  type: "TOGGLE_TODO";
  index: number;
}

// As in the previous example, a Redux action can now be modelled as the union of all actions our application supports:

type ReduxAction = AddTodo | ToggleTodo;

// In this case, the 'type' property serves as the discriminant property and follows the naming scheme common in Redux.

function todosReducer(
  state: ReadonlyArray<Todo> = [],
  action: ReduxAction
): ReadonlyArray<Todo> {
  switch (action.type) {
    case "ADD_TODO":
      // action has type AddTodo here
      return [...state, { text: action.text, done: false }];

    case "TOGGLE_TODO":
      // action has type ToggleTodo here
      return state.map((todo, index) => {
        if (index !== action.index) {
          return todo;
        }

        return {
          text: todo.text,
          done: !todo.done
        };
      });

    default:
      return state;
  }
}
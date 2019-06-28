// INFO: If you installed a module that didn't have type definition, linters won't stop informing you,
//       to evade such infos, you need to declare its defs manually by putting it to a @types folder
import { generate } from 'shortid';

import express from 'express';

const app = express();

// TIP: Use Interface for Objects and Type for anything else (e.g function, literal)
interface Params {
    a: number,
    b?: number
}

type Add = (x: Params) => number

const add: Add = x => {
    // TRICK: Postfix (!) - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    return x.a + x.b!;
}

app.get('/', (req) => {
    // TIP: how to add new property on type def that doesn't exist? by casting/asserting it
    (req as any).name = 'bob';
    add({ a: 1 })
});

app.listen(3001, () => {

});

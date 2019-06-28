// INFO: https://github.com/piotrwitek/utility-types
// INFO: https://levelup.gitconnected.com/advanced-typescript-types-with-examples-1d144e4eda9e

// MODULE: Partial<T>, Constructs a type with all properties of T set to optional. This utility will return a type that represents all subsets of a given type.

interface UTodo {
    title: string;
    description: string;
}

function updateTodo(todo: UTodo, fieldsToUpdate: Partial<UTodo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
});

// MODULE: Readonly<T>, Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned

interface TodoReadonly {
    title: string;
}

const todoR: Readonly<TodoReadonly> = {
    title: 'Delete inactive users',
};

// todoR.title = 'Hello'; // Error: cannot reassign a readonly property


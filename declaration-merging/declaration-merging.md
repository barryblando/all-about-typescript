# Declaration Merging

**Declaration Merging** is when the TypeScript complier merges two or more types into one declaration provided they have the same name.

TypeScript allows merging between multiple types such as `interface` with `interface`, `enum` with `enum`, `namespace` with `namespace`, etc.

One notable merge that isn’t permitted is `class` with `class` merging. If you want a functionality like that, use `mixins`.

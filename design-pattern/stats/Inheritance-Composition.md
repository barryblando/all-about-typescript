# Inheritance and Composition

## Inheritance

- Characterized by an '**`is a`**' relationship between two classes

## Composition

- Characterized by a '**`has a`**' relationship between two classes and is a form of association (another being aggregation)

## Differences between Composition and Aggregation

    Aggregation is a special form of association (Directional Association). Composition is a special form of aggregation (Restricted Aggregation).

### **Composition relationship**

    1. When attempting to represent real-world whole-part relationships, e.g. an engine is a part of a car.
    2. When the container is destroyed, the contents are also destroyed, e.g. a university and its departments.

### **Aggregation relationship**

    1. When representing a software or database relationship, e.g. car model engine ENG01 is part of a car model CM01, as the engine, ENG01, may be also part of a different car model.
    2. When the container is destroyed, the contents are usually not destroyed, e.g. a professor has students, when the professor dies the students don't die along with him or her.

Thus the aggregation relationship is often "catalog" containment to distinguish it from composition's "physical" containment.

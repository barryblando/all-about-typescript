/* eslint-disable */
// REMEMBER: Arrays & Objects are reference type

// MODULE: Pure Function - Predictable return state
class ProfileManager {
  constructor() {}

  // Writing Pure Function
  createUsername(user: { [propName: string]: any }) {
    return `${user.firstName} ${user.lastName} ${user.id}`;
  }

  createProfile(domain: string, username: string) {
    return `Domain: ${domain}, Username: ${username}`;
  }
}

const user = {
  id: 7865,
  firstName: 'John',
  lastName: 'Doe',
};

const manager = new ProfileManager();
const profileUrl = manager.createProfile('https://social.com', manager.createUsername(user));
console.log(profileUrl);

// MODULE: Avoiding Side effects with
// Object.assign(target, source) - copies all enumerable own properties of the sources to the target object
// Spread Operator - copies all enumerable properties

const readings = {
  coreTemp: 74,
  additionalTemp: 80,
  readingA: 178,
  readingB: 120,
  readingC: -190,
};

function adjustReadings(reading: { [propName: string]: any }) {
  reading.readingA -= 20;
  reading.readingB += reading.coreTemp / 2;
  return reading;
}

function testReadingA(readingA: number) {
  return readingA >= 170;
}

readings; // ?
const newReadingsUsingSpread = adjustReadings({ ...readings });
newReadingsUsingSpread; // ?
testReadingA(readings.readingA); // ?
const newReadingsUsingObject = adjustReadings(Object.assign({}, readings));
newReadingsUsingObject; // ?

// MODULE: forEach and map
// forEach - accepts function argument and then iterates over every object or item in the array calling that function to that object
// JS forEach [1, 2, 3, 4, 5].forEach(num => console.log(num))

// INFO: forEach under the hood
const foreach = (arr: number[], func: (num: number) => void) => {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

foreach([1, 2, 3, 4, 5], (num: number) => console.log(num))

// map - same as forEach but constructs an entirely new array from the values return from the function

const tasks = [
  { task: 'Buy eggs', completed: false },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: false },
];

function makePending(tasks: Array<{ [propName: string]: any }>) {
  // tasks.forEach((task, index) => {
  //   task.completed = false;
  // });
  return tasks.map((tasked, index) => ({
    ...tasked,
    id: index + 1,
  }));
}

tasks; // ?
const newPending = makePending(tasks);
newPending; // ?

// INFO: map under the hood using HOF

const mappingFunc = (curr: { [propName: string]: any }, index: number) => ({ ...curr, id: index + 1 })

// O(n)
const map = (array: any, func: (...args: any) => any) => {
  let newArr = []
  for (let i = 0; i < array.length; i++) {
    newArr.push(func(array[i], i))
  }
  return newArr;
}

map(tasks, mappingFunc) // ?

// MODULE: Reduce - returns always a single value

const reviews = [4.5, 4.0, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0];

// 1. Using the reduce function, create an object that
// has properties for each review value, where the value
// of the property is the number of reviews with that score.
// for example, the answer should be shaped like this:
// { 4.5: 1, 4.0: 2 ...}

const reducer = (obj: { [propName: string]: number }, item: number) => {
  // check if there's object key:value exist or set to zero to work with at all and store it on count
  const count = obj[item] || 0; // ?
  // copy all obj then add/update the item that is on queue
  return { ...obj, [item]: count + 1 };
}

const reviewSummary = reviews.reduce(reducer, { '4.5': 2 });

console.log(reviewSummary);

// INFO: reduce under the hood using HOF, O(n)
const reduce = (arr: any[], func: (obj: { [propName: string]: number }, currentValue: number) => {}, initialValue: any) => {
  let value
  let isInitialValue = initialValue !== undefined
  isInitialValue ? value = initialValue : value = arr[0]

  for (let i = isInitialValue ? 1 : 0; i < arr.length; i++) {
    value = func(value, arr[i])
  }

  return value
}

const customReduceReviewSummary = reduce(reviews, reducer, { '4.5': 2 }) 

// TIP: checkout computed properties discussed here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
// solution can be found at:
// https://jsbin.com/himuzuw/1/edit?js,console

// https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6
const posts = [
  { id: 0, category: "fairy tales", title: "Gommunist Manifesto" },
  { id: 1, category: "frontend", title: "All About That Sass" },
  { id: 2, category: "backend", title: "Beam me up, Scotty: Apache Beam tips" },
  { id: 3, category: "frontend", title: "Sanitizing HTML: Going antibacterial on XSS attacks" },
  { id: 4, category: "frontend", title: "All About That Sass" },
  { id: 5, category: "backend", title: "Beam me up, Scotty: Apache Beam tips" },
  { id: 6, category: "frontend", title: "Sanitizing HTML: Going antibacterial on XSS attacks" },
  { id: 7, category: "frontend", title: "All About That Sass" },
  { id: 8, category: "backend", title: "Beam me up, Scotty: Apache Beam tips" },
  { id: 9, category: "frontend", title: "Sanitizing HTML: Going antibacterial on XSS attacks" }
];

const categoryPosts = posts.reduce(
  (acc: { [propName: string]: any }, { id, category }: { id: number, category: string }) => ({
    ...acc,
    [category]: [...(acc[category] || []), id], // initiate w/ empty array at first iteration, cause undefined is not an iterable
  }),
  {}
); // ?


// MODULE: Filter - Get the portion of an array

const EvenOddNumbers = [6, 8, 3, 14, 1, 9, 10];

function getEvenNumbers(numerals: number[]) {
  return numerals.filter(num => num % 2 === 0);
}

// filter under the hood using HOF
const conditionFunc = (curr: number) => curr % 2 === 0

// O(n)
const filter = (array: number[], func: (curr: number) => boolean) => {
  let newArr = []
  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) {
      newArr.push(array[i])
    }
  }
  return newArr;
}

filter(EvenOddNumbers, conditionFunc)

console.log(getEvenNumbers(EvenOddNumbers));

const ingredients = [{ name: 'cheese', quantity: 2 }, { name: 'meat', quantity: 1 }, { name: 'salad', quantity: 1 }];

const addItem = <T>(arrObj: Array<T>, newObj: T) => [...arrObj, newObj];

const nextWeekShoppingList = addItem<{ [propName: string]: any }>(ingredients, { name: 'bacon', quantity: 2 });

nextWeekShoppingList; // ?

// 1. create a constant named friends,
// which is an array that contains 2
// names of your choosing.

const friends = [
  { name: 'Barbara' },
  { name: 'Barry' },
];

console.log(friends);

// 2. Create a new constant named updatedFriends,
// which includes the friends array values plus
// one additional name

const newFriend = { name: 'Leigha' };
const updatedFriends = [...friends, newFriend];

console.log(updatedFriends);

// 3. Create a new constant named friendNameLengths,
// which is based on the array updatedFriends,
// but instead of having the friends names,
// have the array store the length of each persons name

const friendNameLengths = updatedFriends.map(friend => friend.name.length);

console.log(friendNameLengths);

const friendLove = updatedFriends.map(friend => {
  if(friend.name === 'Leigha') {
    return {
        ...friend,
        love: 'Barry'
    }
  }
  return friend;
});

console.log(friendLove); // ?

// 4. Create a new constant named shorterNamedFriends,
// which will be a list of the friends except the friend with the longest name.

const shorterNameFriends = updatedFriends.filter(friend => friend.name.length < 7);

console.log(shorterNameFriends);

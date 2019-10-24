// const names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];

// let uniq =  [...new Set(names)]

// uniq

// const t = { 
//   type: typeof 'SEND_MESSAGE'
// }

// console.log(t.type);

// @ts-ignore
// initializing an `initials` property
Array.prototype.capitalizeInitials = function() {
  this // ?
  for (let i = 0; i < this.length; i++) {
    this[i] = [
      [...this[i]][0].toUpperCase(), // capitalize first char
      ...this[i].slice(0, 0), // remove small 'u' char
      ...this[i].slice(0 + 1) // spread the remaining character
    ].join('') // join elements
  }
  this[1] // ?
};

let name2: any = "world hello"
name2 = name2.split(" ")
// since name is an array we can call the initials() on it
name2.capitalizeInitials();
name2


let str = 'Turn the page'

for (let index in <any>str) {
  console.log(`Index of ${str[index]}: ${index}`)
}
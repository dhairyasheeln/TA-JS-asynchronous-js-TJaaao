- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
const one=new Promise((res,rej)=>{
  setTimeout(()=>res('One'),1000)
});

const two=new Promise((res,rej)=>{
  setTimeout(()=>res('Two'),2000)
});

const three=new Promise((res,rej)=>{
  setTimeout(()=>res('Three'),3000)
});

const four=new Promise((res,rej)=>{
  setTimeout(()=>res('Four'),4000)
});

let promiseAll=Promise.all([one,two,three,four]);

```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.
```js
const userArray=[
    'nnnkit',
    'prank7',
  ];
  
const userPromise=userArray.map((user)=>{
    return fetch(`https://api.github.com/users/${user}`)
    .then(res=>res.json())
    .then(user=>user.followers)
});

Promise.all(userPromise)
.then((res)=>console.log(res));
```
- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow
```js
let dog=fetch(`https://random.dog/woof.json`)
.then(res=>res.json());
let cat=fetch(`https://aws.random.cat/meow`)
.then(res=>res.json());

let arr=[dog,cat];
Promise.race(arr)
.then((res)=>console.log(res));
```
 

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one,two,three])
.then(res=>console.log(res));
```

Promise.all does not work as all promises are not settled

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```

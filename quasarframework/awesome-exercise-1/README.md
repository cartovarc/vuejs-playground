# Awesome exercise #1

This is my solution for awesome-exercise-1.

## Install and run
```sh
cd awesome-exercise-1
yarn install
quasar dev
```

## Explanation of the solution

1. Create data properties for name and age

We can create data properties in data function, name and age properties were created inside it.

```javascript
  export default {
    ...
    data() {
      return {name: "", age: 0}
    },
    ...
  }
```

2. Bind these properties to the two input fields

We can use 'v-model' directive for bind name and age properties to its corresponding inputs

```html
  ...
  <input v-model="name" type="text">
  ...
  <input v-model.number="age" type="number">
  ...
```

3. Display the name and age in the beige box (first line in bold)

We can access to data properties with '{{ property }}', known as text interpolation in “Mustache” syntax.

```html
  ...
  <p>My name is <b>{{ name }}</b> and I'm <b>{{ age }}</b> years old.</p>
  ...
```

4. Use a computed property to display the age plus 10 years (second line in bold)

We can create computed properties in computed function, agePlusTen was declared as a function that returns 'age' data property plus ten.

```javascript
  export default {
    ...
    computed: {
      agePlusTen() {
        return this.age + 10;
      }
    },
    ...
  }
```

Then we can access it with text interpolation.

```html
  ...
  <p>In 10 years I will be <b>{{ agePlusTen }}</b>.</p>
  ...
```

5. Display the number of characters in the name (third line)
```html
  ...
  <p>My name is <b>{{ name.length }}</b> characters long.</p>
  ...
```

6. Use a filter to display the name in upper case (fourth line)

We can create a filter in filters, toUpperCase was declared as a function that receive 'txt' and returns 'txt' to upper case.

```javascript
    filters: {
      toUpperCase(txt) {
        return txt.toUpperCase();
      }
    }
```
We can use an filter in this way:

```html
  ...
  <p>My name in uppercase is <b>{{ name | toUpperCase}}</b>.</p>
  ...
```

7. Only show the beige box if both a name and age have been entered, otherwise, show the red box ("Please enter a name and age.")

We can use "v-if" and "v-else" directive for check "name" and "age". "calledcheckEmpty", an auxiliary computed method was used to know if name or age are empty.

```javascript
  ...
  computed: {
    ...
    checkEmpty() {
      let noEmptyName = this.name.length != 0;
      let noEmptyAge = this.age != '';
      return noEmptyName && noEmptyAge
    },
    ...
  },
  ...
```

```html
  ...
  <div v-if="checkEmpty()" class="description q-mb-lg">
  ...
  <div v-else class="no-details">
  ...
```

8. Use v-show to only show the error messages next to the fields if the name is longer than 15 characters and the age is greater than 100

Auxiliary methods was used to know if an error exits in 'name' or 'age'.

```javascript
...
  methods: {
    ...
    errorInName() {
      return this.name.length > 15;
    },
    errorInAge() {
      return this.age <= 0 || this.age > 100;
    }
    ...
  },
  ...
```

Note that method needs to be called.

```html
  ...
  <label v-show="errorInName()" class="error">Please enter 15 characters or less</label>
  ...
  <label v-show="errorInAge()" class="error">Please enter an age between 1 - 100</label>
  ...
```

9. Add the class "error" to the input fields if they break the same rules

We can set an style class with ":class" in this way:

```html
  ...
  <input v-model="name" :class="{'error': errorInName()}" type="text">
  ...
  <input v-model.number="age" :class="{'error': errorInAge()}" type="number">
  ...
```

10. When the "Generate Random Person" button is clicked, generated a random name (from an array you create) and a random age from 1 - 100. These new values should be reflected everywhere in the view

first, we define an array of names in data:
```javascript
  data(){
    return {
              ...
              names: ["Carlos", "Claudia", "Daniela", "Carolina", "Maria"],
              ...
            }
  },
```

then, we define generateRandomPerson method and its auxiliary functions:
```javascript
  ...
    generateRandomPerson() {
      this.name = this.getRandomName();
      this.age = this.getRandomAge();
    },
    getRandomName() {
      return this.names[Math.floor(Math.random() * this.names.length)];
    },
    getRandomAge() {
      return Math.floor(Math.random() * 100)
    }
  ...
```

and finally we add click action to the button:

```html
  <button @click.left="generateRandomPerson">Generate Random Person</button>
```

11. Create a directive which auto-focuses the name field when the page loads

In directives we can create our own directives:

```javascript
    directives: {
      autofocus: {
        inserted(el) {
          el.focus();
        }
      }
    }
```

and use in DOM elements like this:

```html
  <input v-autofocus v-model="name" :class="{'error': errorInName()}" type="text">
```

12. Make it so a random person is generated when the page first loads

In mounted hook we call generateRandomPerson :)
```javascript
  ...
  mounted() {
    this.generateRandomPerson();
  }
  ...
```

# Awesome exercise #2

This is my solution for awesome-exercise-2.

## Install and run
```sh
cd awesome-exercise-2
yarn install
quasar dev
```

## Explanation of the solution

1. Create an array for the food items you see on the page. Each object in the array should contain properties for the image url, name, description and deliciousness

We can fill foods array with foods objects in this way:

```javascript
  export default {
    ...
		data() {
			return {
				foods: [
					{
            id: 1,
            name: "Burger",
            imageUrl: "https://i.imgur.com/0umadnY.jpg",
            description: "A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
            deliciousness: "4/5"
          },
          {
            id: 2,
            name: "Pizza",
            imageUrl: "https://i.imgur.com/b9zDbyb.jpg",
            description: "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.",
            deliciousness: "5/5"
          },
          {
            id: 3,
            name: "Sprouts",
            imageUrl: "https://i.imgur.com/RbKjUjB.jpg",
            description: "The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.",
            deliciousness: "1/5"
          }
				]
			}
		}
    ...
  }
```

2. Create a v-for loop that displays these food items onto the page, with all the data coming from the food array (hint: for the image src, use :src)

We need to remove extra divs, take one of then and change fixed data with food object properties.


```html
  ...
  <div v-for="food in foods" :key="food.id" class="card shadow-1">
    <img :src="food.imageUrl" width="198" height="180">
    <div class="card-content">
      <h1 class="text-primary">{{ food.name }}</h1>
      <p>{{ food.description }}</p>
      <p>
        <small>
          <b>Delicousness:</b>
        </small>
        <b class="text-primary">
          {{ food.deliciousness }}
        </b>
      </p>
    </div>
  </div>
  ...
```

3. Add your own food item to the list

Simple add new object into foods array:

```javascript
  foods: [
    ...
    {
      id: 4,
      name: "Chicharron",
      imageUrl: "https://recetasdepanama.com/wp-content/uploads/2019/03/CHICHARRON.jpg",
      description: "El chicharrón es una fritura de la piel del cerdo o de carne de cerdo con piel.",
      deliciousness: "5/5"
    },
    ...
  ]
```
4. Create a child component and use it to display each of your items (don't use the components/Solution/Food.vue file)

Food component was defined in this way:
```html
<template>
  <div class="card shadow-1">
    <img :src="food.imageUrl" width="198" height="180">
    <div class="card-content">
      <h1 class="text-primary">{{ food.name }}</h1>
      <p>{{ food.description }}</p>
      <p>
        <small>
          <b>Delicousness:</b>
        </small>
        <b class="text-primary">
          {{ food.deliciousness }}
        </b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['food']
}
</script>

<style>
	.card {
		flex-basis: 210px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 5px;
		margin-right: 10px;
		margin-bottom: 10px;
	}
	.card img {
		max-width: 100%;
	}
	.card-content {
		padding: 0 10px;
	}
	h1 {
		font-size: 23px;
	}
	p {
		font-size: 14px;
	}
</style>
```
Style block was moved to component style because those style definitions are more relevant to the food component

So, we can import component in this way:

```javascript
  ...
  components: {
    'food': require('components/Food.vue').default
  }
  ...
```

We can get iterated components like this:
```html
  ...
  <food
    v-for="food in foods"
    :key="food.id"
    :food="food">
  </food>
  ...
```
Note that food object is provided for use in component

5. Add unique id's to the food array for each item, and apply these to a :key property on your v-for loop

id was already linked to key to prevent Eslint warning.

```html
  ...
  <food
    v-for="food in foods"
    :key="food.id"
    :food="food">
  </food>
  ...
```

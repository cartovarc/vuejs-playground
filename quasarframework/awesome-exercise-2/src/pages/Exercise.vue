<template>
	<!--
	Awesome Exercise 2 - Vue.js Lists & Components

	1) Create an array for the food items you see on the page. Each object in the array should contain properties for the image url, name, description and deliciousness
	2) Create a v-for loop that displays these food items onto the page, with all the data coming from the food array (hint: for the image src, use :src)
	3) Add your own food item to the list
	4) Create a child component and use it to display each of your items (don't use the components/Solution/Food.vue file)
	5) Add unique id's to the food array for each item, and apply these to a :key property on your v-for loop

	-->
  <q-page padding>
  	<div class="q-pa-md row items-stretch">

  	  <food
        v-for="food in foods"
        :key="food.id"
        :food="food">
  	  </food>

  	</div>
  </q-page>
</template>

<script>
	export default {
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
          },
          {
            id: 4,
            name: "Chicharron",
            imageUrl: "https://recetasdepanama.com/wp-content/uploads/2019/03/CHICHARRON.jpg",
            description: "El chicharrón es una fritura de la piel del cerdo o de carne de cerdo con piel.",
            deliciousness: "5/5"
          },
				]
			}
    },
    components: {
      'food': require('components/Food.vue').default
    }
	}
</script>

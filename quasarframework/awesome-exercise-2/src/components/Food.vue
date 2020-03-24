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

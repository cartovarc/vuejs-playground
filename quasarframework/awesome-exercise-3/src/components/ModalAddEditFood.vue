<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ type }} Food</div>
    </q-card-section>

    <q-card-section>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.name"
          label="Name (e.g. Burger)"
          class="col"
          ref="foodName"
          :rules="[val => !!val || 'Food name is required', val => val.length<=20 || 'Max 20 characters allowed']"/>
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.description"
          label="Description"
          type="textarea"
          class="col"
          ref="foodDescription"
          :rules="[val => val.length<=135 || 'Max 135 characters allowed']"/>
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.imageUrl"
          label="Image URL"
          class="col" />
        <q-img
          :src="foodToSubmit.imageUrl ? foodToSubmit.imageUrl : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Rating:</p>
        </div>
        <div class="row">
          <q-rating
            v-model="foodToSubmit.rating"
            size="2em"
            color="orange" />
        </div>
      </div>

    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        label="Cancel"
        color="grey"
        v-close-popup />
      <q-btn
        label="Save"
        color="primary"
        @click="submitForm"/>
    </q-card-actions>
  </q-card>

</template>

<script>
import { mapActions} from 'vuex'

export default {
  props: ['food', 'id', 'type'],
  data() {
    return {
      foodToSubmit: {
        name: '',
        description: '',
        rating: 1,
        imageUrl: ''
      }
    }
  },
  methods: {
    ...mapActions('foods', ['addFood', 'updateFood']),
    submitForm() {
      this.$refs.foodName.validate();
      this.$refs.foodDescription.validate();
      if (!this.$refs.foodName.hasError && !this.$refs.foodDescription.hasError) {
        this.submitFood();
      }
    },
    submitFood() {
      if (this.type == 'add') {
        this.addFood(this.foodToSubmit);
      }else{
        // edit
        this.updateFood({
          id: this.id,
          updates: this.foodToSubmit
        });
      }
      this.$emit('close');
    },
  },
  mounted(){
    if (this.type == 'edit') {
      this.foodToSubmit = Object.assign({}, this.food);
    }
  }
}
</script>

<style>
	.form-card {
		min-width: 400px;
	}
	.form-card .heading {
		text-transform: capitalize;
	}
	.form-card .q-card-section {
		width: 100%;
	}
	.thumbnail {
		max-width: 50px;
		max-height: 50px;
	}
	.form-card .q-img {
		height: 56px;
		width: 56px;
		border-radius: 10px;
	}
	.form-card .q-img__image {
		background-size: cover !important;
	}
	.form-card .q-rating__icon {
		opacity: 0.2;
	}
	.form-card .q-rating__icon--active {
		opacity: 1;
	}
</style>

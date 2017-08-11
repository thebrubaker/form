<template>
  <div class="hello">
    <h1>Create Product</h1>
    <input type="text" v-model="fields.name" :class="classes.name">
    <span>Name: {{ fields.name }}</span>
<!--     <div v-if="errors.has('name')">
      {{ errors.first('name') }}
    </div> -->
    <input type="text" v-model="fields.sku" :class="classes.name">
    <span>Sku: {{ fields.sku }}</span>
  </div>
</template>

<script>
import product from '../forms/product'

export default {
  name: 'hello',
  data () {
    return {
      fields: product.fields,
      classes: product.classes
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

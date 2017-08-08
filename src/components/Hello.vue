<template>
  <div class="hello">
    <h1>Create Product</h1>
    <input type="text" name="name" v-model="fields.name" :class="class.name">
    <div class="error" v-if="errors.name">
      {{ errors.first('name') }}
    </div>
    <button type="submit" @click="submit" :disabled="errors.failedAttempt">Create Product</button>
  </div>
</template>

<script>
import product from '../forms/product'

export default {
  name: 'hello',
  data () {
    return {
      fields: {
        ...product.fields()
      },
      classes: {
        ...product.classes()
      },
      errors: {
        ...product.errors()
      }
    }
  },
  methods: {
    submit () {
      product.validate().then(() => {
        this.createProduct(this.product)
      }).catch(() => {
        console.log('invalid input')
      })
    }
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

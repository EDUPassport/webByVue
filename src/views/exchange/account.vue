<template>
<div>
  <h1>Information is being exchanged, please wait patiently</h1>
</div>
</template>

<script>
export default {
  name: "account",
  mounted() {
    console.log(this.$route.query)
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
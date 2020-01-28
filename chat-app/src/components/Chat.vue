<template>
  <div class="chat container">
    <h2>Chat {{ this.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: ['name', 'room'],
  data(){
    return {
      name: "name",
      room: "room"
    }
  }
}
</script>


<style>

</style>

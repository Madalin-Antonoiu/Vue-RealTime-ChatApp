<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
          <form @submit.prevent="validateAndEnterChat">

        <div class="input-field">
          <i class="material-icons prefix">assistant</i>
          <input id="room" name="room" type="text"  class="validate" v-model="room" :class="{ 'invalid': attemptSubmit && missingRoom, 'valid': !missingRoom }" autocomplete="off">
          <label for="room">Room Name</label>
          <span  class="helper-text" data-error="You must enter room name to join." data-success="Correct"></span> <!-- Not writting anything inside for a helper -->
        </div>

        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          <input id="name" name="name" type="text"  class="validate" v-model="name" :class="{ 'invalid': attemptSubmit && missingName , 'valid': !missingName }" autocomplete="off">
          <label for="name">Your Name</label>
          <span class="helper-text" data-error="You must enter your name to join." data-success="Correct"></span>
        </div>



            <button class="btn teal">Enter Chat</button>
          </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      room: "",
      name: "",
      attemptSubmit: false,
    }
  },
  computed: {
    missingName() {  return  this.name === '' }, ////document.getElementById('room').classList.add('invalid');
    missingRoom() {  return  this.room === '' },
  },
  methods : {
    validateAndEnterChat(){
        this.attemptSubmit = true; // Attempted to submit
        if (this.missingName){
         document.getElementById('name').classList.add('invalid');

        }
        else if ( this.missingRoom) {
            document.getElementById('room').classList.add('invalid');
          //event.preventDefault(); // Prevent the click if one of those is wrong
        } else {
          this.$router.push({ name: 'Chat', params: {name: this.name, room: this.room} }) // Get the data and
        }




    }




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .welcome {
    width: 400px;
    max-width: 400px;
    margin-top: 100px;
 }
 .welcome h2 {
  font-size: 3em;
  margin-bottom: 50px;
 }
 .welcome button {
  margin: 30px auto;
 }
.hide{
  display: none;
}
.welcome span{
  margin-bottom: 30px;
}
</style>

<template>
  <div class="new-message-area">
 <p class="red-text center-align" v-if="feedback"> {{ feedback }}</p>
    <form class="msger-inputarea" @submit.prevent="addMessage()">

    <button  class="btn button">G</button>

     <button @click.prevent="toogleDialogEmoji">😃</button>
      <input  type="text" class="msger-input" placeholder="Enter your message..."  autofocus autocomplete="off" v-model="newMessage">
      <button type="submit" class="chat-send-btn">Send</button> <br>

    </form>
     
        <VEmojiPicker
          v-show="showDialog"
          labelSearch="Search"
          style="{ width: 4px }"
          @select="onSelectEmoji"
        />

    </div>
  
</template>

<script>
import db from '@/firebase/init'

import VEmojiPicker from "v-emoji-picker";

export default {
    name: 'NewMessage',
    props: ['name', 'room'],
    components : {
       VEmojiPicker,
    },
    data(){
        return {
            newMessage: "",
            feedback: null,
            showDialog: false
        }
    },
    methods: {
      addMessage(){
          //It should also open a modal and show your options
          let script = this.newMessage.includes("/s") || this.newMessage.includes("/y") || this.newMessage.includes('/c') ; //Split this up in 3 for different functions :) yay
          let empty = this.newMessage=="" || this.newMessage== null;

          if (!script && !empty){ // If not script and not empty, push a new message
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now(),
                    room: this.room
                    //this.room

                }).catch( err =>{
                    console.log(err)
                })
                this.newMessage = null // clears input
                this.feedback = null // clears error
          } else if(script && !this.newMessage.includes("/y") && !this.newMessage.includes("/c")) { // ? script && doesn't include /y
              let typed = this.newMessage.replace('/s',''); //Removes the /s from input for the Google search
              window.open('https://google.com/search?q='+ typed )
              this.newMessage = ""
          } else if (script && this.newMessage.includes("/y") && !this.newMessage.includes("/s") && !this.newMessage.includes("/c")){
               let typed = this.newMessage.replace('/y','');
               window.open('https://youtube.com/results?search_query='+ typed )
               this.newMessage = ""
          } else if (script && this.newMessage.includes("/c")){
            //clear chat
            const myNode = document.getElementById("capture");
            while (myNode.firstChild) {
             myNode.removeChild(myNode.firstChild);
            } 
            this.newMessage = ""
          } else if (empty) {
             //And won't send because its doubled-up up
              this.feedback = "You must enter a message in order to send one."
          }  else {
              preventDefault();
          }
          //console.log(this.name, this.newMessage, Date.now())
      },
      toogleDialogEmoji() {

        this.showDialog = !this.showDialog;

        //You need to give it some delay so the DOM recognizes that you enlarged it, that`s why setTimeout
        setTimeout(function() {  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight) }, 100); // scroll to bot ;)


      },
      onSelectEmoji(emoji) {
        this.newMessage += emoji.data;
        // Optional
        // this.toogleDialogEmoji();
      },
      gSearch(){
   
          
      }
  }
}
</script>

<style lang="css">
    /*Cpen*/
.new-message-area{
  z-index:99999;
  box-shadow: 0px -4px 3px rgba(182, 182, 182, 0.75);
}

 #EmojiPicker{
   padding: 10px; /*Mirroring the above component*/
  min-width: 100%;
  }


.grid-emojis{
  grid-template-columns: repeat(10, 10%) !important;
}





input {
  padding: 8px;
  font-size: 16px;
  margin-right: 2px;
  border-radius: 4px;
  border: 1px solid #848484;
}

button {
  background: #ececec;
  border-radius: 4px;
  padding: 5px;
  font-size: 22px;
  border: 1px solid #848484;
}




::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: grey;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: grey;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: grey;
}


.chat-send-btn {
  width:59px;
  height: 45px;
  margin-left: 10px !important;
  background:  #26a69a;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.chat-send-btn:hover {
  background: rgb(0, 180, 50);
}


.msger-input {
  flex: 1  !important;
  background: #ddd  !important;
  width:100% !important;
}

    .msger-inputarea {
  display: flex !important;
  padding: 10px  !important;
  border-top: var(--border)  !important;
  background: #eee  !important;
}
.msger-inputarea * {
  margin-left:5px;
  border: none  !important;
  border-radius: 3px  !important;
  font-size: 1em  !important;
}


    .new-message{
        margin-left: 10px;
    }



</style>

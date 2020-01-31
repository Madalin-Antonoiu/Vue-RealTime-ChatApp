<template>
  <div class="new-message-area">

  <div class="utils">
    <p id="emptySend" class="red-text center-align" v-if="feedback"> {{ feedback }}</p>
    <button @click.prevent="toogleDialogEmoji">😃</button>
  </div>


  <form class="msger-inputarea" @submit.prevent="addMessage">

    <span id="scriptIcon" class="flatIcon valign-wrapper displayNone"></span>

     <!-- @keyup is an absolute MUST, so the checks happen after value is taken into newMessage -->
      <input  id ="submit" type="text" class="msger-input" placeholder="Enter your message..."  autofocus autocomplete="off" v-model="newMessage" @keyup="keymonitor">

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
            showDialog: false,
            buffer: [],
            gluglu: false,
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
              let typed = this.newMessage.replace('/s',''); //Removes the /s from input for the Google searc
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
            preventDefault(); //turning off the error for now

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
      keymonitor () {

      //##### The script i love the most from all i have ever written (2020) #########


      if (this.newMessage.startsWith("/", 0)){ //main if
        console.log('Started with /')

        //if my input string has s on second position
          if (this.newMessage.startsWith("s", 1)){
            //Show Google icon
            document.getElementById('submit').style.paddingLeft="20px"; //Move cursor with padding left on icon show

            document.getElementById('scriptIcon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/281/281764.svg')"
            document.getElementById('scriptIcon').classList.remove('displayNone')
            this.newmessage ="/s  "

            console.log('Show Google icon')

          } else if (this.newMessage.startsWith("y", 1)) {
            //Show YT icon
            document.getElementById('scriptIcon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/185/185983.svg')"
            document.getElementById('scriptIcon').classList.remove('displayNone')

            console.log('Show Youtube icon')

          } else if ( (!this.newMessage.includes("s", 1) || !this.newMessage.includes("y", 1) ) && event.key == "Backspace") {
            //If backspace is pressed at second position, remove icon
            console.log('Remove Google/Youtube icons with Backspace ONLY at position 1')
               document.getElementById('scriptIcon').classList.add('displayNone')
               document.getElementById('submit').style.paddingLeft="0px"; //Move cursor back on hide
          }

          else {
              console.log('No s, no y fulfilled yet.')
          }





        //main if
        } else {
            console.log('Not starting with /, clear all icons')

          //Do nothing, didn't start with /

        } //main else

      },//keymonitor

    }, //methods
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


form {
  position: relative;
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

.displayNone{
  display: none!important;
}

.utils button{
  font-size: 14px;
}
.utils {
  padding-left: 10px;
}
.flatIcon{
  width: 18px;
  height: 18px;
  background-size: cover;
  background-repeat: none;
  position: absolute;
  top: 25px;
  left: 7px;

}

</style>

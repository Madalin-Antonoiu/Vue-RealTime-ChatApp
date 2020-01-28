<template>
  <div class="chat container">
    <h2 class="center teal-text">Private Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li  v-for="message in messages" :key="message.id" :class="{'saved right-align': name === message.name, unsaved: name !== message.name}" >
           
              <span  v-if='name !== message.name' class="teal-text">{{ message.name }}</span>
              <span class="grey-text text-darken-3">{{ message.content }}</span>
              <span  class="grey-text time">{{ message.timestamp + " " + message.room}}</span>
        

          </li>
        </ul>
      </div>
      <hr>

      <NewMessage :name="name" :room="room" />

    </div>
  </div>
      <!-- <span v-if="name === message.name">ok</span> Will output ok next to every message that has name == user input name -->
      <!-- :class="{saved: name === message.name }" on LI to style magic things!-->
       <!-- <span v-if='name !== message.name' will not show your name if it`s current user-->
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
import NewMessage from '@/components/NewMessage'

export default {
  name: 'Chat',
  props: ['name', 'room'],
  components: { 
    NewMessage
  },
  data(){
    return {
      messages: [],
    }
  },
  computed : {
    check(){
      
    }
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach( change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name:doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('LLL'),
            room: doc.data().room,
            currentUser: this.name
          })
          // if(doc.data().name !== this.name) {
          //   document.getElementsByTagName('li').classList.add('saved');
          // }
        }
        
      })
     
    })   //listens on changes
     
  }
}
</script>


<style>
.chat{
    max-width:400px;

   
}
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}

.chat span{
  font-size: 1.4em;
}

.chat .time{
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
.messages::-webkit-scrollbar{
  width: 3px;
}
.messages::-webkit-scrollbar-track{
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb{
  background: #aaa;
}

.saved:only-child{
  background-color: red !important;
}
.saved{
  margin-left:150px;
  margin-top:10px;
  padding:4px;
  background-color: lightblue !important;
  border-radius: 8px 8px 8px 8px;
}
.unsaved{
  margin-right:50px;
  margin-top:10px;
  padding:4px;
  background-color: lightcyan !important;
  border-radius: 8px 8px 8px 8px;
}

</style>

<template>

  <section class="msger">
    <header class="msger-header">

      <div class="msger-header-title">
        <span>

          <i @click="$router.go()" class="material-icons blue-text" style="vertical-align: -6px; cursor: pointer;">chevron_left</i>


          <i class="material-icons" style="vertical-align: -6px; ">chat</i>
          <span>{{room}}</span>
        </span>

      </div>

      <div class="msger-header-options">
        <span> <i class="material-icons">settings</i></span>
      </div>
    </header>

    <main class="msger-chat" v-chat-scroll>
      <ul class="messages">
        <li  v-for="message in messages" :key="message.id" :class="{'msg right-msg': name === message.name, 'msg left-msg': name !== message.name}">

                <!-- <span  v-if='name !== message.name' class="teal-text">{{ message.name }}</span>
                <span class="grey-text text-darken-3">{{ message.content }}</span>
                <span  class="grey-text time">{{ message.timestamp + " " + message.room}}</span> -->

          <div class="msg-img"
            :style='[ name !== message.name ?  {backgroundImage: "url(" + "https://image.flaticon.com/icons/svg/547/547420.svg" + ")"} : {backgroundImage: "url(" + "https://image.flaticon.com/icons/svg/1596/1596810.svg" + ")"} ]'></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">{{ message.name }}</div>
              <div class="msg-info-time">{{ message.timestamp}}</div>
            </div>

            <div class="msg-text">{{ message.content }}</div>
          </div>

        </li>
      </ul>
    </main>

    <NewMessage :name="name" :room="room" />

    <footer id="footer">
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>

  </section>

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
            timestamp: moment(doc.data().timestamp).fromNow(),
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

  .card{
      max-width: 450px;
    margin: 0 auto;
  }

  .card .card-content{
    padding: 12px;

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
  .messages-box {
    overflow: auto;
    visibility: hidden;
  }

  .messages {
    padding: 3px;
    /*max-height: 400px;*/
  }

  .messages, .messages-box:hover, .messages-box:focus {
    visibility: visible;

  }

  .messages-box::-webkit-scrollbar{
    width: 12px;
    background-color: #134446;
  }

  .messages-box::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;

  }

  .messages-box::-webkit-scrollbar-thumb{
      border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #009688;
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
    background-color: white !important;
    border-radius: 8px 8px 8px 8px;
  }



  /*CPen*/
  :root {
    --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    --msger-bg: #fff;
    --border: 2px solid #ddd;
    --left-msg-bg: #ececec;
    --right-msg-bg:  #044C62;  /*#579ffb*/;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    font-family: Helvetica, sans-serif;
  }

  .msger {
    /*margin-bottom:50px;*/
    min-height: 400px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column wrap;
    flex-flow: column wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border: var(--border);
    border-radius: 5px;
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);

  }

  .msger-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: var(--border);
    background: #eee;
    color: #666;
  }

  .msger-chat {
    overflow-y: auto;
    padding: 10px;
    max-height: 75vh;
  }
  .msger-chat::-webkit-scrollbar {
    width: 6px;
  }
  .msger-chat::-webkit-scrollbar-track {
    background: #ddd;
  }
  .msger-chat::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }
  .msg {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .msg:last-of-type {
    margin: 0;
  }
  .msg-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background: #ddd;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
  }
  .msg-bubble {
    max-width: 450px;
    padding: 15px;
    border-radius: 15px;
    background: var(--left-msg-bg);
  }
  .msg-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .msg-info-name {
    margin-right: 10px;
    font-weight: bold;
  }
  .msg-info-time {
    font-size: 0.85em;
    opacity:0.6;
  }

  .left-msg .msg-bubble {
    border-bottom-left-radius: 0;
  }

  .right-msg {
    flex-direction: row-reverse;
  }
  .right-msg .msg-bubble {
    background: var(--right-msg-bg);
    color: #FFFCFF;
    border-bottom-right-radius: 0;
  }
  .right-msg .msg-img {
    margin: 0 0 0 10px;
  }


  .msger-chat {
    background-color: #fcfcfe;
  }

  .msg-text{
    max-width:180px;
  }

#footer{
background-color: #212121;
    color: #aaa;
    text-align: center;
    width: 100%;
    /* margin-top: 50px; */
    /* padding-top: 50px;
        /* position: fixed; */
    /* bottom: 0px; */
    /* left: 0px; */
    /* line-height: 30px; */
}
</style>

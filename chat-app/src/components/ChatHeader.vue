<template>
  <div class="chat-header">
    <div class="chat-header-title">
        <i @click="$router.go()" class="material-icons blue-text" style="vertical-align: -6px; cursor: pointer;">chevron_left</i>
        <i class="material-icons" style="vertical-align: -6px;">chat</i>{{room}}
    </div>
        <span class="user-avatar" :style='{ backgroundImage: "url(" + "https://image.flaticon.com/icons/svg/1596/1596810.svg" + ")"}'>{{name}}</span>

    <div class="chat-header-options" >



      <span> <i class="material-icons">settings</i></span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ChatHeader',
    props: ['name','room'],
}
</script>


<style>
  .user-avatar {
   /* width: 50px;
    height: 50px;
    margin-right: 10px;*/
    background: #ddd;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    text-align: center;
    color:white;
  }
  .chat-header{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: var(--border);
    background: #eee;
    color: #666;
    width:100%;
    /*Container Control
    outline: 1px solid violet !important;
    outline-offset: -1px;*/
  }
</style>

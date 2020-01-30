<template>
  <div class="materialize-modal">
    <!-- Modal Trigger / Triggered from within ChatHeader -->

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <p><span class="teal-text">User</span>: {{name}}</p>
        <p><span class=" indigo-text lighten-2">Room:</span> {{room}} , <span >20 msg</span></p>
        <p>Total messages: 120msg</p>
        <p>Other settings</p>
        <p>Rank: Rookie</p>
      </div>
      <div class="modal-footer">
        <span class="modal-close waves-effect waves-green btn-flat">Close</span>
        <span class="waves-effect waves-red btn-flat">Delete all messages</span>
        <span class="waves-effect waves-red btn-flat">Delete room messages</span>
        <span @click.prevent="clearChat()"class="waves-effect waves-red btn-flat">Clear chat</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: ['name', 'room'],
    /*Materialize Global Modal */
    data() {
      return {
      modalInstance: null,
      closeAfterTimeElapsed: true,
      seconds: 1
      }
    },
    mounted() {
      const modal = document.querySelector('.modal')
      this.modalInstance = M.Modal.init(modal)

      const select = document.querySelector('select');
      M.FormSelect.init(select);

      M.updateTextFields();
      },
      methods: {
        /*@click:handleClick() to make modal close within 1000ms*/
        handleClick() {
          if (this.closeAfterTimeElapsed) {
            setTimeout(() => { this.modalInstance.close() }, this.seconds * 1000)
          }
        }
    },
    methods:{
      clearChat(){
          const myNode = document.getElementById("cm");
          while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
          }
      }
    }
  }
</script>

<style>
  #modal1{
    width: 300px;
  }
  .modal-overlay{
    opacity:0 !important;
  }
</style>

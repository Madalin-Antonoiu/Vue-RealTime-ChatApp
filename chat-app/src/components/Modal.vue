<template>
  <div class="materialize-modal">
    <!-- Modal Trigger / Triggered from within ChatHeader -->

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Details</h4>
        <p>User: <span class="teal-text">{{name}}</span></p>
        <p>Room: X , 20 msg</p>
        <p>Total messages: 120msg</p>
        <p>Other settings</p>
        <p>Rank: Rookie</p>
      </div>
      <div class="modal-footer">
        <span class="modal-close waves-effect waves-green btn-flat">Close</span>
        <span class="waves-effect waves-red btn-flat">Delete all messages</span>
        <span class="waves-effect waves-red btn-flat">Delete room messages</span>
        <span class="waves-effect waves-red btn-flat">Clear chat</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: ['name'],
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

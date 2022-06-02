<template>
  <div class="auth">
    <Nuxt />
  </div>
</template>
<script>
export default {
  middleware: 'guest',
  head: {
    bodyAttrs: {
      class: 'yellow-bg'
    }
  }
}
</script>
<style>
.auth {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.auth-logo {
  margin-bottom: 25px;
}
.auth-logo span {
  font-family: Pacifico;
  font-size: 45px
}

.middle {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
}
.auth-block {
  position: relative;
  -webkit-box-shadow: 0 5px 30px 0 rgba(0,0,0,var(--vs-shadow-opacity));
  box-shadow: 0 5px 30px 0 rgba(0,0,0,var(--vs-shadow-opacity));
  background: #fff;
  padding: 20px;
  align-self: center;
  max-width: 420px;
  min-width: 350px;
  width: 100%;
  border-radius: 20px;
  box-sizing: border-box;
}
.auth-block__header {
  margin: 10px 0px;
  text-align: center;
  font-size: 20px;
}

.auth-block__footer {
  margin: 25px 0 10px 0;
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.con-form {
  width: 100%;
}

.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.con-form .flex a {
  font-size: 0.9em;
  opacity: 0.7;
}

.con-form .flex a:hover {
  opacity: 1;
}

.con-form .vs-checkbox-label {
  font-size: 1rem;
}
.con-form .vs-input__label {
  font-size: 1rem;
}

.con-form .vs-input-content {
  width: calc(100%);
}
.con-form .vs-input-parent {
  margin: 10px 0px;
}

.con-form .vs-input-content .vs-input {
  width: 100%;
  height: 45px;
  font-size: 1rem;
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}

.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 1rem;
}

.footer-dialog .new a {
  color: #000000 !important;
  margin-left: 6px;
}

.footer-dialog .new a:hover {
  text-decoration: underline;
}

.footer-dialog .vs-button {
  margin: 0px;
}
</style>

import auth from '@/services/auth';

<template>
  <div class="main">
      <div class="brand">      
        <img class="image-logo" alt="logo" src="../../../assets/logo.png" />
      </div>        
      <h1 class="mt20 text-center">Storehouse</h1>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
};
</script>

<style scoped>
.brand {
    width: 90px;
    height: 90px;
    margin: 25px auto 0px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgb(0 0 0 / 5%);
    background: #fff;
    text-align: center;

}
.image-logo {
  margin-top: 10px;
  width:65px;
}

</style>

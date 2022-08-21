<template>
    <div class="brand">
      <img src="@/assets/logo.png" alt="Economato" style="width: 65px;">
    </div>

    <div class="auth-panel card">
		
		<div class="card-body">		
			<router-view />
		</div>
    </div>

</template>

<script>

	//import auth from "@/services/auth";

	export default {
		data(){
			return {
				username: "",
				password: "",
				formError: false,
				error: false,
			}
		},
		methods: {async login() {
				/*try {
					let res = await auth.login(this.username, this.password);
					auth.setToken(res.data.token);
    				this.$router.push("/");
				} catch (error) {
					console.log(error);
				}*/
			}
		},
	};

</script>


<style scoped>
.brand {
	width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 40px auto;
    box-shadow: 0 4px 8px rgb(0 0 0 / 5%);
    background: #fff;
    padding: 10px;
    text-align: center;
}
.auth-panel {
	margin: 40px auto;
	width: 100%;
	max-width: 400px;
	background: #fff;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
	box-shadow: 0 4px 8px rgb(0 0 0 / 5%);
}
.card-body{
	padding:35px;
}
</style>
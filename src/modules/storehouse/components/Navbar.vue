<template>
	<nav class="navbar navbar-light p-0 fixed-top">
		<div class="container-fluid p-0">
			<span class="navbar-brand mb-0 h1 p-0">
				<span class="site-name">Storehouse</span>
			</span>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar'
};
</script>

<style scoped>
.navbar{
	-webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    border: none;
	background: #00897b;
}
.menu-btn {
	float: left;
	padding:15px;
	cursor:pointer;
}
.site-name{
	float:left;
	padding: 15px;
	color: #fff;
}
</style>

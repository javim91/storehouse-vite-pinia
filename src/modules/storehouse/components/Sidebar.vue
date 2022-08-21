<template>
	<div class="sidebar">
		<div class="profile-content">
			<img src="../../../assets/profile.png" class="profile-image" alt="Profile Image" /><!--{{ username }} -->
		</div>
		<ul>
			<li class="item" v-for="(item) in menuItems" :key="item">
				<router-link v-if="!item.smenu" :to="item.link" class="itemlink"><i :class="'fa fa-' + item.icon"></i> {{ item.title }}</router-link>
				<sidebar-submenu v-else :item="item" />
			</li>
			<!--<li class="item">
				<a @click="onLogout" href="javascript:void(0);" class="itemlink"><i class="fa fa-sign-out-alt"></i> Sign Out</a>
			</li>-->
		</ul>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
//import useAuth from '@/modules/auth/composables/useAuth';
import SidebarSubmenu from './SidebarSubmenu.vue';

export default {
	name: 'Sidebar',

	components: {
		SidebarSubmenu
	},

	setup() {
		const router = useRouter()
		//const { username, logout } = useAuth()
		const menuItems = [
			{ title: 'Home', link: '/', icon: 'home' },
			{ title: 'Orders', link: '/orders', icon: 'shopping-cart' },
			{ title: 'Providers', link: '/providers', icon: 'id-card' },
			{ title: 'Products', link: '/products', icon: 'boxes' },
			{ title: 'Tools', link: '', icon: 'terminal',
				smenu: [
					{ title: 'Join Codes', link: '/join-codes' },
					//{ title: 'Import Products', link: 'import-products' },
				],
			},
		]

		return {
			//username,
			menuItems,
			/*onLogout: () => {
				router.push({ name: 'login' })
				logout()
			}*/
		}
	}
};
</script>

<style scoped>
*{
	margin:0;
	padding:0;
	list-style: none;
	text-decoration: none;
}
.sidebar {
    background: #fff;
    width: 300px;
    overflow: auto;
    display: inline-block;
    height: calc(100vh - 54px);
    position: fixed;
    top: 54px;
    left: 0;
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 11 !important;
}

.profile-content {
	text-align: left;
	padding: 15px 20px;
	background: #bfbfbf;
	text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
}

.profile-image {
	max-width: 50px;
	margin-right: 20px;
    border-radius: 50%;
}
.item{
	overflow: hidden;
}
.itemlink{
	display: block;
	padding: 16px 20px;
	color: #00897b;
	text-align: left;
}
.itemlink:hover{
	background:#eee
}
.itemlink i{
	margin-right:10px;
}
</style>

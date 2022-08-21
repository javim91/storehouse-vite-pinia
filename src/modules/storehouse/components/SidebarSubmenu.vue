<template>
  <a @click="openSubmenu()" href="javascript:void(0)" class="itemlink" :class="{open: open}"><i :class="'fas fa-' + item.icon"></i> {{ item.title }}</a>
  <ul class="smenu" ref="smenu">
		<li>
			<router-link :to="i.link" v-for="i in item.smenu" :key="i">{{ i.title }}</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'SidebarSubmenu',
	props: {
		item: Object,
	},
	data() {
		return {
			smenuMaxHeight: null,
			open: false,
		}
	},
	methods: {
		openSubmenu(){
			this.open=!this.open;

			let el = this.$refs.smenu;
			if(this.open){
				el.style.maxHeight = this.smenuMaxHeight+'px';
			}
			else {
				el.style.maxHeight = 0;
			}
		},
	},

	mounted() {
		let element = this.$refs.smenu;
		this.smenuMaxHeight = element.offsetHeight;
		element.style.maxHeight = 0;
	}
}
</script>

<style scoped>
*{
	margin:0;
	padding:0;
	list-style: none;
	text-decoration: none;
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
.itemlink::after {
	font-family: "Material Icons";
	content: "keyboard_arrow_right";
	float:right;
}
.itemlink.open::after {
	font-family: "Material Icons";
	content: "keyboard_arrow_down"!important;
	float:right;
}
.itemlink i{
	margin-right:10px;
}
.smenu{
	background:#f5f5f5;
	overflow: hidden;
	box-shadow: inset 0 5px 5px -5px #777;
    transition: max-height 0.2s ease-in;
}

.smenu a{
	display: block;
	padding: 16px 26px;
	color: #00897b;
	font-size: 14px;
	margin:4px 0;
	position: relative;
}

.smenu a:hover{
	background:#eee;
}

</style>

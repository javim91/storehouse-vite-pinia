<template>
	<div class="main">
		<h5 class="mt20">Join Codes</h5>
		<hr>
		<p>
			Copiar y pegar los códigos de los productos que se desean buscar
			separados por saltos de línea </p>

		<textarea
			v-model="message"
			class="form-control"
			style="height: 300px!important;resize: none!important;"
		></textarea>

		<label class="form-label bold mt-5">Resultado</label>
		<div class="input-group">
			<input
				type="text"
				class="form-control pointer"
				readonly
				v-model="codes"
				outline
				label="Click para copiar"
				append-icon="fas fa-copy"
			/>
			<span class="input-group-btn">
				<button
					@click="copyCodes()"
					:disabled="copiedCodes == true"
					class="btn btn-primary"
					v-clipboard:copy="codes"
				>
					<span v-if="!copiedCodes">Copiar códigos</span>
					<span v-else>Copiado!</span>
				</button>
			</span>
		</div>
		<p v-if="codesArray.length" class="bold mt-3">
			Num. Productos: {{ codesArray.length }}
		</p>
	</div>
</template>

<script>


export default {
	
	data(){
		return {
			message: "",
			copiedCodes: false,
		}
	},
	methods: {
		copyCodes() {
			this.copiedCodes = true;
			setTimeout(() => {
				this.copiedCodes = false;
			},1000)
		},
	},
	computed: {
		codes: function () {
			return this.message.replace(/(?:(?:\r\n|\r|\n)\s*){1}/gm, ";");
		},
		codesArray: function () {
			var codesArr = this.codes.split(";");
			for(var i=0; i<codesArr.length; i++){
				if(codesArr[i]==""){
					codesArr.splice(i,1);
				}
			}
			return codesArr;
		}
	},
}
</script>

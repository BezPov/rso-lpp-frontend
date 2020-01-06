
<template>
	<v-row justify="center">

		<v-dialog
				v-model="dialog"
				max-width="290"
		>
			<v-card>
				<v-card-title class="headline">Pošljite nam povratne informacije</v-card-title>

				<v-card-text>
					Koliko je znašala zamuda avtobusa?
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn
							color="red"
							text
							@click="dialog = false"
					>
						Ne pošlji
					</v-btn>

					<v-btn
							color="primary"
							text
							@click="dialog = false"
					>
						Pošlji
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	export default {
		name: "FeedbackModal"
	}
</script>

<style scoped>

</style>
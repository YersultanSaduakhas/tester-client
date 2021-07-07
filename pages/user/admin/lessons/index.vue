<template>
  <v-card>
    <v-card-title>
      Lessons
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn
      tile
      color="success"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      Add lesson
    </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="lessons"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
    data() {
        return{
            search:'',
            headers:[
                { text: '#', value: 'id' },
                { text: 'name', value: 'name' },
                { text: 'questions_count', value: 'questions_count' }
            ],
            lessons:[
                {id:1,name:'Математика',questions_count:120},
                {id:1,name:'Тарих',questions_count:125},
            ]
        }
    },
}
</script>
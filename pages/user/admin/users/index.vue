<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
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
            ],
            users:[
                {id:1,name:'Асан Ербол'},
                {id:1,name:'Мәлік Азат'},
            ]
        }
    },
}
</script>
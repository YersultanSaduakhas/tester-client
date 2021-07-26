<template>
  <v-card>
    <v-card-title>
      {{ $t('lessons') }}
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      />
    </v-card-title>
    <v-row class="mt-5 mb-5">
      <v-btn
        tile
        color="success"
        class="ml-5"
        :to="{ path:'/user/admin/lessons/form', query : { mode:'new' }}"
      >
      <v-icon>
          mdi-plus
        </v-icon>
        {{ $t('add_new_lesson') }}
      </v-btn>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="lessons"
      :search="search"
      single-select
    >
    <template v-slot:item="{ item }">
        <tr :class="currentLesson&&currentLesson.id==item.id ? 'cyan':''" @click="handleClick(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.question_count }}</td>
            <td>
              <v-tooltip left>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                    :to="{ path:'/user/admin/lessons/form', query : { mode:'edit', id: item.id }}"
                  >
                  <v-icon>
                      mdi-pen
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('edit_lesson')}}</span>
              </v-tooltip>
              <v-tooltip right>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon>
                      mdi-close-box
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('remove_lesson')}}</span>
              </v-tooltip>
            </td>
        </tr>
    </template>
    </v-data-table>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentLesson: null,
      search: '',
      headers: [
        { text: '#' },
        { text: this.$t('name') },
        { text: this.$t('question_count') },
        { text: this.$t('action') }
      ],
      lessons: []
    }
  },
  mounted () {
    this.loadLessons()
  },
  methods: {
    async loadLessons () {
      const res = await axios.get('/api/lesson')
      this.lessons = res.data
    },
    handleClick (row) {
      this.currentLesson = row
    },
    deleteLesson (id) {
    }
  }
}
</script>

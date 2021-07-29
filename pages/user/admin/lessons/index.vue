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
      <template #item="{ item }">
        <tr :class="currentLesson&&currentLesson.id==item.id ? 'cyan':''" @click="handleClick(item)">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.question_count }}</td>
          <td>
            <v-tooltip left>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  color="info"
                  v-bind="attrs"
                  :to="{ path:'/user/admin/lessons/form', query : { mode:'edit', id: item.id }}"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pen
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('edit_lesson') }}</span>
            </v-tooltip>
            <v-tooltip right>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  @click="showDeleteDialog=true"
                >
                  <v-icon>
                    mdi-close-box
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('remove_lesson') }}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="showDeleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('remove_lesson_confirm') }}
        </v-card-title>

        <v-card-text v-if="currentLesson">
          {{ currentLesson.id + ') '+ currentLesson.name }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="deleteCurrentLesson()"
          >
            OK
          </v-btn>
          <v-btn
            color="error"
            text
            @click="showDeleteDialog=false"
          >
            {{ $t('cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentLesson: {
        id: null,
        name: null
      },
      showDeleteDialog: false,
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
    async deleteCurrentLesson () {
      this.$toast.show('delete existing question ...')
      await axios.delete('/api/lesson/' + this.currentLesson.id)
      this.showDeleteDialog = false
      this.$toast.success('successfully deleted existing question')
      this.loadLessons()
    }
  }
}
</script>

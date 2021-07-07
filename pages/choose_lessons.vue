<template>
  <v-card max-width='600' class='mx-auto'>
    <v-toolbar color='light-blue' dark>
      <v-toolbar-title>Panderdi tandau</v-toolbar-title>
    </v-toolbar>
    <v-list subheader two-line>
      <v-subheader inset>Mindetti pander</v-subheader>

      <v-list-item v-for='mainSubject in mainSubjects' :key='mainSubject.title'>
        <v-list-item-avatar>
          <v-icon class='grey lighten-1' dark> mdi-folder </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text='mainSubject.title'></v-list-item-title>

          <v-list-item-subtitle v-text='mainSubject.subtitle'></v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color='grey lighten-1'>mdi-information</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>Qosymsha pander</v-subheader>

      <v-list-item v-for='(additionalSubject,ind) in selectedAdditionalSubjects' :key='additionalSubject.title'>
        <v-list-item-avatar>
          <v-icon :class='additionalSubject.color' dark v-text='additionalSubject.icon'></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text='additionalSubject.title'></v-list-item-title>

          <v-list-item-subtitle v-text='additionalSubject.subtitle'></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
          class="white--text"
          color='orange'
          tile
           @click="chooseSubject(ind)">
            <v-icon color='white'>mdi-plus</v-icon>
            Tandau
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-row
    align="center"
    justify="space-around"
  >
  <v-alert
      dense
      outlined
      type="error"
      v-if="selectedAdditionalSubjects[0].id==-1||selectedAdditionalSubjects[1].id==-1"
    >
      Qosymsha pander tandalmagan
    </v-alert>
    <v-btn
    class="white--text"
      tile
      color="primary"
      :disabled="selectedAdditionalSubjects[0].id==-1||selectedAdditionalSubjects[1].id==-1"
      to="do_test"
    >
    Synaqti bastau
      <v-icon left>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </v-row>
   <v-dialog
        v-model="showDialog"
        scrollable
        max-width="300px"
      >
        <v-card>
        <v-card-title>{{currentLesson+'-shi pandi tandau'}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="selectedLesson"
            column
          >
          <v-radio
          v-for="(lesson,ind) in dialogLessons"
          :key="ind"
            :label="lesson.title"
            :value="lesson.id"
          ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="showDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    showDialog: false,
    currentLesson: 3,
    selectedLesson: -1,
    additionalSubjects: [
      {
        title: 'Biologya',
        id: 4
      },
      {
        title: 'Himiya',
        id: 5
      },
      {
        title: 'Fizika',
        id: 6
      },
      {
        title: 'Adebyet',
        id: 7
      }
    ],
    dialogLessons: [],
    selectedAdditionalSubjects: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: '',
        title: 'Tandalmagan',
        id: -1
      },
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: '',
        title: 'Tandalmagan',
        id: -1
      }
    ],
    mainSubjects: [
      {
        subtitle: 'jalpy suraktar sani 40',
        title: 'Matematika',
        id: 1
      },
      {
        subtitle: 'jalpy suraktar sani 35',
        title: 'Qazaq tili',
        id: 2
      },
      {
        subtitle: 'jalpy suraktar sani 40',
        title: 'Qazaqstan tarihi',
        id: 3
      }
    ]
  }),
  methods: {
    isSelected (lesson) {
      let res = false
      this.selectedAdditionalSubjects.forEach((_) => {
        if (lesson.id === _.id) {
          res = true
        }
      })
      return res
    },
    save () {
      this.additionalSubjects.forEach((_) => {
        if (_.id === this.selectedLesson) {
          this.selectedAdditionalSubjects[this.currentLesson - 4].id = _.id
          this.selectedAdditionalSubjects[this.currentLesson - 4].title = _.title
        }
        this.showDialog = false
      })
    },
    chooseSubject (ind) {
      this.dialogLessons = []
      this.additionalSubjects.forEach((_) => {
        if (_.id === this.selectedAdditionalSubjects[0].id || _.id === this.selectedAdditionalSubjects[1].id) {
          return
        }
        this.dialogLessons.push(_)
      })
      this.currentLesson = ind + 4
      this.showDialog = true
    }
  }
}
</script>

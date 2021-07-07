<template>
  <v-card class="pb-2">
    <v-row
    align="center"
    justify="center">
        <v-card-title>Synaq bastaldy</v-card-title>
    </v-row>
    <v-row
    align="center"
    justify="center">
        <v-progress-linear
      v-model="knowledge"
      class="v-progress-linear"
      height="25"
      color="blue-grey"
    >
      <strong>{{ Math.ceil(knowledge) }}%</strong>
    </v-progress-linear>
    </v-row>
    <v-row
    align="center"
    justify="center"
    class="mb-6">
    <v-card-subtitle>{{ currentLesson.title }}</v-card-subtitle>
    </v-row>
    <v-card>
     <p class="ml-1"> {{currentLesson.currentQuestion.id}}) Lorem ipsum dolor sit amet, consectetLorem ipsum dolor sit amet, consectet</p>
    <v-divider></v-divider>
    <v-radio-group
    v-model="answerChoosen"
    class="ml-1">
        <v-radio
        v-for="n in 5"
        :key="n"
        :label="`Radio ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    </v-card>
    <v-row
    align="center"
    justify="center"
    class="mt-2 mb-2">
        <v-btn
        left
        rounded
        class="mr-2"
        >Artqa</v-btn>
        <v-btn v-if="answerChoosen === -1" right rounded>Otkizu</v-btn>
        <v-btn v-if="answerChoosen>-1" right rounded>Kelesi</v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    knowledge: 35,
    answerChoosen: -1,
    currentLessonIndex: 0,
    currentLesson: {
      title: 'Matematika',
      currentQuestionId: 1,
      allQuestionCount: 40,
      currentQuestion: {
        id: 1
      }
    }
  })
}
</script>
<style>
.v-progress-linear {
  display: block;
  margin: 0 auto;
  width: 200px;
  background-color: teal;
}
</style>

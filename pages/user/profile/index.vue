<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>First name</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Surname</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="second name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Email</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Email address"
          value="example"
          suffix="@gmail.com"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
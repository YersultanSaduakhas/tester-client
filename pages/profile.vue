<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ $t('full_name') }}</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :label="$t('full_name')"
          :value="$auth.user.name"
          disabled
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>{{ $t('email') }}</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :label="$t('email')"
          :value="$auth.user.email"
          disabled
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>{{ $t('register_date') }}</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :label="$t('register_date')"
          :value="$auth.user.created_at"
          disabled
        />
      </v-col>
    </v-row>
  </v-container>
</template>

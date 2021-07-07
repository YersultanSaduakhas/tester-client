<template>
    <v-container>
        <v-navigation-drawer
            permanent
        >
            <v-divider></v-divider>
            <v-list nav dense>
                <v-list-item link href="#">
                    <v-list-item-icon>
                        <v-icon color="white" small>mdi-lightbulb</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="title">Blue</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <NuxtChild />
        </v-content>
    </v-container>
</template>
<template>
  <v-container fluid fill-height>
      <v-card class="mx-auto overflow-hidden">
        <v-system-bar color="deep-purple darken-3"></v-system-bar>

        <v-app-bar color="deep-purple accent-4" dark prominent>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>{{pages[currentPageIndex].title}}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-filter</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-title @click="setCurrentPage(0)">Profile</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title @click="setCurrentPage(1)">Users</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title @click="setCurrentPage(2)">Lessons</v-list-item-title>
              </v-list-item>
             
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-main fluid fill-height>
          <userProfiles v-if="currentPageIndex==0"></userProfiles>
          <adminUsers v-if="currentPageIndex==1"></adminUsers>
          <adminLessons v-if="currentPageIndex==2"></adminLessons>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </v-main>
      </v-card>
    </v-container>
</template>
    <!--v-card>
      <v-toolbar>
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical >
        <v-tab>
          <v-icon left> mdi-account </v-icon>
          Profile
        </v-tab>
        <v-tab>
          <v-icon left> mdi-book-open-outline </v-icon>
          Lessons
        </v-tab>
        <v-tab>
          <v-icon left> mdi-account-group </v-icon>
          Users
        </v-tab>
        <v-tab-item class="pl-16">
          <userProfiles></userProfiles>
        </v-tab-item>
        <v-tab-item class="pl-16">
         <adminLessons></adminLessons>
        </v-tab-item>
        <v-tab-item class="pl-16">
          <adminUsers></adminUsers>
        </v-tab-item>
      </v-tabs>
    </v-card
  </v-container>
</template>-->
<script>
import userProfiles from "~/pages/user/profile/index.vue";
import adminLessons from "~/pages/user/admin/lessons/index.vue";
import adminUsers from "~/pages/user/admin/users/index.vue";
export default {
  data() {
    return {
      child: "userProfiles",
       drawer: false,
      group: null,
      currentPageIndex:0,

      pages:[
        {title:"Profile",key:"profile"},
        {title:"Users",key:"users"},
        {title:"lessons",key:"lessons"},
      ]
    };
  },
  methods: {
    changeCurrentComponent(key_) {
      this.child = key_;
    },
    setCurrentPage(ind){
      this.currentPageIndex = ind;
    } 
  },
  components: {
    userProfiles,
    adminLessons,
    adminUsers,
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>
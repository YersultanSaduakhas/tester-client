<template>
    <v-container>
        <v-toolbar flat>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-toolbar-title flat>
                <v-btn text to="/">bilim.kz</v-btn>
            </v-toolbar-title>    
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn to="auth" text>
                    login
                </v-btn>
                <v-btn to="/user" icon>
                    <v-icon aria-hidden="false">
                        mdi-account
                    </v-icon>
                </v-btn>
            </v-toolbar-items>    
        </v-toolbar>
    </v-container>
</template>   
<script>
export default {
    data () {
        return {
            isAuthenticated:false
        }
    }   
}
</script>
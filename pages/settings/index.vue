<template>
  <div class="settings-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
            <ul class="error-messages">
                <template v-for="(messages,field) in errors">
                    <li v-for="(message,index) in messages" :key="index">{{field +" "+ message}}</li>
                </template>
            </ul>

            <form @submit.prevent="onSubmit">
                <fieldset :disabled="submitting">
                    <fieldset class="form-group">
                        <input
                        class="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                        v-model="user.image"
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                        class="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                        v-model="user.username"
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea
                        class="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                        v-model="user.bio"
                        ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                        class="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        v-model="user.email"
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                        class="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        v-model="user.password"
                        />
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>

                    <button class="btn btn-outline-danger" @click="logout()"> Or click here to logout. </button>
                </fieldset>
          </form>
        </div>

        </div>
    </div>
</div>
</template>

<script>
import { updateUser } from "@/api/user";
import { mapActions } from "vuex";
export default {
//访问:没登录不能访问
  middleware: "authenticated",
  data() {
    return { errors: {}, submitting: false };
  },
  asyncData({ store }) {
    const user = store.state.user;
    const formData = {};
    for (const key of ["email", "username", "password", "image", "bio"]) {
      formData[key] = user[key];
    }
    return { user: formData };
  },
  methods: {
    ...mapActions(["clientSetUser"]),
    async onSubmit() {
      this.submitting = true;
      try {
        const {
          data: { user },
        } = await updateUser({ user: this.user });
        this.clientSetUser(user);
        this.errors = {};
        this.$router.push({
          name: "profile-username",
          params: { username: user.username },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
      this.submitting = false;
    },

    logout () {
        this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+currentUser.photoURL+')'"></div>
      <p class="user-name">{{currentUser.displayName}}</p>
    </div>
    <div class="editor">
      <textarea placeholder="new rumble" v-model="newRumble" @keypress.enter="createRumble"></textarea>
      <p class="message">Press Enter to Rumble</p>
    </div>
  </li>
</template>

<script>
import { db } from "@/main";

export default {
  props: ["currentUser"],
  data() {
    return {
      newRumble: ""
    };
  },
  methods: {
    createRumble() {
      const date = new Date();
      db.collection("rumbles")
        .add({
          content: this.newRumble,
          date: date,
          uid: this.$props.currentUser.uid
        })
        .then((this.newRumble = ""));
    }
  }
};
</script>

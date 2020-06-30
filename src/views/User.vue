<template>
  <div id="user">
    <div class="user-title">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
      <div class="texts">
        <h1>{{user.name}}</h1>
        <p v-if="myRumbles.length > 1">{{myRumbles.length}} rumbles</p>
        <p v-else>{{myRumbles.length}} rumble</p>
      </div>
    </div>
    <div class="list">
      <Editor :currentUser="currentUser" />
      <Item
        v-for="rumble in orderBy(myRumbles,'date',-1)"
        :key="rumble.id"
        :id="rumble.id"
        :uid="rumble.uid"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue2Filters from "vue2-filters";
import { auth } from "@/main";
import { db } from "@/main";
import Editor from "@/components/Editor";
import Item from "@/components/Item";

export default {
  components: {
    Editor,
    Item
  },
  data() {
    return {
      user: {},
      myRumbles: [],
      currentUser: {}
    };
  },
  firestore() {
    return {
      user: db.collection("users").doc(this.$route.params.uid),
      myRumbles: db
        .collection("rumbles")
        .where("uid", "==", this.$route.params.uid)
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  mixins: [Vue2Filters.mixin]
};
</script>

<style lang="stylus" scoped>
.user-title {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin: 10px 0;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-size: cover;
  }

  .texts {
    margin-left: 10px;

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      margin: 0;
    }
  }
}
</style>
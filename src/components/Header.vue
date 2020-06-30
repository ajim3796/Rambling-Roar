<template>
  <header>
    <router-link to="/">
      <h1>Rambling Roar</h1>
    </router-link>
    <div v-if="currentUser" class="btns">
      <router-link :to="'/user/' + currentUser.uid">
        <button :style="'background-image: url('+currentUser.photoURL+')'"></button>
      </router-link>
      <button @click="signOut">
        <fa icon="sign-out-alt" />
      </button>
    </div>
    <div v-else class="btns">
      <button @click="signIn">
        <fa icon="user" />
      </button>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
import { auth } from "@/main";
import { db } from "@/main";

export default {
  data() {
    return {
      currentUser: {}
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
      (async () => {
        try {
          await db
            .collection("users")
            .doc(user.uid)
            .set(
              {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL
              },
              { merge: true }
            );
        } catch (err) {
          console.log(`Error: ${JSON.stringify(err)}`);
        }
      })();
    });
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
    },
    signOut() {
      if (window.confirm("Are You Sure to Sign Out?")) {
        auth.signOut().then(() => {
          alert("You Safely Signed Out.");
          this.$router.push("/"), location.reload();
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  padding: 10px;

  h1 {
    width: fit-content;
    margin: 0 auto;
    font-size: 2rem;
  }

  .btns {
    position: absolute;
    top: 10px;
    right: 30px;
    cursor: pointer;

    img {
      width: 100%;
    }
  }
}
</style>
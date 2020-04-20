<template>
  <div>
    <v-navigation-drawer app permanent clipped color="grey lighten-4">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ room.name }}</v-list-item-title>
          <v-list-item-subtitle>Room</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="r in rooms" :key="r.id" :to="`/room/${r.id}`">
          <v-list-item-content>
            <v-list-item-title>{{ r.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <div v-for="message in messages" :key="message.id">
        <p class="overline">
          {{ message.author }} on {{ message.createdAt.toLocaleString() }}
        </p>
        <p>{{ message.message }}</p>
      </div>
    </v-container>
    <v-footer absolute color="grey lighten-4">
      <v-text-field
        v-model="newMessage"
        color="success"
        label="New Message"
        @change="add"
      />
      <v-btn color="success" @click="add">Send</v-btn>
    </v-footer>
  </div>
</template>

<script>
import { db } from "../plugins/firebase";
import { mapGetters } from "vuex";

export default {
  name: "Room",
  data() {
    return {
      newMessage: "",
      room: {},
      rooms: [],
      messages: []
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  watch: {
    "$route.params.id": async function() {
      await this.$bind(
        "room",
        db.collection("rooms").doc(this.$route.params.id)
      );
      await this.$bind(
        "messages",
        db
          .collection("messages")
          .where("roomId", "==", this.$route.params.id)
          .orderBy("createdAt")
      );
    }
  },
  mounted() {
    this.bind();
  },
  methods: {
    async add() {
      if (this.newMessage != "") {
        await db.collection("messages").add({
          roomId: this.$route.params.id,
          author: this.user.displayName,
          message: this.newMessage,
          createdAt: new Date()
        });
        this.newMessage = "";
      }
    },
    async bind() {
      await this.$bind(
        "room",
        db.collection("rooms").doc(this.$route.params.id)
      );
      await this.$bind("rooms", db.collection("rooms").orderBy("createdAt"));
      await this.$bind(
        "messages",
        db
          .collection("messages")
          .where("roomId", "==", this.$route.params.id)
          .orderBy("createdAt")
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>

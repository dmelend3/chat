<template>
  <v-card class="mx-auto mt-4" max-width="300">
    <v-card-title>
      <v-container>
        <v-row align="baseline">
          <v-text-field v-model="newRoom" @change="add" label="New Room" />
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-subheader>Rooms Available</v-subheader>
        <v-list-item v-for="room in rooms" :key="room.id" :to="`room/${room.id}`">
          <v-list-item-content>
            <v-list-item-title v-text="room.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from "../plugins/firebase"

export default {
  name: "Home",
  data() {
    return {
      newRoom: "",
      rooms: []
    };
  },
  mounted () {
    this.bind();
  },
  methods: {
    async add() {
      if (this.newRoom != "") {
        await db.collection("rooms").add({
          name: this.newRoom,
          createdAt: new Date()
        })
        this.newRoom = ""
      }
    },
    async bind(){
      await this.$bind("rooms", db.collection("rooms").orderBy("createdAt"))
    }
  }
};
</script>

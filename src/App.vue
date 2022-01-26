<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white"
    >
      <q-toolbar>
        <div class="row justify-center q-py-sm full-width">
          <q-img
            style="max-width: 200px"
            src="./assets/dynamaze_logo.png"
          />
        </div>
      </q-toolbar>
      <div />
    </q-header>

    <q-page-container>
      <Main />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import Main from './components/Main.vue';

export default {
  name: 'LayoutDefault',

  components: {
    Main,
  },

  setup () {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

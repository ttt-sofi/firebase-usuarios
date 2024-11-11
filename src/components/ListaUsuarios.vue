<template>
  <div>
    <!-- Lista de usuarios -->
    <ul class="list-group mt-4">
      <li
        v-for="usuario in usuarios"
        :key="usuario.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ usuario.id }} - {{ usuario.nombre }} - {{ usuario.email }}

        <button
          @click="deleteUsuario(usuario.id)"
          class="btn btn-danger btn-sm btn-rounded"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<!-- <script>

export default {
  computed: {
    // Obtener los usuarios desde el estado de Vuex
    usuarios() {
      return this.$store.getters.usuarios;
    },
  },
  methods: {
    // Eliminar un usuario
    async deleteUsuario(usuarioId) {
      await this.$store.dispatch("deleteUsuario", usuarioId); // Despachar la acción para eliminar
    },
  },
};
</script> -->

<script>
export default {
  mounted() {
    // Llamar a la acción de Vuex para cargar usuarios al montar el componente
    this.$store.dispatch("fetchUsuarios").catch(error => {
      console.error("Error al cargar usuarios:", error);
    });
  },
  computed: {
    // Obtener los usuarios desde el estado de Vuex
    usuarios() {
      return this.$store.getters.usuarios;
    },
  },
  methods: {
    async deleteUsuario(usuarioId) {
      try {
        await this.$store.dispatch("deleteUsuario", usuarioId);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    },
  }
};
</script>


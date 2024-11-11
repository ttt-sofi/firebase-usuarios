<template>
    <div class="container">
      <!-- Formulario -->
      <form @submit.prevent="agregarUsuario" class="form-container align-items-center mt-5">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input
            v-model="nuevoUsuario"
            type="text"
            id="nombre"
            placeholder="Ingresa tu nombre"
            class="form-control"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="emailUsuario"
            type="email"
            id="email"
            placeholder="Ingresa tu e-mail"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-primary btn-rounded">Agregar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        nuevoUsuario: "",
        emailUsuario: "",
      };
    },
    methods: {
      ...mapActions(['addUsuario']), // Mapea la acción addUsuario desde el store
      async agregarUsuario() {       // Método para agregar usuario
        if (this.nuevoUsuario.trim() === "" || this.emailUsuario.trim() === "") return;
  
        const usuario = {
          nombre: this.nuevoUsuario.trim(),
          email: this.emailUsuario.trim(),
        };
  
        // Usa la acción mapeada para agregar el usuario
        await this.addUsuario(usuario);
  
        // Limpiar los campos después de agregar
        this.nuevoUsuario = "";
        this.emailUsuario = "";
      },
    },
  };
  </script>
  
<style scoped>
/* Fondo blanco para toda la página */
body {
  background-color: #ffffff;
  font-family: 'Helvetica', sans-serif;
}

/* Estilo del formulario */
.form-container {
  background-color: #f0f9ff; /* Celeste claro */
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
  max-width: 500px;
  margin: 0 auto;
}

/* Botones redondeados */
.btn-rounded {
  border-radius: 30px;
}

/* Colores del botón */
.btn-primary {
  background-color: #0091ea; /* Azul celeste */
  border-color: #0091ea;
}

.btn-primary:hover {
  background-color: #007bb2; /* Azul más oscuro */
  border-color: #007bb2;
}

/* Lista de usuarios */
.list-group-item {
  font-size: 16px;
  border: 1px solid #f1f1f1;
}

.list-group-item:hover {
  background-color: #f0f9ff;
}
</style>
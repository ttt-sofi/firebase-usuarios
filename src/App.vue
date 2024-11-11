<script>
import formulario from './components/formulario.vue'
import ListaUsuarios from './components/ListaUsuarios.vue'

export default {
  name: 'App',
  components: {
    formulario,
    ListaUsuarios
  },
};
</script>

<template>
<div>
<formulario />
<ListaUsuarios/>

</div>
</template>

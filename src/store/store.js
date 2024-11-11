// store.js o store/modules/usuarios.js
import { createStore } from "vuex";
import { getFirestore, collection, addDoc, deleteDoc, doc,getDocs } from "firebase/firestore";
import firebaseApp  from "../../firebaseConfig"; 


const store = createStore({
  state: {
    usuarios: [], // Estado global para almacenar usuarios
  },
  mutations: {
    agregarUsuario(state, usuario) {
      state.usuarios.push(usuario);
    },
    eliminarUsuario(state, usuarioId) {
      state.usuarios = state.usuarios.filter(usuario => usuario.id !== usuarioId);
    },
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
  },
  actions: {
    async addUsuario({ commit }, usuario) {
      try {
        const db = getFirestore(firebaseApp);
        const UsuariosRef = collection(db, "Usuarios");
        const docRef = await addDoc(UsuariosRef, usuario); // Guardar el usuario en Firebase
        const nuevoUsuario = { ...usuario, id: docRef.id }; // Asignar el ID generado por Firebase
        commit("agregarUsuario", nuevoUsuario); // Actualizar el estado global
      } catch (error) {
        console.error("Error al agregar usuario:", error);
      }
    },
    async deleteUsuario({ commit }, usuarioId) {
      try {
        const db = getFirestore(firebaseApp);
        const UsuarioRef = doc(db, "Usuarios", usuarioId);
        await deleteDoc(UsuarioRef); // Eliminar el usuario de Firebase
        commit("eliminarUsuario", usuarioId); // Actualizar el estado global
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    },
    async fetchUsuarios({ commit }) {
      try {
        const db = getFirestore(firebaseApp);
        const UsuariosRef = collection(db, "Usuarios");
        const querySnapshot = await getDocs(UsuariosRef); // Obtener todos los documentos
        const usuarios = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Mapear los documentos
        commit("setUsuarios", usuarios); // Actualizar el estado global
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    },
  },
  getters: {
    usuarios(state) {
      return state.usuarios;
    },
  },
});

export default store;

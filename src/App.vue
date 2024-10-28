<script setup lang="ts">
import { ref, reactive} from "vue";
import Alerta from "./components/alerta.vue";
import Spinner from "./components/Spinner.vue";
import useCripto from "./composable/useCripto";

const { monedas,criptomonedas,cotizacion,cargando,obtenerCotizacion, mostrarResultado} = useCripto()

const error = ref('')
const cotizar = reactive({
  moneda: "",
  criptomoneda: "",
})

const cotizarCripto = () => {
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son obligatorios"
    return
  }
  error.value = ''
  obtenerCotizacion(cotizar)
};


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{  error }}</Alerta>
      <form @submit.prevent="cotizarCripto" class="formulario">
        <label for="moneda">Moneda</label>
        <select v-model="cotizar.moneda" id="moneda">
          <option value="">--- SELECCIONA ---</option>
          <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
            {{ moneda.texto }}
          </option>
        </select>
        <label for="cripto">Criptomoneda</label>
        <select v-model="cotizar.criptomoneda" id="cripto">
          <option value="">--- SELECCIONA ---</option>
          <option
          v-for="criptomoneda in criptomonedas"
          :key="criptomoneda.CoinInfo.Name"
            :value="criptomoneda.CoinInfo.Name"
          >
            {{ criptomoneda.CoinInfo.FullName }}
          </option>
        </select>

        <input type="submit" value="Cotizar" />
      </form>

      <Spinner v-if="cargando"/>
      
      <div v-if="mostrarResultado" class="contenedor-resultado">
        <h2>Cotizacion</h2>
        <div class="resultado">
          <img :src="'https://cryptocompare.com' + cotizacion.IMAGEURL" alt="imagen Cripto">
          <div>
            <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
            <p>El precio mas alto del dia: <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>El precio mas bajo del dia: <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>Variacion ultimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
            <p>Ultima actualizacion: <span>{{ cotizacion.LASTUPDATE }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

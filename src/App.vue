<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Alerta from "./components/alerta.vue";

const monedas = ref([
  { codigo: "USD", texto: "Dolar de Estados Unidos" },
  { codigo: "MXN", texto: "Peso Mexicano" },
  { codigo: "EUR", texto: "Euro" },
  { codigo: "GBP", texto: "Libra Esterlina" },
]);

const criptomonedas = ref([])
const error = ref('')
const cotizar = reactive({
  moneda: "",
  criptomoneda: "",
});
const cotizacion = ref({})

onMounted(() => {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
  fetch(url)
    .then((response) => response.json())
    .then(({ Data }) => {
      criptomonedas.value = Data;
    });
});
const obtenerCotizacion =  async () => {
  const { moneda, criptomoneda } = cotizar
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  console.log(url)

  const response = await fetch(url)
  const data = await response.json()
  console.log(data.DISPLAY[criptomoneda][moneda])
  cotizacion.value = data.DISPLAY[criptomoneda][moneda]
}

const cotizarCripto = () => {
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son obligatorios"
    return
  }
  error.value = ''
  obtenerCotizacion()
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
          <option v-for="moneda in monedas" :value="moneda.codigo">
            {{ moneda.texto }}
          </option>
        </select>
        <label for="cripto">Criptomoneda</label>
        <select v-model="cotizar.criptomoneda" id="cripto">
          <option value="">--- SELECCIONA ---</option>
          <option
            v-for="criptomoneda in criptomonedas"
            :value="criptomoneda.CoinInfo.Name"
          >
            {{ criptomoneda.CoinInfo.FullName }}
          </option>
        </select>

        <input type="submit" value="Cotizar" />
      </form>
    </div>
  </div>
</template>

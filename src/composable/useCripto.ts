import { ref, onMounted, computed } from "vue";
import { Cotizacion, Criptomoneda } from "../types";

export default function useCripto() {

    const monedas = ref([
        { codigo: "USD", texto: "Dolar de Estados Unidos" },
        { codigo: "MXN", texto: "Peso Mexicano" },
        { codigo: "EUR", texto: "Euro" },
        { codigo: "GBP", texto: "Libra Esterlina" },
    ]);

    const criptomonedas = ref([] as Criptomoneda[])

    onMounted(() => {
        const url =
            "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        fetch(url)
            .then((response) => response.json())
            .then(({ Data }) => {
                criptomonedas.value = Data;
            });
    });
    const cotizacion = ref({} as Cotizacion)
    const cargando = ref(false)

    const obtenerCotizacion = async (cotizar: { moneda: string; criptomoneda: string; }) => {
        cargando.value = true
        cotizacion.value = {} as Cotizacion
        const { moneda, criptomoneda } = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const response = await fetch(url)
        const data = await response.json()

        cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        cargando.value = false
    }
    
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })
    return {
        monedas,
        criptomonedas,
        cotizacion,
        cargando,
        obtenerCotizacion,
        mostrarResultado,
    }
}
<template>
  <div class="row">
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="card-category">Dispositivo</h5>
              <h2 class="card-title">Variable</h2>
            </div>
            <div class="col-sm-6 text-right">
              <button class="btn btn-primary" @click="downloadCSV">Descargar CSV</button>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <!-- Llamamos al componente line-chart y pasamos los datos y opciones adicionales -->
          <line-chart 
            style="height: 100%; width: 100%"
            ref="bigChart"
            :chart-data="purpleLineChart.chartData" 
            :extra-options="purpleLineChart.extraOptions"
          ></line-chart>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      variableName: 'Variable', // Nombre de la variable
      purpleLineChart: { // Configuración inicial del gráfico
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: [], // Inicialmente, sin etiquetas
          datasets: [{
            label: 'Data',
            fill: true,
            borderColor: config.colors.orange,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.while,
            pointBorderColor: config.colors.white,
            pointHoverBackgroundColor: config.colors.while,
            pointHoverBorderColor: config.colors.orange,
            pointRadius: 4,
            data: [] // Inicialmente, sin datos
          }]
        }
      }
    };
  },
  methods: {
    downloadCSV() {
      const csvContent = this.convertToCSV();
      const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "datos.csv");
      document.body.appendChild(link);
      link.click();
    },
    convertToCSV() {
      let csv = `Tiempo,${this.variableName}\n`; // Título de la columna de datos
      const labels = this.purpleLineChart.chartData.labels;
      const data = this.purpleLineChart.chartData.datasets[0].data;
      for (let i = 0; i < labels.length; i++) {
        csv += `${labels[i]},${data[i]}\n`;
      }
      return csv;
    }
  },
  mounted() {
    // Generar datos cada 2 segundos y actualizar el gráfico
    setInterval(() => {
      // Generar datos aleatorios para el eje y
      const randomData = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
      
      // Obtener la fecha y hora actual para el eje x
      const now = new Date();
      const time = now.toLocaleTimeString();

      // Agregar los nuevos datos al gráfico
      this.purpleLineChart.chartData.labels.push(time);
      this.purpleLineChart.chartData.datasets[0].data.push(randomData);

      // Ajustar el eje y al valor máximo de los datos generados
      const maxYValue = Math.max(...this.purpleLineChart.chartData.datasets[0].data);
      this.purpleLineChart.extraOptions.scales.yAxes[0].ticks.max = maxYValue;

      // Actualizar el gráfico
      this.$refs.bigChart.renderChart(this.purpleLineChart.chartData, this.purpleLineChart.extraOptions);
    }, 2000); // Actualizar cada 2 segundos
  }
};
</script>


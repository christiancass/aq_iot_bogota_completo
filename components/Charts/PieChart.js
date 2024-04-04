import { Pie, mixins } from 'vue-chartjs';

export default {
  name: 'pie-chart',
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object,
    backgroundColors: {
      type: Array,
      default: () => [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      validator: val => {
        return val.length > 0;
      }
    },
    borderColors: {
      type: Array,
      default: () => [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      validator: val => {
        return val.length > 0;
      }
    }
  },
  data() {
    return {
      ctx: null
    };
  },
  methods: {
    updateColors(chartData) {
      if (!chartData) return;
      chartData.datasets.forEach((set, index) => {
        if (!set.backgroundColor) {
          set.backgroundColor = this.backgroundColors.slice(0, set.data.length);
        }
        if (!set.borderColor) {
          set.borderColor = this.borderColors.slice(0, set.data.length);
        }
      });
    }
  },
  mounted() {
    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        this.updateColors(this.chartData);
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions);
        }
      },
      { immediate: true }
    );
  }
};

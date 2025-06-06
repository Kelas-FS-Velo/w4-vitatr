<template>
  <div class="mt-5">
    <p class="font-bold">Sales over time</p>
    <div class="mt-5 h-[300px] rounded-lg border bg-white dark:bg-zinc-900 md:p-3">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mode = useColorMode();

// Pakai warna hardcoded dari Tailwind docs (Tailwind Blue 500, Slate, dll)
const options = computed<ChartOptions<"line">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: mode.value === "dark" ? "#0f172a" : "#e2e8f0", // slate-900 / slate-200
      },
      ticks: {
        color: "#64748b", // slate-500
      },
    },
    x: {
      grid: {
        color: mode.value === "dark" ? "#1e293b" : "#e2e8f0", // slate-800 / slate-200
      },
      ticks: {
        color: "#64748b", // slate-500
      },
    },
  },
}));

const data = ref<ChartData<"line">>({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales over time",
      backgroundColor: "#ffffff", // Tailwind background (white)
      tension: 0.4,
      borderColor: "#3b82f6", // blue-500
      borderWidth: 2,
      pointBackgroundColor: "#3b82f6", // blue-500
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
});
</script>

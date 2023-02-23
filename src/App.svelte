<script lang="ts">
  import { onMount } from 'svelte';
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import LoadingSpinner from './lib/LoadingSpinner.svelte';
  import Chart from 'chart.js/auto';
  import { createTester } from './lib/index';

  let chart;
  let loading = true;
  const tester = createTester();
  let results = tester.run(10000, 25);
  const resultKeys = Object.keys(results);

  function handleClick() {
    if (loading) return;

    loading = true;
    setTimeout(() => {
      results = tester.run(10000, 25);
      chart.data.datasets[0].data = resultKeys.map(key => results[key].average);
      chart.update();
      loading = false;
    }, 50);
  }

  window.requestAnimationFrame(() => {
    const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;
  
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resultKeys,
        datasets: [{
          label: 'Average Time Elapsed',
          data: resultKeys.map(key => results[key].average),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  onMount(() => loading = false);
</script>

<AppBar/>
<main class="text-center p-4 pb-12 mx-0">
  <div class="min-h-24 flex flex-col items-center justify-center">
    <button
      class="w-48 bg-svelte-500 hover:bg-svelte-400 text-white font-bold py-2 px-4 border-b-4 border-svelte-700 hover:border-svelte-500 rounded"
      on:click={handleClick}
    >
      {#if loading}
      <LoadingSpinner />
      {:else}
      Run Test
      {/if}
    </button>
  </div>
  <div class="w-[800px] mx-auto">
    <canvas id="chart-canvas"></canvas>
  </div>
</main>
<Footer />

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
    --svelte-hex: #FF3E00;
  }
</style>
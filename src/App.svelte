<script lang="ts">
  import { onMount } from 'svelte';
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import LoadingSpinner from './lib/LoadingSpinner.svelte';
  import ResultsDisplay from './lib/ResultsDisplay.svelte';
  import Chart from 'chart.js/auto';
  import { createTester } from './lib/index';

  let chart;
  let loading = true;
  let iterations = 10000;
  let iterationLog = [];

  const tester = createTester();
  tester.setIterations(iterations);
  $: tester.setIterations(iterations);

  let results = {
    jsonSAP: [],
    structuredClone: [],
    recursivelyCloneObject: [],
  };
  const resultKeys = Object.keys(results);
  const resultsLog = [
    {
      label: resultKeys[0],
      data: results[resultKeys[0]]
    },
    {
      label: resultKeys[1],
      data: results[resultKeys[1]]
    },
    {
      label: resultKeys[2],
      data: results[resultKeys[2]]
    },
  ];

  function updateLog(newData) {
    resultsLog.forEach(entry => (entry.data = newData[entry.label].runs));
  }

  function handleClick() {
    if (loading) return;
    loading = true;

    iterationLog = [ ...iterationLog, iterations ];
    const newResults = tester.run();

    console.log({ newResults })

    updateLog(newResults);
    chart.data.datasets[0].data = [ ...resultsLog ];
    chart.update();

    loading = false;
  }

  const primary = (dark = '') => `rgba(255, 0, 0, ${dark ? 0.2 : 0.1})`;
  const secondary = (dark = '') => `rgba(255, 62, 0, ${dark ? 0.2 : 0.1})`;
  const tertiary = (dark = '') => `rgba(149, 53, 83, ${dark ? 0.2 : 0.1})`;

  window.requestAnimationFrame(() => {
    const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;
  
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resultKeys,
        datasets: [{
          label: 'Average Time Elapsed',
          data: resultsLog,
          backgroundColor: [primary(), secondary(), tertiary()],
          borderColor: [primary('dark'), secondary('dark'), tertiary('dark')],
          borderWidth: 2,
          hoverBackgroundColor: [primary('dark'), secondary('dark'), tertiary('dark')],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, ticks) {
                return value + 'ms';
              },
            },
          },
        },
      },
    });
  });

  onMount(() => loading = false);
</script>

<AppBar/>
<main class="text-center p-4 pb-12 mx-0">
  <div class="min-h-24 flex flex-col items-center justify-center">
    <label for="iterations" class="py-8">
      <div>
        Iterations:
      </div>
      <input
        type="number"
        name="iterations"
        id="iterations"
        class="border-2 border-gray-200 text-center"
        bind:value={iterations}
      />
    </label>
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
  <div class="w-[800px] mx-auto mt-12">
    <canvas id="chart-canvas"></canvas>
  </div>
  <ResultsDisplay results={resultsLog} iterations={iterationLog}/>
</main>
<Footer />

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
    --svelte-hex: #FF3E00;
  }
</style>
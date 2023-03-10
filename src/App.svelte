<script lang="ts">
  import { onMount } from 'svelte';
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import LoadingSpinner from './lib/LoadingSpinner.svelte';
  import ResultsDisplay from './lib/ResultsDisplay.svelte';
  import Chart from 'chart.js/auto';
  import { createTester } from './lib/index';
  import { getColor } from '$utils/misc';

  let chart;
  let loading = true;
  let iterations = 10000;
  let iterationLog = [];
  $: numberOfRuns = iterationLog.length;

  const tester = createTester();
  tester.setIterations(iterations);
  $: tester.setIterations(iterations);

  const resultKeys = [
    'jsonSAP',
    'structuredClone',
    'recursivelyCloneObject',
  ];
  let resultsLog = [];

  const createDataset = (data) => ({
    label: `Run #${numberOfRuns + 1}`,
    data,
    backgroundColor: getColor(numberOfRuns % 3),
    borderColor: getColor(numberOfRuns % 3, true),
    borderWidth: 2,
    hoverBackgroundColor: getColor(numberOfRuns % 3, true),
  });

  function updateData(newData) {
    const chartData = resultKeys.map(k => newData[k].runs[numberOfRuns]);
    const newDataset = createDataset(chartData);

    chart.data.datasets.push(newDataset);
    resultsLog = [ ...resultsLog, chartData ];
  }

  function updateDisplay(newResults) {
    iterationLog = [ ...iterationLog, iterations ];
    updateData(newResults);
    chart.update();
  }

  function runTest() {
    if (loading) return;

    loading = true;
    const newResults = tester.run();
    updateDisplay(newResults);
    loading = false;
  }

  window.requestAnimationFrame(() => {
    const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;
  
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resultKeys,
        datasets: [],
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
    <div>
      <button>
        
      </button>
      <button>

      </button>
      <button>

      </button>
    </div>
    <button
      class="w-48 bg-svelte-500 hover:bg-svelte-400 text-white font-bold py-2 px-4 border-b-4 border-svelte-700 hover:border-svelte-500 rounded"
      on:click={runTest}
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
  <ResultsDisplay headers={resultKeys} results={resultsLog} iterations={iterationLog}/>
</main>
<Footer />

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
    --svelte-hex: #FF3E00;
  }
</style>
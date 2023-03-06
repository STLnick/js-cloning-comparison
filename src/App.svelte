<script lang="ts">
  import { onMount } from 'svelte';
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import LoadingSpinner from './lib/LoadingSpinner.svelte';
  import ResultsDisplay from './lib/ResultsDisplay.svelte';
  import Chart from 'chart.js/auto';
  import { createTester } from './lib/index';
  
  const colorMap = {
    0: (dark: boolean) => `rgba(255, 0, 0, ${dark ? 0.2 : 0.1})`,
    1: (dark: boolean) => `rgba(255, 62, 0, ${dark ? 0.2 : 0.1})`,
    2: (dark: boolean) => `rgba(149, 53, 83, ${dark ? 0.2 : 0.1})`,
  };
  const getColor = (i: number, dark = false) => colorMap[i](dark);

  let chart;
  let loading = true;
  let iterations = 10000;
  let iterationLog = [];
  $: numberOfRuns = iterationLog.length;

  const tester = createTester();
  tester.setIterations(iterations);
  $: tester.setIterations(iterations);

  let results = {
    jsonSAP: [],
    structuredClone: [],
    recursivelyCloneObject: [],
  };
  const resultKeys = Object.keys(results);
  let resultsLog = [];

  function updateLog(newData) {
    const chartData = [];
    const lastIndex = numberOfRuns;

    resultKeys.forEach(key => {
      chartData.push(newData[key].runs[lastIndex]);
    });

    chart.data.datasets.push({
      label: `Run #${lastIndex + 1}`,
      data: chartData,
      backgroundColor: getColor(lastIndex % 3),
      borderColor: getColor(lastIndex % 3, true),
      borderWidth: 2,
      hoverBackgroundColor: getColor(lastIndex % 3, true),
    });
  }

  function updateDisplay(newResults) {
    iterationLog = [ ...iterationLog, iterations ];
    updateLog(newResults);

    chart.update();
  }

  function handleClick() {
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
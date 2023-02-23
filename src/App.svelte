<script lang="ts">
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import Chart from 'chart.js/auto';
  import { createTester } from './lib/index';

  let message = '(test not ran yet)';
  const tester = createTester();
  let runs = [];

  function handleClick() {
    const run = tester.run(10000);
    /**
     * Was trying to format the runs that get returned
     * in a way that was easier for me to loop for display.
     * 
     * Currenly storing with runId in an object but could
     * prolly just store as an array and loop on the
     * tester instead of having a second variable...
    */
    runs.push(run);
  }

  window.requestAnimationFrame(() => {
    const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
</script>

<AppBar/>
<main class="text-center p-4 mx-0">
  <div class="min-h-24 flex flex-col items-center justify-center">
    <button
      class="bg-svelte-500 hover:bg-svelte-400 text-white font-bold py-2 px-4 border-b-4 border-svelte-700 hover:border-svelte-500 rounded"
      on:click={handleClick}
    >
      Run Test
    </button>
    <div class="bg-slate-300 my-4">
      {#each runs as run}
        <div class="pa-4">{run}</div>
      {/each}  
    </div>
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
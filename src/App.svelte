<script lang="ts">
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import Chart from 'chart.js/auto';
  import { _main } from './lib/index';

  let message = '(test not ran yet)';

  function handleClick() {
    _main();

    message = 'Ran the test!';
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
  <div class="h-24 flex items-center justify-center">
    <button
      class="bg-svelte-500 hover:bg-svelte-400 text-white font-bold py-2 px-4 border-b-4 border-svelte-700 hover:border-svelte-500 rounded"
      on:click={handleClick}
    >
      Run Test
    </button>
    <div class="bg-slate-300">{message}</div>
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
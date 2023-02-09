<script lang="ts">
  import AppBar from './lib/AppBar.svelte';
  import Footer from './lib/Footer.svelte';
  import Chart from 'chart.js/auto';

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
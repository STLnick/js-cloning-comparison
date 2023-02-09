<script lang="ts">
  import logo from './assets/svelte.png'
  import AppBar from './lib/AppBar.svelte';
  import Counter from './lib/Counter.svelte'
  import Footer from './lib/Footer.svelte'
</script>

<AppBar/>
<main class="text-center p-4 mx-0">
  <img width="100" height="100" src={logo} alt="Svelte Logo" class="inline-block" />
  <h1 class="text-6xl uppercase font-thin leading-tight my-8 mx-auto max-w-xs sm:max-w-xs">Hello Vite!</h1>

  <Counter id="0" />

</main>
<Footer />

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
    --svelte-hex: #FF3E00;
  }

  h1 {
    color: rgb(var(--svelte-rgb));
  }
</style>
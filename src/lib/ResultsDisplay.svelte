<script lang="ts">
  import type { TestResults } from '$utils/interfaces';

  export let results: TestResults;
  export let iterations: any;

  $: arrayResults = Object.keys(results).map(key => ({ ...results[key], key}));
</script>

<div class="w-[800px] flex mx-auto mt-10 p-4 bg-gray-200">
    <div class="w-[10%] p-1">
      <h3 class="text-lg">Iterations</h3>
      {#each iterations as iterationCount}
        <div>
            {iterationCount}
        </div>
      {/each}
    </div>
    {#each arrayResults as result}
      <div class="w-[30%] p-1">
        <h3 class="text-lg font-bold">{result.key}</h3>
        {#each result.runs as run}
          <div>
              {run.toFixed(2)}
          </div>
        {/each}
      </div>
    {/each}
</div>
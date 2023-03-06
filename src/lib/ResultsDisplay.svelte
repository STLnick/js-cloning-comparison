<script lang="ts">
  import type { LogEntry } from '$utils/interfaces';
  import { formatNumber } from '$utils/misc';

  export let headers: string[];
  export let results: LogEntry[];
  export let iterations: number[];

  function isFastestTime(values, index) {
    const runValue = values[index];
    const testValues = [ 0, 1, 2 ].filter(i => i !== index);

    return testValues.every(i => runValue < values[i]);
  }


</script>

<div class="w-[800px] flex mx-auto mt-10 p-4 bg-gray-200">
    <div class="w-[15%]">
      <div class="p-1">
        <h3 class="text-lg">Iterations</h3>
      </div>
      {#each iterations as iterationCount}
        <div class="p-1 odd:bg-gray-300">
            {formatNumber(iterationCount)}
        </div>
      {/each}
    </div>
    <div class="w-[85%] min-h-[200px]">
      <div class="flex">
        {#each headers as header}
          <div class="w-[33.3%] p-1">
            <h3 class="text-lg font-bold">{header}</h3>
          </div>
        {/each}
      </div>
      {#each results as result}
        <div class="flex odd:bg-gray-300">
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result, 0)}>
                {`${result[0] && formatNumber(result[0].toFixed(2))}ms`}
              </div>
          </div>
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result, 1)}>
                {`${result[1] && formatNumber(result[1].toFixed(2))}ms`}
              </div>
          </div>
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result, 2)}>
                {`${result[2] && formatNumber(result[2].toFixed(2))}ms`}
              </div>
          </div>
        </div>
      {:else}
        <div class="h-[150px] flex justify-center">
          <span class="text-center text-xl my-auto">(No Runs Yet)</span>
        </div>
      {/each}
    </div>
</div>
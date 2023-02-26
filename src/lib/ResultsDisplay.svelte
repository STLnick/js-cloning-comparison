<script lang="ts">
  import type { TestResults } from '$utils/interfaces';

  export let results: TestResults;
  export let iterations: any;
  
  $: resultKeys = Object.keys(results);
  $: arrayResults = Object.keys(results).map(key => ({ ...results[key], key}));
  $: flattenedResults = (() => {
    let flatRuns = [];
    const runCount = iterations.length;

    for (let i = 0; i < runCount; i++) {
      flatRuns.push([
        getRunVal(0, i),
        getRunVal(1, i),
        getRunVal(2, i),
      ]);
    }

    return flatRuns;
  })();
  $: runIndices = iterations.reduce((indices: number[], _, i: number) => {
    indices.push(i);
    return indices;
  }, []);
  $: fastestTime = arrayResults.reduce((time, result) => {
    if (!result.runs) return null;

    result.runs.forEach((run, i) => {
      if (i === 0) time = run;
      if (run < time) time = run;
    });

    return time;
  }, 0);

  $: isFastestTime = (run) => {
    return run === fastestTime;
  }

  function getRunVal(keyIndex, runIndex) {
    return results[resultKeys[keyIndex]]?.runs[runIndex];
  }

  function shouldAddComma(index: number, length: number): boolean {
    return index + 1 !== length && (index + 1) % 3 === 0;
  }

  function formatNumber(num: number): string {
    const numStringArr = String(num).split('').reverse();
    const dotIndex = numStringArr.findIndex(c => c === '.');
    const decimal = dotIndex !== -1 ? `.${numStringArr.slice(0, dotIndex).reverse().join('')}` : '';
    const valueToFormat = dotIndex !== -1 ? numStringArr.slice(dotIndex + 1) : [ ...numStringArr ];
    const formatted = [];

    valueToFormat.forEach((num, i) => {
      formatted.push(num);
      if (shouldAddComma(i, valueToFormat.length)) {
        formatted.push(',');
      }
    });

    return `${formatted.reverse().join('')}${decimal}`;
  }
</script>

<div class="w-[800px] flex mx-auto mt-10 p-4 bg-gray-200">
    <div class="w-[15%]">
      <div class="p-1">
        <h3 class="text-lg">Iterations</h3>
      </div>
      {#each iterations as iterationCount}
        <div class="p-1">
            {formatNumber(iterationCount)}
        </div>
      {/each}
    </div>
    <div class="w-[85%]">
      <div class="flex">
        {#each resultKeys as resultKey}
          <div class="w-[33.3%] p-1">
            <h3 class="text-lg font-bold">{resultKey}</h3>
          </div>
        {/each}
      </div>
      {#each flattenedResults as result}
      <!-- {#each runIndices as index} -->
        <div class="flex">
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result[0])}>
                {`${result[0] && formatNumber(result[0].toFixed(2))}ms`}
              </div>
          </div>
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result[1])}>
                {`${result[1] && formatNumber(result[1].toFixed(2))}ms`}
              </div>
          </div>
          <div class="w-[33.3%] p-1">
              <div class:font-bold={isFastestTime(result[2])}>
                {`${result[2] && formatNumber(result[2].toFixed(2))}ms`}
              </div>
          </div>
        </div>
      {:else}
        <div>
          <span class="text-center">(No Runs Yet)</span>
        </div>
      {/each}
    </div>
</div>
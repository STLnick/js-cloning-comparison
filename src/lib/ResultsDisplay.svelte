<script lang="ts">
  import type { TestResults } from '$utils/interfaces';

  export let results: TestResults;
  export let iterations: any;

  $: arrayResults = Object.keys(results).map(key => ({ ...results[key], key}));

  function shouldAddComma(index: number, length: number): boolean {
    return index + 1 !== length && (index + 1) % 3 === 0;
  }

  function formatNumber(num: number): string {
    const numStringArr = String(num).split('').reverse();
    const dotIndex = numStringArr.findIndex(c => c === '.');
    const decimal = dotIndex !== -1 ? `.${numStringArr.slice(0, dotIndex).reverse().join('')}` : '';
    const valueToFormat = dotIndex !== -1 ? numStringArr.slice(dotIndex + 1) : [ ...numStringArr ];
    const formatted = [];
    
    console.log({ dotIndex, decimal: [ ...decimal ], valueToFormat: [ ...valueToFormat ] });

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
    <div class="w-[10%] p-1">
      <h3 class="text-lg">Iterations</h3>
      {#each iterations as iterationCount}
        <div>
            {formatNumber(iterationCount)}
        </div>
      {/each}
    </div>
    {#each arrayResults as result}
      <div class="w-[30%] p-1">
        <h3 class="text-lg font-bold">{result.key}</h3>
        {#each result.runs as run}
          <div>
              {`${formatNumber(run.toFixed(2))}ms`}
          </div>
        {/each}
      </div>
    {/each}
</div>
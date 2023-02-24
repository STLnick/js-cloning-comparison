[1mdiff --git a/src/App.svelte b/src/App.svelte[m
[1mindex f8a9d63..7e13aed 100644[m
[1m--- a/src/App.svelte[m
[1m+++ b/src/App.svelte[m
[36m@@ -9,7 +9,9 @@[m
   let chart;[m
   let loading = true;[m
   const tester = createTester();[m
[31m-  let results = tester.run(10000, 25);[m
[32m+[m[32m  let iterations = 10000;[m
[32m+[m[32m  $: tester.setIterations(iterations);[m
[32m+[m[32m  let results = tester.run();[m
   const resultKeys = Object.keys(results);[m
 [m
   function handleClick() {[m
[36m@@ -24,6 +26,12 @@[m
     }, 50);[m
   }[m
 [m
[32m+[m[32m  function handleIterationsInput(val) {[m
[32m+[m[32m    console.log({ val });//!LOG[m
[32m+[m
[32m+[m[32m    tester.setIterations(val);[m
[32m+[m[32m  }[m
[32m+[m
   window.requestAnimationFrame(() => {[m
     const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;[m
   [m
[36m@@ -35,15 +43,20 @@[m
           label: 'Average Time Elapsed',[m
           data: resultKeys.map(key => results[key].average),[m
           borderWidth: 1[m
[31m-        }][m
[32m+[m[32m        }],[m
       },[m
       options: {[m
         scales: {[m
           y: {[m
[31m-            beginAtZero: true[m
[31m-          }[m
[31m-        }[m
[31m-      }[m
[32m+[m[32m            beginAtZero: true,[m
[32m+[m[32m            ticks: {[m
[32m+[m[32m              callback: function(value, index, ticks) {[m
[32m+[m[32m                return value + 'ms';[m
[32m+[m[32m              },[m
[32m+[m[32m            },[m
[32m+[m[32m          },[m
[32m+[m[32m        },[m
[32m+[m[32m      },[m
     });[m
   });[m
 [m
[36m@@ -53,6 +66,19 @@[m
 <AppBar/>[m
 <main class="text-center p-4 pb-12 mx-0">[m
   <div class="min-h-24 flex flex-col items-center justify-center">[m
[32m+[m[32m    <!-- `iterations` input -->[m
[32m+[m[32m    <label for="iterations" class="py-8">[m
[32m+[m[32m      <div>[m
[32m+[m[32m        Iterations:[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <input[m
[32m+[m[32m        type="number"[m
[32m+[m[32m        name="iterations"[m
[32m+[m[32m        id="iterations"[m
[32m+[m[32m        class="border-2 border-gray-200"[m
[32m+[m[32m        bind:value={iterations}[m
[32m+[m[32m      />[m
[32m+[m[32m    </label>[m
     <button[m
       class="w-48 bg-svelte-500 hover:bg-svelte-400 text-white font-bold py-2 px-4 border-b-4 border-svelte-700 hover:border-svelte-500 rounded"[m
       on:click={handleClick}[m
[36m@@ -64,7 +90,7 @@[m
       {/if}[m
     </button>[m
   </div>[m
[31m-  <div class="w-[800px] mx-auto">[m
[32m+[m[32m  <div class="w-[800px] mx-auto mt-12">[m
     <canvas id="chart-canvas"></canvas>[m
   </div>[m
 </main>[m
[1mdiff --git a/src/lib/index.js b/src/lib/index.js[m
[1mdeleted file mode 100644[m
[1mindex cee22b4..0000000[m
[1m--- a/src/lib/index.js[m
[1m+++ /dev/null[m
[36m@@ -1,29 +0,0 @@[m
[31m-import { CloneTester } from "../utils/cloning";[m
[31m-[m
[31m-const TEST_OBJ = {[m
[31m-  name: "Nick Ray",[m
[31m-  occupation: "Software Engineer",[m
[31m-  hobbies: ["Woodworking", "Reading", "Playing Music", "Listening to Music"],[m
[31m-  relations: {[m
[31m-    fiance: "Courtney",[m
[31m-    mother: "Karen",[m
[31m-    father: "Steve",[m
[31m-    brother: "Steven",[m
[31m-    nested: {[m
[31m-      fiance: "Courtney",[m
[31m-      mother: "Karen",[m
[31m-      father: "Steve",[m
[31m-      brother: "Steven",[m
[31m-      nested: {[m
[31m-        fiance: "Courtney",[m
[31m-        mother: "Karen",[m
[31m-        father: "Steve",[m
[31m-        brother: "Steven",[m
[31m-      },[m
[31m-    },[m
[31m-  },[m
[31m-};[m
[31m-[m
[31m-export function createTester() {[m
[31m-  return new CloneTester(TEST_OBJ);[m
[31m-}[m
[1mdiff --git a/src/utils/cloning.ts b/src/utils/cloning.ts[m
[1mindex c74b66d..a0c071b 100644[m
[1m--- a/src/utils/cloning.ts[m
[1m+++ b/src/utils/cloning.ts[m
[36m@@ -45,14 +45,14 @@[m [mexport const recursivelyCloneObject = (obj: Object) => {[m
 };[m
 [m
 interface TestResult {[m
[31m-  runs: number[],[m
[31m-  readonly average: number,[m
[32m+[m[32m  runs: number[];[m
[32m+[m[32m  readonly average: number;[m
 }[m
 [m
 interface TestResults {[m
[31m-  jsonSAP: TestResult,[m
[31m-  structuredClone: TestResult,[m
[31m-  recursivelyCloneObject: TestResult,[m
[32m+[m[32m  jsonSAP: TestResult;[m
[32m+[m[32m  structuredClone: TestResult;[m
[32m+[m[32m  recursivelyCloneObject: TestResult;[m
 }[m
 [m
 export class CloneTester {[m
[36m@@ -73,19 +73,19 @@[m [mexport class CloneTester {[m
         runs: [],[m
         get average() {[m
           return calcAverage(this.runs);[m
[31m-        }[m
[32m+[m[32m        },[m
       },[m
       structuredClone: {[m
         runs: [],[m
         get average() {[m
           return calcAverage(this.runs);[m
[31m-        }[m
[32m+[m[32m        },[m
       },[m
       recursivelyCloneObject: {[m
         runs: [],[m
         get average() {[m
           return calcAverage(this.runs);[m
[31m-        }[m
[32m+[m[32m        },[m
       },[m
     };[m
 [m
[36m@@ -95,11 +95,15 @@[m [mexport class CloneTester {[m
     this.recursivelyCloneObject = recursivelyCloneObject;[m
   }[m
 [m
[32m+[m[32m  setIterations(val) {[m
[32m+[m[32m    this.iterations = val;[m
[32m+[m[32m  }[m
[32m+[m
   storeResults(testName: string) {[m
     const entries = performance.getEntriesByName(`measure-${testName}`);[m
 [m
     if (entries.length === 0) {[m
[31m-      this.results[testName].error = "Error in test results!";  [m
[32m+[m[32m      this.results[testName].error = "Error in test results!";[m
     } else {[m
       this.results[testName].runs.push(entries[this.runId].duration);[m
     }[m
[36m@@ -127,16 +131,11 @@[m [mexport class CloneTester {[m
   }[m
 [m
   /**[m
[31m-   * [m
[31m-   * @param {number} iterations the number of times within a run the cloning function will run[m
[31m-   * @param {number} runs the total number of times to run each method[m
[32m+[m[32m   *[m
    * @returns Results object containing data for each method's runs[m
    */[m
[31m-  run(iterations: number, runs: number) {[m
[31m-    this.iterations = iterations;[m
[31m-    for (let i = 0; i < runs; i++) {[m
[31m-      this.test();[m
[31m-    }[m
[32m+[m[32m  run() {[m
[32m+[m[32m    this.test();[m
     return this.results;[m
   }[m
 }[m

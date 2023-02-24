import type { TestResults } from "./interfaces";
import { calcAverage } from "./misc";

export const jsonSAP = (obj: any) => JSON.parse(JSON.stringify(obj));

export const structuredClone = (obj: any) => window.structuredClone(obj);

const isObject = (item: any) =>
  typeof item === "object" &&
  item !== null &&
  item !== undefined &&
  !Array.isArray(item);

const recursivelyCloneArray = (arr: any[]) => {
  return arr.slice(0).map((item) => {
    if (isObject(item)) {
      return recursivelyCloneObject(item);
    }

    if (Array.isArray(item)) {
      recursivelyCloneArray(item);
    }

    return item;
  });
};

export const recursivelyCloneObject = (obj: Object) => {
  const clonedObj = {};

  for (let key in obj) {
    if (isObject(obj[key])) {
      clonedObj[key] = recursivelyCloneObject(obj[key]);
      continue;
    }

    if (Array.isArray(obj[key])) {
      clonedObj[key] = recursivelyCloneArray(obj[key]);
      continue;
    }

    clonedObj[key] = obj[key];
  }

  return clonedObj;
};

export class CloneTester {
  iterations: number;
  obj: Object;
  results: TestResults;
  runId: number;
  jsonSAP: Function;
  structuredClone: Function;
  recursivelyCloneObject: Function;

  constructor(obj: Object) {
    this.obj = obj;

    this.runId = -1;
    this.results = {
      jsonSAP: {
        runs: [],
        get average() {
          return calcAverage(this.runs);
        },
      },
      structuredClone: {
        runs: [],
        get average() {
          return calcAverage(this.runs);
        },
      },
      recursivelyCloneObject: {
        runs: [],
        get average() {
          return calcAverage(this.runs);
        },
      },
    };

    // Cloning methods
    this.jsonSAP = jsonSAP;
    this.structuredClone = structuredClone;
    this.recursivelyCloneObject = recursivelyCloneObject;
  }

  setIterations(val) {
    this.iterations = val;
  }

  storeResults(testName: string) {
    const entries = performance.getEntriesByName(`measure-${testName}`);

    if (entries.length === 0) {
      this.results[testName].error = "Error in test results!";
    } else {
      this.results[testName].runs.push(entries[this.runId].duration);
    }
  }

  runSingleTest(testName: string) {
    performance.mark(`begin-${testName}`);
    for (let i = 0; i < this.iterations; i++) {
      this[testName](this.obj);
    }
    performance.mark(`end-${testName}`);
    performance.measure(
      `measure-${testName}`,
      `begin-${testName}`,
      `end-${testName}`
    );
    this.storeResults(testName);
  }

  test() {
    this.runId++;
    this.runSingleTest("jsonSAP");
    this.runSingleTest("structuredClone");
    this.runSingleTest("recursivelyCloneObject");
  }

  /**
   *
   * @returns Results object containing data for each method's runs
   */
  run() {
    this.test();
    return this.results;
  }
}

export const jsonSAP = (obj) => JSON.parse(JSON.stringify(obj));

export const structuredClone = (obj) => window.structuredClone(obj);

const isObject = (item) =>
  typeof item === "object" &&
  item !== null &&
  item !== undefined &&
  !Array.isArray(item);

const recursivelyCloneArray = (arr) => {
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

export const recursivelyCloneObject = (obj) => {
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
  constructor(obj) {
    this.obj = obj;

    this.runId = -1;
    this.runs = {};
    this.results = {};

    // Cloning methods
    this.jsonSAP = jsonSAP;
    this.structuredClone = structuredClone;
    this.recursivelyCloneObject = recursivelyCloneObject;
  }

  get currentRun() {
    return this.runs[this.runId];
  }

  storeResults(testName) {
    const entries = performance.getEntriesByName(`measure-${testName}`);

    this.results[testName] =
      entries.length === 0
        ? "Error in test results!"
        : entries[this.runId].duration;
  }

  runSingleTest(testName) {
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
    console.log("...Testing...");

    this.runSingleTest("jsonSAP");
    this.runSingleTest("structuredClone");
    this.runSingleTest("recursivelyCloneObject");

    this.runs[this.runId] = { ...this.results };

    console.log({ results: this.results });
    console.log("Testing finished!");
  }

  show() {
    // Display Results
    console.log("[SHOW RESULTS]");
  }

  run(iterations) {
    this.iterations = iterations;
    this.test();
    this.show();
    return this.results;
  }
}

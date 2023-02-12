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

    // Cloning methods
    this.jsonSAP = jsonSAP;
    this.structuredClone = structuredClone;
    this.recursivelyCloneObject = recursivelyCloneObject;
  }

  test() {
    console.log("...Testing...");
    // Run jsonSAP
    // Track data

    // Run structuredClone
    // Track data

    // Run recursivelyCloneObject
    // Track data
  }

  show() {
    // Display Results
    console.log("[SHOW RESULTS]");
  }

  run() {
    this.test();
    this.show();
  }
}

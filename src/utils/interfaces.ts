export interface TestResult {
  runs: number[];
  readonly average: number;
}

export interface TestResults {
  jsonSAP: TestResult;
  structuredClone: TestResult;
  recursivelyCloneObject: TestResult;
}

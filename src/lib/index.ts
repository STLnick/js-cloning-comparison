import { CloneTester } from "../utils/cloning";

const TEST_OBJ = {
  name: "Nick Ray",
  occupation: "Software Engineer",
  hobbies: ["Woodworking", "Reading", "Playing Music", "Listening to Music"],
  relations: {
    fiance: "Courtney",
    mother: "Karen",
    father: "Steve",
    brother: "Steven",
    nested: {
      fiance: "Courtney",
      mother: "Karen",
      father: "Steve",
      brother: "Steven",
      nested: {
        fiance: "Courtney",
        mother: "Karen",
        father: "Steve",
        brother: "Steven",
      },
    },
  },
};

export function createTester() {
  return new CloneTester(TEST_OBJ);
}

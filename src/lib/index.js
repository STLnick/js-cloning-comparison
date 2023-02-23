import { CloneTester } from "../utils/cloning";

export function createTester() {
  const testObj = {
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

  return new CloneTester(testObj);
}

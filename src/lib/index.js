import { CloneTester } from "../utils/cloning";

export function _main() {
  const testObj = {
    name: "Nick Ray",
    occupation: "Software Engineer",
    hobbies: ["Woodworking", "Reading", "Playing Music", "Listening to Music"],
    relations: {
      fiance: "Courtney",
      mother: "Karen",
      father: "Steve",
      brother: "Steven",
    },
  };

  //   const tester = new CloneTester(testObj);
  //   tester.run();
  console.log("- - - - - - - Test Ending - - - - - - -");
}

import { findOverallAverage } from "../src/functions";
import Assignment from "../src/models/Assignment";

describe("findOverallAverage function", () => {
  test("test with empty array", () => {
    const emptyArray: Assignment[] = [];
    expect(findOverallAverage(emptyArray)).toBe(0);
  });
  test("test with array of completed assignments", () => {
    const testArray = [
      { name: "assignment1", score: 8, total: 10, completed: true },
      { name: "assignment2", score: 7, total: 10, completed: true },
      { name: "assignment3", score: 10, total: 10, completed: true },
      { name: "assignment3", score: 6, total: 10, completed: true },
    ];
    expect(findOverallAverage(testArray)).toBe(77.5);
  });
  test("test with array of completed and not completed assignments", () => {
    const testArray = [
      { name: "assignment1", score: 8, total: 10, completed: true },
      { name: "assignment2", score: 7, total: 10, completed: false },
      { name: "assignment3", score: 10, total: 10, completed: true },
      { name: "assignment3", score: 6, total: 10, completed: false },
    ];
    expect(findOverallAverage(testArray)).toBe(90);
  });
});

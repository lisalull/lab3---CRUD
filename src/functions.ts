import Assignment from "./models/Assignment";

export const findOverallAverage = (array: Assignment[]): number => {
  let scoreSum: number = 0;
  let totalSum: number = 0;
  array.forEach((assignment) => {
    if (assignment.completed) {
      scoreSum += assignment.score;
      totalSum += assignment.total;
    }
  });
  if (totalSum !== 0) {
    return (scoreSum / totalSum) * 100;
  } else {
    return 0;
  }
};

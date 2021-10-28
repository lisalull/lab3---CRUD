// require the express module
import express from "express";
import { findOverallAverage } from "../functions";
import Assignment from "../models/Assignment";

// create a new Router object
const assignmentRouter = express.Router();

export default assignmentRouter;

const assignments: Assignment[] = [
  {
    name: "Walrus Worksheet",
    score: 9,
    total: 10,
    completed: true,
    id: 1,
  },
  {
    name: "Jellyfish Project",
    score: 15,
    total: 15,
    completed: true,
    id: 2,
  },
  {
    name: "Dolphin Quiz",
    score: 8,
    total: 10,
    completed: true,
    id: 3,
  },
  {
    name: "Oceans Unit Test",
    score: 0,
    total: 25,
    completed: false,
    id: 4,
  },
];

let nextId: number = 5;

assignmentRouter.get("/", (req, res) => {
  let overallAverage: number = findOverallAverage(assignments);
  const displayAverage: string = overallAverage.toFixed(1);
  res.render("homepage", { assignments, displayAverage });
});

assignmentRouter.get("/assignments/add", (req, res) => {
  res.render("add-assignment");
});

assignmentRouter.post("/assignments/add-confirmation", (req, res) => {
  let { name, score, total, completed } = req.body;
  if (completed === "on") {
    completed = "Yes";
  } else {
    completed = "No";
  }
  const newAssigment: Assignment = {
    name,
    score,
    total,
    completed,
    id: nextId++,
  };
  assignments.push(newAssigment);
  res.render("add-confirmation", newAssigment);
});

assignmentRouter.get("/assignments/:id/confirm-delete", (req, res) => {
  const id: number = parseInt(req.params.id);
  const deleteAssignment = assignments.find((item) => item.id === id);
  res.render("confirm-delete", deleteAssignment);
});

assignmentRouter.get("/assignments/:id/delete", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index = assignments.findIndex((item) => item.id === id);
  const deletedAssignment: Assignment = assignments[index];
  assignments.splice(index, 1);
  res.render("delete-confirmation", deletedAssignment);
});

assignmentRouter.get("/assignments/:id/edit", (req, res) => {
  const id: number = parseInt(req.params.id);
  let updateAssignment: Assignment | undefined = assignments.find(
    (item) => item.id === id
  );
  if (updateAssignment) {
    updateAssignment.id = id;
    res.render("edit-assignment", updateAssignment);
  }
});

assignmentRouter.post("/assignments/:id/edit-confirmation", (req, res) => {
  const updatedAssignment: Assignment = req.body;
  const id: number = parseInt(req.params.id);
  updatedAssignment.id = id;
  const index = assignments.findIndex((item) => item.id === id);
  assignments[index] = updatedAssignment;
  res.render("edit-confirmation", updatedAssignment);
});

assignmentRouter.get("/api/assignments", (req, res) => {
  res.json(assignments);
  res.status(200);
});

assignmentRouter.get("/api/summary", (req, res) => {
  let overallAverage: number = findOverallAverage(assignments);
  res.json({ overallAverage, assignments });
  res.status(200);
});

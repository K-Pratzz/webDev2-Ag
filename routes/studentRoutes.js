const express = require('express');
const router = express.Router();
let students = require('../data/students');

router.get('/', (req, res) => {
  res.status(200).json(students);
});


router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ error: "Name, age, and grade are required" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    grade
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { name, age, grade } = req.body;

  if (name) student.name = name;
  if (age) student.age = age;
  if (grade) student.grade = grade;

  res.status(200).json(student);
});

router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res.status(200).json({ 
    message: "Student deleted successfully", 
    student: deletedStudent[0] 
  });
});

module.exports = router;
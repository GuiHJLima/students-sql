import { hash } from "bcrypt";

import Student from "../models/students/Student.js";
import StudentsRepository from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
 try {
  const students = await studentsRepository.getStudents();
  if (students.length) {
    return res.status(200).json(students);
  }
  return res.status(200).json({ message: "Não há estudantes cadastrados" });
 } catch (error) {
  return res.status(500).json({ message: "Erro ao buscar estudantes", error: error.message });
 }
};

export const getStudentById = async (req, res) => {
try {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  return res.send(student);
} catch (error) {
  return res.status(500).send({ message: "Erro ao buscar estudante", error: error.message });
}
};

export const createStudent = async (req, res) => {
try {
  const { name, age, email, code, grade } = req.body;
  const studentEmailAlreadyExists = await studentsRepository.getStudentByEmail(email);
  const studentCodeAlreadyExists = await studentsRepository.getStudentByCode(code);

  if (studentEmailAlreadyExists) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  if (studentCodeAlreadyExists) {
    return res.status(409).send({ message: "Código já cadastrado" });
  }

  const codeHash = await hash(code, 8);

  const student = new Student(name, age, email, codeHash, grade);

  await studentsRepository.addStudent(student);

  return res.status(201).send({ message: "Estudante criado com sucesso", student });
} catch (error) {
  return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
}
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
  const { name, age, email, code, grade } = req.body;

  const studentById = await studentsRepository.getStudentById(id);
  const studentByEmail = await studentsRepository.getStudentByEmail(email);
  const studentByCode = await studentsRepository.getStudentByCode(code);

  if (!studentById) {
    return res.status(404).send({ message: "Estudante não encontrado" });
  }

  if (studentByEmail && studentByEmail.id !== id) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  if (studentByCode && studentByCode.id !== id) {
    return res.status(409).send({ message: "Código já cadastrado" });
  }

  const student = await studentsRepository.updateStudent(id, name, age, email, code, grade);

  return res.status(200).send({ message: "Estudante atualizado com sucesso", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar estudante", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
try {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  await studentsRepository.deleteStudent(id);

  return res.status(200).send({ message: "Estudante deletado com sucesso!" });
} catch (error) {
  return res.status(500).send({ message: "Erro ao deletar estudante", error: error.message });
}
};

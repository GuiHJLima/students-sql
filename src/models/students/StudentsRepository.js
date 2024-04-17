import db from "../../database/index.js";

export default class StudentsRepository {
  constructor() {
    this.db = db;
  }

  async getStudents() {
    try {
      const allStudents = await this.db.query("SELECT * FROM students");

      return allStudents;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.db.oneOrNone(
        "SELECT * FROM students WHERE id = $1",
        id
      );

      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudenByEmail(email) {
    try {
      const student = await this.db.oneOrNone(
        "SELECT * FROM students WHERE email = $1",
        email
      );

      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByCode(code) {
    try {
      const student = await this.db.oneOrNone(
        "SELECT * FROM students WHERE code = $1",
        code
      );

      return student;
    } catch (error) {
      throw error;
    }
  }

  async addStudent(student) {
    try {
      await this.db.none(
        "INSERT INTO students (id, name, age) VALUES ($1, $2, $3)",
        [student.id, student.name, student.age, student.email, student.code, student.grade]
      );
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
      const updatedStudent = await this.db.one(
        "UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *",
        [name, age, id, email, code, grade]
      );

      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      const student = await this.db.none(
        "DELETE FROM students WHERE id = $1 RETURNING *",
        id
      );

      return student;
    } catch (error) {
      throw error;
    }
  }
}

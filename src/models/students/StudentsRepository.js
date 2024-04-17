import db from "../../database/index.js";

export default class StudentsRepository {
  constructor() {
    this.db = db;
  }

  async getStudents() {
    try {
      const allStudents = await this.db.query("SELECT * FROM student");

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

  async getStudentByEmail(email) {
    try {
      const student = await this.db.oneOrNone(
        "SELECT * FROM student WHERE email = $1",
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
        "SELECT * FROM student WHERE code = $1",
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
        "INSERT INTO student (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)",
        [student.id, student.name, student.age, student.email, student.code, student.grade]
      );
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
      const updatedStudent = await this.db.one(
        "UPDATE student SET name = $1, age = $2, email = $4, code = $5, grade = $6 WHERE id = $3 RETURNING *",
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
        "DELETE FROM student WHERE id = $1 RETURNING *",
        id
      );

      return student;
    } catch (error) {
      throw error;
    }
  }
}

import db from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    try {
      const allUsers = await this.db.query("SELECT * FROM users");

      return allUsers;
    } catch (error) {
      // console.error("Error on getUsers: ", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.db.oneOrNone("SELECT * FROM users WHERE id = $1",
        id
      );

      return user;
    } catch (error) {
      // console.error("Error on getUserById: ", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.db.oneOrNone("SELECT * FROM users WHERE email = $1",
        email
      );

      return user;
    } catch (error) {
      // console.error("Error on getUserByEmail: ", error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      await this.db.none(
        "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
        [user.id, user.name, user.email, user.password]
      );
    } catch (error) {
      // console.error("Error on createUser: ", error);
      throw error;
    }
  }

  async updateUser(id, name, email, password) {
    try {
      const updateUser = await this.db.one(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [name, email, password, id]
      );

      return updateUser;
    } catch (error) {
      // console.error("Error on updateUser: ", error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await this.db.none("DELETE FROM users WHERE id = $1", id);
    } catch (error) {
      // console.error("Error on deleteUser: ", error);
      throw error;
    }
  }
}

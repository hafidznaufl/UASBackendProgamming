// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  // buat fungsi
  static async all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  static async find(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";

      db.query(query, id, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const query = `INSERT INTO patients SET ?`;

      db.query(query, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE id = ?`;

      db.query(query, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const query = "UPDATE patients SET ? WHERE id = ?";

      db.query(query, [data, id], (err, results) => {
        resolve(results);
      });
    });

    const patient = await this.find(id);
    return patient;
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM students WHERE id = ?";

      db.query(query, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static async search(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE name = ?`;

      db.query(query, name, (err, results) => {
        resolve(results);
      });
    });
  }

  static async findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE status = ?`;

      db.query(query, status, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Patient
module.exports = Patient;

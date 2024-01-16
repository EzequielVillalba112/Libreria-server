import mysql from "mysql";

const db = mysql.createConnection({
  /*/Local
  host: "localhost",
  user: "root",
  password: "",
  database: "biblioteca",*/

  //Clever cloud
  host: "b72ansxla5bze8snktvc-mysql.services.clever-cloud.com",
  user: "ucbrluvagkiy2cvy",
  password: "1syVWOm1IDzJtUrYQZux",
  database: "b72ansxla5bze8snktvc",
});

export class BookModel {
  static getAll(res) {
    const query = "SELECT * FROM libros";

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static searchBook(name, res) {
    const query = `SELECT id_libro,titulo,portada,rate FROM libros WHERE titulo LIKE '%${name}%' LIMIT 10`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static searchBookById(id, res) {
    const query = `SELECT * FROM libros WHERE id_libro=${id}`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static popularBook(res) {
    const rate = [5, 4];
    const query = `SELECT * FROM libros WHERE rate = ${rate[0]} OR rate = ${rate[1]} LIMIT 6`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static getAllGenres(res) {
    const query = `SELECT * FROM genero`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static bookCategory(idCategory, res) {
    const query = `SELECT id_libro,titulo,portada,rate,author 
                    FROM libros 
                    WHERE id_libro 
                    IN (SELECT id_libro FROM genero_libro 
                      WHERE id_genero = ${idCategory})`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  static login(sentLoginEmail, sentLoginPassword, res) {
    const values = [sentLoginEmail, sentLoginPassword];
    const query = `SELECT id_User,nombre FROM user WHERE correo = ? && password = ?`;

    db.query(query, values, (err, result) => {
      if (err) {
        res.send({ error: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Credencial invalida" });
      }
    });
  }

  static favoritesBookUser(idUser, res) {
    const query = `SELECT id_libro,titulo,portada,rate,author 
                    FROM libros 
                    WHERE id_libro 
                    IN (SELECT id_libro FROM favoritos 
                      WHERE id_User = ${idUser})`;

    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
}

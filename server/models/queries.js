//Checking if email exists in users schema
const checkUserMail = (mail, con) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM users_details WHERE email = ?`,
      mail,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (result.length > 0) {
          console.log('Email found!!');
          resolve(true);
        } else {
          console.log('Email not found');
          resolve(false);
        }
      }
    );
  });
};

//Checking if email exists in clients schema
const checkClientMail = (mail, con) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM clients WHERE email = ?`, mail, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else if (result.length > 0) {
        console.log('Email found!!');
        resolve(true);
      } else {
        console.log('Email not found');
        resolve(false);
      }
    });
  });
};

//Checking if the user exists by his email and password
const checkUserExists = async (mail, password, con) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM users_details WHERE email = ? and password = ?`,
      [mail, password],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          console.log(result);
          resolve(true);
        }
      }
    );
  });
};

//Inserting the client into the database
const insertClient = async (
  email,
  first_name,
  last_name,
  phone_number,
  city,
  con
) => {
  const queryUsers = `INSERT INTO clients (email,first_name,last_name,phone_number,city) VALUES (?, ?, ?, ?, ?)`;
  const emailExists = await checkClientMail(email, con);

  return new Promise((resolve, reject) => {
    if (emailExists) {
      console.log('The client already exists');
      resolve(false);
    } else {
      con.query(
        queryUsers,
        [email, first_name, last_name, phone_number, city],
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('Inserted succesfully');
            resolve(true);
          }
        }
      );
    }
  });
};

//Check if client exists
const checkClient = async (first_name, last_name, city, phone_number, con) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM clients WHERE first_name = ? and last_name = ? and city = ? and phone_number = ?`,
      [first_name, last_name, city, phone_number],
      (error) => {
        if (error) reject(error);
        else resolve(true);
      }
    );
  });
};

//Returns all clients
const getAllClients = async (con) => {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM clients', (error, results) => {
      if (error) {
        console.error(error);
        reject(false);
      } else {
        console.log(results);
        resolve(true);
      }
    });
  });
};

//Removing the client from the database
const removeClient = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  con
) => {
  return new Promise(async (resolve, reject) => {
    const checkMail = await checkClientMail(email, con);
    if (!checkMail) {
      console.log('The client is not found');
      resolve(false);
    } else {
      con.query(
        'DELETE FROM clients WHERE first_name = ? AND last_name = ? AND email = ? AND phone_number = ? AND city = ?',
        [first_name, last_name, email, phone_number, city],
        (error, result) => {
          if (error) reject(error);
          else {
            if (result.affectedRows === 0) {
              console.log('Client is not removed due to something unexpected');
              resolve(false);
            } else {
              console.log('Client removed successfully!');
              resolve(true);
            }
          }
        }
      );
    }
  });
};

//Removing the user from the database
const removeUser = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  con
) => {
  return new Promise((resolve, reject) => {
    con.query(
      `DELETE FROM clients WHERE first_name = ? and last_name = ? and email = ? and phone_number= ? and city = ?`,
      [first_name, last_name, email, phone_number, city],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      }
    );
  });
};

//Inserting the user into the database
const insertUser = async (
  email,
  first_name,
  last_name,
  phone_number,
  password,
  con
) => {
  const query_users = `INSERT INTO users_details (email,first_name,last_name,phone_number,password) VALUES (?, ?, ?, ?, ?)`;
  const emailExists = await checkUserMail(email, con);

  return new Promise((resolve, reject) => {
    if (emailExists) {
      console.log('The client already exists');
      resolve(false);
    }

    con.query(
      query_users,
      [email, first_name, last_name, phone_number, password],
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('Inserted succesfully');
          resolve(true);
        }
      }
    );
  });
};

//Checking if the password is in the password history already
const checkPasswordInHistory = (email, password, con) => {
  return new Promise((resolve, reject) => {
    const q = `SELECT * FROM password_history WHERE email = ? AND password = ?`;

    con.query(q, [email, password], (err) => {
      if (err) reject(err);
      else {
        console.log('User did not use this password!');
        resolve(true);
      }
    });
  });
};

//Updating the password
const updatePassword = async (email, old_password, new_password, con) => {
  return new Promise(async (resolve, reject) => {
    const userExists = await checkUserExists(email, old_password);
    if (userExists) {
      const check = checkPasswordInHistory(email, new_password);
      if (!check) {
        console.log('Please use a password you never used!');
        resolve(false);
      } else {
        con.query(
          'UPDATE users_details SET password = ? WHERE email = ? AND password = ?',
          [new_password, email, old_password],
          (err) => {
            if (err) {
              console.log('Error could not update password!');
              reject(err);
            } else {
              console.log('Updated the password!');
              resolve(true);
            }
          }
        );
      }
    } else {
      console.log('The user does not exist!');
      resolve(false);
    }
  });
};

//Sort client table by specific column
const sortBy = async (column_name, con) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM clients ORDER BY '${column_name}' ASC`,
      (error) => {
        if (error) reject(false);
        else {
          console.log('Successfully sorted!');
          resolve(true);
        }
      }
    );
  });
};

//Exporting all the queries in order to use them
module.exports = {
  insertUser,
  removeUser,
  removeClient,
  getAllClients,
  checkClient,
  insertClient,
  checkUserExists,
  checkUserMail,
  updatePassword,
  sortBy,
  checkClientMail,
};

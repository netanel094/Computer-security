const con = require('./connection_create');

// const data = {
//   first_name: 'nati',
//   email: 'nati@gmail.com',
//   last_name: 'yomtobian',
//   phone_number: '2353523',
//   city: 'rahlatz',
// };

// con.connectionPromise.query('INSERT INTO clients SET ?', [data], (error) => {
//   if (error) throw error;
//   console.log('Data inserted successfully!');
// });

//Checking if email exists for (forgot password)
const checkMail = async (mail) => {
  const checkUser = con.connectionPromise.query(
    `SELECT * FROM users_details WHERE email = '${mail}'`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email found!!');
      }
    }
  );
};

//checkMail('shon@gmail.com');

//Checking if the user exists by his email and password
const checkUserExists = async (mail, password) => {
  return new Promise((resolve, reject) => {
    con.connectionPromise.query(
      `SELECT * FROM users_details WHERE email = '${mail}' and password = '${password}'`,
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

//checkUserExists('netanel@gmail.com', 'bfhmdbfbeh');

const insertClient = async (
  email,
  first_name,
  last_name,
  phone_number,
  city
) => {
  const query_users = `INSERT INTO clients (email,first_name,last_name,phone_number,city) VALUES (?, ?, ?, ?, ?)`;
  const emailExists = await checkMail(email);

  return new Promise((resolve, reject) => {
    if (emailExists) {
      console.log('The client already exists');
      resolve(false);
    }

    con.connectionPromise.query(
      query_users,
      [email, first_name, last_name, phone_number, city],
      (err) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          console.log('Inserted succesfully');
          resolve(true);
        }
      }
    );
  });
};

// insertClient(
//   'nati2@gmail.com',
//   'Shon2',
//   'Khundiashvili2',
//   '0545647365',
//   'Bat-Yam2'
// );

// search user
const checkClient = async (first_name, last_name, city, phone_number) => {
  con.connectionPromise.query(
    `SELECT * FROM clients WHERE first_name = '${first_name}' and last_name = '${last_name}' and city = '${city}' and phone_number = '${phone_number}'`,
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );
};

// checkClient('Shon', 'Khundiashvili', 'Bat-Yam', '0545647365');

const getAllClients = async () => {
  con.connectionPromise.query('SELECT * FROM clients', (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
    }
  });
};

// getAllClients();

const remove_client = async (
  first_name,
  last_name,
  email,
  phone_number,
  city
) => {
  con.connectionPromise.query(
    `DELETE FROM clients WHERE first_name = '${first_name}' and last_name = '${last_name}' and email = '${email}' and phone_number='${phone_number}' and city = '${city}'`,
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    }
  );
};

// remove_client(
//   'Shon',
//   'Khundiashvili',
//   'nati@gmail.com',
//   '0545647365',
//   'Bat-Yam'
// );

// todo
const remove_user = async (
  first_name,
  last_name,
  email,
  phone_number,
  city
) => {
  con.connectionPromise.query(
    `DELETE FROM clients WHERE first_name = '${first_name}' and last_name = '${last_name}' and email = '${email}' and phone_number='${phone_number}' and city = '${city}'`,
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    }
  );
};

const insertUser = async (
  email,
  first_name,
  last_name,
  phone_number,
  password
) => {
  const query_users = `INSERT INTO users_details (email,first_name,last_name,phone_number,password) VALUES (?, ?, ?, ?, ?)`;
  const emailExists = await checkMail(email);

  return new Promise((resolve, reject) => {
    if (emailExists) {
      console.log('The client already exists');
      resolve(false);
    }

    con.connectionPromise.query(
      query_users,
      [email, first_name, last_name, phone_number, password],
      (err) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          console.log('Inserted succesfully');
          resolve(true);
        }
      }
    );
  });
};

//insertUser('shon@gmail.com', 'shon', 'khu', '2134214', 'bfhmdbfbeh');
const checkPasswordInHistory = (email, password) => {
  const q = `SELECT * FROM password_history WHERE email = ${email} AND password = ${password}`;

  con.connectionPromise.query(q, (err, result) => {
    if (err) {
      console.log('User used this password already');
      return false;
    } else {
      console.log('User did not use this password already');
      return true;
    }
  });
};

const updatePassword = async (email, old_password, new_password) => {
  const userExists = await checkUserExists(email, old_password);
  if (userExists) {
    const check = checkPasswordInHistory(email, new_password);
    if (!check) {
      console.log('Please use a password you never used!');
      return;
    } else {
      con.connectionPromise.query(
        'UPDATE users_details SET password = ? WHERE email = ? AND password = ?',
        [new_password, email, old_password],
        (err, res) => {
          if (err) {
            console.log('Error could not update password!');
            throw err;
          } else {
            console.log('Updated the password!');
            console.log(res);
          }
        }
      );
    }
  } else {
    console.log('The user does not exist!');
    return;
  }
};

//updatePassword('shon@gmail.com', 'wdvdwgw', 'aaa');

// sort client table by specific column
const sort_by = async (column_name) => {
  con.connectionPromise.query(
    `SELECT * FROM clients ORDER BY '${column_name}' ASC`,
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Successfully sorted!');
        return results;
      }
    }
  );
};

module.exports = {
  insertUser,
  remove_user,
  remove_client,
  getAllClients,
  checkClient,
  insertClient,
  checkUserExists,
  checkMail,
  updatePassword,
  sort_by,
};

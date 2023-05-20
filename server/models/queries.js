const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

//Checking if email exists in users schema
const checkUserMail = (mail, con) => {
  return new Promise(async (resolve, reject) => {
    con.query(
      `SELECT * FROM users_details WHERE email = '${mail}'`,
      (err, result) => {
        if (err) return reject(err);
        if (result.length > 0) {
          console.log('Email found!!');
          return resolve(true);
        }
        console.log('Email not found');
        return resolve(false);
      }
    );
  });
};

//Checking if email exists in clients schema
const checkClientMail = (mail, con) => {
  return new Promise(async (resolve, reject) => {
    con.query(
      `SELECT * FROM clients WHERE email = '${mail}'`,
      (err, result) => {
        if (err) return reject(err);
        if (result.length > 0) {
          console.log('Email found!!');
          return resolve(true);
        }
        console.log('Email not found');
        return resolve(false);
      }
    );
  });
};

//Checking if the user exists by his email and password
const checkUserExists = async (email, con) => {
  return new Promise(async (resolve, reject) => {
    con.query(
      `SELECT * FROM users_details WHERE email = '${email}'`,
      (err, result) => {
        if (err) return reject(err);
        if (result.length === 0) return resolve(false);
        return resolve(true);
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
  const queryUsers = `INSERT INTO clients (email,first_name,last_name,phone_number,city) VALUES ('${email}', '${first_name}', '${last_name}', '${phone_number}', '${city}')`;
  const emailExists = await checkClientMail(email, con);

  return new Promise((resolve, reject) => {
    if (emailExists) {
      console.log('The client already exists');
      return resolve(false);
    }
    con.query(queryUsers, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('Inserted succesfully');
      return resolve(true);
    });
  });
};

//Check if client exists
const checkClient = async (first_name, last_name, city, phone_number, con) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM clients WHERE first_name = '${first_name}' and last_name = '${last_name}' and city = '${city}' and phone_number = '${phone_number}'`,
      (error) => {
        if (error) return reject(error);
        return resolve(true);
      }
    );
  });
};

//Removing the client from the database
const removeClient = async (email, con) => {
  return new Promise(async (resolve, reject) => {
    const checkMail = await checkClientMail(email, con);
    const q = `DELETE FROM clients WHERE email = '${email}'`;
    if (!checkMail) {
      console.log('The client is not found');
      return resolve(false);
    }
    con.query(q, (err, res) => {
      if (err) return reject(err);

      if (res.affectedRows === 0) {
        console.log('Client is not removed due to something unexpected');
        return resolve(false);
      }
      console.log('Client removed successfully!');
      return resolve(true);
    });
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
    const q = `DELETE FROM clients WHERE first_name = '${first_name}' and last_name = '${last_name}' and email = '${email}' and phone_number = '${phone_number}' and city = '${city}'`;
    con.query(q, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
};

const deleteOldPasswordHistory = async (email, con) => {
  return new Promise(async (resolve, reject) => {
    const removeOldPassword = `
    DELETE FROM password_history
    WHERE email = '${email}' AND creation_date = (
      SELECT MIN(creation_date)
      FROM (
        SELECT creation_date
        FROM password_history
        WHERE email = '${email}'
        ORDER BY creation_date ASC
        LIMIT 1
      ) AS t
    )
    `;

    con.query(removeOldPassword, (err) => {
      if (err) {
        console.log('Error removing oldest password!');
        return reject(err);
      }
      console.log('Removed oldest password successfully');
      return resolve(true);
    });
  });
};

const countPasswordInHistory = async (email, con) => {
  const countPassword = `SELECT COUNT(email) as count_mail FROM password_history where email = '${email}'`;
  return new Promise(async (resolve, reject) => {
    con.query(countPassword, (err, res) => {
      if (err) return reject(err);

      if (res[0]['count_mail'] > config.password_history) return resolve(true);
      return resolve(false);
    });
  });
};

//Inserting the password of the user to password history
const insertPasswordHistory = async (email, password, con) => {
  const currentDate = new Date();
  const insertPassword = `insert into password_history (email, password, creation_date) values ('${email}', '${password}', '${currentDate}')`;

  return new Promise(async (resolve, reject) => {
    con.query(insertPassword, async (err) => {
      if (err) return reject(err);

      const BiggerThanThreePassword = await countPasswordInHistory(email, con);
      if (BiggerThanThreePassword) {
        const deletePassword = await deleteOldPasswordHistory(email, con);
        if (!deletePassword) return resolve(false);
      }

      return resolve(true);
    });
  });
};

//Inserting the user into the database
const insertUser = async (
  email,
  first_name,
  last_name,
  phone_number,
  password,
  city,
  con
) => {
  const pushUser = `INSERT INTO users_details (email,first_name,last_name,phone_number,password,city) VALUES ('${email}', '${first_name}', '${last_name}', '${phone_number}', '${password}', '${city}')`;
  const emailExists = await checkUserMail(email, con);

  return new Promise(async (resolve, reject) => {
    if (emailExists) {
      console.log('The user already exists');
      return resolve(false);
    }
    let flag = 0;

    con.query(pushUser, async (err) => {
      if (err) return reject(err);

      flag = 1;
      const insertedPassword = await insertPasswordHistory(
        email,
        password,
        con
      );
      if (!insertedPassword && flag === 0) {
        console.log('Something went wrong');
        return resolve(false);
      }
      console.log('Inserted to password history and to users_details!');
      return resolve(true);
    });
  });
};

//Checking if the password is in the password history already
const checkPasswordInHistory = (email, password, con) => {
  return new Promise(async (resolve, reject) => {
    const q = `SELECT * FROM password_history WHERE email = '${email}' AND password = '${password}'`;

    con.query(q, (err, res) => {
      if (err) return reject(err);
      if (res.length > 0) return resolve(false);
      console.log('User did not use this password!');
      return resolve(true);
    });
  });
};

//Search for user password by his email
const findUser = async (email, password, con) => {
  const q = `select password from users_details where email = '${email}' and password = '${password}'`;

  return new Promise(async (resolve, reject) => {
    con.query(q, (err, res) => {
      if (err) return reject(err);
      if (res.length === 0) return resolve({ success: false });
      return resolve({ success: true });
    });
  });
};

//Updating the password
const updatePassword = async (email, new_password, con) => {
  const updatingPassword = `UPDATE users_details SET password = '${new_password}' WHERE email = '${email}'`;

  return new Promise(async (resolve) => {
    const userExists = await checkUserExists(email, con);
    if (!userExists)
      return resolve({ success: false, message: 'The user does not exist!' });

    const check = await checkPasswordInHistory(email, new_password, con);
    if (!check)
      return resolve({
        success: false,
        message: 'The password is already used !',
      });

    const pushPassword = await insertPasswordHistory(email, new_password, con);
    if (!pushPassword) throw 'failed pushing to password history';
    con.query(updatingPassword, (err) => {
      if (err) return reject(err);
      return resolve({ success: true, message: 'Password is changed!' });
    });
  });
};

//Sort client table by specific column
const sortBy = async (column_name, con) => {
  return new Promise(async (resolve, reject) => {
    con.query(
      `SELECT * FROM clients ORDER BY '${column_name}' ASC`,
      (error) => {
        if (error) return reject(false);

        console.log('Successfully sorted!');
        return resolve(true);
      }
    );
  });
};

//Search the client by one of his properties
const searchClient = async (search_string, sortBy, sortOrder, con) => {
  const defaultQuery = `SELECT * FROM clients WHERE email LIKE '%${search_string}%' OR first_name LIKE '%${search_string}%' 
OR last_name LIKE '%${search_string}%' OR phone_number LIKE '%${search_string}%' OR city LIKE '%${search_string}%'`;

  console.log({ search_string, sortBy, sortOrder });

  const queries = {
    first_name: {
      asc: ' order by first_name asc',
      desc: ' order by first_name desc',
    },
    last_name: {
      asc: ' order by last_name asc',
      desc: ' order by last_name desc',
    },
    phone_number: {
      asc: ' order by phone_number asc',
      desc: ' order by phone_number desc',
    },
    city: { asc: ' order by city asc', desc: ' order by city desc' },
    email: { asc: ' order by email asc', desc: ' order by email desc' },
  };
  let search = defaultQuery;
  if (sortBy && sortOrder) {
    search += queries[sortBy][sortOrder];
  }

  return new Promise((resolve, reject) => {
    con.query(search, (err, result) => {
      if (err) {
        console.log(err);
        return resolve(false);
      }
      return resolve(result);
    });
  });
};

//Incrementing the logins to logins + 1
const updateLogins = async (email, con) => {
  const q = `UPDATE users_details
  SET logins = logins + 1
  WHERE email = '${email}';
  `;
  return new Promise(async (resolve, reject) => {
    con.query(q, (err) => {
      if (err) return reject(false);

      console.log('Updated the logins!');
      return resolve(true);
    });
  });
};

//Reseting the logins to 0 after his block is done or he entered the correct password
const resetLogins = async (email, con) => {
  const q = `update users_details set logins = 0 where email = '${email}'`;

  return new Promise(async (resolve, reject) => {
    con.query(q, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

//Counting the logins in order to check if his logins count is more than allowed
const countLogins = async (email, con) => {
  const q = `select logins as logs from users_details where email = '${email}'`;

  return new Promise(async (resolve, reject) => {
    con.query(q, (err, res) => {
      if (err) return reject(err);
      if (res[0].logs >= config.login_attempts) return resolve(true);
      return resolve(false);
    });
  });
};

//Everytime the user tries to log in and the password is not correct we update the time stamp to the current time
const updateTimeStamp = async (email, con) => {
  const q = `UPDATE users_details
  SET created_at = NOW()
  WHERE email = '${email}'`;

  return new Promise(async (resolve, reject) => {
    con.query(q, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

//Getting the last time login of the user in order to check if he is still blocked or not
const lastTimeLogin = async (email, con) => {
  const q = `SELECT created_at from users_details where email = '${email}'`;
  return new Promise(async (resolve, reject) => {
    con.query(q, (err, res) => {
      if (err) return reject(err);
      return resolve(res[0].created_at);
    });
  });
};

//Updating the password of the user with the email code that was sent to him
const userForgotPassword = async (email, code, con) => {
  const q = `UPDATE users_details
  SET password = '${code}'
  WHERE email = '${email}'`;

  return new Promise((resolve, reject) => {
    con.query(q, (err) => {
      // console.log('Query:', con.query(q, [email, code]).sql);
      if (err) return reject(err);
      console.log(
        'Changing the password of the user with a value from the email'
      );
      return resolve(true);
    });
  });
};

//Search for user password by his email
const findUserPassword = async (email, con) => {
  const q = `select password from users_details where email = '${email}'`;

  return new Promise(async (resolve, reject) => {
    con.query(q, (err, res) => {
      if (err) return reject(err);
      return resolve(res[0].password);
    });
  });
};

//Exporting all the queries in order to use them in another file
module.exports = {
  insertUser,
  removeUser,
  removeClient,
  checkClient,
  insertClient,
  checkUserExists,
  checkUserMail,
  updatePassword,
  sortBy,
  checkClientMail,
  insertPasswordHistory,
  searchClient,
  findUser,
  updateLogins,
  countLogins,
  updateTimeStamp,
  resetLogins,
  lastTimeLogin,
  userForgotPassword,
  findUserPassword,
};

//Delete the data from tables! Dont use!!!!
// const remove = async () => {
//   const q = 'DELETE FROM users_details';

//   return new Promise((resolve, reject) => {
//     con.query(q, (err, res) => {
//       if (err) reject(err);
//       else {
//         resolve(true);
//       }
//     });
//   });
// };

// remove()
//   .then(() => {
//     console.log('Data deleted successfully');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const q = `ALTER TABLE users_details ADD is_banned BOOLEAN DEFAULT FALSE;`;
// con.query(q);

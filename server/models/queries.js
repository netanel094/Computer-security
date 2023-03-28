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
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

//checkMail('shon@gmail.com');

//Checking if the user exists by his email and password
const checkUserExists = async (mail, password) => {
  const checkUser = con.connectionPromise.query(
    `SELECT * FROM users_details WHERE email = '${mail}' and password = '${password}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

//checkUserExists('shon@gmail.com', 'blabla');

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

// insertUser('netanel@gmail.com', 'netanel', 'yom', '555555', 'bfhmdbfbeh');

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

const insertUser = async (email, first_name, last_name, phone_number, city) => {
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

//insertUser('nati@gmail.com', 'Shon', 'Khundiashvili', '0545647365', 'Bat-Yam');

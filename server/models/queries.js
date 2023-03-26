const mysql = require('mysql2/promise');

const checkConnection = async (con) => {
  con.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected!!');
    }
  });
};

// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MySQL Connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'student'
// });

// // Route to fetch data from MySQL
// app.get('/data', async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
//     const [rows, fields] = await connection.query('SELECT * FROM studinfo');
//     connection.release();
//     res.json(rows);
   
//   } catch (error) {
//     console.error('Error fetching data from MySQL:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Start server
// const port = 3306; // Change the port if needed
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// const {createPool} = require('mysql');


// const pool = createPool({
//   host:"localhost",
//   user:"root", 
//   database:"student",
//   connectionLimit:10,
// })


// pool.query(`select * from tenthstud`,(err,result,fields)=>{

//   if(err){
//     return console.log(err);

//   }
//   return console.log(result);

// })

// module.exports = pool;


const express = require('express');
const { createPool } = require('mysql');


const pool = createPool({
  host: "localhost",
  user: "root",
  database: "student",
  connectionLimit: 10,
});



const app = express();

app.get('/api/tenthstud', (req, res) => {
  pool.query(`SELECT * FROM tenthstud`, (err, result, fields) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

const PORT = process.env.PORT || 1348;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
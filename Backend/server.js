// const express = require('express');
// const cors = require('cors');
// const pg = require('pg');
// const jwt = require('jsonwebtoken');
// const json = require('body-parser/lib/types/json');
// const { user } = require('pg/lib/defaults');

// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "Mini Project",
//     password: "Arinjay04",
//     port: 5432 
// });
// const app = express();

// app.use(express.json());
// app.use(cors());

// db.connect();

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// const secret = 'Arinjay@04';

// const generateToken = (id) => {
//     const payload = { id };
//     const options = { expiresIn: '1h' };
//     return jwt.sign(payload, secret, options);
// }

// const verifyToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, secret);
//         return decoded.id;
//     } catch (err) {
//         console.error("Token verification error:", err);
//         return null;
//     }
// }




// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).send('Unauthorized: No token provided');
//     }

//     const tokenParts = authHeader.split(' ');

//     if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
//         return res.status(401).send('Unauthorized: Invalid token format');
//     }

//     const token = tokenParts[1];
//     const hotelId = verifyToken(token);

//     if (!hotelId) {
//         return res.status(401).send('Unauthorized: Invalid token');
//     }

//     req.hotelId= hotelId;
//     next();
// };



// app.post('/loginhotel', async (req, res) => {
//     try{
//         const {email, password} = req.body;
//         const result = await db.query("select email , password, hotelid from hotel where email = $1", [email]);

//         if(result.rowCount === 0){
//             return res.status(404).send("No data found");
//         }

//         const user = result.rows[0];

//         console.log(user.password);
//         console.log(user.hotelid);

//         if(user.password !== password){
//             return res.status(404).send("Incorrect password");
//         }
         
//         const token = generateToken(user.hotelid)
//         res.status(200).json({token});
//     }catch(error){
//         return res.status(500).send("Internal Server error", error);
//     }
// })



// app.post('/hotel', async (req, res) => {
//     try {
//         const { name, address, phone, email, password } = req.body;
//         console.log(name);
//         console.log(address),
//         console.log(phone)
//         const result = await db.query("INSERT INTO hotel (name, address, phone, email, password) VALUES ($1, $2, $3, $4, $5)", [name, address, phone, email, password]);

//         if (result.rowCount === 0) {
//             return res.status(400).send("Failed to insert data");
//         }
        
//         res.status(200).send('Success...!!!');
//     } catch (err) {
//         console.error("Error in sending data:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.post('/insertrooms', authMiddleware, async (req, res) => {
//     try {
//         const { roomnumber, type, price } = req.body;
//         const HotelId = req.hotelId;
//         console.log(roomnumber, type, price, HotelId);
//         const status = 'Available';

//         const result = await db.query(
//             "INSERT INTO room (roomnumber, type, status, price, hotelid) VALUES ($1, $2, $3, $4, $5)", 
//             [roomnumber, type, status, price, HotelId]
//         );

//         if (result.rowCount === 0) {
//             return res.status(400).send("Failed to insert data");
//         }

//         res.status(200).send('Success...!!!');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// app.post('/deleterooms',  authMiddleware, async (req, res) => {
//     try {
//         const { roomnumber } = req.body;

//         const HotelId = req.hotelId;
//         console.log(roomnumber);

       
//         const result = await db.query("DELETE FROM room WHERE roomnumber = $1 and hotelid = $2", [roomnumber, HotelId]);

        
//         if (result.rowCount === 0) {
//             return res.status(404).send("No such room exists");
//         }

//         res.status(200).send("Status completed ..!!!");

//     } catch (error) {
//         console.error("Error deleting room:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.put('/updateroom', authMiddleware,  async (req, res) => {
//     try {
//         const { roomnumber, type, status, price } = req.body;
//         const HotelId = req.hotelId;
       
//         if (!roomnumber) {
//             return res.status(400).send("Room number is required");
//         }

   
//         const result = await db.query("SELECT * FROM room WHERE roomnumber = $1 AND hotelid = $2", [roomnumber, HotelId]);

//         if (result.rowCount === 0) {
//             return res.status(404).send("No such room exists");
//         }


//         let room = result.rows[0];


//         if (type) {
//             room.type = type;
//         }
//         if (status) {
//             room.status = status;
//         }
//         if (price) {
//             room.price = price;
//         }


//         const updateResult = await db.query(
//             "UPDATE room SET type = $1, status = $2, price = $3 WHERE roomnumber = $4 and hotelid = $5",
//             [room.type, room.status, room.price, roomnumber, HotelId]
//         );

//         if (updateResult.rowCount === 0) {
//             return res.status(400).send("The row not found");
//         }

//         res.status(200).send("Room updated successfully");
//     } catch (error) {
//         console.error("Error updating room:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.get('/availableroom', authMiddleware, async (req, res)=> {
//      try{
//         const HotelId = req.hotelId;
//         console.log(HotelId);
//         const result = await db.query("SELECT * FROM room WHERE hotelid = $1 AND status = 'Available'", [HotelId]);
//         if(result.rowCount === 0){
//             return res.status(400).send("No room are available");
//         }

        
//         console.log(result.rows);
//         res.status(200).json(result.rows);
//      }catch(err){
//         res.status(500).send("INternal ERver error");
//      }
// })

// app.post('/addemployee', authMiddleware, async (req, res) => {
//     try {
//         const { firstname, lastname, position, salary, contact } = req.body;
//         const HotelId = req.hotelId;
//         console.log(HotelId);
//         const result = await db.query("INSERT INTO employee(firstname, lastname, position, salary, contact, hotelid) VALUES ($1, $2, $3, $4, $5, $6)", [firstname, lastname, position, salary, contact, HotelId]);

//         if (result.rowCount === 0) {
//             return res.status(400).send("Failed to insert data");
//         }

//         res.status(200).send('Success...!!!');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });



// app.post('/signupcustomer', async (req, res) => {
//     try {
//         const { firstname, lastname, address, phone, email, password } = req.body;

//         // Insert the new user into the database
//         const result = await db.query(
//             "INSERT INTO guest (fistname, lastname, address, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING guestid",
//             [firstname, lastname, address, phone, email, password]
//         );

//         if (result.rowCount === 0) {
//             return res.status(400).send("User registration failed");
//         }

//         const user = result.rows[0];

//         // Generate token for the new user
//         const token = generateToken(user.guestid);

//         res.status(200).json({
//             message: "Successfully registered",
//             token: token
//         });
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


// app.post('/logincustomer', async(req, res) => {
//     try{
//         const {email, password} = req.body;

//         const result = await db.query("SELECT  * FROM guest where email = $1", [email]);

//         if(result.rowCount === 0){
//             return res.status(400).send("No such Email exist. Try to signup");
//         }

//         const customer = result.rows[0];

//         if(customer.password !== password){
//             return res.status(401).send("Incorrect password");
//         }

//         const token = generateToken(customer.guestid);
//         res.status(200).json(token);
//     }catch(error){
//         res.status(500).send("Internal Server Error", error);
//     }
// })


// app.get('/gethotels', async (req, res) => {
//     try{
//           const result = await db.query("SELECT hotel.* , count(room.roomnumber) as Available_Room from hotel left join room on hotel.hotelid = room.hotelid and room.status = 'Available' group by hotel.hotelid ");
//           console.log(result.rows);
//           res.status(200).json(result.rows);
//     }catch(error){
//         return res.status(500).send("Internal Server error", error)
//     }
// })

// app.post('/getrooms', async(req, res) => {
//     try{
//         const hotelId = req.body.hotelId;
//         console.log(hotelId)
//         const result = await db.query("SELECT * from room where hotelid = $1 and status='Available'", [hotelId]);

//         if(result.rowCount===0){
//             return res.stayus(400).send("Sorry no room available here today..:((");
//         }

//         console.log(result.rows);
//           res.status(200).json(result.rows);
//     }catch(error){
//         return res.status(500).send("Internal Server error", error)
//     }
// })

// app.get('/getemployee', authMiddleware,async(req, res) => {
//     try{
//         const hotelid = req.hotelid;

//         const result = await db.query("SELECT * from employee where hotelid = $1", [hotelid]);
        
//         if(result.rowCount===0){
//             return res.stayus(400).send("No employee found..!!");
//         }

//         console.log(result.rows);
//           res.status(200).json(result.rows);

//     }catch(error){
//         return res.status(500).send("Internal Server error", error)
//     }
// })

// app.put('/roomcheckout', async (req, res) => {
//     try {
//         const { hotelid, roomid } = req.body; // Extracting parameters from request body
//         if (!hotelid || !roomid) {
//             return res.status(400).send("hotelid and roomid are required");
//         }

//         const result = await db.query(
//             "UPDATE reservation SET checkoutdate = NOW() WHERE hotelid = $1 AND roomid = $2",
//             [hotelid, roomid]
//         );

//         if (result.rowCount === 0) {
//             return res.status(400).send("Sorry, but no such room found");
//         }
//         res.status(200).send("Success...!!!");
//     } catch (error) {
//         console.error('Error executing query', error.stack);
//         return res.status(500).send("Internal Server Error");
//     }
// });


// app.post('/reservation', authMiddleware, async (req, res) => {
//     try {
//         const { hotelid, roomid, method } = req.body;
//         const userId = req.userId;
//         const amount = await db.query("SELECT room.price from room where roomid = $1 and hotelid = $2", [roomid, hotelid]);
//         const price = amount.rows[0].price;
//         const result = await db.query(
//             "INSERT INTO reservation (checkindate, status, roomid, guestid, hotelid, paymentdate, paymentmethod, amount) VALUES (NOW(), 'confirmed', $1, $2, $3, NOW(),  $4, $5 )", 
//             [roomid, userId, hotelid, method, price ]
//         );

//         if (result.rowCount === 0) {
//             return res.status(400).send("Sorry, cannot insert");
//         }

//         console.log(result.rows);
//         res.status(200).send("Success..!!");
//     } catch (error) {
//         console.error("Error inserting reservation:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// });



// app.listen(3001, () => {
//     console.log("Server running ont 3001");
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const guest = require('./routes/guestRouter')
const roomRoutes = require('./routes/roomRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guest', guest)
app.use('/api/employees', employeeRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, db };

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const supplierRoutes = require('./Routers/suplayreroute');
const inventoryRoutes = require('./Routers/invantoryroutes');

const app = express();
const PORT = process.env.PORT || 5000;
const _diname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true,
}));

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/suppliers', supplierRoutes);
app.use('/inventory', inventoryRoutes);

app.use(express.static(path.join(_diname,"/client/dist")));
app.get('*', (_,res)=>{
res.sendFile(path.join(_diname,"client","dist","index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

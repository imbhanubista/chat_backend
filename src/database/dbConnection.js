const { connect, default: mongoose } = require("mongoose");
let connectionString = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);
connect(connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB Database");
  }
});

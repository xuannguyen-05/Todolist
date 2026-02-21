require("dotenv").config();
const express = require("express"); 
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/connectDB");

const userRoutes = require("./routes/user.routes")
const taskRoutes = require("./routes/task.routes")
const taskV3Routes = require("./routes/taskV3.routes");
const viewRoutes = require("./routes/view.routes");

const session = require("express-session");
const User = require("./models/user.model");


const app = express();
const port = process.env.PORT || 3001;
const hostname = process.env.HOST_NAME

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // đọc form

//config template engine
configViewEngine(app);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// middleware global set req.user
app.use(async (req, res, next) => {
  if (req.session.userId) {
    req.user = await User.findById(req.session.userId);
  }
  next();
});

app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)

app.use("/", viewRoutes);

app.use("/v3", taskV3Routes);

(async() => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}`);
        })
    } catch (error) {
        console.log("Error connect to DB", error)
    }
})()
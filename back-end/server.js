require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocuments = YAML.load("./swag.yaml");
const swaggerDocuments = require("./swagger.json");

const app = express();
/* Swagger */
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "A simple Express Library API",
//       contact: {
//         name: "John doe", // your name
//         email: "john@web.com", // your email
//         url: "web.com", // your website
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:5000",
//       },
//     ],

//     apis: ["./routers/*"],
//   },
// };
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/* Routers */
app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/upload"));
app.use("/api", require("./routers/productsRouter"));

/* Connect to mongodb */
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("Connected to MongoDB");
  }
);

/* Check local host */
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to My Website. Thank you" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

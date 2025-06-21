import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const _dirname = dirname (fileURLToPath (import.meta.url)) ;
const app = express();
const port = 8080;
var firstName = "";

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});

app.use(express.static(path.join(_dirname, '../PART_B')));
app.use(bodyParser.urlencoded({ extended: true }));


// טוען את עמוד הבית
app.get('/', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/Home.html' )
  res.sendFile(indexPath);
});

//העמודים האחרים
app.get('/AboutUs', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/AboutUs.html' )
  res.sendFile(indexPath);
});
app.get('/Products', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/Products.html' )
  res.sendFile(indexPath);
});


app.get('/Cart', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/Cart.html' )
  res.sendFile(indexPath);
});

app.post('/cart', (req, res) => {
  const { cartSummary } = req.body;
  console.log("Cart saved:", cartSummary);
  res.send(`<h2>Your cart was saved successfully!</h2><p>${cartSummary}👶🌱</p>`);
});


app.get('/ContactUS', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/ContactUS.html' )
  res.sendFile(indexPath);
});


app.get('/Login', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/Login.html' )
  res.sendFile(indexPath);
});

function EmailGenerator(req, res, next) {
  const { email, password } = req.body;
  console.log(" Login attempt:", email);
  req.email = email + password; // שומר ל־req
  next(); // ממשיכים ל־route הבא
}
// Route שמופעל אחרי ה־middleware
app.post("/login", EmailGenerator, (req, res) => {
  res.send(`<h1>Thank you! Your email name is:</h1><h2>${req.email}</h2>`);
});


app.get('/SingUp', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/SingUp.html' )
  res.sendFile(indexPath);
});

function SignUpGenerator(req, res, next) {
  const { firstName,lastName,email,phoneNumber,city,password } = req.body;
  console.log(" SingUp attempt:", firstName);
  req.firstName = firstName; // שומר ל־req
  next(); // ממשיכים ל־route הבא
}

// Route שמופעל אחרי ה־middleware
app.post("/singup", SignUpGenerator, (req, res) => {
  res.send(`<h1>Hello ${req.firstName}!Welcome to the New Era Family,</h1>
    <h2>You've taken the first step toward sustainable baby fashion 👶🌱</h2>
    <h3>We're excited to have you with us.</h3>`);
});


app.get('/Profile', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/Profile.html' )
  res.sendFile(indexPath);
});
app.get('/ForgetPassword', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/ForgetPassword.html' )
  res.sendFile(indexPath);
});
app.get('/PrivacyPolicy', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/PrivacyPolicy.html' )
  res.sendFile(indexPath);
});
app.get('/TermsOfService', (req, res) => {
  const indexPath = path.join(_dirname,'../PART_B/TermsOfService.html' )
  res.sendFile(indexPath);
});

app.use((req, res) => {
  res.status(404).send("Sorry, page not found");
});

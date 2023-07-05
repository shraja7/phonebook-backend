//setup express server
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

//connect to mongodb
const url = process.env.MONGODB_URI;
console.log("connecting to", url);
mongoose.set("strictQuery", false);
mongoose.connect(url);
//person schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
//transform person schema
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//implement morgan
const morgan = require("morgan");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//middleware
app.use(
  cors({
    origin: "https://phonebook-req4.onrender.com",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//static files
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

//info page
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

//route to get a single contact
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//route to delete a contact
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

//route to add a contact
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  const nameExists = persons.find(
    (p) => p.name.trim().toLowerCase() === body.name.trim().toLowerCase()
  );
  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

//listen to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//setup express server
const express = require("express");
const app = express();
const cors = require("cors");

//implement morgan
const morgan = require("morgan");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//middleware
app.use(cors());
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
  res.send(persons);
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

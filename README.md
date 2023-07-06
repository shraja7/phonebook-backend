# Phonebook Backend

This is a simple backend application for a phonebook. It provides endpoints to manage contacts such as retrieving all contacts, adding a contact, getting a single contact by ID, and deleting a contact.

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB object modeling)
- MongoDB (NoSQL database)
- React (Frontend framework)
- CORS (Cross-Origin Resource Sharing)
- Morgan (HTTP request logger middleware)
- Thunder Client (API testing tool)

## Setup

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the server with `npm start`.

## API Endpoints

- `GET /api/persons`: Retrieves all contacts in the phonebook.
- `GET /api/persons/:id`: Retrieves a single contact by ID.
- `POST /api/persons`: Adds a new contact to the phonebook.
- `DELETE /api/persons/:id`: Deletes a contact by ID.
- `GET /info`: Provides information about the phonebook, including the number of contacts and the current date.

## Data Structure

The contacts are stored in an array called `persons`. Each contact has the following properties:

- `id`: A unique identifier for the contact.
- `name`: The name of the person.
- `number`: The phone number of the person.

## Logging

The application uses the Morgan middleware to log information about each HTTP request. The logged information includes the request method, URL, response status, response time, and request body (if applicable).

## Error Handling

The application includes basic error handling for adding new contacts. It checks for missing name or number fields and ensures that each contact's name is unique. If an error occurs, the server responds with an appropriate error status code and a JSON error message.

## Deployment

This application was deployed on render and can be found here:
https://phonebook-req4.onrender.com/

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

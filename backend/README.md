#Backend API Documentation
// User Registration Endpoint

// Endpoint: `/users/register`

// Method: POST

// Description:
// This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user details.

// Request Body:
// The request body should be a JSON object containing the following fields:

// - `fullname`: An object containing:
//   - `firstname`: A string with a minimum length of 4 characters (required).
//   - `lastname`: A string with a minimum length of 4 characters (optional).
// - `email`: A string representing the user's email address with a minimum length of 7 characters (required).
// - `password`: A string with a minimum length of 6 characters (required).

// Example:
// ```json
// {
//   "fullname": {
//     "firstname": "John",
//     "lastname": "Doe"
//   },
//   "email": "john.doe@example.com",
//   "password": "password123"
// }

// User Login Endpoint

// Endpoint: `/users/login`

// Method: POST

// Description:
// This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user details.

// Request Body:
// The request body should be a JSON object containing the following fields:

// - `email`: A string representing the user's email address (required).
// - `password`: A string with a minimum length of 6 characters (required).

// Example:
// ```json
// {
//   "email": "john.doe@example.com",
//   "password": "password123"
// }

// Response:
// - `token`: A JWT token for authentication.
// - `user`: An object containing the user's details.

// Example Response:
// ```json
// {
//   "token": "your_jwt_token",
//   "user": {
//     "_id": "user_id",
//     "firstname": "John",
//     "lastname": "Doe",
//     "email": "john.doe@example.com"
//   }
// }

// User Profile Endpoint

// Endpoint: `/users/profile`

// Method: GET

// Description:
// This endpoint is used to retrieve the profile of the authenticated user. It requires a valid JWT token for authentication.

// Headers:
// - `Authorization`: Bearer token (required).

// Response:
// - `user`: An object containing the authenticated user's details.

// Example Response:
// ```json
// {
//   "_id": "user_id",
//   "firstname": "John",
//   "lastname": "Doe",
//   "email": "john.doe@example.com"
// }

// User Logout Endpoint

// Endpoint: `/users/logout`

// Method: GET

// Description:
// This endpoint is used to log out the authenticated user. It requires a valid JWT token for authentication. The token will be blacklisted and the cookie will be cleared.

// Headers:
// - `Authorization`: Bearer token (required).

// Response:
// - `message`: A success message indicating the user has been logged out.

// Example Response:
// ```json
// {
//   "message": "User logged out successfully"
// }

# Backend API Documentation

## Caption Registration Endpoint

### Endpoint: `/captions/create`

### Method: POST

### Description:
This endpoint is used to register a new caption. It validates the input data, hashes the password, creates a new caption in the database, and returns a JSON Web Token (JWT) along with the caption details.

### Request Body:
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string (optional).
- `email`: A string representing the caption's email address (required).
- `password`: A string with a minimum length of 5 characters (required).
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters (required).
  - `plate`: A string with a minimum length of 3 characters (required).
  - `capacity`: An integer with a minimum value of 1 (required).
  - `vehicleType`: A string that must be one of ['car', 'bus', 'truck'] (required).

### Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response:
- `token`: A JWT token for authentication.
- `caption`: An object containing the caption's details.

### Example Response:
```json
{
  "token": "your_jwt_token",
  "caption": {
    "_id": "caption_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
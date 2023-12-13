# Routes Documentation

# Table

- [Authentication](#authentication)
    - [Login](#login)
    - [Logout](#logout)

- [User Management](#user-management)
    - [Create User](#create-user)
    - [Delete User](#delete-user)

- [Company Routes](#company-routes)
    - [Get All Companies](#get-all-companies)
    - [Get Company by Symbol](#get-company-by-symbol)

- [Favorites Management](#favorites-management)
    - [Add Favorite](#add-favorite)
    - [Remove Favorite](#remove-favorite)
    - [Get User Favorites](#get-user-favorites)
- [Additional](#additional)
    - [Stock Quote Details](#stock-quote-details)

## Authentication

### Login

- **Endpoint:** `/api/user/login`
- **Method:** `POST`
- **Request:**
    - **Body:**
      ```json
      {
        "username": "string",
        "password": "string"
      }
      ```

- **Response:**
    - **Success:**
      ```json
      {
        "token": "string"
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

### Logout

- **Endpoint:** `/api/user/logout`
- **Method:** `GET`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]`

- **Response:**
    - **Success:**
      ```json
      {
        "message": "Logout successful"
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

## User Management

### Create User

- **Endpoint:** `/api/user/create`
- **Method:** `POST`
- **Request:**
    - **Body:**
      ```json
      {
        "username": "string",
        "password": "string"
      }
      ```
- **Response:**
  - **Success:**
    ```json
    {
      "message": "User created successfully"
    }
    ```
  - **Error:**
    ```json
    {
      "error": "string"
    }
    ```
### Delete User

- **Endpoint:** `/api/user/delete`
- **Method:** `POST`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]`
    - **Body:**
      ```json
      {
        "username": "string"
      }
      ```

- **Response:**
    - **Success:**
      ```json
      {
        "message": "Delete Successful"
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

## Company Routes

### Get All Companies

- **Endpoint:** `/api/company/get`
- **Method:** `GET`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]` (optional)
- **Response:**
    - **Success:**
      ```json
      [
        {
          "symbol": "string",
          "name": "string",
          "stockQuote": {
            // stock quote details
          },
          "website": "string",
          "favorite": true/false // Whether the company is in the user's favorites list (if authenticated)
        },
        // Additional companies...
      ]
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

### Get Company by Symbol

- **Endpoint:** `/api/company/get/:symbol`
- **Method:** `GET`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]` (optional)
    - **Params:**
        - `symbol`: The stock symbol of the company.
- **Response:**
    - **Success:**
      ```json
      {
        "symbol": "string",
        "name": "string",
        "stockQuote": {
          // stock quote details
        },
        "website": "string",
        "favorite": true/false // Whether the company is in the user's favorites list (if authenticated)
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

## Favorites Management

### Add Favorite

- **Endpoint:** `/api/favorite/add`
- **Method:** `POST`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]`
    - **Body:**
      ```json
      {
        "username": "string",
        "symbol": "string"
      }
      ```

- **Response:**
    - **Success:**
      ```json
      {
        "message": "Favorite added successfully"
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

### Remove Favorite

- **Endpoint:** `/api/favorite/remove`
- **Method:** `POST`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]`
    - **Body:**
      ```json
      {
        "username": "string",
        "symbol": "string"
      }
      ```

- **Response:**
    - **Success:**
      ```json
      {
        "message": "Favorite removed successfully"
      }
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```

### Get User Favorites

- **Endpoint:** `/api/favorite/get`
- **Method:** `GET`
- **Request:**
    - **Headers:**
        - `Authorization`: `Bearer [token]`

- **Response:**
    - **Success:**
      ```json
      [
        {
          "symbol": "string",
          "name": "string",
          "stockQuote": {
            // stock quote details
          },
          "website": "string",
          "favorite": true
        },
        // Additional favorites...
      ]
      ```
    - **Error:**
      ```json
      {
        "error": "string"
      }
      ```
      

# ADDITIONAL
### Stock Quote Details
```json
{
  "c": "number",
  "d": "number",
  "dp": "number",
  "h": "number",
  "l": "number",
  "o": "number",
  "pc": "number",
  "t": "number"
}
```



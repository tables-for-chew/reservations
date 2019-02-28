  # Table For Chew: Reservations API v1.0

## <a style="color: #333333">Table of Contents</a>
* [**Reservations.reservations**](#reservationsreservations)
    * [GET /api/reserve/query/:restaurant_id/:date/:time](#get-apireservequeryrestaurant_iddatetime)
    * [POST /api/reserve/query/:restaurant_id/:date/:time](#post-apireservequeryrestaurant_iddatetime)
    * [PUT /api/reserve/query/:restaurant_id/:date/:time](#put-apireservequeryrestaurant_iddatetime)
    * [DELETE /api/reserve/query/:restaurant_id/:date/:time](#delete-apireservequeryrestaurant_iddatetime)
* [**Reservations.restaurants**](#reservationsrestaurants)
    * [GET /api/reserve/load/:restaurant_id](#get-apireserveloadrestaurant_id)
* [**Change History**](#change-history)
<hr>

## Reservations.reservations
### `GET /api/reserve/query/:restaurant_id/:date/:time`
Returns a `[{ Reservation }]` within a 2 hour block at a given reservation id.

**URL Params**
  * `restaurant_id` _(Number)_ : ID of the restaurant to retrieve all relevant details
  * `date` _(Date)_ : Date string following `YYYY-MM-DD` format
  * `time` _(Time)_ : Time string following `HH:mm` format

**Success Response:**
  * **Status Code:** 200
  * **Content:** `[{ Reservation }]` conforming to the following format:

  |Key              |Type    |
  |:--------------- |:------ |
  |`id`             |Number  |
  |`restaurant_id`  |Number  |
  |`date`           |Date    |
  |`time`           |Date    |
 
**Error Response:**
  * **Code:** 400 Bad Request error
  * **Content:** `{ error : "Bad Request error" }`

### `POST /api/reserve/query/:restaurant_id/:date/:time`
Returns the `id` of the reservation created in the database.

**Payload Params**
  * Valid `{ JSON }` conforming to the following format:

  |Key              |Type    |
  |:--------------- |:------ |
  |`restaurant_id`  |Number  |
  |`date`           |Date    |
  |`time`           |Date    |

**Success Response:**
  * **Status Code:** 201
  * **Content:** `{ id }`
 
**Error Response:**
  * **Code:** 400 Bad Request error
  * **Content:** `{ error : "Bad Request error" }`

### `PUT /api/reserve/query/:restaurant_id/:date/:time`
Returns `204` to signify successful `UPDATE`.

**URL Params**
  * `restaurant_id` _(Number)_ : ID of the restaurant to retrieve all relevant details
  * `date` _(Date)_ : Date string following `YYYY-MM-DD` format
  * `time` _(Time)_ : Time string following `HH:mm` format

**Success Response:**
  * **Status Code:** 204
  * **Content:** `{}`
 
**Error Response:**
  * **Code:** 400 Bad Request error
  * **Content:** `{ error : "Bad Request error" }`

### `DELETE /api/reserve/query/:restaurant_id/:date/:time`
Returns `204` to signify successful `DELETE`.

**URL Params**
  * `restaurant_id` _(Number)_ : ID of the restaurant to retrieve all relevant details
  * `date` _(Date)_ : Date string following `YYYY-MM-DD` format
  * `time` _(Time)_ : Time string following `HH:mm` format

**Success Response:**
  * **Status Code:** 204
  * **Content:** `{}`
 
**Error Response:**
  * **Code:** 400 Bad Request error
  * **Content:** `{ error : "Bad Request error" }`
<hr>

## Reservations.restaurants
### `GET /api/reserve/load/:restaurant_id`
Returns `{ JSON }` at a given restaurant id.

**URL Params**
  * `restaurant_id` _(Number)_ : ID of the restaurant to retrieve all relevant details

**Success Response:**
  * **Status Code:** 200
  * **Content:** `{ JSON }` conforming to the following format:

  |Key                    |Type     |
  |:--------------------- |:------- |
  |`id`                   |Number   |
  |`bookings_today`       |Number   |
 
**Error Response:**
  * **Code:** 400 Bad Request error
  * **Content:** `{ error : "Bad Request error" }`


<hr>

## Change History
|Name                                 |Version    |Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description     |
|:----------------------------------------------- |:--------- |:--------- |:------- |
|[@leightonchen](https://github.com/leightonchen) |1.0        |2019-02-27 |Document initial API CRUD routes for relevant models in the `Reservations` microservice.
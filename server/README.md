**Get Booking Count**
----
  <_Given a restaurant id, return the number of bookings for that given restaurant for the day._>

* **URL**

  - `/api/reserve/load/:restaurantId`

* **Method:**

  - `GET`

*  **URL Params**

   - **Required:**

      `restaurantId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Content:** `[{ bookings_today : 12 }]`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
  ```
  $.ajax({
    url: "/api/reserve/load/1",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```

**Get Restaurant Availability Per Day**
----
  <_Given a restaurant id, date, and time, return with that restaurant's availability for the day._>

* **URL**

  - `/api/reserve/query/:restaurantId/:date/:time`

* **Method:**

  - `GET`

*  **URL Params**

   - **Required:**

      `restaurantId=[integer]`
      `date=[moment.js object]`
      `time=[HH:mm]`

* **Success Response:**

  * **Code:** 200
    **Content:** `[{ TODO: }]`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
  ```
  $.ajax({
    url: "/api/reserve/query/1//",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```

**Book a Table**
----
  <_Given a restaurant id, date, and time, make a reservation for that day and time._>

* **URL**

  - `/api/reserve/book/:restaurantId/:date/:time`

* **Method:**

  - `POST`

*  **URL Params**

   - **Required:**

      `restaurantId=[integer]`
      `date=[moment.js object]`
      `time=[HH:mm]`

* **Success Response:**

  * **Code:** 201
    **Content:** `{}`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
  ```
  $.ajax({
    url: "/api/reserve/book/1//",
    dataType: "json",
    data: {},
    type : "POST",
    success : function(r) {
      console.log(r);
    }
  });
  ```
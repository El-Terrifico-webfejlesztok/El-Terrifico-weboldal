# Termék APIk
Termék Keresési API
---------------------------
**Végpont:** `GET /api/product/request`

**Leírás:**
Ez a API végpont lehetővé teszi termékek keresését a megadott kritériumok alapján. A keresési feltételeket az URL query paramétereiben kell megadni.

**Hitelesítés:**
- **Nincs**

**Kérés:**
- **Metódus:** GET
- **Végpont:** `/api/product/request`
- **Lekérdezési Paraméterek (URL params):**
  - `name` (Opcionális): Szerepelnie kell termékek nevében vagy leírásában (Inkluzív)
  - `minprice` és `maxprice` (Opcionális): A termék árának minimum és maximum értékek között kell lennie.
  - `minrating` és `maxrating` (Opcionális): A termék értékelése minimum és maximum értékek között. (*jelenleg nem működik*)
  - `categories` (Opcionális): A termék kategóriái vesszővel elválasztva. (Inkluzív, csak egy kategóriának kell megfelelnie a terméknek)
  - `id` (Opcionális): A termék azonosítója (A többi opciót nem veszi figyelembe ha ez használva van).

**Válasz:**
- **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	 - **Struktúra:**
		```json
		[{termék1},{termék2},{termék3},]
		```
	 - **Termék példa:**
		```json
		[
			{
				"id": 1,
				"name": "Termék neve",
				"description": "Termék leírása",
				"price": 5000,
				"stock": 50,
				"created_at": "2024-01-01T12:00:00Z", //UTC idő
				"updated_at": "2024-01-02T15:30:00Z", //UTC idő
				"categories": ["Kategória1", "Kategória2"],
				"images": ["URL1", "URL2"]
			},
		// ... további termékek
		]
		```
- **Hiba Válasz (HTTP Státuszkód: 500 Internal Server Error):**
  ```json
  {
    "error": "A keresés közben hiba történt",
    "message": "Hibaüzenet" // A hibaüzenet a hiba okát adja vissza
  }
  ```
**Példa Használatra**:

- **Példa URL:**
  ```URL
  https://terrifico.zapto.org/products?name=&minprice=500&maxprice=30000&categories=Taco%2CFirst+Upload
  ```

- **Kérés:**
  ```typescript
      const fetchData = async (searchParams: ReadonlyURLSearchParams) => {
        try {
          const response = await fetch(`/api/search-products?${searchParams.toString()}`);
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          const responseData: Product[] = await response.json();
        }
          catch (error) {
          console.error("Error fetching data:", error);
        }};
    ```

Termék Részleteinek Lekérése API
---------------------------
**Végpont:** `GET /api/product`

**Leírás:**\
Ez az API végpont lehetővé teszi egy termék részleteinek lekérését az azonosítója alapján. Csak az adminisztrátor jogosultságokkal rendelkező felhasználók képesek lekérdezni a termék részleteit.

**Hitelesítés:**

-   **Szükséges:** Adminisztrátori jogosultságokkal rendelkező bejelentkezés.

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/product`
-   **URL Paraméterek:**
	-   `id`: A lekérdezendő termék azonosítója.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	{
		"id": 123,
		"name": "Termék neve",
		"description": "Termék leírása",
		"price": 99.99,
		"ProductImage": [
			{
				"id": 1,
				"url": "https://example.com/image1.jpg"
			//khmkhm
			},
			// ... További képek
		],
		"Categories": [
			{
				"id": 1,
				"name": "Kategória neve"
			},
			// ... További kategóriák
		]
	}
	```
-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Nincs jogosultsága a termék részleteit lekérni"
		```

	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Nincs termék megadva a kérésben"
		```
	


	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található ilyen termék"
		```

	-   **HTTP Státuszkód: 500 Internal Server Error:**
	```json
	"Hiba a termék részleteinek lekérése közben"
	```
	
**Példa Használat**:

-   **Kérés:**
	```typescript
	const getProductDetails = async (productId: number) => {
		try {
			const response = await fetch(`/api/product?id=${productId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error("Sikertelen termék részleteinek lekérése");
			}

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error(error.message);
		}
	};
	```

Termék Kategóriák API
---------------------------
**Végpont:** `GET /api/product/categories`

**Leírás:**  
Ez a API végpont visszaadja az adatbázisban létező összes kategóriát.

**Hitelesítés:**  
- **Nincs**

**Kérés:**  
- **Metódus:** GET
- **Végpont:** `/api/product/categories`

**Válaszok:**  
- **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	[
		"Elektronika",
		"Ruházat",
		"Háztartási cikkek",
		// ... további kategóriák
	]
	```
- **Hiba Válasz (HTTP Státuszkód: 500 Internal Server Error):**
	
	```json
	"Hiba a kategóriák lekérése közben"
	```
**Példa használatra:**
- **Kérés:**
	```typescript
	const fetchCategories = async () => {
	  try {
	    const response = await fetch('/api/product/categories');
	    if (!response.ok) {
	      throw new Error("Response was not ok");
	    }
	    const categoryNames: string[] = await response.json();
	    console.log(categoryNames);
	  }
	  catch (error) {
	    console.error("Error fetching categories:", error);
	  }
	};
	```
Termék Feltöltési API
---------------------------
**Végpont:** `POST /api/product/upload`

**Leírás:**  
Ez az API végpont lehetővé teszi új termékek feltöltését vagy meglévő termékek frissítését. Fontos hogy a termék képek feltöltését nem ez az API kezeli

**Hitelesítés:**
-  **Szükséges:** Adminisztrátor: Csak az admin szerepű felhasználó használhatja (next-auth-al ellenőrizve).

**Kérés:**
-   **Metódus:** POST
-   **Végpont:** `/api/product/upload`
-   **Kérés Body (JSON):**
    
	```json
	{
	  "id": 123, //Opcionális, ha meg van adva akkor a megadott IDs terméket frissíti
      "name": "Termék neve",
      "description": "Termék leírása",
      "price": 5000,
      "stock": 50,
      "categories": ["Elektronika", "Ruházat"]
	}
	```

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	// A létrehozott terméket adja vissza. Hasznos az ID a képfeltöltéshez
	{
		"id": 1,
		"name": "Termék neve",
		"description": "Termék leírása",
		"price": 5000,
		"stock": 50,
		"created_at": "2024-02-24T12:00:00Z",
		"updated_at": "2024-02-24T12:00:00Z",
		"categories": ["Elektronika", "Ruházat"]
	}
	```
    
-   **Hiba Válasz (HTTP Státuszkód: 400 Bad Request):**
	    
	```json
	// Egy lista a hibákról
	[
		"Hibás név",
		"Leírás megadása kötelező",
		// ... további validációs hibák
	]
	```
    
-   **Hiba Válasz (HTTP Státuszkód: 401 Unauthorized):**
	```json
	"Unauthorized"
	```
-   **Hiba Válasz (HTTP Státuszkód: 500 Internal Server Error):**
	```json
	"Hiba a termék feltöltése közben"
	```
**Példa Használatra**:

-   **Kérés:**
	```typescript
	const uploadProduct = async (productData) => {
	  try {
	    const response = await fetch('/api/product/upload', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
			name,
			description,
			price,
			stock,
			categories,
	      }),
	    });

	    if (!response.ok) {
	      throw new Error("Hiba a termék feltöltése közben");
	    }

	    const newProduct = await response.json();
	    console.log(newProduct);
	  }
	  catch (error) {
	    console.error("A szerver nem érhető el:", error);
	  }
	};
	```

Termékkép Feltöltése API
---------------------------

**Végpont:** `POST /api/product/image`

**Leírás:**\
Ez az API végpont lehetővé teszi egy termékkép feltöltését a termékazonosító megadásával

**Hitelesítés:**

-   **Szükséges:** Adminisztrátor.

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/product/image`
-   **Multipart Form adatok:**
	-   `product_id`: A termék azonosítója, amelyhez a kép tartozik.
	-   `file`: A feltöltendő képfájl.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	{
		"id": 123,
		"product_id": 456,
		// Az adatbázisban így vannak tárolva a képútvonalak
		"image_path": "public/product_images/uniqueid_filename.jpg"
		
	}
	```

-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Unauthorized"
		```
	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Product ID vagy kép hiányzik a requestből"
		// Vagy
		"A kép túllépi a {MAX_FILE_SIZE_MB}MB képméret határt"
		// Jelenleg 10MB, de a jövőben változhat
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a termékkép feltöltése közben"`
		```

**Példa Használat**:

- **Formdata létrehozása:**
	```typescript
	const productId = 123; 
	const fileInput = document.getElementById('fileInput') as HTMLInputElement; 
	const file = fileInput.files[0];

	const formData = new FormData();
	formData.append('product_id', productId.toString());
	formData.append('file', file);
	```

-   **Kérés:**

	```typescript
	// Fontos hogy az API csak egy képet tud egyszerre feltölteni. Több kép esetében a frontenden kell megoldani több kép küldését egymás után
	async function uploadProductImage(productId: number, file: File) {
		try {
			// Prepare the FormData
			const formData = new FormData();
			formData.append('product_id', productId.toString());
			formData.append('file', file);

			// Make the API request
			const response = await fetch(`/api/product/image`, {
				method: 'POST',
				body: formData,
			});

			// Check if the request was successful
			if (!response.ok) {
				throw new Error(`Sikertelen termékkép feltöltés`);
			}

			// Parse and log the response data
			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error('Hiba a termékkép feltöltésekor:', error);
		}
	}
	```

Termék Kép Törlése API
---------------------------

**Végpont:** `DELETE /api/product/image`

**Leírás:**
Ez a API végpont lehetővé teszi egy termékhez tartozó kép törlését. 
**Hitelesítés:**
-   **Szükséges:** Adminisztrátor.

**Kérés:**
-   **Metódus:** DELETE
-   **Végpont:** `/api/product/image`
-   **URL Paraméterek:**
    -   `id`: A törlendő kép azonosítója.

**Válasz:**
-   **Sikeres Válaszok:**
    **HTTP Státuszkód: 200 OK:**
	```json
	"Kép sikeresen törölve"
	```
-   **Hiba Válaszok:**
    -   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Nincs kép ID megadva a kérésben"
		```
	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Csak admin törlhet termékképeket"
		```
	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem létezik ilyen kép"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a kép törlése közben"
		```

**Példa Használat**:

-   **Kérés:**
	```typescript
	const deleteImage = async (imageId: number) => {
	    try {
	        const response = await fetch(`/api/product/image?id=${imageId}`, {
	            method: 'DELETE',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	        });

	        if (!response.ok) {
	            throw new Error("Sikertelen képtörlés");
	        }

	        const responseBody = await response.json();
	        console.log(responseBody);
	    } catch (error) {
	        console.error("A szerver nem érhető el", error);
	    }
	};
	```

Termék Inaktívvá Tétele API
---------------------------

**Végpont:** `DELETE /api/product`

**Leírás:**
Ez a API végpont lehetővé teszi egy termék inaktiválását az azonosítója alapján. Az inaktivált termékek nem lesznek láthatók a felhasználók számára, de adataik megmaradnak az adatbázisban.

**Hitelesítés:**
- **Szükséges:** Adminisztrátor

**Kérés:**
- **Metódus:** DELETE
- **Végpont:** `/api/product`
- **URL Paraméterek:**
  - `id`: A termék azonosítója, amelyet inaktiválni szeretnénk.

**Válaszok:**
- **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
  - `"Termék inaktívvá téve"`
- **Hiba Válaszok:**
  - HTTP Státuszkód: 400 Bad Request:
    - `"Nincs termék megadva a kérésben"`
  - HTTP Státuszkód: 500 Internal Server Error:
    - `"Hiba a termék inaktiválása közben"`

**Példa Használat:**
- Kérés:
  ```javascript
  const inactivateProduct = async (productId: number) => {
      try {
          const response = await fetch(`/api/product?id=${productId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error("Sikertelen termék inaktiválás");
          }

          const responseBody = await response.json();
          console.log(responseBody);
      } catch (error) {
          console.error("A szerver nem elérhető:", error);
      }
  };
  ```

Termék Aktiválási API
---------------------------
**Végpont:** `PATCH /api/product`

**Leírás:**
Ez a API végpont lehetővé teszi egy termék aktiválását az azonosítója alapján.

**Hitelesítés:**
- **Szükséges:** Adminisztrátor

**Kérés:**
- **Metódus:** PATCH
- **Végpont:** `/api/product`
- **URL Paraméterek:**
  - `id`: A termék azonosítója, amelyet aktiválni szeretnénk.

**Válaszok:**
- **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
  - `"Termék aktívvá téve"`
- **Hiba Válaszok:**
  - HTTP Státuszkód: 400 Bad Request:
    - `"Nincs termék megadva a kérésben"`
  - HTTP Státuszkód: 401 Unauthorized:
    - `"Nincs jogosultsága a termék aktívvá tételéhez"`
  - HTTP Státuszkód: 500 Internal Server Error:
    - `"Hiba a termék aktiválása közben"`

**Példa Használat:**
- Kérés:
  ```javascript
  const activateProduct = async (productId: number) => {
      try {
          const response = await fetch(`/api/product?id=${productId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error("Sikertelen termék aktiválás");
          }

          const responseBody = await response.json();
          console.log(responseBody);
      } catch (error) {
          console.error("A szerver nem elérhető:", error);
      }
  };
  ```

# Rendelés APIk

Rendelés Létrehozó API
---------------------------

**Végpont:** `POST /api/order`

**Leírás:**\
Ez az API végpont lehetővé teszi egy rendelés létrehozását megadott termékekkel és szállítási címmel.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés.

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/order`
-   **Kérés Body (JSON):**
	```json
	{
		"shippingAddressId": 456,
		"orderItems": [
			{ "productId": 789, "quantity": 2 },
			{ "productId": 101, "quantity": 1 }
		]
	}
	```

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**

	```json
	{
		"orderId": 987,
		"totalPrice": 150.00,
		"createdAt": "2024-02-20T12:30:45Z",
		"OrderItems": [
			// Létrehozott rendelés termékeinek részletei
		]
	}
	```

    -   **Hiba Válaszok:**

		-   **HTTP Státuszkód: 401 Unauthorized:**

			```json
			"A rendeléshez be kell jelentkeznie"
			```	
		-   **HTTP Státuszkód: 404 Not Found:**
			```json
			"Nem található a kiválasztott szállítási cím"
			```
		-   **HTTP Státuszkód: 400 Bad Request:**

			```json
			"Nincs termék a rendelésben"
			```
		-   **HTTP Státuszkód: 500 Internal Server Error:**

			```json
			"Hiba a rendelés felvétele közben"
			```

**Példa Használat**:

-   **Kérés:**
    ```typescript
	const createOrder = async (orderData: OrderData) => {
		try {
		const response = await fetch('/api/order', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			shippingAddressId: orderData.shippingAddressId,
			orderItems: orderData.orderItems.map(item => ({
				id: item.id,
				quantity: item.quantity,
			})),
			}),
		});

		if (!response.ok) {
			throw new Error("Sikertelen rendelés létrehozás");
		}

		const responseData = await response.json();
		console.log(responseData);
		} catch (error) {
		console.error("A szerver nem érhető el", error);
		}
	};
	```

Rendelési Adatok Lekérdezése API
---------------------------

**Végpont:** `GET /api/order`

**Leírás:**\
Ez az API végpont lehetővé teszi egy rendelés részleteinek lekérdezését azonosító alapján, beleértve az OrderItemeket, a felhasználó pár adatát, és a szállítási címet is.

**Hitelesítés:**

-   **Szükséges:** A felhasználónak be kell jelentkeznie (next-auth segítségével ellenőrzött).

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/order`
-   **Kérés Body (JSON):**

	```json
	{
		"orderId": 987
	}
	```
**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	{
		"orderId": 987,
		"totalPrice": 150.00,
		"status": "created",
		"createdAt": "2024-02-20T12:30:45Z",
		"updatedAt": "2024-02-20T12:30:45Z",
		"OrderItems": [
			{
				"id": 1,
				"name": "Product A",
				"quantity": 2,
				"price": 100.00
			},
			{
				"id": 2,
				"name": "Product B",
				"quantity": 1,
				"price": 50.00
			}
			// ... További OrderItem részletek
		],
		"User": {
			"id": 123,
			"username": "felhasznalonev",
			"email": "felhasznalo@email.com"
		},
		"ShippingAddress": {
			"id": 1,
			"recipient_name": "John Doe",
			"street_address": "123 Main Street",
			"city": "Cityville",
			"postal_code": "12345"
		}

	}

	```
-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**

		```json
		"A rendelési adatok lekéréséhez be kell jelentkeznie"
		```
	-   **HTTP Státuszkód: 404 Not Found:**

		```json
		"Nem található rendelés az azonosítóval: 987"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**

		```json
		"Hiba a rendelési adatok lekérdezése közben"
		```
**Példa Használat**:

-   **Kérés:**

	```typescript
	const getOrderDetails = async (orderId: number) => {
		try {
			const response = await fetch(`/api/order?id=${orderId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			});

			if (!response.ok) {
			throw new Error("Sikertelen rendelési adat lekérdezés");
			}

			const responseData = await response.json();
			console.log(responseData);
		}
		catch (error) {
			console.error(error);
		}
	};
	```

Összes Rendelés Lekérése API
---------------------------
**Végpont:** `GET /api/order/getall`

**Leírás:**\
Ez az API végpont lehetővé teszi az összes rendelés lekérdezését. Csak adminisztrátori jogosultsággal rendelkező felhasználók használhatják.

**Hitelesítés:**

-   **Szükséges:** Adminisztrátor: Csak az admin szerepű felhasználó használhatja (next-auth-al ellenőrizve).

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/order/getall`
-   **URL Paraméterek:**
    -   `page` (Opcionális): Az oldal száma (alapértelmezett: 1).
	-	`count` (Opcionális): A visszaadott rendelések száma oldalanként (alapértelmezett: 1)
    -   `type` (Opcionális): A rendelés típusa, érvényes értékek: 'created', 'preparing', 'shipping', 'completed', 'canceled' (alapértelmezett: 'created'). (Ha hibás a típus akkor az alapértelemezett típussal rendelkező rendeléseket adja vissza)

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	[
		{
			"id": 1,
			"total_price": 150.00,
			"created_at": "2024-02-20T12:30:45Z",
			"status": "created",
			"OrderItem": [
				{
					"id": 1,
					"name": "Product A",
					"quantity": 2,
					"price": 100.00,
					"product_id": 65,
				},
				{
					"id": 2,
					"name": "Product B",
					"quantity": 1,
					"price": 50.00,
					"product_id": 31,
				}
				// ... További rendelésitemek
			]
		},
		// ... További rendelések részletei
	]
	```
-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Csak adminos bejelentkezéssel lehet lekérni rendeléseket"
		```
	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található ilyen rendelés"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a rendelési adatok lekérdezése közben"
		```
**Példa Használat**:

-   **Kérés:**
	```typescript
	const getAllOrders = async (page = 1, type = 'created', count= 5) => {
		try {
		const response = await fetch(`/api/order/getall?page=${page}&type=${type}&count=${count}`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error("Sikertelen a rendelések lekérdezése");
		}
		const responseData = await response.json();
		console.log(responseData);
		}
		catch (error) {
		console.error(error);
		}
	};
	```

Rendelés Státusz Módosítása API
---------------------------
**Végpont:** `PUT /api/order/update`

**Leírás:**\
Ez az API végpont lehetővé teszi egy státusz frissítését (pl. elküldve, feldolgozás alatt, szállítás alatt stb.).

**Hitelesítés:**

-   **Szükséges:** Adminisztrátor: Csak az admin szerepű felhasználó használhatja (next-auth-al ellenőrizve).

**Kérés:**

-   **Metódus:** PUT
-   **Végpont:** `/api/order/update`
-   **Kérés Body (JSON):**
	```json
	{
		"orderId": 987,
		"newStatus": "completed"
		/*
			Lehetséges státuszok:
			- created
			- preparing
			- shipping
			- completed
			- canceled
 		*/
	}
	```
**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**

	```json
	{
		"order": {
			"orderId": 987,
			"totalPrice": 150.00,
			"createdAt": "2024-02-20T12:30:45Z",
			"status": "shipped",
			"OrderItems": [
				{
					"id": 1,
					"name": "Product A",
					"quantity": 2,
					"price": 100.00
				},
				{
					"id": 2,
					"name": "Product B",
					"quantity": 1,
					"price": 50.00
				}
				// ... További rendelésitemek
			]
		},
	}
	```

-   **Hiba Válaszok:**
    -   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Csak adminisztrátorok módosíthatják a rendelés státuszát"
		```

    -   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található rendelés az azonosítóval: 987"
		```


    -   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Érvénytelen státusz: shipped"
		```


    -   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a rendelés státuszának frissítése közben"
		```


**Példa Használat:**

-   **Kérés:**
	```typescript
	const updateOrderStatus = async (orderId: number, newStatus: string) => {
		try {
			const response = await fetch('/api/order/update', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					orderId,
					newStatus,
				}),
			});

			if (!response.ok) {
				throw new Error("Sikertelen rendelés státusz frissítés");
			}

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error("A szerver nem érhető el", error);
		}
	};
	```

Rendelés Lemondása API
----------------------
**Végpont:** `PUT /api/order/cancel`

**Leírás:**\
Ez az API végpont lehetővé teszi egy rendelés lemondását az azonosító alapján. A lemondás után a rendelés státusza "canceled" lesz.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés, adminisztrátorral bárki rendelését le lehet mondani

**Kérés:**

-   **Metódus:** PUT
-   **Végpont:** `/api/order/cancel`
-   **Kérés Body (JSON):**
	```json
	{
		"orderId": 987
	}
	```

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	"A rendelés sikeresen lemondva"
	```
-   **Hiba Válaszok:**

    -   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"A rendelés lemondásához be kell jelentkeznie"
		```

    -   **HTTP Státuszkód: 404 Not Found:**
		```json
		"A rendelés nem lemondható: 987"
		```

    -   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a rendelés lemondása közben"
		```

**Példa Használat**:

-   **Kérés:**
	```typescript
	const cancelOrder = async (orderId: number) => {
		try {
		const response = await fetch('/api/order/cancel', {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				orderId,
			}),
		});

		if (!response.ok) {
			throw new Error("Sikertelen rendelés lemondás");
		}

		const responseData = await response.json();
		console.log(responseData);
		} catch (error) {
		console.error("A szerver nem érhető el", error);
		}
	};
	```


# Felhasználó APIk
Regisztrációs API
---------------------------

**Végpont:** `POST /api/user/register`

**Leírás:**  
Ez a API végpont lehetővé teszi új felhasználók regisztrációját.

**Hitelesítés:**

-   **Nincs szükség hitelesítésre**

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/auth/register`
-   **Kérési Törzs (JSON):**
    -   `username`: A felhasználónév (legalább 3 karakter, maximum 30 karakter).
    -   `email`: Az e-mail cím (kötelező, maximum 255 karakter, érvényes e-mail formátum).
    -   `password`: A jelszó (tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	{
		"id": 123,
		"username": "felhasznalonev",
		"email": "felhasznalo@email.com"
	}
	```
-   **Hiba Válaszok:**
    -   **HTTP Státuszkód: 400 Bad Request:**
		```json
		// Egy lista a hibákról
		[
			"A felhasználónévnek legalább 3 karakternek kell lennie",
			"Már létezik ilyen e-mail címmel fiók",
			"A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot",
			// További hibák...
		]
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a regisztráció közben"
		```
**Példa használatra**:

-   **Kérés:**
    
	```typescript
	const registerUser = async (userData) => {
	      try {
	        const response = await fetch('/api/user/register', {
	          method: 'POST',
	          headers: {
	            'Content-Type': 'application/json',
	          },
	          body: JSON.stringify({
			      username: "felhasznalonev",
			      email: "felhasznalo@email.com",
			      password: "jelszo123",
				}),
	        });
	    
	        if (!response.ok) {
	          throw new Error("Sikertelen regisztráció");
	        }
	    
	        const responseData = await response.json();
	        console.log(responseData);
	      }
	      catch (error) {
	        console.error("A szerver nem érhető el", error);
	      }
	    };
	```

## Szállítási Cím API

Alapértelmezett Cím Beállítása API
---------------------------

**Végpont:** `POST /api/user/address/default`

**Leírás:**  
Ez a végpont lehetővé teszi az alapértelmezett szállítási cím beállítását a felhasználó számára.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/user/address/default`
-   **Kérés Body (JSON):**
	```json
	{
		"addressId": 123
	}
	```
**Válasz:**
-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	"Az alapértelmezett cím sikeresen beállítva"
	```
-   **Hiba Válaszok:**
    -   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Az adott cím nem létezik vagy nem tartozik a felhasználóhoz"
		```
	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Nincs bejelentkezve"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba az alapértelmezett cím beállításakor"
		```
   
   **Példa használatra:**
   - **Kérés:**
		```typescript
		const handleDefaultClick = async () => {
		    try {
		        const response = await fetch('/api/user/address/default', {
		            method: 'POST',
		            headers: {
		                'Content-Type': 'application/json',
		            },
		            body: JSON.stringify({ 
			            addressId: 123,
		            }),
		        });

		        const responseBody = await response.json();

		        if (!response.ok) {
		            console.error(`Hiba a cím alapértelmezése közben: ${responseBody}`);
		        } else {
		            console.log('Alapértelmezett cím sikeresen beállítva');
		        }
		    } catch (error) {
		        console.error('A szerver nem érhető el', error);
		    }
		};
		```
Alapértelmezett Cím Lekérdezése API
---------------------------

**Végpont:** `GET /api/user/address/default`

**Leírás:**  
Ez a végpont visszaadja a felhasználó alapértelmezett szállítási címének tartalmát.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/user/address/default`

**Válasz:**

-   **Sikeres Válaszok:**
    **HTTP Státuszkód: 200 OK:**
	```json
	{
		"id": 1,
		"user_id": 123,
		"street": "Kossuth utca 1.",
		"city": "Budapest",
		"zip_code": "1055",
		"is_default_address": 1
	}
	```

-   **Hiba Válaszok:**
	-  **HTTP Státuszkód: 404 Not Found:**
	(Ennek csak akkor kéne előfordulnia ha a felhasználónak egy címe sincs)
		```json
		"Nincs alapértelmezett szállítási címe"
		```

    -   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Nincs bejelentkezve"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**	 
		```json
		"Hiba a felhasználó alapértelmezett szállítási címének lekérdezése közben"
		```
   **Példa használatra:**
   - **Kérés:**
		```typescript
		const getDefaultAddress = async () => {
		    try {
		        const response = await fetch('/api/user/address/default');

		        if (!response.ok) {
		            throw new Error("Sikertelen cím lekérdezés");
		        }
		        const responseData = await response.json();
		        console.log(responseData);
		        
		    } catch (error) {
		        console.error("A szerver nem érhető el", error);
		    }
		};
		```

Felhasználói Cím Törlése API
---------------------------

**Végpont:** `DELETE /api/user/address/delete`

**Leírás:**  
Ez a API végpont lehetővé teszi egy felhasználóhoz tartozó szállítási cím törlését.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés

**Kérés:**

-   **Metódus:** DELETE
-   **Végpont:** `/api/user/address/delete`
-   **Kérés Body (JSON):**
	```json
	{
		"addressId": 123
	}
	```
**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	"A cím sikeresen törölve"
	```
    
-   **Hiba Válaszok:**
    
    -   **HTTP Státuszkód: 401 Unauthorized:**
        
		```json
		"Nincs bejelentkezve"
		```
    
	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Az adott cím nem létezik vagy nem tartozik a felhasználóhoz"
		```
    
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a cím törlésekor"
		```
        

**Példa Használatra**:

-   **Kérés:**
	```typescript
	const handleDeleteClick = async () => {
		// Nem kötelező, de valami confirm a usernek nagyon erősen ajánlott
	    const isConfirmed = window.confirm("Biztosan törölni szeretnéd ezt a címet?");
	    if (!isConfirmed) {
	        return;
	    }
	    try {
	        const response = await fetch('/api/user/address/delete', {
	            method: 'DELETE',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify({ addressId: 123 }),
	        });
	        const responseBody = await response.json();
	        if (!response.ok) {
	            console.error(`Hiba a cím törlése közben: ${responseBody.error}`);
	            // Handle error appropriately, e.g., show an error message to the user
	        } else {
	            console.log('Cím sikeresen törölve');
	            // Az oldal frissítése
	            reload();
	        }
	    } catch (error) {
	        console.error('A szerver nem elérhető:', error);
	        // Handle the error appropriately, e.g., show a general error message
	    } 
	};
	```

Felhasználói Cím Feltöltése API
---------------------------

**Végpont:** `POST /api/user/address/upload`

**Leírás:**  
Ez a API végpont lehetővé teszi egy felhasználóhoz tartozó szállítási cím feltöltését vagy frissítését.

**Hitelesítés:**

-   **Szükséges:** A felhasználónak be kell lennie jelentkezve (next-auth-al ellenőrizve).

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/user/address/upload`
-   **Kérés Body (JSON):**

	```json
	// !!! FONTOS !!!: Ha szerepel ID a bodyban akkor az API ezt az ID-vel rendelkező címet frissíti az adatokkal
	// Ilyenkor nem muszály megadni minden mezőt
	"id": 123, 
	"recipient_name": "John Doe",
	"street_address": "123 Main Street",
	"country": "Country",
	"city": "City",
	"state": "State",
	"postal_code": "12345",
	```
**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	{
		"id": 123,
		"recipient_name": "John Doe",
		"street_address": "123 Main Street",
		"country": "Country",
		"city": "City",
		"state": "State",
		"postal_code": "12345",
		"is_default_address": 1
	}
	```
-   **Hiba Válaszok:**
    
    -   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Nincs bejelentkezve"
		```
    
	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		// Egy lista a hibákról
		[
		  "A mező kötelező",
		  "A mező maximum 255 karakter hosszú lehet",
		  // További hibák
		]
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a cím feltöltése közben"
		```
        

**Példa használatra**:

-   **Kérés:**
	```typescript
	const uploadAddress = async (addressData) => {
	  try {
	    const response = await fetch('/api/user/address/upload', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
	        id: addressData.id || null, 
	        recipient_name: addressData.recipient_name,
	        street_address: addressData.street_address,
	        country: addressData.country,
	        city: addressData.city,
	        state: addressData.state,
	        postal_code: addressData.postal_code,
	      }),
	    });

	    if (!response.ok) {
	      throw new Error("Sikertelen cím feltöltés");
	    }

	    const responseData = await response.json();
	    console.log(responseData);
	  }
	  catch (error) {
	    console.error("A szerver nem érhető el", error);
	  }
	};
	```

# Fórum APIk
Ez a szekció a fórum részről szól
## Poszt APIk

Itt a fórumon belül a posztokkal kapcsolatos APIk találahtók

Poszt Keresés API
---------------------------
**Végpont:** `GET /api/post/search`

**Leírás:**\
Ez az API végpont lehetővé teszi bejegyzések keresését a megadott keresési feltételek alapján, beleértve a címét, szövegét és kategóriáját.

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/post/search`
-   **URL Paraméterek:**
	-   `query` (Opcionális): A keresési kifejezés, mely lehet a bejegyzés címében vagy szövegében (ha kategória benne van a kategóriát is bele veszi).
	-   `category` (Opcionális): A kategória neve, amelybe a bejegyzés tartozik (ami nem felel meg ennek nem adja vissza).
	-   `count` (Opcionális): A lekérdezés során visszaadott bejegyzések száma oldalanként (alapértelmezett: 10).
	-   `page` (Opcionális): Az oldalszám a lapozáshoz (alapértelmezett: 1).
	- (Ha nincs megadva semmi visszaadja a legújabb 10 posztot)


**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	[
		{
			"id": 1,
			"title": "Bejegyzés Címe",
			"text": "Bejegyzés szövege...",
			"category": "Mexikói",
			"user": {
				"id": 123,
				"username": "felhasznalonev",
				"image": "public/profile_images/emberkeképe"
			},
			"comments": [
				{
					"id": 1,
					"text": "Hozzászólás szövege...",
					"user": {
						"id": 456,
						"username": "masikfelhasznalo",
						"image": "public/profile_images/emberkeképe"
					},
					"created_at": "2024-02-20T12:30:45Z"
				}
				// ... További hozzászólások
			],
			"created_at": "2024-02-20T12:30:45Z",
			"updated_at": "2024-02-21T10:15:30Z"
		},
	// ... További posztok
	]
	```

-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 400 Internal Server Error:**
		```json
		"Hibás lekérdezési paraméterek"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a posztok keresése közben"
		```

**Példa Használat**:

- **Kérés:**
	```typescript
	const searchPosts = async (query?: string, category?: string, count?: number, page?: number) => {
		try {
		// Query paraméterek megépítése
		const queryParams = new URLSearchParams();
		if (query) queryParams.append('query', query);
		if (category) queryParams.append('category', category);
		if (count) queryParams.append('count', count.toString());
		if (page) queryParams.append('page', page.toString());

		const response = await fetch(`/api/post/search?${queryParams.toString()}`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error("Sikertelen posztkeresés");
		}

		const responseData: PostType[] = await response.json();
		console.log(responseData);
		} catch (error) {
		console.error(error);
		}
	};
	```

Poszt Létrehozása API
---------------------------
**Végpont:** `POST /api/post`

**Leírás:**\
Ez az API végpont lehetővé teszi egy új poszt létrehozását a megadott címmel, szöveggel és kategóriával.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés.

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/post`
-   **Kérés Body (JSON):**
	```json
	{
		"title": "Poszt Címe",
		"text": "Poszt szövege...",
		"category": "Posztkategória"
	}
	```

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	{
		"id": 1,
		"title": "Poszt Címe",
		"text": "Poszt szövege...",
		"user_id": 123,
		"category_id": 456,
		"created_at": "2024-02-20T12:30:45Z",
		"updated_at": "2024-02-20T12:30:45Z"
	}
	```

-   **Hiba Válaszok:**
	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		{
			"A posztoláshoz be kell jelentkeznie"
		}
		```

	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		{
			"A címnek legalább 4 karakternek kell lennie" 
			// Itt pontos hibakódot ad az API arról hogy mi rossz
		}
		```


	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		{
			"Nincs ilyen posztkategória"
		}
		```


	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		{
			"Hiba a poszt létrehozása közben"
		}
		```


**Példa Használat**:

-   **Kérés:**	
	```typescript
	const createPost = async (postData: PostData) => {
		try {
		const response = await fetch('/api/post', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			title: postData.title,
			text: postData.text,
			category: postData.category,
			}),
		});

		if (!response.ok) {
			throw new Error("Sikertelen poszt létrehozás");
		}

		const responseData = await response.json();
		console.log(responseData);
		}
		catch (error) {
		console.error("A szerver nem érhető el", error);
		}
	};
	```


Poszt Lekérése API
---------------------------
**Végpont:** `GET /api/post`

**Leírás:**\
Ez az API végpont lehetővé teszi egy adott poszt részletes lekérdezését az azonosító alapján, beleértve a hozzászólásokat, a kategóriát és a felhasználói információkat.

**Kérés:**

-   **Metódus:** GET
-   **Végpont:** `/api/post`
-   **URL Paraméterek:**
	-   `id` (Kötelező): A poszt azonosítója.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	{
		"id": 1,
		"title": "Poszt Címe",
		"text": "Poszt szövege...",
		"created_at": "2024-02-20T12:30:45Z",
		"updated_at": "2024-02-20T14:45:30Z",
		"Category": {
			"name": "Kategória Neve"
		},
		"User": {
			"id": 123,
			"username": "Felhasználói név",
			"image": "felhasznalo-kep.jpg"
		},
		"Comment": [
			{
				"id": 1,
				"text": "Hozzászólás szövege...",
				"User": {
					"id": 456,
					"username": "Hozzászóló Felhasználó",
					"image": "hozzaszolo-kep.jpg"
				},
				"created_at": "2024-02-20T13:15:00Z",
				"updated_at": "2024-02-20T13:45:30Z"
			},
			// ... További hozzászólások
		]
	}
	```
-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Nem létező vagy hibás poszt azonosító a kérésben"
		```
	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található ilyen poszt"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a poszt lekérése közben"
		```

**Példa Használat**:

-   **Kérés:**

	```typescript
	const getPostDetails = async (postId: number) => {
		try {
		const response = await fetch(`/api/post?id=${postId}`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error("Sikertelen poszt lekérdezés");
		}

		const responseData = await response.json();
		console.log(responseData);
		}
		catch (error) {
		console.error("A szerver nem érhető el", error);
		}
	};
	```

Poszt Törlése API
---------------------------
**Végpont:** `DELETE /api/post`

**Leírás:**\
Ez az API végpont lehetővé teszi egy poszt törlését az azonosítója alapján. Csak a poszt létrehozója vagy adminisztrátor jogosultsággal rendelkező felhasználó tudja törölni a posztot. A poszttal a hozzátartozó kommentek is automatikusan törlődnek

**Hitelesítés:**

-   **Szükséges:** 
	- Bejelentkezés saját poszt törléséhez. 
	- Adminos bejelentkezés akármelyik poszt törléséhez.

**Kérés:**

-   **Metódus:** DELETE
-   **Végpont:** `/api/post`
-   **URL Paraméterek:**
	-   `id`: A törlendő poszt azonosítója.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	"A poszt sikeresen törölve lett"
	```

-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Csak bejelentkezett felhasználók törlőhetnek posztokat"
		```

	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található ilyen poszt vagy nem törölheted"
		```

	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a poszt törlése közben"
		```

**Példa Használat**:

-   **Kérés:**
	```typescript
	const deletePost = async (postId: number) => {
		try {
			const response = await fetch(`/api/post?id=${postId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error("Sikertelen poszt törlés");
			}

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error(error.message);
		}
	};
	```

Komment/hozzászólás Létrehozása API
---------------------------
**Végpont:** `POST /api/comment`

**Leírás:**\
Ez az API végpont lehetővé teszi új Komment létrehozását egy adott poszthoz.

**Hitelesítés:**

-   **Szükséges:** Bejelentkezés.

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/comment`
-   **Kérés Body (JSON):**

	```json
	{
		"text": "Hozzászólás szövege...",
		"postId": 123
	}
	```

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**

	```json
	{
		"id": 1,
		"text": "Hozzászólás szövege...",
		"user_id": 456,
		"post_id": 123,
		"created_at": "2024-02-20T12:30:45Z",
		"updated_at": "2024-02-20T12:30:45Z"
	}
	```

-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"A hozzászóláshoz be kell jelentkeznie"
		```



	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"A hozzászólásnak legalább 1 karakternek kell lennie"
		// Itt pontos hibakódot ad az API arról hogy mi rossz
		```

	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"A megadott poszt nem található"
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a hozzászólás létrehozása közben"`
		```
**Példa Használat**:
-   **Kérés:**
	```typescript
	const createComment = async (commentData: CommentData) => {
		try {
		const response = await fetch('/api/post/comment', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			text: commentData.text,
			postId: commentData.postId,
			}),
		});

		if (!response.ok) {
			throw new Error("Sikertelen hozzászólás létrehozás");
		}

		const responseData = await response.json();
		console.log(responseData);
		}
		catch (error) {
		console.error("A szerver nem érhető el", error);
		}
	};
	```

Komment/hozzászólás Törlése API
---------------------------
**Végpont:** `DELETE /api/post/comment`

**Leírás:**\
Ez az API végpont lehetővé teszi egy komment törlését az azonosítója alapján. Csak a komment létrehozója vagy adminisztrátor jogosultsággal rendelkező felhasználó tudja törölni a kommentet.

**Hitelesítés:**

-   **Szükséges:** 
	- Bejelentkezés saját komment törléséhez. 
	- Adminos bejelentkezés akármelyik komment törléséhez.

**Kérés:**

-   **Metódus:** DELETE
-   **Végpont:** `/api/post/comment`
-   **URL Paraméterek:**
	-   `id`: A törlendő hozzászólás azonosítója.

**Válasz:**

-   **Sikeres Válasz (HTTP Státuszkód: 200 OK):**
	```json
	"A hozzászólás sikeresen törölve lett"
	```

-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Csak bejelentkezett felhasználók törlőhetnek hozzászólásokat"
		```

	-   **HTTP Státuszkód: 404 Not Found:**
		```json
		"Nem található ilyen hozzászólás vagy nem törölheted"
		```

	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a hozzászólás törlése közben"
		```

**Példa Használat**:

-   **Kérés:**

	```typescript
	const deleteComment = async (commentId: number) => {
		try {
			const response = await fetch(`/api/post/comment?id=${commentId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error("Sikertelen komment törlés");
			}

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error(error.message);
		}
	};
	```












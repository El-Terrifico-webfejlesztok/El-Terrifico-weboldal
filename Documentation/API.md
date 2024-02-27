


# Termék APIk

### Termék Keresési API

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

### Termék Kategóriák API

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

### Termék Feltöltési API

**Végpont:** `POST /api/product/upload`

**Leírás:**  
Ez az API végpont lehetővé teszi új termékek feltöltését. Fontos hogy a képek feltöltését nem ez az API kezeli

**Hitelesítés:**
-  **Szükséges:** Adminisztrátor: Csak az admin szerepű felhasználó használhatja (next-auth-al ellenőrizve).

**Kérés:**
-   **Metódus:** POST
-   **Végpont:** `/api/product/upload`
-   **Kérés Body (JSON):**
    
	```json
	{
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

### Termék Képfeltöltési API

**Végpont:** `POST /api/product/uploadimage`

**Leírás:**  
Ez a API végpont lehetővé teszi termékhez tartozó képek feltöltését.

**Hitelesítés:**

-  **Szükséges:** Adminisztrátor: Csak az admin szerepű felhasználó használhatja (next-auth-al ellenőrizve).

**Kérés:**

-   **Metódus:** POST
-   **Végpont:** `/api/product/uploadimage`
-   **Adatok (HTTP multipart request):**
    -   `product_id`: A termék azonosítója, amelyhez a képet csatolni kívánjuk.
    -   `file`: A feltöltendő képfájl.

**Válasz:**
-   **Sikeres Válasz (HTTP Státuszkód: 201 Created):**
	```json
	{
		"product_id": 123,
		"image_path": "public/product_images/abc123_image.jpg"
	}
	```
-   **Hiba Válaszok:**
    -   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"Product ID vagy kép hiányzik a requestből" 
		```
	-   **HTTP Státuszkód: 401 Unauthorized:**
		```json
		"Unauthorized"
		```
	-   **HTTP Státuszkód: 400 Bad Request:**
		```json
		"A kép túllépi a 10MB képméret határt"
		// Ha a képméret határ változna, az API válasz tükrözné azt
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**
		```json
		"Hiba a termékkép feltöltése közben"
		```
**Példa használatra**:

-   **Kérés:**
    
	```typescript
	const uploadImage = async (productId: number, file: File) => {
	      try {
	        const formData = new FormData();
	        formData.append('product_id', productId.toString());
	        formData.append('file', file);
	    
	        const response = await fetch('/api/product/uploadimage', {
	          method: 'POST',
	          body: formData,
	        });
	    
	        if (!response.ok) {
	          throw new Error("Sikertelen képfeltöltés!");
	        }
	    
	        const responseData = await response.json();
	        console.log(responseData);
	      }
	      catch (error) {
	        console.error("A szerver nem érhető el", error);
	      }
	    };
	```
-   **HTML példa:**
	```html
	<input type="file" id="fileInput" accept="image/*">
	<button onclick="uploadImage()">Képfeltöltés</button>
	<script> 
		const uploadImage = async () => {
		    const fileInput = document.getElementById('fileInput');
		    const file = fileInput.files[0];
		    const productId = 123; // Az aktuális termék azonosítója

		    await uploadImage(productId, file);
		}; 
	</script>
	```
# Felhasználó APIk
### Regisztrációs API

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

### Alapértelmezett Cím Beállítása API

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
### Alapértelmezett Cím Lekérdezése API

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

### Felhasználói Cím Törlése API

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

### Felhasználói Cím Feltöltése API

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
































# BESOROLANDÓ

### Rendelés Létrehozó API

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
			{
				"error": "A rendeléshez be kell jelentkeznie"
			}
			```	
		-   **HTTP Státuszkód: 404 Not Found:**
			```json
			{
				"error": "Nem található a kiválasztott szállítási cím"
			}
			```
		-   **HTTP Státuszkód: 400 Bad Request:**

			```json
			{
				"error": "Nincs termék a rendelésben"
			}
			```
		-   **HTTP Státuszkód: 500 Internal Server Error:**

			```json
			{
				"error": "Hiba a rendelés felvétele közben"
			}
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

### Rendelési Adatok Lekérdezése API

**Végpont:** `GET /api/order`

**Leírás:**\
Ez az API végpont lehetővé teszi egy rendelés részleteinek lekérdezését azonosító alapján, beleértve az OrderItemeket is.

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
		"createdAt": "2024-02-20T12:30:45Z",
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
		]
	}
	```
-   **Hiba Válaszok:**

	-   **HTTP Státuszkód: 401 Unauthorized:**

		```json
		{
			"error": "A rendelési adatok lekéréséhez be kell jelentkeznie"
		}
		```
	-   **HTTP Státuszkód: 404 Not Found:**

		```json
		{
			"error": "Nem található rendelés az azonosítóval: 987"
		}
		```
	-   **HTTP Státuszkód: 500 Internal Server Error:**

		```json
		{
			"error": "Hiba a rendelési adatok lekérdezése közben"
		}
		```
**Példa Használat**:

-   **Kérés:**

	```typescript
	const getOrderDetails = async (orderId) => {
		try {
			const response = await fetch('/api/order', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				orderId: orderId,
			}),
			});

			if (!response.ok) {
			throw new Error("Sikertelen rendelési adat lekérdezés");
			}

			const responseData = await response.json();
			console.log(responseData);
		}
		catch (error) {
			console.error(error.message);
		}
	};
	```
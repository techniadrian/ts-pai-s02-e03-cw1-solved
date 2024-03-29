# Ćwiczenie 1

### Struktura folderów

1. Utwórz brakujące foldery i pliki według poniższego opisu:

```
📂 src
├── 📂 api
│   └── 📂 animals
│   │   ├── 📜 animals.controllers.js
│   │   ├── 📜 animals.routes.js
│   │   └── 📜 index.js
│   └── 📜 index.js
└── 📜 app.js
```

---

### Folder animals

2. W pliku `animals.controllers.js` stwórz i wyeksportuj poniższe funkcje pełniące rolę kontrolerów:

- `listAnimals`
- `retrieveAnimal`
- `createAnimal`
- `updateAnimal`
- `modifyAnimal`
- `deleteAnimal`

Każda funkcja powinna przyjmować w argumentach `req` (obiekt żądania) i `res` (obiekt odpowiedzi).
Ciała tych funkcji narazie pozostaw puste.

3. W pliku `animals.routes.js` stwórz stałą `animals` i przypisz do niej router. Użyj do tego funkcji `express.Router()`.

4. Do pliku `animals.routes.js` zaimportuj wszystkie kontrolery z pliku `animals.controllers.js`.

5. Utwórz 6 endpointów dla routera `animals`:

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `PATCH /:id`
- `DELETE /:id`

6. Do każdego utworzonego endpointa przekaż odpowiedni kontroler jako funkcja obsługująca żądanie.

7. Wyeksportuj router `animals` za pomocą `export default`.

8. W pliku `src/api/animals/index.js` zaimportuj router `animals` i wyeksportuj go za pomocą `export default`.

---

### Podpięcie routerów

9. W pliku `src/api/index.js` stwórz stałą `api` i przypisz do niej router.

10. Do routera `api` podepnij router `animals` dla trasy `/animals`. Użyj do tego metody `api.use(...)`.

11. W pliku `src/app.js` analogicznie jak w punkcie 10. - do aplikacji `app` podepnij router `api` dla trasy `/api`. Użyj do tego metody `app.use(...)`

---

### Fałszywa baza danych

12. Wróć do pliku `animals.controllers.js`. Na samej górze pliku stwórz fałszywą bazę danych:

```js
let animals = [
  { id: 1, kind: 'dog', name: 'Rocky' },
  { id: 2, kind: 'dog', name: 'Max' },
  { id: 3, kind: 'cat', name: 'Whiskers' },
];
let nextId = 4;
```

---

### GET /api/animals

Odpowiedzi na przykładowe żądania:

- dla `GET /api/animals` powinno zwracać wszystkie zwierzęta znajdujące się w zmiennej `animals`.
- dla `GET /api/animals?kind=dog` powinno zwracać wszystkie psy znajdujące się w zmiennej `animals`.

13. Wewnątrz funkcji `listAnimals` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `query` z obiektu `req`.
- za pomocą destrukturyzacji wyjmij `kind` z obiektu `query`.
- stwórz stałą `filteredAnimals` i przypisz do niej przefiltrowaną tablicę na podstawie `kind`. Pamiętaj, że `kind` może być `undefined` - w takim przypadku w odpowiedzi należy zwrócić wszystkie zwierzęta.
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `200`, a response body to json, w którym jest pole `data`. Pole `data` to tablica zwierząt.

---

### GET /api/animals/:id

Odpowiedzi na przykładowe żądania:

- dla `GET /api/animals/1`:

```json
{
  "data": {
    "id": 1,
    "kind": "dog",
    "name": "Rocky"
  }
}
```

- dla `GET /api/animals/999`:

```json
{
  "data": null
}
```

14. Wewnątrz funkcji `retrieveAnimal` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `params` z obiektu `req`.
- za pomocą destrukturyzacji wyjmij `id` z obiektu `params`.
- stwórz stałą `animal` i przypisz do niej znalezione zwierzę. Użyj do tego funkcji `animals.find()`. Pamiętaj o tym, że wszystkie pola w `params` mają wartość `string`. A więc należy przekonwertować `id` na liczbę.
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `200`, a response body to json, w którym jest pole `data`. Pole `data` to znalezione zwierzę lub `null`, gdy nie udało się znaleźć.

---

### POST /api/animals/

15. Wewnątrz funkcji `createAnimal` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `body` z obiektu `req`.
- stwórz stałą `newAnimal` i przypisz do niej obiekt składający się ze wszystkich pól należących do `body` (użyj spread operatora) oraz stwórz nowe pole `id` i przypisz do niego wartość jaka jest przechowywana w zmiennej `nextId`. Dokonaj postinkrementacji `nextId` bezpośrednio podczas przypisywania wartości do pola `id`.
- do tablicy `animals` dorzuć `newAnimals`.
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `201`, a response body to json, w którym jest pole `data`. Pole `data` to nowo utworzone zwierzę.

---

### PUT /api/animals/:id

16. Wewnątrz funkcji `updateAnimal` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `params` i `body` z obiektu `req`.
- za pomocą destrukturyzacji wyjmij `id` z obiektu `params`.
- stwórz stałą `animalIndex` i przypisz do niej indeks zwierzęcia o podanym identyfikatorze - użyj do tego `animals.findIndex()`. Pamiętaj o konwersji `params.id` na liczbe.
- stwórz stałą `newAnimal` i przypisz do niej obiekt składajacy się ze wszystkich pól należących do `body` (użyj spread operatora) oraz ustaw wartość pola `id` na wartość z `params.id`.
- zaktualizuj tablicę `animals` zastępując stary obiekt nowym. Użyj do tego funkcji `animals.with()`
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `200`, a response body to json, w którym jest pole `data`. Pole `data` to zaktualizowane zwierzę.

---

### PATCH /api/animals/:id

16. Wewnątrz funkcji `modifyAnimal` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `params` i `body` z obiektu `req`.
- za pomocą destrukturyzacji wyjmij `id` z obiektu `params`.
- stwórz stałą `animalIndex` i przypisz do niej indeks zwierzęcia o podanym identyfikatorze - użyj do tego `animals.findIndex()`. Pamiętaj o konwersji `params.id` na liczbe.
- stwórz stałą `oldAnimal` i przypisz do niej obiekt z tablicy `animals` znajdujący się w tablicy `animals` pod indeksem `animalIndex`.
- stwórz stałą `newAnimal` i przypisz do niej obiekt składajacy się ze wszystkich pól należących do `oldAnimal`, a następnie przypisz do niej obiekt składajacy się ze wszystkich pól należących do `body`.
- zaktualizuj tablicę `animals` zastępując stary obiekt nowym. Użyj do tego funkcji `animals.with()`
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `200`, a response body to json, w którym jest pole `data`. Pole `data` to zaktualizowane zwierzę.

### DELETE /api/animals/:id

17. Wewnątrz funkcji `deleteAnimal` dodaj logikę:

- za pomocą destrukturyzacji wyjmij `params` z obiektu `req`.
- za pomocą destrukturyzacji wyjmij `id` z obiektu `params`.
- zaktualizuj tablicę `animals` tak, aby usunąć z niej zwierzę o podanym id. Użyj do tego `animals.filter()`.
- użyj obiektu `res`, aby wygenerować odpowiedź na żądanie. Status to `204`, a response body jest pusty.

### Techni Postman

18. Uruchom techni postman w drugim terminalu (`npm run postman`).
19. Przetestuj wszystkie endpointy.

# TinyMart: Product Catalog and Cart System in TypeScript

This project is a small e-commerce simulation written in TypeScript, modeling different types of products (audio, video, and books) and allowing a customer to manage a shopping cart.
It demonstrates core Object-Oriented Programming (OOP) principles such as inheritance, polymorphism, and encapsulation.
The program:
- Defines a Product base class with common attributes.
- Implements six subclasses for specific product types:
  - `AudioProduct`
  - `VideoProduct`
  - `EBook`
  - `PaperBook`
- Includes a Cart class to manage a customer's purchases.
  
---
## Files

- `tinymart.ts` - Main TypeScript source file containing class definitions and the driver `main()` function.
---

## How to Run

### **1. Ensure you have Node.js and TypeScript installed and environment is set up**
   To set it up:
   ```bash
   npm install -g typescript
   ```
   
### **2. Compile the TypeScript File**
  This will convert your .ts file to JavaScript:
  ```bash
   tsc tinymart.ts
   ```
  This will create a tinymart.js file in the same directory.
  
### **3. Run the Compiled JavaScript File**
   ```bash
   node tinymart.js
   ```
An output similar to the sample cart output below will be displayed, including product listings and the summary.

### Sample Output

```
My Cart
======

Cart Owner: John Smith

[Music]
Product ID: 1   Product Name: Yesterday
Price: $16.5    Product Review Rate: 9.8
Singer Name: Beetles 
Genre: Pop

[Music]
Product ID: 3   Product Name: We are the World
Price: $13.75    Product Review Rate: 9.1
Singer Name: Michael Jackson
Genre: Country

[Movie]
Product ID: 4   Product Name: Sound of Music
Price: $22    Product Review Rate: 9.2
Release Year: 1965
Film Rating: G
Runtime: 175
Director Name: Robert Wise

[Movie]
Product ID: 5   Product Name: Star Wars
Price: $22    Product Review Rate: 8.5
Release Year: 1977
Film Rating: PG
Runtime: 120
Director Name: George Lucas

[E book]
Product ID: 6   Product Name: The old Man and the Sea
Price: $8.3    Product Review Rate: 9.5
Author: Ernest Hemmingway Pages: 127

===== Summary of Purchase ======
Total number of purchases: 5
Total purchasing amount: $82.55
Average cost: $16.51
```
---

## Test Cases in `main()`

The `main()` function performs the following operations:
- Creates:
  - 3 `AudioProduct` objects
  - 2 `VideoProduct` objects
  - 1 `EBook` object
  - 1 `PaperBook` object
  - 1 extra `AudioProduct` (optional)
  - 1 `Cart` object
- Adds all products to the cart (up to maximum allowed items).
- Removes two products from the cart.
- Displays the final cart contents.
---

## Features Demonstrated

- **Abstract Classes and Methods:** `Product` defines abstract methods `getProdTypeStr()` and `displayContentsInfo()`.
- **Inheritance:** Audio, video, and book products inherit from `Product`.
- **Polymorphism:** Different product types are treated uniformly in the `Cart` class.
- **Enums:** Used for genres and film ratings.
- **Encapsulation:** Private fields with getter/setter methods.
- **Type Safety:** Enforced through TypeScript's type system.
---

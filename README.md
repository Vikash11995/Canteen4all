## to run this project in your system follow these steps

```
cd Canteen4all
npm i
npm run dev
```

## Mock Data Approaches
In this app, mock data is utilized mainly for demonstration and development purposes. Below are the primary approaches used:

1. **In-Memory Arrays:**
   - Product data is mocked in a local JavaScript file (e.g., `src/product.js`). This array of product objects is imported and mapped in the Home page to simulate product listings.

2. **Redux Store for Users and Cart:**
   - User and cart data are handled in Redux slices (`authSlice`, `Cart`). While some initial state (e.g., default users) may be hardcoded, all operations—such as adding new users on sign-up or updating the cart—are performed in-memory, mimicking real world interactions without a backend.

3. **No Backend/API:**
   - All authentication, cart, and product data exist only on the frontend. Login, sign-up, and other stateful features are managed through state (React, Redux), and default data is reset on page reload.

These strategies allow the app to run independently without setting up a backend, making it easy to test features and UI during development.



## Frameworks/Libraries

1. React-Router
2. react-redux
3. tailwind
4. react-icons

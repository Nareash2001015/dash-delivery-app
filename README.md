# Dash Delivery app
The application will allow clients of the courier service to create and track shipments as users via their own account.

## Instruction to run the backend
1) Move to the cloned directory to the following path
    - ./dash-delivery-app/backend
2) Create a database in your local postgresql server.
3) Create a file with the name config.ts and add the following contents.
```
// Backend configuration
export const PORT: number = xxxx;

// Database configurations
export const DATABASE: string = 'xxxx';
export const HOSTNAME: string = 'localhost';
export const USERNAME: string = 'xxxx';
export const PASSWORD: string = 'xxxx';


// JWT configurations
export const JWT_SECRET: string = "xxxx"

// Frontend related configuration
export const CLIENT_BASE_URL: string = "xxxx";
```
Ensure that 
 - DATABASE is the name of the database you have created
 - CLIENT_BASE_URL is the url of the frontend application ( to enable CORS privileges for that specific url or domain)
 - PORT should be free to execute the application
4) Execute the following commands
```
npm install 
npm run dev
```
## Instruction to run the frontend

1) Move to the cloned directory to the following path
    - ./dash-delivery-app/frontend/src
2) Create a file with the name config.ts and add the following contents.
```
export const BACKEND_BASE_URL: string = "xxxx";
```
Ensure that 
 - BACKEND_BASE_URL is the url of the backend application
    
3) Move back to the path
     - ./dash-delivery-app/frontend
4) Execute the following commands
```
npm install 
npm run dev
```
## Queries to check the admin functions
- For the security purpose there is no option to register admin via the application.
- The database administrator or super admin will be adding the admin to the system.
- Execute the following query.
```
curl --location 'localhost:<PORT>/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Admin",
    "email": "admin@gmail.com",
    "address": "Halflife, Sri lanka",
    "password": "Admin__Admin123",
    "role": "admin"
}'
```
` PORT should be replaced with the port which backend is running `
- Use the following credentials to check the functionality of admin
```
Email :- admin@gmail.com
Password :- Admin__Admin123
```

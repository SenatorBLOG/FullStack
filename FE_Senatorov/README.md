# Create vite react project for client side
npm create vite@latest -- --template react
cd client
npm install
npm install bootstrap react-icons axios react-router-dom
npm run dev

# Create server side
create new folder named server 
npm init -y inside server 
npm install express nodemon axios cors mongoose
create server.js manualy and change package.json {{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.13.2",
    "cors": "^2.8.5",
    "express": "^5.2.1",
    "mongoose": "^9.0.0",
    "nodemon": "^3.1.11"
  }
}
}
then youy can run it npm run

atlas



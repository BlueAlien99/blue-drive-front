# BlueDrive Frontend

## Quick start

### To start a development server
```
npm install
npm start
```

### To build and serve the website using Docker (port 8100)

```
cd ..
./blue-drive-front/docker/build-and-serve.sh
./blue-drive-front/docker/nginx.sh
```

`build-and-serve.sh` serves frontend from a docker container on port 8090.

`nginx.sh` is a container with an nginx server which acts as a proxy to both frontend and backend. You need it so that the frontend can correctly communicate with a backend.

**You'll also need to start the backend on port 8095.**

~~Static files will show up in `./blue-drive-front/public`.~~
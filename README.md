# lpp-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Docker
Building the Docker image: 

`docker image build -t lpp-frontend:1.0.0 .`

Running the Docker image:

`docker container run --publish 3000:8080 --name lpp-frontend lpp-frontend:1.0.0`

Removing the Docker image:

`docker container rm --force lpp-frontend`
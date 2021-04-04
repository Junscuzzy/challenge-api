# Challenge project's API

A simple Node.js Rest API using Typescript, Express and MongoDB

> https://medium.com/@shreyamduttagupta/api-authentication-using-passport-js-and-json-web-tokens-a6094df40ab0
> https://medium.com/swlh/set-up-an-express-js-app-with-passport-js-and-mongodb-for-password-authentication-6ea05d95335c#8e47
## Dev

### Dependencies

Node 15
Npm 7
MongoDB

### Run the app 

```sh
npm run start
```

### Managing the MongoDB Service

MongoDB installs as a systemd service, which means that you can manage it using standard systemd commands alongside all other sytem services in Ubuntu.

To verify the status of the service, type:

```sh
sudo systemctl status mongodb
```

You can stop the server anytime by typing:

```sh
sudo systemctl stop mongodb
```

To start the server when it is stopped, type:

```sh
sudo systemctl start mongodb
```

You can also restart the server with a single command:

```sh
sudo systemctl restart mongodb
```

By default, MongoDB is configured to start automatically with the server. If you wish to disable the automatic startup, type:

```sh
sudo systemctl disable mongodb
```

It’s just as easy to enable it again. To do this, use:

```sh
sudo systemctl enable mongodb
```

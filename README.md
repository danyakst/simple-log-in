I'm using express to make api, express-session to remember our user, mysql to make connection with our database

Install depencies with this command
```npm install i```

After it create database

```CREATE DATABASE IF NOT EXISTS nodejslogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE nodejslogin;

CREATE TABLE IF NOT EXISTS accounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO accounts (id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');
```

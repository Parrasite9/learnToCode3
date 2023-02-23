# Steps to Create and Deploy:

## set up local

### local postgres

1. open your postgres app and start the db server
1. in the postgres app, double click one of the existing databases to enter `psql`
1. once inside `psql`, run `CREATE DATABASE springreactapp;`

### in your browser

1. fork this repo

### in your terminal

1. clone your fork of this repo onto your local computer somewhere outside the class repo
1. `cd` into the local repo
1. Run `java --version`.  Note, this may open a prompt you to install Java: click "More Info" and follow installation instructions.  Once complete, rerun the previous command
  1. The first line that this command gives you is the version of Java and the date of its release (e.g. `java 15 2020-09-15` tells you it is Java version 15)
  1. Now open the `system.properties` file that is at the root of this project. Make sure the number next to `java.runtime.version` in the `system.properties` file in your repo matches your version of Java.  Eg `java.runtime.version=15` is the correct version for the above output from terminal. If not, change that line of code to the correct number from terminal.  Then git add/commit/push

Set up an environment variable so your local spring app will use your local postgres database. In terminal:

```
export JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/contacts
```
**Important** - make sure you have a database named `contacts`, if you are using another database, be sure to change the last part of the url from `contacts` to the name of the database you want to use

Now start spring:

```
./mvnw spring-boot:run
```

### in your browser

go to http://localhost:8080/ to view local app (note this uses your local postgres database)

## set up heroku

### in your terminal

1. run `heroku create` (take note of the app name for later)

### in your browser

1. go to heroku.com in your browser and sign in
1. find this newly created heroku app in your list of available apps and click on it
1. go to resources
1. search for postgres and choose Heroku Postgres
1. choose "Hobby Dev - Free"
1. click provision

### in your terminal

### in your terminal

1. if running `psql` gives you "command not found", run `ln -s /Applications/Postgres.app/Contents/Versions/latest/bin/psql /usr/local/bin/psql`
1. run `heroku pg:psql`
1. once inside heroku's psql, run
    1. `CREATE TABLE people (id SERIAL, name VARCHAR(16), age INT);`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Matt', 38 );`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Sally', 54 );`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Zanthar', 4892 );`
1. exit heroku psql with `\q`
1. run `git push heroku master`
1. run `heroku open` to see app (note this uses your heroku postgres database, which will have different data than your local db)

1. run `git push heroku master`
1. run `heroku open` to see app (note this uses your heroku postgres database, which will have different data than your local db)

## Rerunning local after initial set up

Open Postgres app and start the db

In terminal:

1. Go to repo root dir
1. Run `export JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/contacts` again
1. Run `./mvnw spring-boot:run`

In Browser go to http://localhost:8080/

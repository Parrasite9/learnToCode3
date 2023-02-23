# Steps to Create and Deploy

## Set up local app

### Install Composer

- Make sure you have MAMP and Postgres installed and running
- Download comopser: https://getcomposer.org/composer-stable.phar
- In Terminal, run:

  - `mv ~/Downloads/composer-stable.phar /usr/local/bin/composer`
  - `chmod 755 /usr/local/bin/composer`
  - `echo 'export PATH="$HOME/.composer/vendor/bin:$PATH"' >> ~/.bash_profile`
  - `ls /Applications/MAMP/bin/php` and take note of the most recent version
  - `echo 'export PATH="/Applications/MAMP/bin/php/php7.4.2/bin:$PATH"' >> ~/.bash_profile` substituting your latest version of php for `php7.4.2`

- close terminal window and open a new one

### Forking/Cloning This Repo

After forking and cloning this repo to your local machine:

- `cd` to repo dir
- run `composer install`
- run `cp .env.example .env`

### Connect to db

**Note:** in your terminal, if running psql gives you "command not found", run ln -s /Applications/Postgres.app/Contents/Versions/latest/bin/psql /usr/local/bin/psql

Connect to psql and

```
CREATE DATABASE contacts;
\c contacts
CREATE TABLE people (id SERIAL, name VARCHAR(16), age INT);
INSERT INTO people (name, age) VALUES ('matt', 40);
```

Run `whoami` and take note over your computer's username (mine is `matthuntington`)

In `.env` file, adjust the following code block:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

so it is:

```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=contacts
DB_USERNAME=matthuntington
DB_PASSWORD=
```

Instead of `matthuntington` insert your computer's username (what you found when running `whoami`)

### Start App

- run before the first time only: `php artisan key:generate`

- run `php artisan serve`
- go to http://localhost:8888/ to see that the app works
- if browser asks you to generate key, click the button
- go to http://localhost:8888/index.html to see the react app for `contacts`

## set up heroku

### in your terminal

1. run `heroku create` (take note of the app name for later)
1. run `heroku config:set LOG_CHANNEL=errorlog`
1. run `heroku config:set APP_KEY=$(php artisan --no-ansi key:generate --show)`

### in your browser

1. go to heroku.com in your browser and sign in
1. find this newly created heroku app in your list of available apps and click on it
1. go to resources
1. search for postgres and choose Heroku Postgres
1. choose "Hobby Dev - Free"
1. click provision

### in your terminal

1. in your terminal, if running `psql` gives you "command not found", run `ln -s /Applications/Postgres.app/Contents/Versions/latest/bin/psql /usr/local/bin/psql`
1. run `heroku pg:psql`
1. once inside heroku's psql, run
    1. `CREATE TABLE people (id SERIAL, name VARCHAR(16), age INT);`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Matt', 38 );`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Sally', 54 );`
    1. `INSERT INTO people ( name, age ) VALUES ( 'Zanthar', 4892 );`
1. exit heroku psql with `\q`

### Check your app on heroku

- `git push heroku master`
- `heroku open`
- go to `/index.html` to see the react app, the root will be default Laravel info (note this uses your heroku postgres database, which will have different data than your local db)

## Rerunning local after initial set up

Open Postgres app and start the db

In terminal:

1. Go to repo root dir
1. Run `php artisan serve`

In Browser go to http://localhost:8888/index.html

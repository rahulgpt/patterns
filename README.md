# Patterns

An ecommerce project made from scratch for selling surface patterns.

# Quickstart

Create a virtual environment

#### Example using `virtualenv`

Create the env

```shell
virtualenv env
```

#### Activate the env

Windows

```shell
env\scripts\activate
```

Unix

```shell
source env/bin/activate
```

#### Install packages

```shell
pip install -r requirements.txt
```

#### Migrate Schema

```shell
python manage.py makemigrations && python manage.py migrate
```

#### Build Frontend

```shell
cd frontend && npm run build
```

#### Start Dev Server

```shell
python manage.py runserver
```

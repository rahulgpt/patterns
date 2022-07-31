# Patterns

An ecommerce project made from scratch for selling surface patterns.

<img width="1552" alt="ss1" src="https://user-images.githubusercontent.com/56781067/182037212-f0a7e2da-f02a-4eda-a044-ecfd22590fea.png">
<img width="1552" alt="ss2" src="https://user-images.githubusercontent.com/56781067/182037242-f130e6b0-9e94-410d-845f-2b88fb008ea9.png">

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

# BD
* Mongo
* Nombre: Beegilant
* Sin contraseña
* localhost:27017

``` bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser #tienen que logearse o no van a poder correr nada
```

Si tienen datos en la bd y aun no se ve nada, instalen el plugin cors de chrome
# frontend

> A Vue.js project

## Build Setup

Lo tienen que compilar, por eso si hacen un cambio no se verá altiro en la vista, configuré mal el webpack y no me deja usarlo en modo dev, si alguien sabe arreglarlo, porfa hagalo 
``` bash
# install dependencies
npm install


# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).



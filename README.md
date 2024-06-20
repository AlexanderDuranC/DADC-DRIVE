# Servidor de archivos
Es un servidor de archivos que utiliza en el backend django rest framework,
y en el frontend react vite

No tiene inicio de sesion por que lo estoy usando para uso personal en mi red local

El backend esta configurado para ser utilizado en Apache HTTP server y me guie en base de la siguiente publicacion [Cómo ejecutar Django en Apache usando Windows 10, Virtualenv Python y mod_wsgi.](https://montesariel.com/es/blog/post-3)

# Instalacion
Backend
 ```bash
 $ cd Backend
 $ pip install -r requirements.txt 
 ```

Frontend
 ```bash
 $ cd Frontend/dadc
 $ npm install
 ```

# Tecnoligias usadas
Backend
    - Django Rest Framework
    - django-cors-headers
    - python-decouple (Manejo de las variables de entorno)
    - mod_wsgi (Necesario para Apache)

Frontend
    - Vite
    - Axios
    - File-saver
    - Lucide-react
    - React-router-dom
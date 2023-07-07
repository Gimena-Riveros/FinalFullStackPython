//const URL = "http://127.0.0.1:5000/"
const URL = "https://gimenariveros.pythonanywhere.com/"

// Realizamos la solicitud GET al servidor para obtener todos los productos
fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Parseamos la respuesta JSON
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los productos.');
        }
    })
    .then(function (data) {
        var tablaProductos = document.getElementById('tablaProductos');

        // Iteramos sobre los productos y agregamos filas a la tabla
        data.forEach(function (producto) {
            var fila = document.createElement('tr');
            fila.innerHTML = '<td>' + producto.codigo + '</td>' +
                '<td>' + producto.descripcion + '</td>' +
                '<td align="right">' + producto.cantidad + '</td>' +
                '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;' + producto.precio + '</td>' +
                '<td>' + producto.photo + '</td>';
            tablaProductos.appendChild(fila);
        });
    })
    .catch(function (error) {
        // Código para manejar errores
        alert('Error al obtener los productos.');
    });
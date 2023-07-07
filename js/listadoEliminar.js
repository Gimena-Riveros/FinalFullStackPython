//const URL = "http://127.0.0.1:5000/"
const URL = "https://gimenariveros.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            productos: []
        }
    },
    methods: {
        obtenerProductos() {
            // Obtenemos el contenido del inventario
            fetch(URL + 'productos')
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parseamos la respuesta JSON
                    } else {
                        // Si hubo un error, lanzar explícitamente una excepción
                        // para ser "catcheada" más adelante
                        throw new Error('Error al obtener los productos.');
                    }
                })
                .then(data => {
                    // El código Vue itera este elemento para generar la tabla
                    this.productos = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener los productos.');
                });
        },
        eliminarProducto(codigo) {
            // Eliminamos el producto de la fila seleccionada
            fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        // Eliminar el producto de la lista después de eliminarlo en el servidor
                        this.productos = this.productos.filter(producto => producto.codigo !== codigo);
                        console.log('Producto eliminado correctamente.');
                    } else {
                        // Si hubo un error, lanzar explícitamente una excepción
                        // para ser "catcheada" más adelante
                        throw new Error('Error al eliminar el producto.');
                    }
                })
                .catch(error => {
                    // Código para manejar errores
                    alert('Error al eliminar el producto.');
                });
        }
    },
    mounted() {
        //Al cargar la página, obtenemos la lista de productos
        this.obtenerProductos();
    }
});

app.mount('body');
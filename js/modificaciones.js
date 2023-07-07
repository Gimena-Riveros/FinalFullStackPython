//const URL = "http://127.0.0.1:5000/"
const URL = "https://gimenariveros.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            mostrarDatosProducto: false,
            descripcion: '',
            cantidad: '',
            precio: ''
        }
    },
    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })
                .then(data => {
                    this.descripcion = data.descripcion
                    this.cantidad = data.cantidad
                    this.precio = data.precio
                    this.mostrarDatosProducto = true
                })
                .catch(error => {
                    alert('Error al obtener los datos del producto.')
                })
        },
        guardarCambios() {
            const producto = {
                codigo: this.codigo,
                descripcion: this.descripcion,
                cantidad: this.cantidad,
                precio: this.precio
            }

            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al guardar los cambios del producto.')
                    }
                })
                .then(data => {
                    alert('Cambios guardados correctamente.')
                    location.reload()
                })
                .catch(error => {
                    alert('Error al guardar los cambios del producto.')
                })
        }
    }
})

app.mount('#app')
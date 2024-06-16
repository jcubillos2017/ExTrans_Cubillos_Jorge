const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('Hello vue!')

        const usuarios = ref([])
        const formulario = ref({
            nombre: "",
            apellido: "",
            email: "",
            cargo: "",
            fechaIngreso: undefined,
            fechaNacimiento: undefined,
        })

        const erroresformulario = ref({
            nombre: null,
            apellido: null,
            email: null,
            cargo: null,
            fechaIngreso: null,
            fechaNacimiento: null,
        })

        function validaString(texto) {
            //validar que no sea null
            if (!texto) {
                return false
            }
            //valida que tenga al menos un caracter
            if (texto.length < 1) {
                return false
            }
            //valida que es verdadero
            return texto


        }
        function validafecha(fecha) {
            if (fecha instanceof Date) {
                return fecha
            } else {
                return false
            }
        }

        function validacionemail(email) {
            return validator.isEmail(email);

        }

        function emailrepetido(email) {
            const array = usuarios.value
            let yaexistemail = false
            array.forEach(usuario => {
                if (email === usuario.email) yaexistemail = true
            });
            return yaexistemail
        }
        function validarMayorEdad(fechaNacimiento) {
            var hoy = new Date();
            var nacimiento = new Date(fechaNacimiento);
            var edad = hoy.getFullYear() - nacimiento.getFullYear();

            if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() == nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }

            if (edad >= 18) {
                return true; // La persona es mayor de edad
            } else {
                return false; // La persona es menor de edad
            }


        }

        function enviarFormulario(E) {
            E.preventDefault()
            const form = formulario.value
            //se evalua el nombre
            const nombrevalido = validaString(form.nombre)
            const apellidovalido = validaString(form.apellido)
            const emailvalido = validacionemail(form.email)
            const cargovalido = validaString(form.cargo)
            const elemailestarepetido = emailrepetido(form.email)
            const fechaIngresovalido = validafecha(new Date(form.fechaIngreso))
            const fechaNacimientovalido = validarMayorEdad(new Date(form.fechaNacimiento))
            console.log({ nombrevalido, apellidovalido, emailvalido, cargovalido, fechaIngresovalido, fechaNacimientovalido })
            let existenvaloreinvalidos = false
            if (!nombrevalido) {
                erroresformulario.value.nombre = "Nombre no Valido"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.nombre = null
            }
            if (!apellidovalido) {
                erroresformulario.value.apellido = "Apellido no Valido"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.apellido = null
            }
            if (!emailvalido) {
                erroresformulario.value.email = "Email no Valido"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.email = null
            }
            if (!cargovalido) {
                erroresformulario.value.cargo = "Cargo no es Valido"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.cargo = null
            }
            if (!fechaIngresovalido) {
                erroresformulario.value.fechaIngreso = "La Fecha de Ingreso no es Valido"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.fechaIngreso = null
            }
            if (!fechaNacimientovalido) {
                erroresformulario.value.fechaNacimiento = "No eres mayor de Edad"
                existenvaloreinvalidos = true
            } else {
                erroresformulario.value.fechaNacimiento = null
            }
            if (elemailestarepetido) {
                erroresformulario.value.email = "Email esta Repetido"
                existenvaloreinvalidos = true

            }
            if (existenvaloreinvalidos) {
                return false
            }


            document.getElementById("botonmodal").click()

        }
        function guardarregistro() {
            const form = formulario.value
            //se evalua el nombre
            const nombrevalido = validaString(form.nombre)
            const apellidovalido = validaString(form.apellido)
            const emailvalido = validaString(form.email)
            const cargovalido = validaString(form.cargo)
            const fechaIngresovalido = validafecha(new Date(form.fechaIngreso))
            const fechaNacimientovalido = validarMayorEdad(new Date(form.fechaNacimiento))

            const usuario = {
                nombre: nombrevalido,
                apellido: apellidovalido,
                email: emailvalido,
                cargo: cargovalido,
                fechaIngreso: fechaIngresovalido,
                fechaNacimiento: fechaNacimientovalido,

            }
            usuarios.value.push(usuario)

            document.getElementById("botonmodal").click()

            formulario.value.nombre = ""
            formulario.value.apellido = ""
            formulario.value.email = ""
            formulario.value.cargo = ""
            formulario.value.fechaIngreso = undefined
            formulario.value.fechaNacimiento = undefined





        }

        function eliminarregistro(index) {
            usuarios.value.splice(index, 1)
        }



        return {
            message,
            usuarios,
            formulario,
            enviarFormulario,
            guardarregistro,
            erroresformulario,
            eliminarregistro,

        }
    }
}).mount('#app')















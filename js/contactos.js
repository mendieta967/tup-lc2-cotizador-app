document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#contactForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");


    emailjs.init('OqFgS19XfBN2RRupf'); 

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 


        if (nombre.value.trim() === "") {
            alert("Por favor, ingrese su nombre.");
            nombre.focus();
            return false;
        }
        
        if (email.value.trim() === "") {
            alert("Por favor, ingrese su email.");
            email.focus();
            return false;
        }

        if (mensaje.value.trim() === "") {
            alert("Por favor, ingrese su mensaje.");
            mensaje.focus();
            return false;
        }

   
        emailjs.send("service_0ajh0vu", "template_pa6sr8q", {
            from_name: nombre.value,
            message: mensaje.value,
            reply_to: email.value
        })
        .then(function(response) {
            alert("¡Formulario enviado con éxito!");
            form.reset();
        }, function(error) {
            alert("Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo más tarde.");
            console.error("Error al enviar el email:", error);
        });

    });
});

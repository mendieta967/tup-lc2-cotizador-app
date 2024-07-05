const informesContainer = document.getElementById("informesContainer")
const filtroMoneda = document.getElementById("filtroMoneda")
const buttonFiltroMoneda = document.getElementById("buttonFiltroMoneda")

buttonFiltroMoneda.addEventListener("click", filtrarInforme)

document.addEventListener('DOMContentLoaded', (event) => {
    const shareButton = document.getElementById('shareButton');
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closeButton');
    const sendButton = document.getElementById('sendButton');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    shareButton.addEventListener('click', () => {
        popup.style.display = 'flex'; 
    });

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none'; 
    });

    sendButton.addEventListener('click', () => {
     
        if (nameInput.value === '' || emailInput.value === '') {
            alert('Por favor, complete todos los campos.');
        } else {
            alert('Datos enviados');
            popup.style.display = 'none'; 
        }
    });
});



const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "junio"];
const datos = [100, 150, 120, 200, 0, 20];
const datosLinea1 = [100, 150, 120, 200, 10, 20, 100];
const datosLinea2 = [80, 120, 140, 180, 0, 50, 56];
const datosLinea3 = [88, 100, 14, 200, 20, 0, 80];

const ctx = document.getElementById("miGrafica").getContext("2d");
new Chart(ctx, {
type: "line",
data: {
labels: etiquetas,
datasets: [
    {
    label: "Ventas por mes",
    data: datos,
    borderColor: "blue",
    fill: false
    },
    {
    label: "Dolar Oficial",
    data: datosLinea2,
    borderColor: "green",
    borderWidth: 1,
    fill: false
    },
    {
    label: "Euro",
    data: datosLinea3,
    borderColor: "red",
    fill: false
    }
]
}
});


const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

function cargarInformes(datos = favoritos)
{
    informesContainer.innerHTML = ""
    const datosEstructurados = {};

    datos.map(cotizacion => {
        const { fecha, nombre, compra, venta } = cotizacion;
        if (!datosEstructurados[nombre]) {
            datosEstructurados[nombre] = [];
        }
        datosEstructurados[nombre].push({ fecha, compra, venta });
        datosEstructurados[nombre].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        
    });

    Object.keys(datosEstructurados).forEach(nombre => {
        
        const div = document.createElement("div")
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <tr class="tr_fecha">
            <td>${nombre}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `
        tr.classList.add("tr_fecha")
        div.appendChild(tr)
        informesContainer.appendChild(div)
        let fecha = datosEstructurados[nombre][0].fecha
        let ventaAnterior = datosEstructurados[nombre].length > 1 
            ? datosEstructurados[nombre][datosEstructurados[nombre].length - 1].venta 
            : null;
        datosEstructurados[nombre].forEach(cotizacion => {
            let aumento = false;
            if (cotizacion.venta > ventaAnterior) {
                aumento = true;
            }
            ventaAnterior = cotizacion.venta;
            const tr2 = document.createElement("tr")
            tr2.innerHTML = `
            <tr >
                <td></td>
                <td class="td_border">${cotizacion.fecha}</td>
                <td class="td_border">$${cotizacion.compra}</td>
                <td class="td_border">$${cotizacion.venta}</td>
                ${aumento 
                    ? `<td><button class="action-btn"><i class="fas fa-arrow-up"></i></button></td>`
                    : `<td><button class="action-btnn"><i class="fas fa-arrow-down"></i></button></td>`}
                      
            </tr>
            `
            div.appendChild(tr2)
        });
    
    });

}

cargarInformes()

function filtrarInforme() {
    if(filtroMoneda.value == "todas") {
        cargarInformes(favoritos)
    } else {
        const filtrado = favoritos.filter(favorito => favorito.nombre == filtroMoneda.value)
        cargarInformes(filtrado)
    }
}


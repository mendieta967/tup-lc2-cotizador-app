
const btnImprimir = document.getElementById('btnImprimir');
const eliminarBotones = document.querySelectorAll('.eliminar-btn');
const archivoContainer = document.getElementById("archivoContainer")


btnImprimir.addEventListener('click', function() {
    imprimirTabla();
});


eliminarBotones.forEach(btn => {
    btn.addEventListener('click', function() {
        eliminarcolumna(btn);
    });
});


function imprimirTabla() {
    // Clona la tabla actual para no modificar la original
    const tablaImprimir = document.querySelector('.table').cloneNode(true);


    // Abre una ventana de impresión y escribe la tabla modificada
    const ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.open();
    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>Tabla para Imprimir</title>
            <style>
                /* Estilos para impresión */
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Tabla de Cotizaciones</h2>
            ${tablaImprimir.outerHTML}
        </body>
        </html>
    `);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
}

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []


function cargarArchivo()
{
    archivoContainer.innerHTML = ""
    const datosEstructurados = {};

    favoritos.map(cotizacion => {
        const { fecha, nombre, compra, venta } = cotizacion;
        if (!datosEstructurados[fecha]) {
            datosEstructurados[fecha] = [];
        }
        datosEstructurados[fecha].push({ nombre, compra, venta });
    });

    Object.keys(datosEstructurados).forEach(fecha => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <tr>
            <td>${fecha}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `
        tr.classList.add("tr_fecha")
        archivoContainer.appendChild(tr)
        datosEstructurados[fecha].forEach(cotizacion => {
            const tr2 = document.createElement("tr")
            tr2.innerHTML = `
            <td></td>
            <td class="td_border">${cotizacion.nombre}</td>
            <td class="td_border">$${cotizacion.compra}</td>
            <td class="td_border">$${cotizacion.venta}</td>
            <td id="borrar"><button onclick="eliminarFavorito('${fecha}', '${cotizacion.nombre}')" class="action-btn eliminar-btn"><i class="fas fa-eraser"></i></button></td>
            `
            archivoContainer.appendChild(tr2)
        });
    
    });

}

cargarArchivo()


function eliminarFavorito(fecha, nombre) {
    const index = favoritos.findIndex(favorito => favorito.fecha == fecha && favorito.nombre == nombre)
    favoritos.splice(index, 1)
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
    cargarArchivo()
}





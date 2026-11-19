const API_URL = "http://localhost:8080/api/clientes";

function validarForm() {
    let nombre = document.getElementById("inputNombre").value.trim();
    let alerta = document.getElementById("alertaMensaje");

    if (nombre === "" || nombre.length < 3) {
        alerta.style.display = "block";
        alerta.style.backgroundColor = "#f8d7da";
        alerta.innerHTML = "<strong>Error :</strong> El nombre debe contener al menos 3 caracteres.";
        return false;
    }

    alerta.style.display = "none";

    // Note : Plus tard, nous remplacerons ce return false par l'appel AJAX POST
    console.log("Validation réussie pour : " + nombre);
    return false; 
}

$(document).ready(function() {
    funciton mostrarAlerta(mensaje, esError) {
        $("#alertaTabla").css({
            "display": "block",
            "background-color": esError ? "#f8d7da" : "#d4edda"
        }).html(mensaje);
    } 

    function agregarFilaTabla(cliente) {
        let fila = `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.plan}</td>
                <td>${cliente.estado || "Activo"}</td>
                <td><button class="btn-eliminar" data-id="${cliente.id}">Eliminar</button></td>
            </tr>
        `;
        $("#cuerpoTabla").append(fila);
    }

    function cargarClientes() {
        $.ajax({
            method: "GET",
            url: API_URL
        }).done(function (clientes) {
            $("#cuerpoTabla").empty();
            clientes.forEach(function(cliente) {
                agregarFilaTabla(cliente);
            });
            $("#contadorClientes").text("Nombre de clientes : " + clientes.length);
        }).fail(function (err) {
            mostrarAlerta("Cliente no encontrado", true);
        });
    }
    cargarClientes();

    $("#btnBuscar").on("click", function() {
        let id = $("#inputBuscar").val().trim();
        if (id === "") {
            cargarClientes();
            return;
        }
        $.ajax({
            url: API_URL + "/" + id,
            method: "GET",
            dataType: "json"
        })
        .done(function(cliente) {
            $("#alertaTable").hide();
            $("#cuerpoTabla").empty();
            agregarFilaTabla(cliente);
            $("#contadorClientes").text("Nombre de clientes : 1");
        })
        .fail(function(err) {
            let msg = err.responseJSON ? err.responseJSON.error : "Client no encontrado o ID invalido.";
            mostrarAlerta("<strong>Erreur 400 :</strong> " + msg, true);
        });
    });

    $("#cuerpoTabla").on("click", ".btn-eliminar", function () {
        let idCliente = $(this).data("id");
        console.log("Click para eliminar el cliente" + idCliente);
        $(this).closest("tr").remove();
    })

    $("#cuerpoTabla").on("mouseenter", "tr", function () {
        $(this).css("backgroundColor", "#f0f8ff");
    })
    $("#cuerpoTabla").on("mouseleave", "tr", function () {
        $(this).css("backgroundColor", "");
    })
})
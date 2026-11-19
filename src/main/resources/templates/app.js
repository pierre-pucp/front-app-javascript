function validarForm() {
    let nombre = document.getElementById("inputNombre").value.trim();
    let alerta = document.getElementById("alertaMensaje");

    if (nombre === "" || nombre.length < 3) {
        alerta.style.display = "block";
        alerta.style.backgroundColor = "#f8d7da";
        alerta.style.color = "#721c24";
        alerta.style.border = "1px solid #f5c6cb";
        alerta.innerHTML = "<strong>Erreur :</strong> El nombre debe contener al menos 3 caracteres.";
        return false;
    }

    alerta.style.display = "none";

    // Note : Plus tard, nous remplacerons ce return false par l'appel AJAX POST
    console.log("Validation réussie pour : " + nombre);
    return false; 
}
var debug, DIV_MotsClesRestants, DIV_MotsChoisis;

var TousLesMotsCles = [];
var MotsClesRestants = [];
var MotsChoisis = [];
var TousLesObjets = [];

function BODY_OnLoad() {
    // déclancher une seule fois au chargement de la page HTML
    // réifier tous les éléments de l'interface 
    debug = document.getElementById("debug");
    DIV_MotsClesRestants = document.getElementById("DIV_MotsClesRestants");
    DIV_MotsChoisis = document.getElementById("DIV_MotsChoisis");
    chargerMotsCles().then(function () {
        return chargerObjets();
    }).then(function () {
        init(); // initialiser le mécanisme spécifique de l'application
        AfficherDIVsMotsClesRestants();
        AfficherTableauObjets();
    });
}

function debug_log(message) {
    debug.value += message + "\n";
}

// function chargerMotsCles() {
//     // récupère le catalogue de mots clés avant d'initialiser l'interface
//     return fetch("motsCles.json")
//         .then(function (response) {
//             // if (!response.ok) {
//             //     throw new Error(response.status + " " + response.statusText);
//             // }
//             return response.json();
//         })
//         .then(function (data) {
//             TousLesMotsCles = data.map(function (item) {
//                 return item;
//             });
//         });
// }

function chargerMotsCles() {
    // récupère le catalogue de mots clés avant d'initialiser l'interface
    return fetch("motsCles.php")
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            // // Check if there's an error in the response
            // if (data.error) {
            //     throw new Error("PHP Error: " + data.error);
            // }
            // // Check if data is an array
            // if (!Array.isArray(data)) {
            //     console.error("Expected array but got:", data);
            //     throw new Error("Invalid data format: expected array");
            // }
            TousLesMotsCles = data.map(function (item) {
                return item;
            });
        })
        .catch(function (error) {
            debug_log("Erreur au chargement de motsCles: " + error.message);
            console.error("Erreur au chargement de motsCles:", error);
        });
}

function chargerObjets() {
    // récupère la liste des objets depuis la base de données
    return fetch("objets.php")
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            // if (data.error) {
            //     throw new Error("PHP Error: " + data.error);
            // }
            // if (!Array.isArray(data)) {
            //     console.error("Expected array but got:", data);
            //     throw new Error("Invalid data format: expected array");
            // }
            TousLesObjets = data;
        })
        .catch(function (error) {
            debug_log("Erreur au chargement de objets: " + error.message);
            console.error("Erreur au chargement de objets:", error);
        });
}

function init() {
    // initialiser les tableaux des boutons
    for (var i = 0; i < TousLesMotsCles.length; i++) {
        MotsClesRestants[i] = TousLesMotsCles[i];
        MotsChoisis[i] = null;
    }
}

function AfficherDIVsMotsClesRestants() {
    //En fonction du contenu de MotsClesRestants et MotsChoisis
    //Réafficher le contenu des deux divs pour les mots clés
    DIV_MotsClesRestants.innerHTML = '<font style="cursor: pointer;" title="Réinitialiser" onDblClick="BUTTON_OnClick_Reset()">Mots Cles : </font>';
    for (var i = 0; i < TousLesMotsCles.length; i++) {
        var motCle = MotsClesRestants[i];
        if (motCle != null) {
            // DIV_MotsClesRestants.innerHTML += MotsClesRestants[i] + " ";
            const button = document.createElement("button");
            button.textContent = motCle.label;
            button.index = i;
            button.onclick = BUTTON_OnClick_Restants;
            DIV_MotsClesRestants.appendChild(button);
        }
    }
    DIV_MotsChoisis.innerHTML = 'Mots Choisis : ';
    for (var i = 0; i < TousLesMotsCles.length; i++) {
        var motCle = MotsChoisis[i];
        if (motCle != null) {
            const button = document.createElement("button");
            button.textContent = motCle.label;
            button.index = i;
            button.onclick = BUTTON_OnClick_Choisis;
            DIV_MotsChoisis.appendChild(button);
        }
    }
}

function AfficherTableauObjets() {
    var tbody = document.querySelector("#TABLE_Objets tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < TousLesObjets.length; i++) {
        var objet = TousLesObjets[i];
        var tr = document.createElement("tr");

        tr.innerHTML = "<td>" + objet.id + "</td>" +
            "<td>" + objet.qte + "</td>" +
            "<td>" + objet.label + "</td>" +
            "<td>" + objet.estConteneur + "</td>" +
            "<td>" + objet.estContenuDans + "</td>";

        tbody.appendChild(tr);
    }
}

function BUTTON_OnClick() {
    debug_log("BUTTON_OnClick " + this.index);
}

function BUTTON_OnClick_Restants() {
    var id = TousLesMotsCles[this.index].id;
    MotsChoisis[this.index] = MotsClesRestants[this.index];
    MotsClesRestants[this.index] = null;
    AfficherDIVsMotsClesRestants();
    debug_log("BUTTON_OnClick_Restants " + this.index + " id=" + id);
    // afficher tout les id des boutons choisis
    var ids = MotsChoisis.filter(function(m) { return m != null; }).map(function(m) { return m.id; });
    debug_log("Mots Choisis : " + ids.join(", ") + " nbr : " + ids.length);
}

function BUTTON_OnClick_Choisis() {
    var id = TousLesMotsCles[this.index].id;
    MotsClesRestants[this.index] = MotsChoisis[this.index];
    MotsChoisis[this.index] = null;
    AfficherDIVsMotsClesRestants();
    debug_log("BUTTON_OnClick_Choisis " + this.index + " id=" + id);
}


function BUTTON_OnClick_Reset() {
    init();
    AfficherDIVsMotsClesRestants();
}
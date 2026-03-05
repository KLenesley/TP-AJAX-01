var debug, DIV_MotsClesRestants, DIV_MotsChoisis, DETAIL_Content;

var TousLesMotsCles = [];
var MotsClesRestants = [];
var MotsChoisis = [];
var TousLesObjets = [];
var ObjetSelectionneId = null;

function BODY_OnLoad() {
    // déclancher une seule fois au chargement de la page HTML
    // réifier tous les éléments de l'interface 
    debug = document.getElementById("debug");
    DIV_MotsClesRestants = document.getElementById("DIV_MotsClesRestants");
    DIV_MotsChoisis = document.getElementById("DIV_MotsChoisis");
    DETAIL_Content = document.getElementById("DETAIL_Content");
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

function chargerObjets(motCleIds) {
    // récupère la liste des objets depuis la base de données
    // Si motCleIds est fourni, filtre par ces IDs
    var url = "objets.php";
    if (motCleIds && motCleIds.length > 0) {
        url += "?ids=" + motCleIds.join(',');
    }
    
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.error) {
                throw new Error("PHP Error: " + data.error);
            }
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

    // Réinitialiser la sélection si l'objet n'est plus dans la liste filtrée
    var selectionPresente = TousLesObjets.some(function (o) {
        return o.id === ObjetSelectionneId;
    });
    if (!selectionPresente) {
        ObjetSelectionneId = null;
        afficherDetailsObjet(null);
    }

    for (var i = 0; i < TousLesObjets.length; i++) {
        var objet = TousLesObjets[i];
        var tr = document.createElement("tr");

        tr.innerHTML = "<td>" + objet.id + "</td>" +
            "<td>" + objet.qte + "</td>" +
            "<td>" + objet.label + "</td>" +
            "<td>" + objet.estConteneur + "</td>" +
            "<td>" + objet.estContenuDans + "</td>" +
            "<td>" + objet.img + "</td>";

        if (objet.id === ObjetSelectionneId) {
            tr.classList.add("selected-row");
        }

        (function (currentObjet) {
            tr.onclick = function () {
                ObjetSelectionneId = currentObjet.id;
                afficherDetailsObjet(currentObjet);
                AfficherTableauObjets();
            };
        })(objet);

        tbody.appendChild(tr);
    }
}

function afficherDetailsObjet(objet) {
    if (!DETAIL_Content) {
        return;
    }
    if (!objet) {
        DETAIL_Content.innerHTML = "<p>Sélectionnez une ligne pour afficher le détail.</p>";
        return;
    }

    var contenu = "";
    contenu += "<p><strong>Libellé :</strong> " + objet.label + "</p>";
    contenu += "<p><strong>ID :</strong> " + objet.id + "</p>";
    contenu += "<p><strong>Quantité :</strong> " + objet.qte + "</p>";
    contenu += "<p><strong>Est conteneur :</strong> " + objet.estConteneur + "</p>";
    contenu += "<p><strong>Contenu dans :</strong> " + objet.estContenuDans + "</p>";
    contenu += "<p><strong>Image :</strong> <image src='img/" + objet.img + "' </image> </p>";

    DETAIL_Content.innerHTML = contenu;
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
    const ids = MotsChoisis.filter(m => m).map(m => m.id);
    debug_log(`Mots Choisis : ${ids.join(", ")} nbr : ${ids.length}`);
    
    // Recharger les objets avec les mots-clés choisis
    chargerObjets(ids).then(function() {
        AfficherTableauObjets();
    });
}

function BUTTON_OnClick_Choisis() {
    var id = TousLesMotsCles[this.index].id;
    MotsClesRestants[this.index] = MotsChoisis[this.index];
    MotsChoisis[this.index] = null;
    AfficherDIVsMotsClesRestants();
    
    debug_log("BUTTON_OnClick_Choisis " + this.index + " id=" + id);
    const ids = MotsChoisis.filter(m => m).map(m => m.id);
    debug_log(`Mots Choisis : ${ids.join(", ")} nbr : ${ids.length}`);
    
    // Recharger les objets avec les mots-clés restants
    chargerObjets(ids).then(function() {
        AfficherTableauObjets();
    });
}

function BUTTON_OnClick_Reset() {
    init();
    AfficherDIVsMotsClesRestants();
    
    // Recharger tous les objets
    chargerObjets([]).then(function() {
        AfficherTableauObjets();
    });
}
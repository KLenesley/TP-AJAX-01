var debug, DIV_MotsClesRestants, DIV_MotsChoisis;

var TousLesMotsCles = [];
var MotsClesRestants = [];
var MotsChoisis = [];

function BODY_OnLoad() {
    // déclancher une seule fois au chargement de la page HTML
    // réifier tous les éléments de l'interface 
    debug = document.getElementById("debug");
    DIV_MotsClesRestants = document.getElementById("DIV_MotsClesRestants");
    DIV_MotsChoisis = document.getElementById("DIV_MotsChoisis");
    chargerMotsCles().then(function () {
        init(); // initialiser le mécanisme spécifique de l'application
        AfficherDIVsMotsClesRestants();
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
            // if (!response.ok) {
            //     throw new Error(response.status + " " + response.statusText);
            // }
            return response.json();
        })
        .then(function (data) {
            TousLesMotsCles = data.map(function (item) {
                return item;
            });
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

    function BUTTON_OnClick() {
        debug_log("BUTTON_OnClick " + this.index);
    }

    function BUTTON_OnClick_Restants() {
        var id = TousLesMotsCles[this.index].id;
        MotsChoisis[this.index] = MotsClesRestants[this.index];
        MotsClesRestants[this.index] = null;
        AfficherDIVsMotsClesRestants();
        debug_log("BUTTON_OnClick_Restants " + this.index + " id=" + id); x
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
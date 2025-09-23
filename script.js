var debug, DIV_MotsClesRestants, DIV_MotsChoisis;

var MotsClesRestants = [];
var MotsChoisis = [];

function BODY_OnLoad() {
    // déclancher une seule fois au chargement de la page HTML
    // réifier tous les éléments de l'interface 
    debug = document.getElementById("debug");
    DIV_MotsClesRestants = document.getElementById("DIV_MotsClesRestants");
    DIV_MotsChoisis = document.getElementById("DIV_MotsChoisis");
    init(); // initialiser le mécanisme spécifique de l'application
    AfficherDIVsMotsClesRestants();
}

function debug_log(message) {
    debug.value += message + "\n";
}

var TousLesMotsClesRestants = ['Métal', 'Plastique', 'Rouge', 'Vert', 'Bleu', 'Outil']; // tableau des boutons de l'application
var MotsClesRestants = [];
var MotsChoisis = [];

function init() {
    // initialiser les tableaux des boutons
    for (var i = 0; i < TousLesMotsClesRestants.length; i++) {
        MotsClesRestants[i] = TousLesMotsClesRestants[i];
        MotsChoisis[i] = null;
    }

    // MotsChoisis[1] = MotsClesRestants[1];
    // MotsClesRestants[1] = null;
}

function AfficherDIVsMotsClesRestants() {
    //En fonction du contenu de MotsClesRestants et MotsChoisis
    //Réafficher le contenu des deux divs pour les mots clés
    DIV_MotsClesRestants.innerHTML = '<font style="cursor: pointer;" title="Réinitialiser" onDblClick="BUTTON_OnClick_Reset()">Mots Cles : </font>';
    for (var i = 0; i < TousLesMotsClesRestants.length; i++) {
        var motCle = MotsClesRestants[i];
        if (motCle != null){
            // DIV_MotsClesRestants.innerHTML += MotsClesRestants[i] + " ";
            const button = document.createElement("button");
            button.innerHTML = motCle;
            button.textContent = motCle;
            button.index = i;
            button.onclick = BUTTON_OnClick_Restants;
            DIV_MotsClesRestants.appendChild(button);
        }
    }
    DIV_MotsChoisis.innerHTML = 'Mots Choisis : ';
    for (var i = 0; i < TousLesMotsClesRestants.length; i++) {
        var motCle = MotsChoisis[i];
        if (motCle != null){
            const button = document.createElement("button");
            button.innerHTML = motCle;
            button.textContent = motCle;
            button.index = i;
            button.onclick = BUTTON_OnClick_Choisis;
            DIV_MotsChoisis.appendChild(button);
        }
    }
}

function BUTTON_OnClick(){
    debug_log("BUTTON_OnClick " + this.index);
}

function BUTTON_OnClick_Restants() { 
    MotsChoisis[this.index] = MotsClesRestants[this.index]; 
    MotsClesRestants[this.index] = null;
    AfficherDIVsMotsClesRestants();
    // debug_log("BUTTON_OnClick_Restants " + this.index);
}

function BUTTON_OnClick_Choisis() {
    MotsClesRestants[this.index] = MotsChoisis[this.index];
    MotsChoisis[this.index] = null;
    AfficherDIVsMotsClesRestants();
    // debug_log("BUTTON_OnClick_Choisis " + this.index);
}

function BUTTON_OnClick_Reset() {
    init();
    AfficherDIVsMotsClesRestants();
}
/***
 * 
 * Create prerequisites
 * 
 ***/

/* Create arrays */

var question_array = [];

var ancestry_dict = {};
var layers_dict = {};
var content_dict = {};
var terminals_array = [];

var systems_database = {}

var original_dictionary = {};

var base = "";

var systems_list = ["Input", "Mediator", "Mediator effect", "Output", "Sign"]

/* Define the pages */

var landing_page = `
<script type="text/javascript" src="tools_rehearser.js"></script>

<div class="top-menu">

<div class="menu-item" id="item-1" onclick="toPage('Order')">

Hear

</div>

<div class="menu-item" id="item-2" onclick="toPage('Recognise')">

See

</div>

<div class="menu-item" id="item-4" onclick="toPage('Do')">

Do

</div>

</div>

<div class="main-container" id="main-container">

<script type="text/javascript" src="tools_rehearser.js"></script>

    <div class="inset"> <p> Ophthalmology </p> </div>

    <div class="card" onclick="start_ophtho(1)">

        <div class="bubble">
            <img src="./Images/Eye.png">
        </div>

        <div class="text-right">

            <H1> Ocular anatomy </H1>
            <p> & seeing what is there </p>

        </div>

    </div>   

    <div class="inset"> <p> Medication </p> </div>

    <div class="card" onclick="startLevel(1)">

    <div class="bubble">
    <img src="./Images/Network.png">
    </div>

    <div class="text-right">

    <H1> Categories </H1>
    <p> & where to find them </p>

    </div>

    </div>

    <div class="card" onclick="startLevel(2)">

    <div class="bubble">
    <img src="./Images/Network.png">
    </div>

    <div class="text-right">

    <H1> Drugs </H1>
    <p> & what they are</p>

    </div>

    </div>

    <div class="inset"> <p> Basic medicine </p> </div>

    <div class="card" onclick="startSymptoms()">

    <div class="bubble">
    <img src="./Images/Pad.png">
    </div>

    <div class="text-right">

    <H1> Symptoms </H1>
    <p> & what they mean </p>

    </div>

    </div>

    <div class="card" onclick="startDisorders()">

    <div class="bubble">
    <img src="./Images/Pregnancy.png">
    </div>

    <div class="text-right">

    <H1> Disorders </H1>
    <p> & what causes them </p>

    </div>

    </div>

    <div class="card" onclick="startSystems()">

    <div class="bubble">
    <img src="./Images/Network.png">
    </div>

    <div class="text-right">

    <H1> Systems </H1>
    <p> & what how they work </p>

    </div>

    </div>

    </div>
`

var level_page= `

    <script type="text/javascript" src="tools_rehearser.js"></script>
    
    <div class="inset" id="question-inset"> <h1 id="question-title">Question 1</h1> </div>

    <div class = "question-card">

        <div class="question-title-card" onClick="backToStart()">

            <p id="question-description">What is the name of this disease?</p>
        
        </div>

        <div class="question-input-card" id="question-input-card">             

            <input type="button" class="button" id ="hint-button" value="X" onclick="giveHint()">
            <input type="button" class="button" id ="check-button" value="✓" onclick="checkMnemonicAnswer()">

        </div>   

        <input type="text" id="text-field">             

    </div>

    <div id="remark-card">
            
        <p id ="question-remark"></p>
        
    </div>

`

var page_order=`
<div class="card" onclick="startLevel(1)">

            <div class="bubble">
                <img src="./Images/Network.png">
            </div>

            <div class="text-right">

                <H1> Categories </H1>
                <p> & where to find them </p>

            </div>

        </div>
        
        <div class="card" onclick="startLevel(2)">

            <div class="bubble">
                <img src="./Images/Network.png">
            </div>

            <div class="text-right">

                <H1> Drugs </H1>
                <p> & what they are</p>

            </div>

        </div>
`

var page_recognise =`

        <div class="inset"> <p> Major topics </p> </div>

        <div class="card" onclick="startLevel(3)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Interactions </H1>
                <p> & how they communicate </p>

            </div>

        </div>
        
        <div class="card" onclick="startLevel(11)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Side-effects </H1>
                <p> & what else they do </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(4)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Indications </H1>
                <p> & why to use them </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(5)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Mechanisms </H1>
                <p> & how they work </p>

            </div>

        </div>

        <div class="inset"> <p> Minor topics </p> </div>

        <div class="card" onclick="startLevel(7)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Pregnancy </H1>
                <p> & when not to use them </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(8)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Prescriptions </H1>
                <p> & when to mark them </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(9)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Enzym </H1>
                <p> & how they're processed </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(10)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Clearance </H1>
                <p> & how to get rid of them </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(18)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Werkingsduur </H1>
                <p> & how to last longer </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(16)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Rijveiligheid </H1>
                <p> & how not to hit others </p>

            </div>

        </div>
`

var page_do =`

        <div class="inset"> <p> Preparation </p> </div>

        <div class="card" onclick="startLevel(12)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Side-effects </H1>
                <p> At least the most important ones </p>

            </div>

        </div>

        <div class="card" onclick="startLevel(14)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Minor topics </H1>
                <p> All-in-one </p>

            </div>

        </div>

        <div class="inset"> <p> Final test </p> </div>

        <div class="card" onclick="startLevel(15)">

            <div class="bubble">
                <img src="./Images/Interactions.png">
            </div>

            <div class="text-right">

                <H1> Final test </H1>
                <p> Truly all-in-one </p>

            </div>

        </div>
`

var pages = {
    "Landing": landing_page,
    "Order": page_order,
    "Recognise": page_recognise,
    "Do": page_do,
    "Level": level_page
};

var trivial_answers = ["Ja", "Nee", "Substraat", "Inhibitor", "Inducer"];

function to_page(page) {
    document.getElementById("main-container").innerHTML = pages[page];

    question_array = [];
    systems_database = {};
}

/***
 * 
 * Create main functions
 * 
 ***/

function start_level(level) {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    fetch("./data_pharmacology.json")

    .then(function(response){
        console.log("- > File found and accessed");
        return response.json();
    })
    .then(function(data){

        original_dictionary = data;
        base = data.Naam;

    })
    .then(function(){
        console.log(original_dictionary);
        console.log("-> Starting level " + level.toString());    

        prepare_ancestry(original_dictionary, "Naam", "Onderverdeling");
    })
    .then(function(){

        console.log("-> Prepared ancestry array");
        console.log(ancestry_dict);
        console.log("-> Prepared content array");
        console.log(content_dict);
        console.log("-> Prepared terminals array");
        console.log(terminals_array);

        prepare_questions(level);
    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        set_questions(); 
    });

    /* Check */

};

function prepare_ancestry(input, name_tag, divider_tag, layers_tag = "") {

    console.log("- > Preparing components");

    var explorable_array = new Array();
    var temp_ancestry_dict = {};
    var temp_content_dict = {};
    var temp_terminals_array = [];

    console.log(input);

    if (!Array.isArray(input)) {
        explorable_array.push(input);
    } else {
        for (var i = 0; i < input.length; i++) {
            explorable_array.push(input[i]);
        }
    }

    

    while (explorable_array.length > 0) {

        explorable_item = explorable_array[0];

        console.log("Exploring " + explorable_item);

        parent_name = explorable_item[name_tag];

        temp_content_dict[parent_name] = explorable_item;

        if (Object.keys(explorable_item).includes(divider_tag)) {

            /* I.e. explorable_item is non-terminal */

            for (var i = 0; i < explorable_item[divider_tag].length; i++) {

                /* Push each child to explorable */

                explorable_array.push(explorable_item[divider_tag][i]);

                var child_name = explorable_item[divider_tag][i][name_tag];

                if (Object.keys(explorable_item[divider_tag][i]).includes(divider_tag)) {

                    grand_children = [];

                    for (var j = 0; j < explorable_item[divider_tag][i][divider_tag].length; j++) {

                        grand_children.push(explorable_item[divider_tag][i][divider_tag][j][name_tag]);

                    };
                    
                    temp_ancestry_dict[child_name] = {"Parent": parent_name, "Children": grand_children}

                } else {
                    temp_ancestry_dict[child_name] = {"Parent": parent_name}
                }
                
                
            };

        } else {

            /* I.e. explorable_item is terminal*/

            temp_terminals_array.push(parent_name);

        };

        explorable_array.shift();
    
    };

    ancestry_dict = temp_ancestry_dict;
    content_dict = temp_content_dict;
    terminals_array= temp_terminals_array;

};

function prepare_questions(level) {

    var temp_question_array = [];
    question_array = [];

    console.log("-> Preparing questions")
    console.log("- -> Level is: " + level)

    if (level == 1 || level == 2) {

        var local_ancestry_dict = ancestry_dict;

        for (var i = 0; i < Object.keys(local_ancestry_dict).length; i++) {

            child = Object.keys(local_ancestry_dict)[i];
            parent = local_ancestry_dict[child].Parent; 

            if (parent != base && ((level == 1 && !terminals_array.includes(child)) || (level == 2 && terminals_array.includes(child)))) {

                if (Math.random() > 0.8) {

                    temp_question_array.push(ancestry_question(child));
    
                } else {

                    question_string = "Wat is de klasse van " + child;
                    temp_question_array.push({"Question": question_string, "Answer": parent });
                
                };                

                if (level == 2) {

                    if (Object.keys(local_ancestry_dict[child]).includes("Children")) {
                        question_string = "Noem een voorbeeld van klasse " + child;
                        grandchildren = local_ancestry_dict[child].Children;
                        temp_question_array.push({"Question": question_string, "Answer": grandchildren });
                    };

                };

            };
        
        };

    };

    if (level == 3) {

        keys = Object.keys(content_dict)

        for (var i = 0; i < keys.length; i++) {

            var current = content_dict[keys[i]].Naam
            var temp_temp_question_array = [];

            if (level == 3 && Object.keys(content_dict[keys[i]]).includes("Interacties")) {

                for (var j = 0; j < content_dict[keys[i]].Interacties.length; j++) {

                    current_interaction = content_dict[keys[i]].Interacties[j];

                    console.log(current_interaction);
                    console.log(shuffle(current_interaction.Interactant));

                    if (terminals_array.includes(current)) {
                        question_string = "Het tegelijk nemen van " + current + " en " + current_interaction.Interactant + " geeft risico op: ";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_interaction.Risico });
                    } else {

                        current_child = shuffle(ancestry_dict[current].Children)[0]

                        question_string = "Het tegelijk nemen van bijv. " + current_child + " en " + current_interaction.Interactant + " geeft risico op: ";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_interaction.Risico });
                        // temp_temp_question_array.push(ancestryQuestion(current_child));
                    }
                    
                    temp_question_array.push(temp_temp_question_array);                    

                };                

            };

        }

    };

    if (level == 11 || level == 12) {

        console.log("Preparing question 11 or 12");

        keys = Object.keys(content_dict)

        for (var i = 0; i < keys.length; i++) {

            var current = content_dict[keys[i]].Naam
            var temp_temp_question_array = [];

            if (Object.keys(content_dict[keys[i]]).includes("Bijwerkingen")) {

                var current_side_effects = recursive_effects(keys[i]);

                if (level == 11) {

                    if (terminals_array.includes(current)) {
                        question_string = "Van welk medicijn is dit het bijwerkingenprofiel: " + parseArray(current_side_effects);
                    } else {
                        question_string = "Van welk klasse medicijn is dit het bijwerkingenprofiel: " + parseArray(current_side_effects);
                    };

                    temp_temp_question_array.push({"Question": question_string, "Answer": current});

                } else {

                    if (terminals_array.includes(current)) {
                        current_string = current;
                    } else {
                        current_string = current + " zoals bijv. " + shuffle(ancestry_dict[current].Children)[0]
                    }

                    if (current_side_effects.length > 3) {
                        question_string = current_string + " heeft tenminste " + (current_side_effects.length).toString() + " potentiële bijwerkingen. Noem er 3.";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_side_effects, "Nr_ans": 3});                    
                    } else {
                        question_string = current_string + " heeft tenminste " + (current_side_effects.length).toString() + " potentiële bijwerkingen. Noem ze.";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_side_effects, "Nr_ans": current_side_effects.length});
                    };                    

                };           

                if (Math.random() > 0.9 && temp_temp_question_array.length > 0) {

                    temp_temp_question_array.push(ancestry_question(current));
    
                };

                temp_question_array.push(temp_temp_question_array);

            };

        };

    };

    if (level == 4 || level == 8 || level == 5 || level == 7 || level == 18 || level == 9 || level == 10 || level == 16) {

        keys = Object.keys(content_dict)

        for (var i = 0; i < keys.length; i++) {

            var current = content_dict[keys[i]].Naam
            var temp_temp_question_array = [];

            if (terminals_array.includes(current)) {
                question_string_middle = " ";
            } else {
                question_string_middle = " klasse ";
            };

            if (level == 4 && Object.keys(content_dict[keys[i]]).includes("Indicaties-list")) {

                question_string = "Welk" + question_string_middle + "medicijn is bruikbaar voor de volgende symptomen: " + parseArray(content_dict[keys[i]]["Indicaties-list"]);
                temp_temp_question_array.push({"Question": question_string, "Answer": current });

            } else if (level == 5 && Object.keys(content_dict[keys[i]]).includes("Mechanisme")) {
            
                question_string = "Welk" + question_string_middle + "medicijn werk op de volgende manier: " + parseArray(content_dict[keys[i]].Mechanisme);
                temp_temp_question_array.push({"Question": question_string, "Answer": current });

            } else if (level == 7 && Object.keys(content_dict[keys[i]]).includes("Zwangerschap")) {
            
                question_string = "Welk categorie valt " + current + " in wat betreft teratologie?";
                temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Zwangerschap[0]});

                if ((content_dict[keys[i]].Zwangerschap).length > 1){

                    time = content_dict[keys[i]].Zwangerschap[1]
                    effect = content_dict[keys[i]].Zwangerschap[2]

                    question_string = "Inderdaad, " + current + " geeft " + time + " risico op: ";
                    temp_temp_question_array.push({"Question": question_string, "Answer": effect});

                };                

            } else if (level == 9 && Object.keys(content_dict[keys[i]]).includes("Enzym")) {
            
                enzym = content_dict[keys[i]].Enzym;

                question_string = "Het" + question_string_middle + "medicijn " + current + " werkt in op " + enzym[0] + ". Is het een enzyminducer, inhibitor of substraat?";
                temp_temp_question_array.push({"Question": question_string, "Answer": enzym[1]});

            } else if (level == 8) {

                if (Object.keys(content_dict[keys[i]]).includes("Voorschrijven")) {
                    
                    question_string = "Moet bij " + current + " de reden van voorschrijven worden vermeld? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Ja"})

                } else if (terminals_array.includes(current) && Math.random() > 0.7) {

                    question_string = "Moet bij " + current + " de reden van voorschrijven worden vermeld? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Nee"})

                }

            } else if (level == 16) {

                if (Object.keys(content_dict[keys[i]]).includes("Rijveiligheid")) {
                    
                    question_string = "Binnen welke rijveiligheidscategorie valt " + current + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Rijveiligheid})

                } else if (terminals_array.includes(current) && Math.random() > 0.7) {

                    question_string = "Binnen welke rijveiligheidscategorie valt " + current + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Categorie 0"})

                };

            } else if (level == 10) {

                if (Object.keys(content_dict[keys[i]]).includes("Klaring") || Object.keys(content_dict[ancestry_dict[current].Parent]).includes("Klaring")) {
                    
                    question_string = "Moet bij " + current + " de dosis worden aangepast bij nierfunctiestoornissen? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Ja"})

                } else if (terminals_array.includes(current) && Math.random() > 0.7) {

                    question_string = "Moet bij " + current + " de dosis worden aangepast bij nierfunctiestoornissen? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Nee"})

                }

            } else if (level == 18) {

                if (Object.keys(content_dict[keys[i]]).includes("Werkingsduur")) {
                    
                    question_string = "Wat is de werkingsduur van " + current + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Werkingsduur})

                };

            };
            
            if (Math.random() > 0.9 && temp_temp_question_array.length > 0) {

                temp_temp_question_array.push(ancestry_question(current));

            };   
            
            temp_question_array.push(temp_temp_question_array);

        };

    };

    if (level == 14 || level == 15) {

        var local_ancestry_dict = ancestry_dict;

        for (var i = 0; i < Object.keys(local_ancestry_dict).length; i++) {

            child = Object.keys(local_ancestry_dict)[i];
            parent = local_ancestry_dict[child].Parent; 
            question_string_middle = " ";

            temp_temp_question_array = [];

            if (parent != base) {

                if (level == 15) {

                    if (Math.random() > 0.5 && Object.keys(content_dict[child]).includes("Indicaties-list")) {

                        question_string = "Welk" + question_string_middle + "medicijn is bruikbaar voor de volgende symptomen: " + (content_dict[child]["Indicaties-list"]).join(", ");
                        temp_temp_question_array.push({"Question": question_string, "Answer": child });
        
                    } else if (Object.keys(content_dict[child]).includes("Mechanisme")) {
                    
                        question_string = "Welk" + question_string_middle + "medicijn werk op de volgende manier: " + (content_dict[child].Mechanisme).join(", ");
                        temp_temp_question_array.push({"Question": question_string, "Answer": child });
        
                    };
                };   

                question_string = "Wat is de klasse van " + child;                
                temp_temp_question_array.push({"Question": question_string, "Answer": parent });

                if (level == 15 && Object.keys(content_dict[child]).includes("Interacties")) {

                    current_interaction = shuffle(content_dict[child].Interacties)[0]

                    if (terminals_array.includes(child)) {
                        question_string = "Het tegelijk nemen van " + child + " en " + current_interaction.Interactant + " geeft risico op: ";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_interaction.Risico });
                    } else {

                        current_child = shuffle(ancestry_dict[child].Children)[0]

                        question_string = "Het tegelijk nemen van " + child + " zoals bijv. " + current_child + " en " + current_interaction.Interactant + " geeft risico op: ";
                        temp_temp_question_array.push({"Question": question_string, "Answer": current_interaction.Risico });
                    }

                };
                
                if (Object.keys(content_dict[child]).includes("Voorschrijven")) {
                    
                    question_string = "Moet bij " + child + " de reden van voorschrijven worden vermeld? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Ja"})

                } else if (terminals_array.includes(child) && Math.random() > 0.8) {

                    question_string = "Moet bij " + child + " de reden van voorschrijven worden vermeld? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Nee"})

                };

                if (Object.keys(content_dict[child]).includes("Klaring")) {
                    
                    question_string = "Moet bij " + child + " de dosis worden aangepast bij nierfunctiestoornissen? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Ja"})

                } else if (terminals_array.includes(child) && Math.random() > 0.8) {

                    question_string = "Moet bij " + child + " de dosis worden aangepast bij nierfunctiestoornissen? Ja of nee";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Nee"})

                };

                if (Object.keys(content_dict[child]).includes("Zwangerschap")) {
            
                    question_string = "Welk categorie valt " + child + " in wat betreft teratologie?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[child].Zwangerschap[0]});

                    if ((content_dict[child].Zwangerschap).length > 1){
                    
                        time = content_dict[child].Zwangerschap[1]
                        effect = content_dict[child].Zwangerschap[2]
    
                        question_string = "Inderdaad, " + current + " geeft " + time + " risico op: ";
                        temp_temp_question_array.push({"Question": question_string, "Answer": effect});
    
                    }; 
    
                } else if (terminals_array.includes(child) && Math.random() > 0.8) {

                    question_string = "Welk categorie valt " + child + " in wat betreft teratologie?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Onbekend"})

                }; 

                if (Object.keys(content_dict[child]).includes("Rijveiligheid")) {
                    
                    question_string = "Binnen welke rijveiligheidscategorie valt " + child + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[child].Rijveiligheid})

                } else if (terminals_array.includes(child) && Math.random() > 0.8) {

                    question_string = "Binnen welke rijveiligheidscategorie valt " + child + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "0"})

                };
                
                if (Object.keys(content_dict[child]).includes("Enzym")) {
                
                    enzym = content_dict[child].Enzym;

                    question_string = "Zijn enzymen van belang in het voorschrijven van " + child + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Ja"});
    
                    question_string = "Het" + question_string_middle + "medicijn " + child + " werkt in op " + enzym[0] + ". Is het een enzyminducer, inhibitor of substraat?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": enzym[1]});
                
                } else if (terminals_array.includes(child) && Math.random() > 0.8) {

                    question_string = "Zijn enzymen van belang in het voorschrijven van " + child + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": "Nee"})

                };
                
                if (Object.keys(content_dict[keys[i]]).includes("Werkingsduur")) {
                    
                    question_string = "Wat is de werkingsduur van " + current + "?";
                    temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Werkingsduur})

                };

                if (Object.keys(content_dict[child]).includes("Bijwerkingen")) {

                    var current_side_effects = recursive_effects(child);
                    var current_string = "";

                    console.log(current_side_effects);

                    if (current_side_effects.length > 0) {

                        if (terminals_array.includes(child)) {
                            current_string = child;
                        } else {
                            current_string = child + " zoals bijv. " + shuffle(ancestry_dict[child].Children)[0]
                        }

                        if (current_side_effects.length > 3) {
                            question_string = current_string + " heeft tenminste " + (current_side_effects.length).toString() + " potentiële bijwerkingen. Noem er 3.";
                            temp_temp_question_array.push({"Question": question_string, "Answer": current_side_effects, "Nr_ans": 3});                    
                        } else {
                            question_string = current_string + " heeft tenminste " + (current_side_effects.length).toString() + " potentiële bijwerkingen. Noem ze.";
                            temp_temp_question_array.push({"Question": question_string, "Answer": current_side_effects, "Nr_ans": current_side_effects.length});
                        }; 

                    };
                };

                temp_question_array.push(temp_temp_question_array);

            };
        
        };

    };

    console.log(temp_question_array);
    question_array = (shuffle(temp_question_array)).flat(1);

};

function set_questions(){

    console.log("- > Setting first question")

    document.getElementById('question-title').innerText = "0/" + question_array.length;
    document.getElementById('question-description').innerText = question_array[0].Question
    document.getElementById('remark-card').innerText = "Please answer the question"

};

function recursive_effects(current) {

    if (Object.keys(content_dict[current]).includes("Bijwerkingen")) {

        var current_side_effects = [];

        for (var j = 0; j < content_dict[current].Bijwerkingen.length; j++) {

            current_side_effects.push(content_dict[current].Bijwerkingen[j].Bijwerking)   

        };

        par_obj = ancestry_dict[current].Parent;

        if (Object.keys(content_dict[par_obj]).includes("Bijwerkingen")) {

            for (var j = 0; j < content_dict[par_obj].Bijwerkingen.length; j++) {

                current_side_effects.push(content_dict[par_obj].Bijwerkingen[j].Bijwerking)   

            };

            console.log(par_obj);

            if (Object.keys(ancestry_dict[par_obj]).includes("Parent")) {

                if (Object.keys(content_dict[ancestry_dict[par_obj].Parent]).includes("Bijwerkingen")) {

                    for (var j = 0; j < (content_dict[ancestry_dict[par_obj].Parent]).Bijwerkingen.length; j++) {

                        current_side_effects.push((content_dict[ancestry_dict[par_obj].Parent]).Bijwerkingen[j].Bijwerking)   
    
                    };

                };
            };

        };                  

    };

    return current_side_effects;

};

function grade_answer() {

    // There are basically two options: either we're checking the mnemonic, 
    // or the individual elements

    const textfield = document.getElementById('text-field');    
    const given_answer = textfield.value;

    const indices = (document.getElementById('question-title').innerText).split("/")
    const current_index = indices[0]; 

    const correct_answer = question_array[current_index].Answer; 
    const nr_ans = question_array[current_index].Nr_ans;      
    
    console.log("- - > Checking mnemonic")
    console.log("- - > Right answer is: " + correct_answer)

    // Going to make the answers easier to parse

    const original_correct_answer = correct_answer;

    if (!Array.isArray(correct_answer)){
        trimmed_correct_answer = (((correct_answer.toLowerCase()).replace("-", "")).replace(" ", "")).replace("\'", "")
    }

    trimmed_given_answer = (((given_answer.toLowerCase()).replace("-", "")).replace(" ", "")).replace("\'", "")   

    console.log("- - > Right answer is: " + correct_answer)

    if (given_answer != "" && given_answer != null && given_answer != undefined) {

        if (Array.isArray(correct_answer) && !(question_array[current_index].Question).includes("voorbeeld")) {

            console.log("Is array!")

            if (correct_answer.includes(given_answer)) {

                console.log("Correct!");

                const textfield = document.getElementById('text-field');
                textfield.value = "";

                inner_text = document.getElementById('remark-card').innerText;

                console.log("String: " + String(correct_answer.length - 1));

                if (inner_text.includes("||")) {

                    document.getElementById('remark-card').innerText = inner_text + " " + given_answer + " || ";
    
                } else {
    
                    document.getElementById('remark-card').innerText = given_answer + " || ";
    
                };

                if (inner_text.split("||").length >= nr_ans || inner_text.split("||").length > (correct_answer.length - 1)) {

                    next_question();

                };
                

            } else {

                console.log("False!")

                document.getElementById('remark-card').innerText = "False! The correct answers are: " + correct_answer + ". We'll repeat this question."

                let local_question_array = question_array;
                local_question_array.splice(intervalIndex(current_index, 4, local_question_array), 0, {"Question": ("Dit is een herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer, "Nr_ans": question_array[current_index].Nr_ans});
                local_question_array.splice(intervalIndex(current_index, 12, local_question_array), 0, {"Question": ("Dit is een herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer, "Nr_ans": question_array[current_index].Nr_ans});

                question_array = local_question_array;
                console.log(question_array);

            };

            document.getElementById('question-title').style.animation = "correct 1s linear 0s";
            setTimeout(function(){document.getElementById('question-title').style.animation = "idle 0s ease-in-out 0s";}, 3000);

        } else if (trimmed_correct_answer == trimmed_given_answer || ((correct_answer.includes(",") || Array.isArray(correct_answer)) && correct_answer.includes(given_answer))) {

            console.log("- - > Correct!")

            console.log(original_correct_answer)
            console.log(correct_answer)
            console.log(given_answer)
            console.log(trimmed_given_answer)

            if (document.getElementById('question-description').innerText.includes("Noem een voorbeeld van") && !terminals_array.includes(given_answer)) {

                let local_question_array = question_array;

                try {
                    local_question_array.splice(intervalIndex(current_index, 1, local_question_array), 0, ancestry_question(given_answer));
                } catch {
                    console.log("--> Doesn't exist: " + given_answer);
                };
                
                question_array = local_question_array;

            } else if (document.getElementById('question-description').innerText.includes("Van welke categorie is") && ancestry_dict[original_correct_answer].Parent != base) {

                let local_question_array = question_array;

                let local_ancestry_question = ancestry_question(original_correct_answer, "up");

                if (!local_question_array.includes(local_ancestry_question)) {
                    local_question_array.splice(intervalIndex(current_index, 1, local_question_array), 0, local_ancestry_question);
                };
                
                question_array = local_question_array;

            };         

            next_question();

            document.getElementById('question-title').style.animation = "correct 1s linear 0s";
            setTimeout(function(){document.getElementById('question-title').style.animation = "idle 0s ease-in-out 0s";}, 3000);

        } else {

            console.log("- - > Given answer: " + given_answer);
            console.log("- - > Right answer: " + correct_answer);

            if (document.getElementById('remark-card').innerText != "Please repeat the answer" && !trivial_answers.includes(correct_answer)) {
                
                document.getElementById('remark-card').innerText = "Please repeat the answer";
                document.getElementById('question-title').style.animation = "false 1s linear 0s";
                setTimeout(function(){document.getElementById('question-title').style.animation = "idle 0s ease-in-out 0s";}, 3000);
            
            } else {

                document.getElementById('remark-card').innerText = "Het goede antwoord is: " + correct_answer + ". We zullen deze vraag later nogmaals herhalen.";
                document.getElementById('question-title').style.animation = "false 1s linear 0s";
                setTimeout(function(){document.getElementById('question-title').style.animation = "idle 0s ease-in-out 0s";}, 3000);

                let local_question_array = question_array;
                
                local_question_array.splice(current_index + 4, 0, {"Question": ("Dit is de eerste herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer});
                local_question_array.splice(current_index + 12, 0, {"Question": ("Dit is de tweede herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer});

                question_array = local_question_array;
                console.log(question_array);

            };
            
            textfield.value = "";    

        }
    } else {

        console.log("Answer something!");

    }
}

function next_question() {

    resetButtons();

    const textfield = document.getElementById('text-field');
    textfield.value = "";

    indices = (document.getElementById('question-title').innerText).split("/")

    current_index = indices[0];

    if (current_index < (question_array.length - 1)) {
        new_index = parseInt(current_index) + 1;

        document.getElementById('remark-card').innerText = "Please answer the question." 
        document.getElementById('question-description').innerText = question_array[new_index].Question
        document.getElementById('question-title').innerText = new_index + "/" + question_array.length;

    } else {

        document.getElementById('remark-card').innerText = "Congratulations!" 
        document.getElementById('question-description').innerText = "You're all done with the questions! Congratulations on completing them! You've done amazing; good job!"
        document.getElementById('question-title').innerText = "Done!";

        document.getElementById('question-input-card').innerHTML = 
    
        `
        <input type="button" class="button" id ="hint-button" value="X" onclick="toPage('Landing')">
        <input type="button" class="button" id ="check-button" value="✓" onclick="toPage('Landing')">  
        `       

    }
    
    /* Setting all new text */

    

};

function explanatory_remark(display_text) { 

    resetButtons();

    const textfield = document.getElementById('text-field');
    textfield.value = "";
    
    /* Setting all new text */

    document.getElementById('remark-card').innerText = "Good job!" 
    document.getElementById('question-description').innerText = "Het volledige antwoord was: " + display_text.join(", ")
    
    document.getElementById('question-input-card').innerHTML = 
            
    `
    <input type="button" class="button" id ="next-button" value="Next" onclick="next_question()">  
    `;

    setEnter();

};

function startSymptoms() {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    fetch("./data_symptoms.json")

    .then(function(response){
        console.log("- > Symptom file found and accessed");
        return response.json();
    })
    .then(function(data){

        original_dictionary = data;
        base = data.Naam;

    })
    .then(function(){
        
        console.log("- > Preparing components");

        var explorable_array = [original_dictionary];
        var temp_question_array = [];

        var name_question = "What is the definition of ";
        var def_question = "What symptom is defined as follows: ";

        while (explorable_array.length > 0) {

            explorable_item = explorable_array[0];

            if (Object.keys(explorable_item).includes("Definition")) {

                if (Math.random() > 0.5) {

                    temp_question_array.push({"Question": name_question + explorable_item["Name"] + "?", "Answer": explorable_item["Definition"] });

                } else {

                    temp_question_array.push({"Question": def_question + explorable_item["Definition"] + "?", "Answer": explorable_item["Name"]});

                }

            };

            if (Object.keys(explorable_item).includes("Subdivision")) {
                
                explorable_array = explorable_array.concat(explorable_item["Subdivision"]);

            };

            explorable_array.shift();

        };

        question_array = (shuffle(temp_question_array)).flat(1);

    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        set_questions(); 
    });

    /* Check */
};

function startDisorders() {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    fetch("./data_disorders.json")

    .then(function(response){
        console.log("- > Disorder file found and accessed");
        return response.json();
    })
    .then(function(data){

        original_dictionary = data;
        base = data.Naam;

    })
    .then(function(){
        
        console.log("- > Preparing components");

        var explorable_array = [original_dictionary];
        var temp_question_array = [];

        while (explorable_array.length > 0) {

            explorable_item = explorable_array[0];

            if (Object.keys(explorable_item).includes("Symptoms")) {

                symptoms = explorable_item["Symptoms"].join(", ");

                if (Object.keys(explorable_item).includes("Causes")) {

                    cause = explorable_item["Causes"][Math.floor(Math.random() * explorable_item["Causes"].length)]

                    temp_question_array.push({"Question": "A patient with " + cause + " in their chart presents with the following symptoms: " + symptoms + ". What condition do they have?", "Answer": explorable_item["Name"] });

                } else {                

                    temp_question_array.push({"Question": "A patient presents with the following symptoms: " + symptoms + ". What condition do they have?", "Answer": explorable_item["Name"] });

                };

            };

            if (Object.keys(explorable_item).includes("Causes")) {

                causes = (explorable_item["Causes"]).join(", ");

                temp_question_array.push({"Question": "What disease may have the following causes: " + causes + "?", "Answer": explorable_item["Name"] });

            };

            if (Object.keys(explorable_item).includes("Subtypes")) {
                
                explorable_array = explorable_array.concat(explorable_item["Subtypes"]);

            };

            explorable_array.shift();

        };

        question_array = (shuffle(temp_question_array)).flat(1);

    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        set_questions(); 
    });

};

function startSystems() {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    fetch("./data_angiotensin_system.json")

    .then(function(response){
        console.log("- > System file found and accessed");
        return response.json();
    })
    .then(function(data){

        original_dictionary = data;

    })
    .then(function(){

        console.log("- > Preparing components");

        var explorable_array = [original_dictionary];
        
        function_array = [];

        while (explorable_array.length > 0) {

            explorable_item = explorable_array[0];

            if (Object.keys(explorable_item).includes("Subsystems")) {

                explorable_array = explorable_array.concat(explorable_item["Subsystems"]);

            } else if (Object.keys(explorable_item).includes("Parts")) {

                explorable_array = explorable_array.concat(explorable_item["Parts"]);

            };

            if (Object.keys(explorable_item).includes("Process")) {

                current_organ = explorable_item["Name"]
                current_process = explorable_item["Process"]         
                
                console.log("Exploring " + current_organ)

                for (let i = 0; i < current_process["Input"].length; i++) {

                    temp_array = [current_organ]

                    for (let j = 0; j < systems_list.length; j++) {

                        temp_array.push(current_process[systems_list[j]][i]) 
    
                    };

                    function_array.push(temp_array);

                };                

            };

            explorable_array.shift();

        };

        shuffle(function_array)

        console.table(function_array);

    })
    .then(function(){

        var starting_point = Math.round(Math.random() * function_array.length);

        explorables = [function_array[starting_point][1]];

        while (explorables.length > 0) {

            current_explorable = explorables[0];

            for (let i = 0; i < function_array.length; i++) {

                console.log(current_explorable);

                if (function_array[i][1] == current_explorable) {

                    full_question = systemQuestion(function_array[i]);

                    question_array.push(full_question[0]);

                    console.log("New explorable: " + full_question[1]);

                    explorables.push(full_question[1]);
                    console.log(explorables);

                    i = function_array.length; 

                } else if (function_array[i][2] == current_explorable) {

                    full_question = systemQuestion(function_array[i]);

                    question_array.push(full_question[0]);

                    console.log("New explorable: " + full_question[2]);

                    explorables.push(full_question[2]);
                    i = function_array.length;

                };

            };            

            explorables.shift();

        };

        

        console.log("-> Prepared questions")
        console.log(question_array);

        set_questions(); 

    })

};

function start_ophtho(level) {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    var fetchable = "";

    if (level < 3) {
        fetchable = "./data_ocular_anatomy.json"
    } else if (level == 3) {
        fetchable = "./data_symptoms.json"
    } else if (level == 4) {
        fetchable = "./data_ocular_pathology.json"
    }

    fetch(fetchable)

    .then(function(response){
        console.log("- > File found and accessed");
        return response.json();
    })
    .then(function(data){

        prepare_ancestry(data, "Name", "Subdivision", "Layers");

        console.log(content_dict);

        if (level == 3) { prepare_ancestry([content_dict["Ocular symptoms"], content_dict["Ocular signs"]], "Name", "Subdivision") };

        base = data.Name;       

    })
    .then(function(){

        console.log(ancestry_dict);
        console.log(content_dict);

        var temp_question_array = [];
        
        if (level == 1) {
    
            for (var i = 0; i < Object.keys(ancestry_dict).length; i++) {
    
                child = Object.keys(ancestry_dict)[i];
                parent = ancestry_dict[child]["Parent"]; 
    
                if (parent != base && level == 1) {
    
                    question_string = "Of what structure is the " + child + " a part?";
                    temp_question_array.push({"Question": question_string, "Answer": parent });

                };
            
            };
    
        } else if (level == 2) {

            for (var i = 0; i < Object.keys(content_dict).length; i++) {
    
                current_name = Object.keys(content_dict)[i];
                current_object = content_dict[current_name];      
                
                console.log(Object.keys(current_object));
    
                if (Object.keys(current_object).includes("Product")) {
    
                    question_string = "What does " + current_name + " produce?";
                    temp_question_array.push({"Question": question_string, "Answer": current_object["Product"]});

                    if (Math.random() > 0.8) {

                        temp_question_array.push(ancestry_question(current_name))

                    };

                };

                if (Object.keys(current_object).includes("Anterior border")) {
    
                    question_string = "What structure borders " + current_name + " anteriorly?";
                    temp_question_array.push({"Question": question_string, "Answer": current_object["Anterior border"]});

                    if (Math.random() > 0.8) {

                        temp_question_array.push(ancestry_question(current_object["Anterior border"]))

                    };

                };

                if (Object.keys(current_object).includes("Posterior border")) {
    
                    question_string = "What structure borders " + current_name + " posteriorly?";
                    temp_question_array.push({"Question": question_string, "Answer": current_object["Posterior border"]});

                    if (Math.random() > 0.8) {

                        temp_question_array.push(ancestry_question(current_object["Posterior border"]))

                    };

                };

                if (Object.keys(current_object).includes("Size")) {
    
                    question_string = "What is the " + current_object["Size"][0] + " of the " + current_name + "?";
                    temp_question_array.push({"Question": question_string, "Answer": current_object["Size"][1]});

                    if (Math.random() > 0.8) {

                        temp_question_array.push(ancestry_question(current_name))

                    };

                };
            
            };

        } else if (level == 3) {

            for (var i = 0; i < Object.keys(content_dict).length; i++) {

                current_object = content_dict[Object.keys(content_dict)[i]];
    
                if (Object.keys(current_object).includes("Definition")) { temp_question_array.push(definition_question(current_object, "symptom"))};
                if (Object.keys(current_object).includes("Causes")) { temp_question_array.push(list_question(current_object, "Causes")) };

            };


        } else if (level == 4) {

            for (var i = 0; i < Object.keys(content_dict).length; i++) {

                current_object = content_dict[Object.keys(content_dict)[i]];

                console.log(current_object);
    
                if (Object.keys(current_object).includes("Definition")) { temp_question_array.push(definition_question(current_object, "disease"))};
            
            };
        };

        question_array = (shuffle(temp_question_array)).flat(1);

    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        set_questions(); 
    });

};

function giveHint() {

    console.log("- > Asked for hint")

    indices = (document.getElementById('question-title').innerText).split("/")
    current_index = indices[0];

    correct_answer = question_array[current_index].Answer; 

    document.getElementById('remark-card').innerText = "Hint: " + correct_answer + ". This question will be repeated once!";

    let local_question_array = question_array;
    local_question_array.splice(intervalIndex(current_index, 4, local_question_array), 0, {"Question": ("Dit is de eerste herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer});

    question_array = local_question_array;
};

function start_symptoms(category, level) {

    fetchable = "./data_symptoms.json"

    fetch(fetchable)

    .then(function(response){
        console.log("- > Symptom found and accessed");
        return response.json();
    })
    .then(function(data){

        prepare_ancestry(data, "Name", "Subdivision", "Layers");

        console.log(content_dict);

        prepare_ancestry([content_dict[category + " symptoms"], content_dict[category + " signs"]], "Name", "Subdivision");

        base = data.Name;       

    })
    .then(function(){

        console.log(ancestry_dict);
        console.log(content_dict);

        var temp_question_array = [];
        var temp_temp_question_array = [];
        
        for (var i = 0; i < Object.keys(content_dict).length; i++) {

            temp_temp_question_array = []

            current_object = content_dict[Object.keys(content_dict)[i]];

            if (level > 0) {

                if (Object.keys(current_object).includes("Definition")) { temp_temp_question_array.push(definition_question(current_object, "symptom"))};
                if (Object.keys(current_object).includes("Alternative name")) { temp_temp_question_array.push(name_question(current_object, "symptom"))};

            };

            if (level > 1) {

                if (Object.keys(current_object).includes("Causes")) { temp_temp_question_array.push(list_question(current_object, "Causes")) };

            };         

            temp_question_array.push(temp_temp_question_array);

        };

        question_array = (shuffle(temp_question_array)).flat(1);

    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        openFullscreen();
        document.getElementsByTagName("BODY")[0].innerHTML = level_page;
        setEnter();

        set_questions(); 
    });

};

function start_basics(category, level) {

    fetchable = "./data_anatomy.json"

    fetch(fetchable)

    .then(function(response){
        console.log("- > Anatomy found and accessed");
        return response.json();
    })
    .then(function(data){

        prepare_ancestry(data, "Name", "Subdivision", "Layers");

        console.log("- > General ancestry dict is:")
        console.log(content_dict);

        prepare_ancestry(content_dict[category + " system"], "Name", "Subdivision");

        console.log("- > Specialised ancestry dict is:")
        console.log(content_dict);

        base = data.Name;       

    })
    .then(function(){

        var temp_question_array = [];
        var temp_temp_question_array = [];
        
        for (var i = 0; i < Object.keys(content_dict).length; i++) {

            temp_temp_question_array = []

            current_object = content_dict[Object.keys(content_dict)[i]];

            if (level == 0 || level == 1) {

                if (Object.keys(current_object).includes("Subdivision") && !Object.keys(current_object["Subdivision"][0]).includes("Subdivision")) {

                    temp_temp_question_array.push(content_question(current_object, "anatomical structures"))
                    temp_temp_question_array.push(ancestry_question(current_object, "up", "groep"))

                };

            };

            temp_question_array.push(temp_temp_question_array);

        };

        question_array = (shuffle(temp_question_array)).flat(1);

        if (level == 0) {

            var start_index = Math.round(Math.random() * (question_array.length - 10));

            if (start_index % 2 !== 0) {
                start_index = start_index - 1;
            }

            question_array = question_array.slice(start_index, start_index + 10);
        }

    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        openFullscreen();
        document.getElementsByTagName("BODY")[0].innerHTML = level_page;
        setEnter();

        set_questions(); 
    });

};

/***
 * 
 * Utilities: All utility functions are pushed to the bottom for saving space
 * 
 ***/

/* Finds the possible next index */

function definition_question(current_object, category) {

    question_string = "What " + category + " is defined as follows: " + current_object["Definition"] + "?";
    question = ({"Question": question_string, "Answer": current_object["Name"] });

    return question

};

function name_question(current_object, category) {

    question_string = "What " + category + " is also known as: " + current_object["Alternative name"] + "?";
    question = ({"Question": question_string, "Answer": current_object["Name"] });

    return question

};

function content_question(current_object, category) {

    sub_types = [];

    for (var x = 0; x < current_object["Subdivision"].length; x++) {

        sub_types.push(current_object["Subdivision"][x]["Name"])

    };

    question_string = "What " + category + " are included in the following group: " + current_object["Name"] + "?";
    question = ({"Question": question_string, "Answer": sub_types });

    return question

}

function list_question(current_object, list_type) {

    if (current_object[list_type].length > 3) {
        question_string = current_object["Name"] + " has at least " + (current_object[list_type].length).toString() + " " + list_type + "; name three: ";
        question = {"Question": question_string, "Answer": current_object[list_type], "Nr_ans": 3};                    
    } else {
        question_string = current_object["Name"] + " has " + (current_object[list_type].length).toString() + " " + list_type + "; name them: ";
        question = {"Question": question_string, "Answer": current_object[list_type], "Nr_ans": current_object[list_type].length};  
    };  
    
    return question

}

function parseArray(array) {

    let new_array = "";

    if (Array.isArray(array)) {
        new_array = array.join(", ")
    } else {
        new_array = new_array;
    };

    return new_array;

}

function systemQuestion(system) {

    console.log(system)

    if (system[1] != "" && system[2] != "") {

        question = "The " + system[2] + " causes " + system[3] + " of " + system[1] + " to occur in " + system[0] + ". What is the result?"
        answer = system[4]

    } else if (system[2] != "") {

        question = "In " + system[0] + " and mediated by " + system[2] + " the " + system[1] + " causes " + system[3] + " of: "
        answer = system[4]

    } else if (system[1] != "") {

        question = "Through " + system[3] + " taking place in the " + system[0] + ", " + system[1] + " results in the following: "
        answer = system[4]

    };

    if (!Array.isArray(answer)) {
        return [{"Question": question, "Answer": answer}, answer]
    } else {

        console.log(Math.round(Math.random() * answer.length));

        return [{"Question": question, "Answer": answer}, answer[Math.round(Math.random() * answer.length)]]
    }

    
}

function intervalIndex(current_index, desired_interval, array) {

    let length = array.length;
    let temp_current_index = parseInt(current_index);
    let temp_desired_interval = parseInt(desired_interval);

    if (temp_current_index + temp_desired_interval < length) {
        return (temp_current_index + temp_desired_interval)
    } else {
        return (length)
    }

}

/* Shuffle arrays */

function ancestry_question(current, direction="random", category="categorie") {

    if (typeof current != "string") {
        current = current["Name"]
    };

    try {
        if (terminals_array.includes(current) || direction == "up") {

            console.log(ancestry_dict[current].Parent)

            question_string = "Van welke " + category + " is '" + current + "' een deel?";
            return {"Question": question_string, "Answer": ancestry_dict[current].Parent }

        } else {

            question_string = "Noem een voorbeeld van " + current;
            return {"Question": question_string, "Answer": ancestry_dict[current].Children }

        }

    } catch {
        console.log("Issues with: " + current)
    }

};

/* Shuffles arrays */

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

/* Resets buttons to original */

function resetButtons() {
    
    document.getElementById('question-input-card').innerHTML = 
    
    `
    <input type="button" class="button" id ="hint-button" value="X" onclick="giveHint()">
    <input type="button" class="button" id ="check-button" value="✓" onclick="checkMnemonicAnswer()">  
    `

    document.getElementById('text-field').value = "";

    setEnter();

}

/* Resets the screen back to the start screen */

function backToStart() {
    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = landing_page;
}

/* Set a listener function for enter */

function setEnter() {

    var input = document.getElementById("text-field");

    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        console.log("-> Pressed enter")
        // Trigger the button element with a click
        grade_answer();
    }
    });

}

/* Set to full screen mode */

function openFullscreen() {

    var elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

/* From the old function in order to expand mnemonic */

function expandMnemonic() {

    const current_index = parseInt(document.getElementById('question-title').innerText);
    const textfield = document.getElementById('text-field');

    const keys = Object.keys(question_array[current_index].Mnemonic)

    document.getElementById('question-title').innerText = current_index.toString() + ".1"
    document.getElementById('question-description').innerText = "What is the meaning of: " + keys[1]
    document.getElementById('remark-card').innerText = "Please enter the answer"

    resetButtons();

    textfield.value = "";

}

/**
 * 
 * Back-up
 * 
 **/

function legacy(level) {

    console.log("- > Preparing questions");

    explorable_array = shuffle(data.Onderverdeling);

    while (explorable_array.length > 0) {

        explorable_item = explorable_array.pop();

        if (Object.keys(explorable_item).includes("Indicaties-list")) {
        
            if (Object.keys(explorable_item).includes("Onderverdeling")) {
                question_string_1 = "Welk (klasse) medicijn is bruikbaar voor de volgende symptomen: " + explorable_item["Indicaties-list"];
                question_string_2 = "Noem een voorbeeld van " + explorable_item.Naam;

                answer_array = [];

                for (var i = 0; i < explorable_item.Onderverdeling.length; i++) {
                    answer_array.push(explorable_item.Onderverdeling[i].Naam);
                }

                temp_3_array.push([{"Question": question_string_1, "Answer": explorable_item.Naam}, {"Question": question_string_2, "Answer": answer_array}])

            } else {
                question_string = "Welk (klasse) medicijn is bruikbaar voor de volgende symptomen: " + explorable_item["Indicaties-list"];
                temp_3_array.push({"Question": question_string, "Answer": explorable_item.Naam})
            }        

        }

        if (Object.keys(explorable_item).includes("Interacties")) {

            if (Object.keys(explorable_item).includes("Onderverdeling") && explorable_item.Onderverdeling.length > 1) {

                class_1 = explorable_item.Naam;
                original_med_1 = explorable_item.Onderverdeling

            } else {

                med_1 = explorable_item.Naam;
                class_1 = "";

            }

            for (var i = 0; i < explorable_item.Interacties.length; i++) {

                for (var j = 0; j < explorable_item.Interacties[i].Interactant.length; j++) {

                    var med_2 = explorable_item.Interacties[i].Interactant[j]

                    if (class_1 != "") {

                        med_1 = original_med_1[Math.floor(Math.random() * original_med_1.length)].Naam;

                        question_string_class = "Dit geldt niet sec voor " + med_1 + ", maar voor de gehele klassie. Wat is de klasse van " + med_1 + "?";

                        question_string_inter = "Als we " + med_1 + " en " + med_2 + " tegelijk nemen, op welke interactie verhogen we dan het risico?";
                        
                        rand_pos = Math.floor(Math.random() * temp_2_array.length)

                        temp_2_array.push([{"Question": question_string_inter, "Answer": explorable_item.Interacties[i].Risico}, {"Question": question_string_class, "Answer": class_1 }])
                        
                    } else {

                        question_string = "Als we " + med_1 + " en " + med_2 + " tegelijk nemen, op welke interactie verhogen we dan het risico?";
                        temp_2_array.push({"Question": question_string, "Answer": explorable_item.Interacties[i].Risico})

                    }              

                };

            };

        };

        if (Object.keys(explorable_item).includes("Onderverdeling")) {

            var class_name = explorable_item.Naam;

            for (var i = 0; i < explorable_item.Onderverdeling.length; i++) {

                if (Object.keys(explorable_item.Onderverdeling[i]).includes("Onderverdeling") || Object.keys(explorable_item.Onderverdeling[i]).includes("Interacties")) {
                    explorable_array.push(explorable_item.Onderverdeling[i])
                };

                question_string = "Wat is de klasse van " + explorable_item.Onderverdeling[i].Naam;
                temp_1_array.push({"Question": question_string, "Answer": class_name });
                
            };

        };

    };

    level1_question_array = shuffle(temp_1_array);
    level2_question_array = (shuffle(temp_2_array)).flat(1);
    level3_question_array = (shuffle(temp_3_array)).flat(1);

    console.log("- -> Prepared level 1 questions: order")
    console.log(level1_question_array);
    console.log("- -> Prepared level 2 questions: interactions")
    console.log(level2_question_array);
    console.log("- -> Prepared level 2 questions: indications")
    console.log(level3_question_array);

};



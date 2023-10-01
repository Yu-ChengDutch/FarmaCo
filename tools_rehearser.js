/***
 * 
 * Create prerequisites
 * 
 ***/

/* Create arrays */

var question_array = [];

var ancestry_dict = {};
var content_dict = {};
var terminals_array = [];

var original_dictionary = {};

var base = "";

/* Define the pages */

var landing_page = `
<script type="text/javascript" src="tools_rehearser.js"></script>

<div class="chapter"><H1>Basics</H1></div>

<div style="display:block; text-align: center;" onclick="startLevel(1)">
    <div class="card" id="active">
        <img src="./Images/Network.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Organisatie </H2>

</div>

<div style="display:block; text-align: center;" onclick="startLevel(2)">
    <div class="card" id="active">
        <img src="./Images/Network.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Indiv. medicatie </H2>

</div>

<div class="chapter" ><H1>Bijwerkingen en indicaties</H1></div>  

<div style="display:block; text-align: center;" onclick="startLevel2()">
    <div class="card" id="active">
        <img src="./Images/Interactions.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Interacties </H2>

</div>

<div style="display:block; text-align: center;" onclick="startLevel3()">
    <div class="card" id="active">
        <img src="./Images/Interactions.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Indicaties </H2>

</div>

<div class="chapter" ><H1>Rijveiligheid, zwangerschap en voorschrijven</H1></div>  

<div style="display:block; text-align: center;" onclick="startLevel3()">
    <div class="card" id="active">
        <img src="./Images/SteeringWheel.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Rijveiligheid </H2>

</div>

<div style="display:block; text-align: center;" onclick="startLevel4()">
    <div class="card" id="active">
        <img src="./Images/Pregnancy.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Zwangerschap </H2>

</div>

<div style="display:block; text-align: center;" onclick="startLevel5()">
    <div class="card" id="active">
        <img src="./Images/Pad.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Voorschrijven </H2>

</div>

<div style="display:block; text-align: center;" onclick="startLevel6()">
    <div class="card" id="active">
        <img src="./Images/Enzym.png" style="width:20vw;height:20vw;">
    </div>

    <H2> Enzymen </H2>

</div>
`

var level_page= `

    <script type="text/javascript" src="tools_rehearser.js"></script>
    
    <div class = "question-card">

        <div class="question-title-card" onClick="backToStart()">

            <h1 id="question-title">Question 1</h1>
            <p id ="question-description">What is the name of this disease?</p>
        
        </div>

        <div class="question-input-card" id="question-input-card">
            <input type="text" id="text-field">
            <input type="button" class="button" id ="check-button" value="Check" onclick="checkMnemonicAnswer()"> 
        </div>

        <div id="remark-card">
            
            <p id ="question-description"></p>
        
        </div>

    </div>

`

/***
 * 
 * Create main functions
 * 
 ***/

function startLevel(level) {

    openFullscreen();
    document.getElementsByTagName("BODY")[0].innerHTML = level_page;
    setEnter();

    fetch("./med_data.json")

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

        prepareComponents();
    })
    .then(function(){

        console.log("-> Prepared ancestry array");
        console.log(ancestry_dict);
        console.log("-> Prepared content array");
        console.log(content_dict);
        console.log("-> Prepared terminals array");
        console.log(terminals_array);

        prepareQuestions(level);
    })
    .then(function(){

        console.log("-> Prepared questions")
        console.log(question_array);

        setQuestions(); 
    });

    /* Check */

};

function prepareComponents() {

    console.log("- > Preparing components");

    var explorable_array = [original_dictionary];
    var temp_ancestry_dict = {};
    var temp_content_dict = {};
    var temp_terminals_array = [];

    while (explorable_array.length > 0) {

        explorable_item = explorable_array[0];

        console.log("Exploring " + explorable_item);

        parent_name = explorable_item.Naam;

        temp_content_dict[parent_name] = explorable_item;

        if (Object.keys(explorable_item).includes("Onderverdeling")) {

            /* I.e. explorable_item is non-terminal */

            for (var i = 0; i < explorable_item.Onderverdeling.length; i++) {

                /* Push each child to explorable */

                explorable_array.push(explorable_item.Onderverdeling[i]);

                var child_name = explorable_item.Onderverdeling[i].Naam;

                if (Object.keys(explorable_item.Onderverdeling[i]).includes("Onderverdeling")) {

                    grand_children = [];

                    for (var j = 0; j < explorable_item.Onderverdeling[i].Onderverdeling.length; j++) {

                        grand_children.push(explorable_item.Onderverdeling[i].Onderverdeling[j].Naam);

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

function prepareQuestions(level) {

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

                question_string = "Wat is de klasse van " + child;
                temp_question_array.push({"Question": question_string, "Answer": parent });

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
                        temp_temp_question_array.push(ancestryQuestion(current_child));
                    }
                    
                    temp_question_array.push(temp_temp_question_array);                    

                };                

            };

        }

    };

    if (level == 4 || level == 3 || level == 5 || level == 7 || level == 9) {

        keys = Object.keys(content_dict)

        for (var i = 0; i < keys.length; i++) {

            var current = content_dict[keys[i]].Naam
            var temp_temp_question_array = [];

            if (level == 4 && Object.keys(content_dict[keys[i]]).includes("Indicaties")) {

                question_string = "Welk (klasse) medicijn is bruikbaar voor de volgende symptomen: " + content_dict[keys[i]].Indicaties;
                temp_temp_question_array.push({"Question": question_string, "Answer": current });

            } else if (level == 5 && Object.keys(content_dict[keys[i]]).includes("Mechanisme")) {
            
                question_string = "Welk (klasse) medicijn werk op de volgende manier: " + content_dict[keys[i]].Mechanisme;
                temp_temp_question_array.push({"Question": question_string, "Answer": current });

            } else if (level == 7 && Object.keys(content_dict[keys[i]]).includes("Zwangerschap")) {
            
                question_string = "Welk categorie valt " + current + " in wat betreft teratologie?";
                temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Zwangerschap[0]});

            } else if (level == 9 && Object.keys(content_dict[keys[i]]).includes("Enzym")) {
            
                enzym = content_dict[keys[i]].Enzym;

                question_string = "Het medicijn " + current + " werk in op " + enzym[0] + ". Is het een enzyminducer, inhibitor of substraat?";
                temp_temp_question_array.push({"Question": question_string, "Answer": content_dict[keys[i]].Enzym[0]});

            }
            
            if (Math.random() > 0.8) {

                temp_temp_question_array.push(ancestryQuestion(current));

            };            

            temp_question_array.push(temp_temp_question_array);

        };

    };

    question_array = (shuffle(temp_question_array)).flat(1);

};

function setQuestions(){

    console.log("- > Setting first question")

    document.getElementById('question-title').innerText = "0/" + question_array.length;
    document.getElementById('question-description').innerText = question_array[0].Question
    document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase"

};

function checkMnemonicAnswer() {

    // There are basically two options: either we're checking the mnemonic, 
    // or the individual elements

    const textfield = document.getElementById('text-field');    
    const given_answer = textfield.value;

    indices = (document.getElementById('question-title').innerText).split("/")
    current_index = indices[0];

    correct_answer = question_array[current_index].Answer;    
    
    console.log("- - > Checking mnemonic")
    console.log("- - > Right answer is: " + correct_answer)

    if (given_answer.length > 2 && (correct_answer.includes(given_answer) || given_answer.toLowerCase() == correct_answer.toString().toLowerCase())) {

        console.log("- - > Correct!")

        if (document.getElementById('question-description').innerText.includes("Noem een voorbeeld van") && !terminals_array.includes(given_answer)) {

            let local_question_array = question_array;

            try {
                local_question_array.splice(intervalIndex(current_index, 1, local_question_array), 0, ancestryQuestion(given_answer));
            } catch {
                console.log("--> Doesn't exist: " + given_answer);
            };            

        };

        question_array = local_question_array;

        nextQuestion();

    } else {

        console.log("- - > Given answer: " + given_answer);
        console.log("- - > Right answer: " + correct_answer);

        if (document.getElementById('remark-card').innerText != "Please repeat the mnemonic phrase again") {
            
            document.getElementById('remark-card').innerText = "Please repeat the mnemonic phrase again";
        
        } else {

            document.getElementById('remark-card').innerText = "The right mnemonic is: " + correct_answer + ". You'll repeat this questions once more afterwards.";

            let local_question_array = question_array;
            local_question_array.splice(intervalIndex(current_index, 4, local_question_array), 0, {"Question": ("Dit is een herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer});
            local_question_array.splice(intervalIndex(current_index, 12, local_question_array), 0, {"Question": ("Dit is een herhaling: " + question_array[current_index].Question), "Answer": question_array[current_index].Answer});

            question_array = local_question_array;
            console.log(question_array);

        }

        
        textfield.value = "";            

    }
}

function nextQuestion() {

    resetButtons();

    const textfield = document.getElementById('text-field');
    textfield.value = "";

    indices = (document.getElementById('question-title').innerText).split("/")

    current_index = indices[0];

    if (current_index < (question_array.length - 1)) {
        new_index = parseInt(current_index) + 1;
    } else {
        new_index = 0;
    }
    
    /* Setting all new text */

    document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase." 
    document.getElementById('question-description').innerText = question_array[new_index].Question
    document.getElementById('question-title').innerText = new_index + "/" + question_array.length;

}

/***
 * 
 * Utilities: All utility functions are pushed to the bottom for saving space
 * 
 ***/

/* Finds the possible next index */

function intervalIndex(current_index, desired_interval, array) {

    let length = array.length;
    let temp_current_index = parseInt(current_index);
    let temp_desired_interval = parseInt(desired_interval);

    if (temp_current_index + temp_desired_interval < length) {
        return (temp_current_index + temp_desired_interval)
    } else {
        return ((temp_current_index + temp_desired_interval) - length)
    }

}

/* Shuffle arrays */

function ancestryQuestion(current) {

    if (terminals_array.includes(current)) {

        question_string = "Van welke klasse is " + current + " een deel?";
        return {"Question": question_string, "Answer": ancestry_dict[current].Parent }

    } else {

        question_string = "Noem een voorbeeld van " + current;
        return {"Question": question_string, "Answer": ancestry_dict[current].Children }

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
    
    <input type="text" id="text-field">
    <input type="button" class="button" id ="check-button" value="Check" onclick="checkMnemonicAnswer()">
    
    `;

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
        checkMnemonicAnswer();
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

        if (Object.keys(explorable_item).includes("Indicaties")) {
        
            if (Object.keys(explorable_item).includes("Onderverdeling")) {
                question_string_1 = "Welk (klasse) medicijn is bruikbaar voor de volgende symptomen: " + explorable_item.Indicaties;
                question_string_2 = "Noem een voorbeeld van " + explorable_item.Naam;

                answer_array = [];

                for (var i = 0; i < explorable_item.Onderverdeling.length; i++) {
                    answer_array.push(explorable_item.Onderverdeling[i].Naam);
                }

                temp_3_array.push([{"Question": question_string_1, "Answer": explorable_item.Naam}, {"Question": question_string_2, "Answer": answer_array}])

            } else {
                question_string = "Welk (klasse) medicijn is bruikbaar voor de volgende symptomen: " + explorable_item.Indicaties;
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



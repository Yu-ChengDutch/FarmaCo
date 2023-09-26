/* Create an empty array for all the questions */

var question_array = [];

var level1_question_array = [];
var level2_question_array = [];

/* Defines the main page */

var landing = `
    <script type="text/javascript" src="tools_rehearser.js"></script>

    <div class="chapter"><H1>Basics</H1></div>

    <div style="display:block; text-align: center;" onclick="start()">
        <div class="card" id="active">
            <img src="./Images/Network.png" style="width:20vw;height:20vw;">
        </div>

        <H2> Orde </H2>

    </div>
    
    <div class="chapter" ><H1>Bijwerkingen</H1></div>  
    
    <div style="display:block; text-align: center;" onclick="startLevel2()">
        <div class="card" id="active">
            <img src="./Images/Interactions.png" style="width:20vw;height:20vw;">
        </div>

        <H2> Interacties </H2>

    </div>
`

var level1 = `

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

/* New start function */

function backToStart() {
    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = landing;
}

function startLevel1(check) {

    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = level1;

    console.log(check);

    setEnter();

    question_array = level1_question_array;

    setMnemonicQuestion();   

}

function startLevel2() {

    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = level1;

    setEnter();

    question_array = level2_question_array;

    setMnemonicQuestion();   

}

function startLevel3() {

    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = level1;

    setEnter();

    question_array = level3_question_array;

    setMnemonicQuestion();   

}

function farmacoSetUp() {

    console.log("Welcome!");

    current_database = "./med_data.json";

    console.log("Fetching main DB at: " + current_database);

    fetch(current_database)

    .then(function(response){
        console.log("- > File found and accessed at " + current_database);
        return response.json();
    })
    .then(function(data){

        prepareQuestions(data)

    })

}

function prepareQuestions(data) {

    console.log("- > Preparing questions");

    explorable_array = shuffle(data.Onderverdeling);
    temp_1_array = [];
    temp_2_array = [];
    temp_3_array = [];

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

}

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

/* Load the database (for now still hardcoded) */

function setMnemonicQuestion(){

    console.log("- > Setting mnemonic question")

    nr_q = question_array.length
    starting_point = 0
    
    /* Math.floor(Math.random() * nr_q); */

    console.log("- > There are a total of " + nr_q + " questions.");
    console.log("- > We're starting at " + starting_point)

    document.getElementById('question-title').innerText = starting_point
    document.getElementById('question-description').innerText = question_array[starting_point].Question
    document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase"

};

function checkMnemonicAnswer() {

    // There are basically two options: either we're checking the mnemonic, 
    // or the individual elements

    const textfield = document.getElementById('text-field');    
    const given_answer = textfield.value;

    const indices = (document.getElementById('question-title').innerText).split('.')

    if (indices.length == 1) {

        correct_index = indices[0];

        correct_answer = question_array[correct_index].Answer;    
        
        console.log("- - > Checking mnemonic")
        console.log("- - > Right answer is: " + correct_answer)

        if (given_answer.length > 2 && (correct_answer.includes(given_answer) || given_answer.toLowerCase() == correct_answer.toString().toLowerCase())) {

            console.log("- - > Correct!")

            document.getElementById('question-input-card').innerHTML = 
        
            `
            
            <input type="text" id="text-field">
            <input type="button" class="button" id ="next_button" value="Next" onclick="nextMnemonicQuestion();"></input>
            
            `;            

            repeat = false; 

        } else {

            console.log("- - > Given answer: " + given_answer);
            console.log("- - > Right answer: " + correct_answer);

            if (document.getElementById('remark-card').innerText != "Please repeat the mnemonic phrase again") {
                document.getElementById('remark-card').innerText = "Please repeat the mnemonic phrase again";
            } else {
                document.getElementById('remark-card').innerText = "The right mnemonic is: " + correct_answer + ". You'll repeat this questions once more afterwards.";

                repeat = true;

            }

            
            textfield.value = "";            

        }

    } else {
        
        key = (document.getElementById('question-description').innerText).split(': ').pop()

        if (Object.keys(question_array[parseInt(indices[0])]).includes("Mnemonic")) {
            correct_answer = question_array[parseInt(indices[0])].Mnemonic[key];
        } else {
            correct_answer = question_array[parseInt(indices[0])].Answer;
        }
        

        console.log(indices);
        console.log(question_array[parseInt(indices[0])]);
        console.log(correct_answer);

        if (given_answer == correct_answer.toLowerCase()) {

            nextMnemonicQuestion();

        } else {

            if (document.getElementById('remark-card').innerText == "Please enter the answer") {
                document.getElementById('remark-card').innerText = "Please try again"
            } else {
                document.getElementById('remark-card').innerText = "The correct answer is: " + correct_answer
            }            

            textfield.value = "";

        }

    }
}

function expandMnemonic() {

    const correct_index = parseInt(document.getElementById('question-title').innerText);
    const textfield = document.getElementById('text-field');

    const keys = Object.keys(question_array[correct_index].Mnemonic)

    document.getElementById('question-title').innerText = correct_index.toString() + ".1"
    document.getElementById('question-description').innerText = "What is the meaning of: " + keys[1]
    document.getElementById('remark-card').innerText = "Please enter the answer"

    resetButtons();

    textfield.value = "";

}

function nextMnemonicQuestion() {

    resetButtons();

    const textfield = document.getElementById('text-field');
    textfield.value = "";

    indices = (document.getElementById('question-title').innerText).split('.')

    if (Object.keys(question_array[parseInt(indices[0])]).includes("Answer")) {

        correct_index = parseInt(indices[0])

        if (repeat == false) {            

            if (correct_index < (question_array.length - 1)) {
                new_index = correct_index + 1;
            } else {
                new_index = 0;
            }

            document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase."

        } else {

            new_index = correct_index;

            document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase. This is a repeated question."

        }        

        console.log(new_index);

        document.getElementById('question-description').innerText = question_array[new_index].Question

    } else {

        keys = Object.keys(question_array[parseInt(indices[0])].Mnemonic)

        console.log(keys)
        
        if (indices.length == 1 || parseInt(indices[1]) >= (keys.length - 1)) {

            correct_index = parseInt(indices[0])

            if (repeat == false) {            

                if (correct_index < (question_array.length - 1)) {
                    new_index = correct_index + 1;
                } else {
                    new_index = 0;
                }

                document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase."

            } else {

                new_index = correct_index;

                document.getElementById('remark-card').innerText = "Please enter the mnemonic phrase. This is a repeated question."

            }        

            console.log(new_index);

            document.getElementById('question-description').innerText = question_array[new_index].Question

        } else {

            console.log("- - > Giving you a new subquestion")

            new_index = indices[0] + "." + (parseInt(indices[1]) + 1)
            document.getElementById('question-description').innerText = "What is the meaning of: " + keys[parseInt(indices[1]) + 1]
            document.getElementById('remark-card').innerText = "Please enter the answer"

        }
    }
    
    document.getElementById('question-title').innerText = new_index

}

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

function resetButtons() {
    
    document.getElementById('question-input-card').innerHTML = 
            
    `
    
    <input type="text" id="text-field">
    <input type="button" class="button" id ="check-button" value="Check" onclick="checkMnemonicAnswer()">
    
    `;

    setEnter();

}



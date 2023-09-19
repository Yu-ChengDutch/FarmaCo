/* Create an empty array for all the questions */

var question_array = [];

/* Defines the main page */

var main_page = `

    <script type="text/javascript" src="tools_rehearser.js"></script>
    
    <div class="title-card">
        <h1 id="true-title">Pathology - Farmaco</h1>
    </div>
    
    <div class = "question-card">

        <div class="question-title-card">

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

function start() {

    openFullscreen();

    document.getElementsByTagName("BODY")[0].innerHTML = main_page;

    farmacoSetUp();

}

function farmacoSetUp() {

    console.log("Welcome!");

    current_database = "./data1.json";

    console.log("Fetching main DB at: " + current_database);

    fetch(current_database)
    .then(function(response){
        console.log("- > File found and accessed at " + current_database);
        return response.json();
    })
    .then(function(data){

        question_array = shuffle(data.Mnemonic)

        setMnemonicQuestion();

    })

    console.log("- > Generated the following questions: ");
    console.log(question_array);

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
    starting_point = Math.floor(Math.random() * nr_q);

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
    const given_answer = (textfield.value).toLowerCase();

    const indices = (document.getElementById('question-title').innerText).split('.')

    if (indices.length == 1) {

        correct_index = indices[0];

        expandable = false;

        if (Object.keys(question_array[correct_index]).includes("Mnemonic")) {
            correct_answer = question_array[correct_index].Mnemonic.Title
            expandable = true;
        } else {
            correct_answer = question_array[correct_index].Answer;
            expandable = false;
        }        
        
        console.log("- - > Checking mnemonic")
        console.log("Right answer is: " + correct_answer)

        if (given_answer == correct_answer.toLowerCase()) {
            console.log("- - > Correct!")

            if (expandable == true) {
                document.getElementById('question-input-card').innerHTML = 
            
                `
                
                <input type="text" id="text-field">
                <input type="button" class="button" id ="next_button" value="Next" onclick="nextMnemonicQuestion();"></input>
                <input type="button" class="button" id ="expand_button" value="More" onclick="expandMnemonic()"></input>
                
                `;
            } else {
                document.getElementById('question-input-card').innerHTML = 
            
                `
                
                <input type="text" id="text-field">
                <input type="button" class="button" id ="next_button" value="Next" onclick="nextMnemonicQuestion();"></input>
                
                `;
            }

            

            repeat = false; 

        } else {

            console.log("Given answer: " + given_answer);
            console.log("Right answer: " + correct_answer);

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
    let currentIndex = array.length,  randomIndex;
  
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

}



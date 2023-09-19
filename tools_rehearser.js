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

        question_array = shuffle(data.Mnemonics)

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

    console.log(mnemonics);

    if (indices.length == 1) {

        correct_index = indices[0];

        expandable = false;

        if (Object.keys(mnemonics[correct_index]).includes("Mnemonic")) {
            correct_answer = mnemonics[correct_index].Mnemonic.Title
            expandable = true;
        } else {
            correct_answer = mnemonics[correct_index].Answer;
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

        if (Object.keys(mnemonics[parseInt(indices[0])]).includes("Mnemonic")) {
            correct_answer = mnemonics[parseInt(indices[0])].Mnemonic[key];
        } else {
            correct_answer = mnemonics[parseInt(indices[0])].Answer;
        }
        

        console.log(indices);
        console.log(mnemonics[parseInt(indices[0])]);
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

    const keys = Object.keys(mnemonics[correct_index].Mnemonic)

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

    if (Object.keys(mnemonics[parseInt(indices[0])]).includes("Answer")) {

        correct_index = parseInt(indices[0])

        if (repeat == false) {            

            if (correct_index < (mnemonics.length - 1)) {
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

        document.getElementById('question-description').innerText = mnemonics[new_index].Question

    } else {

        keys = Object.keys(mnemonics[parseInt(indices[0])].Mnemonic)

        console.log(keys)
        
        if (indices.length == 1 || parseInt(indices[1]) >= (keys.length - 1)) {

            correct_index = parseInt(indices[0])

            if (repeat == false) {            

                if (correct_index < (mnemonics.length - 1)) {
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

            document.getElementById('question-description').innerText = mnemonics[new_index].Question

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

function createQuestions(data, iterators, questions, output){
    


    // console.log("Starting analysis:")

    let traversable = [data]

    while (traversable.length > 0){

        let current_item = traversable[0]

        for (let i =0; i< iterators.length; i++) {

            if (iterators[i] in current_item){

                next_item = current_item[iterators[i]]

                traversable = traversable.concat(next_item)

            }

        }

        for (let i =0; i < questions.length; i++){

            if (questions[i] in current_item){

                next_item = current_item[questions[i]]

                if (Array.isArray(next_item)) {

                    if (typeof next_item[0] === 'string') {


                        output[questions[i]][current_item.Name] = next_item

                    } else {
                        traversable = traversable.concat(next_item)
    
                        let temp_array = []
        
                        for (let i = 0; i < next_item.length; i++) {
                            temp_array.push(next_item[i].Name)
                        }
        
                        output[questions[i]][current_item.Name] = temp_array
                    }
                    
    
                } else if (typeof next_item === 'string' || next_item instanceof String) {

                    if (questions[i] == "Definition") {
                        output[questions[i]][current_item.Name] = next_item
                    } else {
                        output[questions[i]][next_item] = current_item.Name
                    }                    

                } else {

                    for (let j =0; j < questions.length; j++) {
                        if (questions[j] in next_item){
                            traversable = traversable.concat(next_item)
                        }
                    }

                    output[questions[i]][current_item.Name] = next_item.Name

                }

            }
        }

        traversable.splice(0, 1)
    }

    // console.log("Finished analysis...")

    console.log(possible_questions)

    // console.log(possible_questions["Division"]);
    // console.log(possible_questions["Parts"]);
    // console.log(possible_questions["Continues"]);
    // console.log(possible_questions["Branches"]);

}

function chooseQuestions(questions){

    let current_array = [];
    let current_type = "";
    let answer = "";
    let question_data = ""

    /* Iterate through all final questions*/

    for (let i = 0; i < 5; i++){

        /* Assign to current_type a random question type */ 

        console.log("Determining type...")
        current_type = questions[rand(questions.length)];
        console.log("-> Type is: " + current_type)

        /* Assign to current array all possible questions of that type */

        current_array = possible_questions[current_type]

        key_array = Object.keys(current_array);

        console.log("-> Determining question...")
        answer = key_array[rand(key_array.length)];
        console.log("-> Question is: " + answer)

        // TODO: CREATE PROPER CHECK FOR DUPLICATES
        
        /* From all possible questions of this type, take the one matching the answer. From there, take a random instance */
        
        question_data = current_array[answer];
        
        let question = ""
        let question_string = ""

        if (current_type == "Epidemiology") {

            question = question_texts[current_type][0] + question_data[1] + question_texts[current_type][1] + answer + question_texts[current_type][2];
            question_string = "Question " + (i+1);
            final_questions[question_string] = [question_data[0], question];

        } else if (current_type == "Subconditions" || current_type == "Pathogen") {

            question = question_texts[current_type][0] + answer + question_texts[current_type][1];
            question_string = "Question " + (i+1);
            final_questions[question_string] = [question_data, question];

        } else {

            question = question_texts[current_type][0] + question_data + question_texts[current_type][1];            
            question_string = "Question " + (i+1);
            final_questions[question_string] = [answer, question];
        
        }
        /* First, I want to determine whether there's a side quest */

        // console.log(final_questions);

        console.log("-> Done formulating question " + (i+1));

    };

};

function setQuestion(question_title){

    // console.log("Setting up question: " + question_title)

    q_and_a = final_questions[question_title];

    document.getElementById('question-title').innerText = question_title;
    document.getElementById('question-description').innerText = q_and_a[1];

    if (Array.isArray(q_and_a[0])) {

        document.getElementById('remark-card').innerText = "List of things: ";

    }

    console.log(final_questions)

}

function rand(length){

    length = length - 1;

    min = Math.ceil(Math.random() * ((length - 1) + 1));
    max = Math.floor(Math.random() * (length - min + 1)) + min;

    console.log(min)
    console.log(max)    
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);


    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer(){

    const title_text = document.getElementById('question-title').innerText;

    const textfield = document.getElementById('text-field');    

    const given_answer = textfield.value;

    // console.log("For " + title_text + ":");

    // console.log("The given answer is: " + given_answer);

    let right_answer = final_questions[title_text][0];

    if (Array.isArray(right_answer)) {

        console.log("Array found")
        console.log(right_answer)

        let temp_arr = []

        for (var i = 0; i < right_answer.length; i++){
            if (document.getElementById('remark-card').innerText.includes("Oops, that wasn't correct!") && document.getElementById('remark-card').innerText.includes(right_answer[i])) {
                console.log("Correction")
                temp_arr.push(right_answer[i])
            } else if (!document.getElementById('remark-card').innerText.includes("Oops, that wasn't correct!") && !document.getElementById('remark-card').innerText.includes(right_answer[i]) && !temp_arr.includes(right_answer[i])) {
                temp_arr.push(right_answer[i]) 
            }

            console.log("ONE" + temp_arr);
            
        }

        right_answer = temp_arr;

        if (right_answer.length == 0) {
            nextQuestion(given_answer);
        } else if (right_answer.includes(given_answer)) {

            console.log("Right answer in array found")

            document.getElementById('remark-card').innerText = document.getElementById('remark-card').innerText + " - " + given_answer

            textfield.value = "";

            temp_arr = [];

            if (right_answer.length > 1) {
                
                for (var i = 0; i < right_answer.length; i++){
                    if (right_answer[i] != given_answer && !temp_arr.includes(right_answer[i])) {
                        temp_arr.push(right_answer[i]) 
                    }

                    console.log("Right")
                    console.log(temp_arr);
                    
                }

                right_answer = temp_arr;

                console.log(final_questions[title_text])

                if (document.getElementById('remark-card').innerText.includes("Oops, that wasn't correct!")) {
                    console.log("Correcting correction")
                    document.getElementById('remark-card').innerText = "Oops, that wasn't correct! The correct answer is: " + right_answer + ". Please enter this.";
                }

            } else {

                nextQuestion(given_answer);

            }

        } else {

            let redo_string = "Redo: " + title_text;

            final_questions[redo_string] = final_questions[title_text];
            console.log(final_questions);

            document.getElementById('remark-card').innerText = "Oops, that wasn't correct! The correct answer is: " + right_answer + ". Please enter this.";

        }

    } else if (given_answer == right_answer) {

        nextQuestion(given_answer);

    } else {

        // console.log("The answer was incorrect, the correct answer is: " + right_answer);

        let redo_string = "Redo: " + title_text;

        final_questions[redo_string] = final_questions[title_text];
        console.log(final_questions);

        document.getElementById('remark-card').innerText = "Oops, that wasn't correct! The correct answer is: " + right_answer + ". Please enter this.";
    };

};

function nextQuestion(given_answer) {

    const title_text = document.getElementById('question-title').innerText;

    const textfield = document.getElementById('text-field');

    // console.log("The answer is correct");
    textfield.value = "";

    let next_int = Object.keys(final_questions).indexOf(title_text) + 1;
    
    // console.log(next_int);

    document.getElementById('remark-card').innerText = "";

    let new_dict = {}

    let temp_dict = {}
    let temp_string = ""
    let temp_type = ""
    let temp_answer = ""

    if (title_text.includes(".")) {

        console.log("Already recursive")

    } else {

        for (var key in side_questions) {

            console.log("Analysing: " + key);

            new_dict = side_questions[key]
            temp_type = key

            console.log(new_dict)

            for (var key in new_dict) {

                // console.log(new_dict[key])
                // console.log(given_answer)

                if (new_dict[key].includes(given_answer)) {
                    
                    console.log("Found a match!")
                    console.log(temp_type)

                    temp_answer = key

                    console.log(temp_answer)

                    for (var key in final_questions) {

                        if (key === title_text) {

                            temp_string = key + ".1"

                            let question = question_texts[temp_type][0] + given_answer + question_texts[temp_type][1];

                            temp_dict[key] = final_questions[key]
                            temp_dict[temp_string] = [temp_answer, question]

                        } else {

                            temp_dict[key] = final_questions[key]

                        }
                        

                    }

                    final_questions = temp_dict

                    console.log(final_questions)

                }

            }

        }

    }

    if (next_int <= Object.keys(final_questions).length - 1) {
        // console.log("To question: " + Object.keys(final_questions)[next_int])
        setQuestion(Object.keys(final_questions)[next_int])
    } else {
        document.getElementById('question-title').innerText = "Done!";
        document.getElementById('question-description').innerText = "";
    };

    // console.log("Set up new question");

};



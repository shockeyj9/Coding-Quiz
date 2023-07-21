//create document elements
var body = document.body;
var main = body.children[1].children[0];
var h1El = document.createElement("h1");
var timer = document.createElement("div");
var h2El = document.createElement("h2");
var pEl = document.createElement("p");
var listEl = document.createElement("ul");
var liEl = document.createElement("li");
var answerText = document.createElement("div");
//Static elements within HTML
body.children[0].appendChild(h1El);
body.children[0].appendChild(timer);
h1El.textContent = "View Highscores";
timer.textContent = "Time: ";
main.appendChild(h2El);
main.appendChild(pEl);
main.appendChild(liEl);
main.appendChild(listEl);
listEl.setAttribute ("class", "answers");

// Global variables for score, questions index, and timer
var score = 0;
var questionIndex =  0;
var timeLeft = 5;

//Landing Page Setup BEGIN
var welcomeScreen = {
    header: "Coding Quiz Challenge",
    info: "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!",
    button: "Start Quiz"
}
h2El.textContent = welcomeScreen.header;
pEl.textContent = welcomeScreen.info;
liEl.textContent = welcomeScreen.button;

// Question & Answers object array
var questions = [
    
    {  
        question: "String values must be enclosed within ___ when being assigned to variables.",
        options: ["1.Commas","2.Curly Brackets","3.Quotes","4.Parentheses"],
        correct: "3.Quotes"
    },
    {  
        question: "Test",
        options: ["1.something","2.something","3.something","4.something"],
        correct: "3.something"
    }
]

function setTime(){
    var timeInterval = setInterval(function(){
        timeLeft--;
        timer.textContent = "Time: "+timeLeft;
        if (timeLeft===0){
            score = timeLeft;
            clearInterval(timeInterval);
            removeOptions();
        }else if(questionIndex===questions.length){
            score = timeLeft;
            clearInterval(timeInterval);
        }else if (timeLeft<0){
            score = 0;
            clearInterval(timeInterval);
            removeOptions();
        };
    },1000);
}

//Creates li elements for each potential answer
function loadOptions(){
    var index = 0;
    questions[questionIndex].options.forEach(element => {
        element = document.createElement("li");
        
        listEl.appendChild(element);
        element.textContent = questions[questionIndex].options[index];
        index++;
    });
}

// clears the slate when correct answer is selected
function removeOptions(){
while(main.children[1].firstChild){
main.children[1].removeChild(main.children[1].firstChild);
}
main.removeChild(main.children[2]);
h2El.textContent = '';
}

// loads the next question and answers
function loadQuestion(){
    if (questionIndex<questions.length){
        h2El.textContent = questions[questionIndex].question;
        loadOptions();
    }
};   

// listens for correct answer to be selected
addEventListener("click", function(event){
    var answer = event.target;
    main.appendChild(answerText);
        if (answer.textContent===questions[questionIndex].correct){
            score++;
            questionIndex++;
            answerText.textContent = "Correct!";     
            this.setTimeout(removeOptions,300);
            this.setTimeout(loadQuestion,300);
        }else if (answer.textContent==="Start Quiz"){
            main.removeChild(pEl);
            main.removeChild(liEl);
            setTime();
            loadQuestion();
        }else {
            answerText.textContent = "Incorrect!";
            questionIndex++;
            timeLeft=timeLeft-10;
            this.setTimeout(removeOptions,300);
            this.setTimeout(loadQuestion,300);
        }
    
});














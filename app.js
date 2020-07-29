
// {/* <script> */}
//         //  amount of secounds to start
//     let count = 90

//    
// </script>

// let score =0
// let count=90
// console.log(questions[0].answers[2])

let questions = [
    {
        "question": "What is used to specify a style for a single,unique element?",
        "correct_answer": 'a. Ids',
        "answers": [
            'a. Ids',
            'b.Classes',
            'c. Tags',
            'd. Functions'

        ]
    },
    {
        'question': 'What is used to specify a style for a group of elements',
        'correct_answer': 'b.Classes',
        'answers': [
            'a. Ids',
            'b.Classes',
            'c. Tags',
            'd. Functions'
        ]
    },
    {
        'question': 'What are "self-contained" modules of code that accomplish a specific task?',
        'correct_answer': 'd. Functions',
        'answers': [
            'a. Ids',
            'b.Classes',
            'c. Tags',
            'd. Functions'
        ]
    }

]

let currentIndex = 0
let score = 0
let count = 90
let timer



const newQuestion = () => {
    document.getElementById('questionSection').textContent = questions[currentIndex].question

    let answers = questions[currentIndex].answers
    // This cleats out whatis intially in the id=anset
    document.getElementById('answerSection').innerHTML = ''

    for (let i = 0; i < answers.length; i++) {
        let answerElement = document.createElement('button')
        answerElement.className = 'answer btn btn-secondary btn-lg'

        answerElement.dataset.answers = answers[i]

        answerElement.textContent = answers[i]

        document.getElementById('answerSection').append(answerElement)

    }
}

const grabAnswer = answer => {

    if (count === 90) {


        //  Interval for timer,decreasing by 1 every second
        let myInterval = setInterval(() => {
            // Decrease count by 1
            count--
            // displays remaing time on the screen
            document.getElementById('time').textContent = count

            // when the timer is out of time, alert will appear on screen
            if (count <= 0) {
                alert('Oh Snaps! Time is up')
                // Stops the interval from running passed 0
                clearInterval(myInterval)
            }
        }, 1000)
    }
    if (answer === questions[currentIndex].correct_answer) {
        score++
        document.getElementById('score').textContent = score
        let resultElement = document.createElement('div')
        resultElement.className = 'alert alert-success'
        resultElement.textContent = 'Correct Answer'
        document.getElementById('answerSection').append(resultElement)
    } else {
        console.log('score')
        let resultElement = document.createElement('div')
        resultElement.className = 'alert  alert-danger'
        resultElement.textContent = 'Incorrect Answer'
        document.getElementById('answerSection').append(resultElement)
        count = count - 10
    }

    currentIndex++


    let gameOverInterval = setInterval(() => {
        if (currentIndex < questions.length) {
            newQuestion()
        } else {
            endGame()
            clearInterval(gameOverInterval)
        }

    }, 1000)





}

const endGame = () => {
    document.getElementById('quiz').innerHTML = `
    <h1 class="display-2">Game Over!</h1>
  <p class="display-4">Your final score is: ${score}</p>
  <hr class="my-4">
  <p>Please enter a username for the leaderboard</p>
  <form>
    <div class="form-group">
      <label for="username">username</label>
      <input type="text" class="form-control" id="username"/>
      <button id="submitScore" class="btn btn-primary">Submit</button>
    </div>
  </form>
  `
}

const submitScore = submission => {
    console.log(submission)

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []

    leaderboard.push(submission)

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))

    leaderboard.sort((a, b) => {
        return b.score - a.score
    })

    let tableElem = document.createElement('table')
    tableElem.className = 'table'
    tableElem.innerHTML = `
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">username</th>
        <th scope="col">score</th>
      </tr>
    </thead>
  `

    let bodyElem = document.createElement('tbody')

    for (let i = 0; i < leaderboard.length; i++) {
        let rowElem = document.createElement('tr')
        rowElem.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${leaderboard[i].username}</td>
      <td>${leaderboard[i].score}</td>
    `
        bodyElem.append(rowElem)
    }

    tableElem.append(bodyElem)

    document.getElementById('quiz').append(tableElem)

}

document.getElementById('startQuiz').addEventListener('click', () => {
    newQuestion()
})

document.getElementById('answerSection').addEventListener('click', event => {

    if (event.target.classList.contains('answer')) { //if any answer is clicked on
        grabAnswer(event.target.dataset.answers) // go run the getAnswer() function and tell it to 
    } else if (event.target.id === 'submitScore') {
        event.preventDefault()
        submitScore({
            username: document.getElementById('username').value,
            score: score
        })
    }
})




// document.getElementById('submit').addEventListener('click', event => {
//     event.preventDefault()
//     document.getElementById('Question').innerHTML = `
//      ${questions[0]}






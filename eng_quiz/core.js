var grade = 6;
var selected_grade_word = [];
var current_question_num = 0;
var other_answers = [];
var passed_question_num = [];
var missed_question = [];
var missed_question_list = [];
//var current_grade = 10;
var total_question_num = 0;
var total_correct_num = 0;
var total_wrong_num = 0;
var timer = 5; // start from 5sec
var succession_num = 0;

function getRandomNum(max_num) {
    return Math.floor(Math.random()*max_num);
}

function getQuestion() {
    current_question_num = getRandomNum(selected_grade_word.length);
    var i = 0;
    while(1){
        var a = checkIfQuestionIsPassed();
        if(a == false){
            break;
        } else {
            current_question_num = getRandomNum(selected_grade_word.length);
        }
    }
}

function checkIfQuestionIsPassed() {
    if(passed_question_num.indexOf(current_question_num) == -1) {
        return false;
    } else {
        return true;
    }
}

function pickupOtheranswer() {
    var i = 0;
    while(i<3) {
        var a = getRandomNum(selected_grade_word.length);
        if (a != current_question_num){
            //var x = other_answers.indexOf(a);
            if(other_answers.indexOf(a) == -1) {
                other_answers.push(a);
                i++
            }
        }
    }
}


//window.onload=init; //ページの読み込みが完了したとき、initを実行する


function init() {

    getGradeWordList();
    routine();
}

function startGame(level) {
    if(level == 'l1') {
      grade = 1;
    }else if (level == 'l2') {
      grade = 2;
    }else if (level == 'l3') {
      grade = 3;
    }else if (level == 'l4') {
      grade = 4;
    }else if (level == 'l5') {
      grade = 5;
    }else if (level == 'l6') {
      grade = 6;
    }
    document.getElementById('init-page').style.display = "none";
    document.getElementById('b-box').style.display = "block";

    init();
}

function getGradeWordList() {

    for (var i = 0; i < word.length; i++) {

        if(word[i][2] == grade){
            selected_grade_word.push(word[i]);
        }
    };
}

function routine() {

    getQandA();
    setQandA();
    resetCount();
    readQuestion();
}

function checkAnswer(selected_answer) {
    total_question_num++;
    if(selected_answer == current_question_num) {
        total_correct_num++;
        succession_num++;
        document.getElementById('total_correct_num').innerText = total_correct_num;
        inARow(1);
        showAnswer(1);
        correctSound();
    }else {
        total_wrong_num++;
        succession_num=0;
        document.getElementById('total_wrong_num').innerText = total_wrong_num;
        missed_question.push(selected_grade_word[current_question_num][0]
            ,selected_grade_word[selected_answer][1]
            ,selected_grade_word[current_question_num][1]
        );
        missed_question_list.push(missed_question);
        missed_question = [];
        inARow(0);
        showAnswer(0);
        incorrectSound();
    }

    document.getElementById('points').innerText = total_correct_num * 10;
    document.getElementById('correct_percentage').innerText = Math.floor(total_correct_num/total_question_num*100)+"%";

    passed_question_num.push(current_question_num);

    if(total_wrong_num > 4) {
            gameOver();
    }else{
        other_answers.length = 0;
        routine();
    }
}

function showAnswer(int) {
  var ans = document.getElementById('ans');
  if(int == 0) {
    ans.innerText = selected_grade_word[current_question_num][0] + "  :  " + selected_grade_word[current_question_num][1];
    ans.style.color = "red";
  }else {
    ans.innerText = "correct";
    ans.style.color = "blue";
  }
}

function getQandA() {
    getQuestion();
    pickupOtheranswer();

}

function setQandA() {

    var title = document.getElementById('h1');
    title.innerText = selected_grade_word[current_question_num][0];

    other_answers.push(current_question_num);
    other_answers.sort();

    for (var i = 0; i < other_answers.length; i++) {
        var a = document.getElementById(i);
        a.innerText = selected_grade_word[other_answers[i]][1];
        a.name = other_answers[i];
    };
}

function readQuestion() {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-GB';
    msg.text = selected_grade_word[current_question_num][0];
    window.speechSynthesis.speak(msg);
}


function resetCount() {
    stp = setInterval(countDown,1000);
}

function correctSound() {
    document.getElementById('correct_sound').play();
}

function incorrectSound() {
    document.getElementById('incorrect_sound').play();
}

function countDown() {
    if(timer == 1) {
        // time up
    } else {
        timer--;
        //document.getElementById('time_left').innerText = timer;
        //donutChart();
    }
}

// chart
// function donutChart() {
//     var doughnutData = [
//         {
//             value: 30,
//             color: "#aaf2fb"
//         },
//         {
//             value: 20,
//             color: "#ffe361"
//         }
//     ];
//
//     var myDoughnut = new Chart(document.getElementById("donut").
//     getContext("2d")).Doughnut(doughnutData);
// }

function inARow(int) {
      var dom = document.getElementById('succession_num');
      dom.innerText = succession_num;


if(int == 1){

      if(succession_num < 5){
          //none
      }else if(6 < succession_num && succession_num < 10){
          dom.style.fontSize = "30px";
          dom.style.color = "red";
      }else if(10 < succession_num && succession_num < 15) {
          dom.style.fontSize = "46px";
          dom.style.color = "blue";
      }else if(15 < succession_num && succession_num < 20 ) {
          dom.style.fontSize = "56px";
          dom.style.color = "green";
      }else if(20 < succession_num && succession_num < 25 ) {
          dom.style.fontSize = "68px";
          dom.style.color = "purple";
      }else if(25 < succession_num && succession_num < 30) {
          dom.style.fontSize = "78px";
          dom.style.color = "orange";
      }else if(30 < succession_num) {
          dom.style.fontSize = "120px";
          dom.style.color = "yellow";
      }

      if(succession_num > 5) {
          $(function(){
              $("#succession").show("slow");
              $("#succession").hide("slow");
          });
      }
    }else if (int == 0) {
      dom.style.fontSize = "30px";
      dom.style.color = 'rgb(241, 115, 69)';
    }


}

function gameOver() {

        for (var i = 0; i < other_answers.length; i++) {
            var a = document.getElementById(i);
            a.disabled = true;
        };
        var modal = document.getElementById('myModal');
        var result = document.getElementById('result');
        var score = document.getElementById('score');

        var x = 1;
        for (var i = 0; i < missed_question_list.length; i++) {
            result.rows[x].cells[0].innerText = missed_question_list[i][0];
            result.rows[x].cells[1].innerText = missed_question_list[i][1];
            result.rows[x].cells[2].innerText = missed_question_list[i][2];
            x++;
        }

        modal.style.display = "block";
        score.innerText = total_correct_num * 10;

}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

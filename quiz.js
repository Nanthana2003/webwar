var current = 0;
        var questions ;
        var myinterval;
        var sunmitted = 0;
        var score = 0;
        //start();

        async function start(){
            questions = await getquestions();
            //var current = 0;
            //setInterval(nextquestion,3000,)
            displayquestion(questions,current);
            starttimer(questions);

        }

        function displayquestion(ques, i){
            console.log(ques);
            let ind = Math.random()*4;
            document.getElementsByClassName("feedback")[0].style.opacity = 0;
            document.getElementsByClassName("question")[0].innerHTML = ques[i].question;
            ques[i].incorrectAnswers.splice(ind,0,ques[i].correctAnswer)
            const options = document.getElementsByClassName("ans");
            for(let j = 0; j<4; j++){
                options[j].innerHTML = ques[i].incorrectAnswers[j];
                options[j].setAttribute("for",ques[i].incorrectAnswers[j])
                document.getElementsByClassName("radioans")[j].setAttribute("value",ques[i].incorrectAnswers[j])
                document.getElementsByClassName("radioans")[j].checked = false;
                document.getElementsByClassName("radioans")[j].disabled = false;
            }
            // options[3].innerHTML = ques[i].correctAnswer;
            // options[3].setAttribute("for",ques[i].correctAnswer)
            // document.getElementsByClassName("radioans")[3].setAttribute("value",ques[i].correctAnswer)
            // document.getElementsByClassName("radioans")[3].checked = false;
            // document.getElementsByClassName("radioans")[3].disabled = false;

        }
        
        function starttimer(q){
            console.log(q);
            myinterval = setInterval(nextquestion, 7000,q);

        }

        function nextquestion(q){
            
            console.log(q);
            current++;
            if(current == 10){
                clearInterval(nextquestion);
                clearInterval(myinterval)
                finish();
            }
            else{
                displayquestion(q,current)
            }
            

        }

        async function getquestions(){
            var arr = await axios.get("https://the-trivia-api.com/api/questions?limit=10");
            
            //console.log(arr.data.incorrectAnswers)
            //arr.data.incorrectAnswers = arr.data.incorrectAnswers.slice(0,ind).push(arr.data.correctAnswer).concat(ind+1);
            //(arr.data.incorrectAnswers).splice(ind,0,arr.data.correctAnswer);
            console.log(arr.data);
            return arr.data;
        }

        function finish(){
            document.getElementsByClassName("dispscore")[0].innerHTML = "Your score = "+score;
            const res = document.getElementsByClassName("result")[0];
            
            res.style.opacity = 1;
        }

        document.getElementsByClassName("submitbutton")[0].addEventListener("click",()=>{
           
            const answ = document.getElementsByClassName("radioans");
            const feedback = document.getElementsByClassName("feedback")[0];
            let flag = 0;
            for(let i = 0; i<4; i++){
                if(answ[i].value == questions[current].correctAnswer && answ[i].checked == true){
                    flag = 1;
                    score+=10;
                    break;
                }
                answ[i].disabled = true;
            }
            feedback.style.opacity = 1;
            if(flag == 0){
                feedback.innerHTML = "wrong";
            }
            else{
                feedback.innerHTML = "correct"
            }
        })

        document.getElementsByClassName("retry")[0].addEventListener("click",function(){
            location.reload();
        })

        document.getElementsByTagName("body")[0].addEventListener("load",start);

var current = 0;
        var questions ;
        var myinterval;
        var sunmitted = 0;
        var score = 0;
        //start();

        async function start(){
            console.log("start");
            
            questions =await getquestions();
            var current = 0;
            //setInterval(nextquestion,3000,)
            console.log(questions)
            displayquestion(questions,current);
            starttimer(questions);

        }

        function displayquestion(ques, i){
            console.log(ques);
            let ind = Math.random()*4;
            document.querySelectorAll(".feedback")[0].style.opacity = 0;
            console.log(ques)
            document.querySelectorAll(".question")[0].innerHTML = ques[i].question;
            ques[i].incorrectAnswers.splice(ind,0,ques[i].correctAnswer)
            const options = document.querySelectorAll(".ans");
            for(let j = 0; j<4; j++){
                options[j].innerHTML = ques[i].incorrectAnswers[j];
                options[j].setAttribute("for",ques[i].incorrectAnswers[j])
                document.querySelectorAll(".radioans")[j].setAttribute("value",ques[i].incorrectAnswers[j])
                document.querySelectorAll(".radioans")[j].checked = false;
                document.querySelectorAll(".radioans")[j].disabled = false;
            }
            loadbar();
            // options[3].innerHTML = ques[i].correctAnswer;
            // options[3].setAttribute("for",ques[i].correctAnswer)
            // document.querySelectorAll(".radioans")[3].setAttribute("value",ques[i].correctAnswer)
            // document.querySelectorAll(".radioans")[3].checked = false;
            // document.querySelectorAll(".radioans")[3].disabled = false;

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
            console.log("getquestions")
            try {
                const response = await fetch("https://the-trivia-api.com/api/questions?limit=10");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        // async function getquestions(){
        //     console.log("getquestions")
        //     await fetch("https://the-trivia-api.com/api/questions?limit=10")
        //         .then(response => {
        //             // Check if the response is successful
        //             if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //             }
        //             // Parse the response as JSON
        //             return response.json();
        //         })
        //         .then(data => {
        //             // Do something with the fetched data
        //             console.log(data);
        //             return data;
        //         })
        //         .catch(error => {
        //             // Handle any errors that occurred during the fetch
        //             console.error("Error fetching data:", error);
        //         });
        //     //console.log(arr.data.incorrectAnswers)
        //     //arr.data.incorrectAnswers = arr.data.incorrectAnswers.slice(0,ind).push(arr.data.correctAnswer).concat(ind+1);
        //     //(arr.data.incorrectAnswers).splice(ind,0,arr.data.correctAnswer);
            
            
        // }

        function loadbar(){
            var len = 0;
            const bar = document.querySelectorAll(".progressbar")[0];
            var id;
            clearInterval(id);
            
            id = setInterval(loading, 1)
            function loading(){
                if(len>=100) {
                    //bar.style.width = "0px";
                    clearInterval(id);
                }
                else{
                    len = len+0.066;
                    bar.style.width = len+"%";
                }
            }
            
        }

        function finish(){
            document.querySelectorAll(".page")[0].style.display = "none";
            document.querySelectorAll(".dispscore")[0].innerHTML = "Your score = "+score;
            const res = document.querySelectorAll(".result")[0];
            
            res.style.display = "flex";
        }
        console.log(document.querySelectorAll(".submitbutton")[0])
        document.querySelectorAll(".submitbutton")[0].addEventListener("click",()=>{
           
            const answ = document.querySelectorAll(".radioans");
            const feedback = document.querySelectorAll(".feedback")[0];
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
                feedback.innerHTML = "Your answer is wrong";
                feedback.style.backgroundColor = "red";
            }
            else{
                feedback.innerHTML = "Your answer is correct !! ";
                feedback.style.backgroundColor = "greenyellow";
            }
        })

        document.querySelectorAll(".retry")[0].addEventListener("click",function(){
            location.reload();
        })

        window.addEventListener("load",start);
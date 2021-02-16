var count=0;
var question=[

];
/*
 *My Array Structure:
  [
     {
    id:0,
    subject:"",
    quesBox:"",
    response:[
            {
                name:"",
                ans:""
            },
    ]
      },
   ]
*/
var submitQues=document.getElementById("submitQues");
submitQues.addEventListener("click",addQues);
var quesBox=document.getElementById("quesBox");
var displayQuiz=document.getElementById("displayQuiz");
function addQues()
{
    var sub=document.getElementById("sub");
   
    if(sub.value==="" || quesBox.value==="")
    {
        alert("Enter a Question!");
    }
    else{
        //* creating an object of question
        var obj={
            id:count,
            subject:sub.value,
            quesBox:quesBox.value,
            response:[]
        }
        question.push(obj);
        var newDiv=document.createElement("div");
        var subHeading=document.createElement("h1");
        var quesDisplay=document.createElement("p");
        subHeading.innerHTML=sub.value;
        quesDisplay.innerHTML=quesBox.value;
        newDiv.appendChild(subHeading);
        newDiv.appendChild(quesDisplay);
        newDiv.setAttribute("class","border border-top-0 border-right-0 pl-2");
        newDiv.setAttribute("id",count);
        newDiv.setAttribute("onclick","displayQuesAndResponse(id)");
        displayQuiz.appendChild(newDiv);
        count++;
        sub.value="";
        quesBox.value="";
    }
}
var x;
var classNameheading=document.getElementsByClassName("heading")[0];
var classNameheading2=document.getElementsByClassName("heading")[1];
var appendres=document.getElementById("append-response");
function displayQuesAndResponse(id)
{   
    classNameheading.setAttribute("hidden",true);
    classNameheading2.setAttribute("hidden",true);
    var h = document.getElementById("h4");
    var p =document.getElementById("p");
    h.innerHTML = question[id].subject;
    p.innerHTML = question[id].quesBox;
    document.getElementById("response-section").removeAttribute("hidden");
    x=id;
    appendres.innerHTML="";
    for(var i=0;i<question[id].response.length;i++)
    {
        var divres=document.createElement("div");
        var hres=document.createElement("h5");
        var pres=document.createElement("p");
        hres.innerHTML=question[id].response[i].name;
        pres.innerHTML=question[id].response[i].comment;
        divres.appendChild(hres);
        divres.appendChild(pres);
        divres.setAttribute("class","p-2 bg-light border border-top-0 border-left-0 border-right-0");
        appendres.appendChild(divres);
    }
}

document.getElementById("addResponse").addEventListener("click",addResponse);
function addResponse()
{   
    var name=document.getElementById("name");
    var comment=document.getElementById("comment");

    var divres=document.createElement("div");
    var hres=document.createElement("h5");
    var pres=document.createElement("p");
    hres.innerHTML=name.value;
    pres.innerHTML=comment.value;
    divres.appendChild(hres);
    divres.appendChild(pres);
    divres.setAttribute("class","p-2 bg-light border border-top-0 border-left-0 border-right-0");
    appendres.appendChild(divres);
    var resobj=
        {
            name:name.value,
            comment:comment.value
        }
    question[x].response.push(resobj);
    name.value="";
    comment.value="";
    //console.log(x);
}

document.getElementById("resolve").addEventListener("click",resolve);
function resolve()
{
    quesBox.innerHTML="";
    Showform();
    console.log(question);
    question.splice(x,1);
    for(let i=0;i<question.length;i++)
    {
        question[i].id=i;
    }
    renderLeft(question);
    console.log(question);
    count--;
}

function Showform(){
    document.getElementById("response-section").setAttribute("hidden",true);
    classNameheading.removeAttribute("hidden");
    classNameheading2.removeAttribute("hidden");
}

function renderLeft(input)
{
    displayQuiz.innerHTML="";
    for(let i=0;i<input.length;i++)
    {
        var newDiv=document.createElement("div");
        var subHeading=document.createElement("h1");
        var quesDisplay=document.createElement("p");
        subHeading.innerHTML=input[i].subject;
        quesDisplay.innerHTML=input[i].quesBox;
        newDiv.appendChild(subHeading);
        newDiv.appendChild(quesDisplay);
        newDiv.setAttribute("class","border border-top-0 border-right-0 pl-2");
        newDiv.setAttribute("id",input[i].id);
        newDiv.setAttribute("onclick","displayQuesAndResponse(id)");
        displayQuiz.appendChild(newDiv);
    }
}
function search()
{
    var search=document.getElementById("search").value;
    var output=question.filter((r)=>r.subject.includes(search));
    console.log(output)//*; when input is erased from input box, the whole array is returned by filter function;
    if(output.length===0 && search!=="")
    {   

        displayQuiz.innerHTML="<h2>No match found</h2>";
    }
    else
    { 
        renderLeft(output);
    }
}


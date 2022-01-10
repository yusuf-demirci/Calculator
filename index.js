let operatorPressed = false;
let numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]

function isOverflow(){
    if ($(`.process`).text().length > 14){
        $(`.process`).addClass("overflow")
    } else {
        $(`.process`).removeClass("overflow")
    }
}

function clearLabels(){
    $(".result").text("")
    $(".process").text("0")
}

function backSpace(){
    let process = $(".process").text()
    if (process !== "0"){
        process = process.slice(0, process.length-1)
        if (process === "" || process === "-") process = "0"
        $(".process").text(process)
    }
    isOverflow();
}

function square(){
    let process = $(".process").text()
    process = (Math.round((+process * +process) * 100)) / 100
    $(".process").text(String(process))
    isOverflow();
}

function operate(calculation){
    calculation = calculation.split(" ")
    let a = +calculation[0]
    let b = +calculation[2]
    let operatr = calculation[1]
    if (!b && b === "0") return

    switch (operatr){
        case "+":
            return String((Math.round((a + b) * 100)) / 100);
        case "-":
            return String((Math.round((a - b) * 100)) / 100);
        case "x":
            return String((Math.round((a * b) * 100)) / 100);
        case "/":
            if (b === 0){
                alert("You can't divide a number by 0!")
                return;
            }
            return String((Math.round((a / b) * 100)) / 100);
    }
}

function equals(){
    
    let process = $(".process").text()
    let result = $(".result").text()
    let resList = result.trim().split(" ")
    
    console.log(resList)
    if (!operatorPressed && resList.length !== 3){
        let calculation = operate(result + process)
        console.log(calculation)
        if (calculation){
            $(".result").text(result + process)
            $(".process").text(calculation)
        }
        operatorPressed = true
    }
    
    isOverflow();
}

function operator(e){
    let operator;
    if (e === "*") operator = "x"
    else operator = e

    let process = $(".process").text()
    let result = $(".result").text()
    let resList = result.trim().split(" ")
    
    if (!result) $(".result").text(process + " " + operator + " ") 
    else if (resList.length === 2) $(".result").text(resList[0] + " " + operator + " ")
    else if (resList.length === 3) $(".result").text(operate(result) + " " + operator + " ") 

    else if (!operatorPressed){
        let calculation = operate(result + process)
        if (calculation){
            $(".result").text(calculation + " " + operator + " ")
        }
    }
    operatorPressed = true;
    isOverflow();
}

function numbers(typed){
    let process = $(".process").text();
    if (typed === "." && process.includes(".")) return;

    if (operatorPressed === true){
        $(".process").text(typed)
        operatorPressed = false;
    } else{
        if (process === "0"){
            if (typed === ".") $(".process").text("0" + typed)
            else $(".process").text(typed)
        } else {
            $(".process").text(process + typed)
        }
    }  
    isOverflow();
}

$(".change-sign").click(function(){
    let process = $(".process").text()

    if (process !== "0"){
        if (process.startsWith("-")){
            process = process.replace("-", "")
        } else {
            process = "-" + process
        }
        $(".process").text(process)
    }
    isOverflow();
})

$(".backspace").click(backSpace);

$(window).keydown(function(e){
    
    if (e.code === "Backspace") backSpace();
    else if (e.code === "Escape") clearLabels();
    else if (e.code === "Enter" || e.code === "NumpadEnter") equals();
    else if (e.code === "NumpadAdd" || e.code === "NumpadSubtract" || e.code === "NumpadMultiply" || e.code === "NumpadDivide") operator(e.key);
    else if (numList.includes(e.key)) numbers(e.key);
});

$(".clear").click(clearLabels);
$(".square").click(square);
$(".equals").click(equals);

$(".operator").click(function(e){
    operator(e.target.textContent)
})


$(".num").click(function(e){
    let typed = e.target.innerText;
    numbers(typed);
})
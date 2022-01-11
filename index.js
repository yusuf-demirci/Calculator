let operatorPressed = false;
let numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
let process;
let result;

// This function is to prevent overflowing from the screen
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
    isOverflow();
}

function backSpace(){
    process = $(".process").text()
    if (process !== "0"){
        process = process.slice(0, process.length-1)
        if (process === "" || process === "-") process = "0"
        $(".process").text(process)
    }
    isOverflow();
}

// This function takes the square root of the number
function square(){
    process = $(".process").text()
    process = (Math.round((+process * +process) * 100)) / 100
    $(".process").text(String(process))
    operatorPressed = false;
    isOverflow();
}

// This function does the mathematical calculations
function operate(operation){
    operation = operation.split(" ")
    let a = +operation[0]
    let b = +operation[2]
    let operatr = operation[1]
    
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
    result = $(".result").text()
    process = $(".process").text()

    if (!operatorPressed && !result.includes("=")){
        let calculation = operate(result + process);
        if (calculation){
            $(".result").text(result + process + " = ")
            $(".process").text(calculation)
        }
        operatorPressed = true
    }
    isOverflow();
}

function operatorSign(e){
    result = $(".result").text()
    process = $(".process").text()

    if (e === "*") e = "x";
    $(".result").text(process + " " + e + " ")
    let resList = result.trim().split(" ")
    
    if (!result) $(".result").text(process + " " + e + " ") 
    else if (resList.length === 2) $(".result").text(resList[0] + " " + e + " ")
    else if (result.includes("=") && !operatorPressed) {
        $(".result").text($(".process").text() + " " + e + " ")
        operatorPressed = true;
        return;
    }  
    if (!operatorPressed){
        let calculation = operate(result + process)
        if (calculation){
            $(".result").text(calculation + " " + e + " ")
        }
    }
    operatorPressed = true;
    isOverflow();
}

function numbers(typed){
    process = $(".process").text();
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

// This listener enables the keyboard functionality
$(window).keydown(function(e){ 
    if (e.code === "Backspace") backSpace();
    else if (e.code === "Escape") clearLabels();
    else if (e.code === "Enter" || e.code === "NumpadEnter") equals();
    else if (e.code === "NumpadAdd" || e.code === "NumpadSubtract" || e.code === "NumpadMultiply" || e.code === "NumpadDivide") operatorSign(e.key);
    else if (numList.includes(e.key)) numbers(e.key);
});

$(".change-sign").click(function(e){
    process = $(".process").text()

    if (process !== "0"){
        if (process.startsWith("-")){
            process = process.replace("-", "")
        } else {
            process = "-" + process
        }
        $(".process").text(process)
    }
    isOverflow();
    e.target.blur();
})

$(".backspace").click(function(e){
    backSpace();
    e.target.blur();
} );

$(".clear").click(function(e){
    clearLabels();
    e.target.blur();
} );
$(".square").click(function(e){
   square();
   e.target.blur();
} );
$(".equals").click(function(e){
    equals();
    e.target.blur();
} );

$(".operator").click(function(e){
    operatorSign(e.target.textContent)
    e.target.blur();
})

$(".num").click(function(e){
    numbers(e.target.innerText);
    e.target.blur();
})


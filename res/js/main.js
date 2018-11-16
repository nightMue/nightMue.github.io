var inputNumberId = "i1";
var inputNumber = 1;

function runCommand(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        var c = document.getElementById(inputNumberId);
        var cd = document.getElementById(inputNumberId).value;
        inputNumber += 1;
        inputNumberId = inputNumber + inputNumber;
        cd = cd.toLowerCase();
        if(cd == "resume")
        {
            downloadResume();
        }
        else if(cd == "about" || cd == "contact")
        {
            commandUnderConstruction();
        }
        else if(cd == "leave" || cd == "exit" || cd == "close")
        {
            closeWindow();
        }
        else
        {
            unknownCommand();
        }
        return false;
    }
}

function closeWindow() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox)
    {
        printCloseError();
    }
    else
    {
        printCloseProccess();
        setTimeout(function() {
            //var win = window.open('', '_self');
            //win.close();
            self.close();
        }, 2000)
    }
}

function printCloseProccess() {
    var newLine = document.createElement("p");
    newLine.className = "line1";
    newLine.id = "line";
    var text = document.createTextNode("$ sudo uninstall nightMue");
    newLine.appendChild(text);

    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(newLine)
}

function printCloseError() {
    var newLine = document.createElement("p");
    newLine.className = "line";
    newLine.id = "error";
    var text = document.createTextNode("Incompatible with FireFox");
    newLine.appendChild(text);

    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(newLine)
            
    newInputLine();
}

function unknownCommand() {
    var newLine = document.createElement("p");
    newLine.className = "line";
    newLine.id = "error";
    var text = document.createTextNode("** UNKNOWN COMMAND **");
    newLine.appendChild(text);

    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(newLine)
            
    newInputLine();
}

function downloadResume() {
    var file = document.createElement("a");
    file.clasName = "downloadFile";
    file.href = "res/res/NicholasMueller.pdf";
    file.target = "_blank"
            
    //var location = document.getElementById("invis");
    //location.appendChild(newLine);
    file.click();

    var response = document.createElement("p");
    var text = document.createTextNode(" Download Complete - 100%");
    response.className = "line";
    response.id = "success";
    response.appendChild(text);
            
    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(response);
    newInputLine();
}

function newInputLine() {
    var newLine = document.createElement("p");
    var t = document.createTextNode("> ");
    newLine.className = "input";
    newLine.id = "input"
    newLine.appendChild(t);

    var newInput = document.createElement("input");
    newInput.className = "commandEnter";
    newInput.id = inputNumberId;
    newInput.type = "text";
    newInput.name = "commandInput";
    newInput.onkeypress = runCommand;
    newInput.focus = true;
    newInput.autofocus = true;

    newLine.appendChild(newInput);

    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(newLine);
            
    //var newFocus = document.getElementById(inputNumber);
    //setTimeout("document.getElementById('" + inputNumberId + "').focus()", 10);
    scrollBottom();
}

function commandUnderConstruction() {
    var newLine = document.createElement("p");
    newLine.className = "line";
    newLine.id = "line";
    var text = document.createTextNode("Command Under Construction!");
    newLine.appendChild(text);

    var lineSpot = document.getElementById("ct");
    lineSpot.appendChild(newLine)
            
    newInputLine();
}

function scrollBottom() {
    var objDiv = document.getElementById("ct");
    objDiv.scrollTop = objDiv.scrollHeight;
}
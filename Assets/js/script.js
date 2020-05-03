// variable for holding all time block text
var timeBlocksText = ["", "", "", "", "", "", "", "", ""];
//accesses timeBlocks for event delegation
var timeBlocks = document.querySelector(".container");
// current hour for text area coloring
var currentHour = moment().hour();

initialize();

// function to initialize page
function initialize() {
    // sets current date in currentDay
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    loadStorage();
    renderTimeBlocks();
}
// loads from local storage
function loadStorage() {
    var temp = JSON.parse(localStorage.getItem("timeBlocksText"));

    if (temp !== null) {
        timeBlocksText = tempLoad;
    }
}

function renderTimeBlocks() {
    $(".container").empty();

    for (var i = 0; i < 9; i++) {
         // sets a variable for time of current block being rendered
         var time = i + 9;
         if (time > 12) {
             time -= 12;
         }
 
         //creates time block and adds classes
         var timeBlock = $("<section>");
         timeBlock.addClass("time-block row");
 
         // creates hour div and adds classes/text content
         var hour = $("<div>");
         hour.addClass("hour col-2 col-md-1");
         if (time > 8) {
             hour.text(time + " AM");
         }
         else {
             hour.text(time + " PM")
         }

        // creates text area addes classes, index and value
        var textArea = $("<textarea>").addClass("col-8 col-md-10");
        if ((i + 9) < currentHour) {
            textArea.addClass("past");
        }
        else if ((i + 9) == currentHour) {
            textArea.addClass("present");
        }
        else {
            textArea.addClass("future");
        }
        textArea.attr("index", i);
        textArea.val(timeBlocksText[i]);

        // creates save button
        var saveBtn = $("<button>").attr("type", "button");
        saveBtn.attr("index", i);
        saveBtn.addClass("saveBtn col-2 col-md-1");
        saveBtn.append($("<i>").addClass("fa fa-save"));
        
        // appends elements to timeBlock
        timeBlock.append(hour, textArea, saveBtn);

        // appends new time block to the page
        $(".container").append(timeBlock);
    }
}

// adds event listener to save timeBlock
timeBlocks.addEventListener("click", function (event) {
        var index = event.target.getAttribute("index");
        var content = event.target.parentElement.children[1].value;
        timeBlocksText.splice(index, 1, content);
        saveSchedule();
});

// saves currently loaded schedule to localStorage
function saveSchedule() {
    localStorage.setItem("timeBlocksText", JSON.stringify(timeBlocksText));
}

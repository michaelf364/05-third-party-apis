// variable for holding all time block text
var timeBlocksText = ["", "", "", "", "", "", "", ""];
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
    var storage = JSON.parse(localStorage.getItem("timeBlocksText"));

    if (storage !== null) {
        timeBlocksText = storage;
    }
}

function renderTimeBlocks() {
    $(".container").empty();

    for (var i = 9; i < 17; i++) {
        time = i;
        if (time > 12) {
            time -= 12;
        }
        //creates time block and adds classes
        var timeBlock = $("<section>");
        timeBlock.addClass("time-block row");

        // creates hour div and adds classes/text content
        var hourDiv = $("<div>");
        hourDiv.addClass("hour col-2 col-md-1");
        if (time == 12) {
            hourDiv.text(time + " PM");
        }
        else if (time > 8) {
            hourDiv.text(time + " AM");
        }
        else {
            hourDiv.text(time + " PM");
        }

        // creates text area addes classes, index and value
        var textArea = $("<textarea>");
        if (i < currentHour) {
            textArea.addClass("past col-8 col-md-10");
        }
        else if (i == currentHour) {
            textArea.addClass("present col-8 col-md-10");
        }
        else {
            textArea.addClass("future col-8 col-md-10");
        }
        textArea.attr("index", i);
        textArea.val(timeBlocksText[i]);

        // creates save button
        var saveBtn = $("<button>");
        saveBtn.attr({ index: i, type: "button" });
        saveBtn.addClass("saveBtn col-2 col-md-1");
        saveBtn.html("<span><i class='fa fa-save'></i></span>");

        // appends elements to timeBlock
        timeBlock.append(hourDiv, textArea, saveBtn);

        // appends new time block to the page
        $(".container").append(timeBlock);
    }
}
$(".saveBtn").on("click", function (event) {
    if (event.target.type === "button") {
        var index = event.target.getAttribute("index");
        var content = event.target.parentElement.children[1].value;
        timeBlocksText.splice(index, 1, content);
        saveSchedule();
    }
    else if (event.target.parentElement.type === "button") {
        var index = event.target.parentElement.getAttribute("index");
        var content = event.target.parentElement.parentElement.children[1].value;
        timeBlocksText.splice(index, 1, content);
        saveSchedule();
    }
});
// saves currently loaded schedule to localStorage
function saveSchedule() {
    localStorage.setItem("timeBlocksText", JSON.stringify(timeBlocksText));
}

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
        var hour = $("<div>");
        hour.addClass("hour col-2 col-md-1");
        if (time == 12) {
            hour.text(time + " PM");
        }
        else if (time > 8) {
            hour.text(time + " AM");
        }
        else {
            hour.text(time + " PM");
        }

        // creates text area addes classes, index and value
        var text = $("<textarea>");
        if (i < currentHour) {
            text.addClass("past col-8 col-md-10");
        }
        else if (i == currentHour) {
            text.addClass("present col-8 col-md-10");
        }
        else {
            text.addClass("future col-8 col-md-10");
        }
        text.attr("index", i);
        text.val(timeBlocksText[i]);

        // creates save button
        var saveBtn = $("<button>");
        saveBtn.attr({ index: i, type: "button" });
        saveBtn.addClass("saveBtn col-2 col-md-1");
        saveBtn.html("<span><i class='fa fa-save'></i></span>");

        // appends elements to timeBlock
        timeBlock.append(hour, text, saveBtn);

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

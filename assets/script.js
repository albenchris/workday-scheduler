// global variables (start)
var containerEl = $(".container");
containerEl.empty();

var todaysSchedule = 
    JSON.parse(localStorage.getItem("todaysSchedule")) || 
    ["", "", "", "", "", "", "", ""]
;
// global variables (end)

// displays current date (start)
function displayCurrentDate() {
    var currentDate = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(currentDate);
};

displayCurrentDate();
// current date display (end)

// renders hours of 9a - 5p on the page (start)
function renderMainPage() {
    for (var hour = 9; hour <= 17; hour++) {
        // changes the index value to start at 0
        var index = hour - 9;
    
        // changes the hour displayed from military time to standard time
        var meridiem = "";
        if (hour > 12) {
            hourDisplayed = hour - 12;
            meridiem = "pm";
        } else if (hour === 12) {
            hourDisplayed = hour;
            meridiem = "pm";
        } else {
            hourDisplayed = hour;
            meridiem = "am";
        }
    
        // adds new row
        var rowEl = $("<form>")
            .addClass("row time-block hour");
    
        // adds hour to each row
        var div2Col = $("<div>")
            .addClass("col-md-2");
        var hourEl = $("<div>")
            .addClass("pt-3")
            .text(hourDisplayed + meridiem);  
        div2Col.append(hourEl);
        rowEl.append(div2Col);
    
        // adds textarea to each row
        var div9Col = $("<div>")
            .addClass("col-md-9 mb-0 p-0");
        var planEl = $("<textarea>")
            .attr("id", "textarea-" + index)
            .addClass("description")
            .val(todaysSchedule[index]); // <- accesses todaysScedule array
        // dynamically adds .past, .present and .future classes to each hour
        var currentHour = moment().format("HH");
        if (hour < currentHour) {
            planEl.addClass("past");
        } else if (hour > currentHour) {
            planEl.addClass("future");
        } else {
            planEl.addClass("present"); 
        }
        div9Col.append(planEl);
        rowEl.append(div9Col);
    
        // adds save button to each row
        var div1Col = $("<button>")
            .attr("save-id", index)
            .addClass("col-md-1 btn saveBtn");
        var saveIcon = $("<i>")
            .addClass("fas fa-save fa-lg"); // icon from fontawesome.com
        div1Col.append(saveIcon);
        rowEl.append(div1Col);
    
        containerEl.append(rowEl);
    }
};

renderMainPage();
// render main page (end)

// save button functionality (start)
$(".saveBtn").on("click", function(event) {
    event.preventDefault();

    var index = $(this).attr("save-id");
    var textareaId = "#textarea-" + index;
    var value = $(textareaId).val();

    todaysSchedule[index] = value;

    saveTodaysSchedule();
});

function saveTodaysSchedule() {
    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
};
// save button functionality (end)
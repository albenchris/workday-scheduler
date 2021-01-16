var todaysSchedule = JSON.parse(localStorage.getItem("today")) || [];
var containerEl = $(".container");
containerEl.empty();

var currentHour = moment().format("HH");

// displays current date
function displayCurrentDate() {
    var currentDate = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(currentDate);
};

displayCurrentDate();

// renders hours of 9a - 5p on the page
for (var hour = 9; hour < 18; hour++) {
    var index = hour - 9;

    var hourDisplayed = 0;
    var meridiem = "";
    if (hour > 12) {
        visibleHour = hour - 12;
        meridiem = "pm";
    } else {
        visibleHour = hour;
        meridiem = "am"
    }

    // adds new row
    var rowEl = $("<form>")
        .attr("id", "hour-" + index)
        .addClass("row time-block hour position-relative");

    // adds hour to each row
    var div2Col = $("<div>")
        .addClass("col-md-2 position-relative");
    var hourEl = $("<div>")
        .addClass("position-relative top-50 start-50 translate-middle pt-4")
        .text(visibleHour + meridiem);  
    div2Col.append(hourEl);
    rowEl.append(div2Col);

    // adds textarea to each row
    var div9Col = $("<div>")
        .addClass("col-md-9 mb-0 position-relative");
    var planEl = $("<textarea>")
        .attr("id", "input-" + index)
        .addClass("description position-relative");
    // dynamically adds .past, .present and .future classes to each hour
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
    var div1Col = $("<div>")
        .attr("id", "save-button-" + index)
        .addClass("col-md-1 btn saveBtn position-relative");
    var saveIcon = $("<i>")
        .addClass("fas fa-save fa-lg position-relative top-50 start-50 translate-middle pt-4"); // icon from fontawesome.com
    div1Col.append(saveIcon);
    rowEl.append(div1Col);

    containerEl.append(rowEl);
}



// add function(s) to save task reminders entered into textarea into localStorage



function saveTodaysSchedule() {
    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
};


// add function to render task reminders from localStorage





// event listeners here if needed
$("#save-button").on("click", function(event) {
    event.preventDefault();

    var index = $(this).attr("save-id");
    var textareaId = "textarea-" + index;
    var value = $(textareaId).val();

    todaysSchedule[index] = value;

    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
    console.log(todaysSchedule);
});

// CHECKLIST:
// change color of hour blocks based on time of day
// save button functionality with localStorage
// display tasks from localStorage
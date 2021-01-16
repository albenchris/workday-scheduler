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
for (var hour = 9; hour < 17; hour++) {
    var index = hour - 9;

    var rowEl = $("<form>")
        .attr("id", index)
        .addClass("row time-block hour");

    var div2Col = $("<div>")
        .addClass("col-md-2 p-5");
    var hourEl = $("<div>")
        .text(hour);
    div2Col.append(hourEl);
    rowEl.append(div2Col);
    
    var div9Col = $("<div>")
        .addClass("col-md-9 mb-0 p-0");
    var planEl = $("<textarea>")
        .attr("id", "input-" + index)
        .addClass("description");
    div9Col.append(planEl);
    rowEl.append(div9Col);

    var div1Col = $("<div>")
        .attr("id", "save-button-" + index)
        .addClass("col-md-1 btn saveBtn");
    var saveIcon = $("<i>")
        .addClass("fas fa-save fa-lg p-5"); // icon from fontawesome.com
    div1Col.append(saveIcon);
    rowEl.append(div1Col);

    containerEl.append(rowEl);
}

// add function(s) to dynamically add .past, .present and .future classes to each hour
// todaysSchedule.forEach(function(thisTime) {
//     if (thisTime.time < currentHour) {
//         $("textarea").addClass("past");
//     } else if (thisTime.time === currentHour) {
//         $("textarea").addClass("present");
//     } else if (thisTime.time > currentHour) {
//         $("textarea").addClass("future")
//     }
//     // console.log(thisTime.time);
//     // console.log(currentHour);
// });





// add function(s) to save task reminders entered into textarea into localStorage



function saveTodaysSchedule() {
    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
};


// add function to render task reminders from localStorage





// function renderTodaysSchedule(todaysSchedule) {
//     $(".container").empty();

//     for (var i=0; i < todaysSchedule.length; i++) {
//         var eachHour = $("<form>");
//         eachHour.text(todaysSchedule[index]);

//         $(".container").append(eachHour);
//     }
// };

// renderTodaysSchedule();




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
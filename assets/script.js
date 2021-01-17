var containerEl = $(".container");
containerEl.empty();

var todaysSchedule = JSON.parse(localStorage.getItem("todaysSchedule")) || 
    ['', '', '', '', '', '', '', ''];

// displays current date
function displayCurrentDate() {
    var currentDate = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(currentDate);
};

displayCurrentDate();

// renders hours of 9a - 5p on the page
function renderMainPage() {
    for (var hour = 9; hour <= 17; hour++) {
        var index = hour - 9;
    
        // var hourDisplayed = 0; // don't need?
        var meridiem = "";
        if (hour > 12) {
            hourDisplayed = hour - 12;
            meridiem = "pm";
        } else {
            hourDisplayed = hour;
            meridiem = "am"
        }
    
        // adds new row
        var rowEl = $("<form>")
            .attr("data-hour-index", index)
            .addClass("row time-block hour position-relative");
    
        // adds hour to each row
        var div2Col = $("<div>")
            .addClass("col-md-2 position-relative");
        var hourEl = $("<div>")
            .addClass("position-relative top-50 start-50 translate-middle pt-4")
            .text(hourDisplayed + meridiem);  
        div2Col.append(hourEl);
        rowEl.append(div2Col);
    
        // adds textarea to each row
        var div9Col = $("<div>")
            .addClass("col-md-9 mb-0 p-0 position-relative");
        var planEl = $("<textarea>")
            .attr("id", "textarea-" + index)
            .addClass("description position-relative")
        // accessing data from todaysScedule array
            .val(todaysSchedule[index]);
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
        var div1Col = $("<div>")
            .attr("save-id", index)
            .addClass("col-md-1 btn saveBtn position-relative");
        var saveIcon = $("<i>")
            .addClass("fas fa-save fa-lg position-relative top-50 start-50 translate-middle pt-4"); // icon from fontawesome.com
        div1Col.append(saveIcon);
        rowEl.append(div1Col);
    
        containerEl.append(rowEl);
    }
};


// displays main page
renderMainPage();


// add function to render task reminders from localStorage


// event listeners here if needed
$(".saveBtn").on("click", function(event) {
    event.preventDefault();

    var index = $(this).attr("save-id");
    var textareaId = "#textarea-" + index;
    var value = $(textareaId).val();

    // console.log(index);
    // console.log(textareaId);
    // console.log(value);

    todaysSchedule[index] = value;

    saveTodaysSchedule();
    // console.log(todaysSchedule);
});

// function to save todaysSchedule array
function saveTodaysSchedule() {
    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
};



// CHECKLIST:
// save button functionality with localStorage
// display tasks from localStorage
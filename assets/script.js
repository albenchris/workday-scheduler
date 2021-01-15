// add array to store task reminders from textareas
var todaysSchedule = [
    {
        time: "08",
        hour: $("#hour-8"),
        tasks: ""
    },
    {
        time: "09",
        hour: $("#hour-9"),
        tasks: ""
    },
    {
        time: "10",
        hour: $("#hour-10"),
        tasks: ""
    },
    {
        time: "11",
        hour: $("#hour-11"),
        tasks: ""
    },
    {
        time: "12",
        hour: $("#hour-12"),
        tasks: ""
    },
    {
        time: "13",
        hour: $("#hour-13"),
        tasks: ""
    },
    {
        time: "14",
        hour: $("#hour-14"),
        tasks: ""
    },
    {
        time: "15",
        hour: $("#hour-15"),
        tasks: ""
    },
    {
        time: "16",
        hour: $("#hour-16"),
        tasks: ""
    },
    {
        time: "17",
        hour: $("#hour-17"),
        tasks: ""
    }
];

var currentHour = moment().format("HH");

// displays current date
function displayCurrentDate() {
    var currentDate = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(currentDate);
};

displayCurrentDate();



// add function(s) to dynamically add .past, .present and .future classes to each hour
todaysSchedule.forEach(function(thisTime) {
    if (thisTime.time > currentHour) {
        $("textarea").addClass("past");
    } else if (thisTime.time === currentHour) {
        $("textarea").addClass("present");
    } else {
        $("textarea").addClass("future")
    }
    console.log(thisTime.time);
    console.log(currentHour);
});

// add function(s) to save task reminders entered into textarea into localStorage
$("#save-button").on("click", function(event) {
    event.preventDefault();
});


// add function to render task reminders from localStorage



// event listeners here if needed


// CHECKLIST:
// change color of hour blocks based on time of day
// save button functionality with localStorage
// display tasks from localStorage
// emptying placeholder content
$(".container").empty();

// get from localStorage or set as array of 9 strings
let todaysSchedule =
    JSON.parse(localStorage.getItem("todaysSchedule")) 
    ||
    [
        '', // 0 (9am)
        '', // 1 (10am)
        '', // 2 (11am)
        '', // 3 (12pm)
        '', // 4 (1pm)
        '', // 5 (2pm)
        '', // 6 (3pm)
        '', // 7 (4pm)
        ''  // 8 (5pm)
    ];

// setting the current date
$("#currentDay").text(moment().format("MMMM Do, YYYY"));

// renders the main page
for (let hour = 9; hour <= 17; hour++) {
    // setting the index at 0
    const index = hour - 9;

    // adds new row
    const rowEl = $("<form>")
        .addClass("row time-block");

    // setting time displayed in each block
    let hourDisplayed;
    if (hour < 12) hourDisplayed = `${hour.toString()} am`;
    if (hour === 12) hourDisplayed = `${hour.toString()} pm`;
    if (hour > 12) hourDisplayed = `${JSON.stringify(hour - 12)} pm`;

    // adds hour to each row
    const hourCol = $("<div>")
        .addClass("col-md-2 hour");
    const hourEl = $("<div>")
        .addClass("pt-3")
        .text(hourDisplayed);
    // append to row
    hourCol.append(hourEl);
    rowEl.append(hourCol);

    // adds textarea to each row
    const textCol = $("<div>")
        .addClass("col-md-9 mb-0 p-0");
    const textEl = $("<textarea>")
        .attr("id", `textarea-${index}`)
        .addClass("description w-100 h-100")
        .val(todaysSchedule[index]);
    let currentHour = moment().format("HH");
    if (hour < currentHour) textEl.addClass("past");
    if (hour == currentHour) textEl.addClass("present");
    if (hour > currentHour) textEl.addClass("future");
    // append to row
    textCol.append(textEl);
    rowEl.append(textCol);

    // adds save button to each row
    const buttonEl = $("<button>")
        .attr("save-id", index)
        .addClass("col-md-1 btn saveBtn");
    const saveIcon = $("<i>")
        .addClass("fas fa-save fa-lg");
    // append to row
    buttonEl.append(saveIcon);
    rowEl.append(buttonEl);

    $(".container").append(rowEl);
}

// save button functionality
$(".saveBtn").on("click", function (e) {
    e.preventDefault();

    const index = $(this).attr("save-id");
    const textId = `#textarea-${index}`;
    let value = $(textId).val();
    console.log(value);

    todaysSchedule[index] = value;

    localStorage.setItem("todaysSchedule", JSON.stringify(todaysSchedule));
});

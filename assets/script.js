//array of schedule objects
var userSchedule = [{
    id: 1,
    time: "07",
    display: "7:00am",
    content: "Example Entry.."
}, {
    id: 2,
    time: "08",
    display: "8:00am",
    content: ""
}, {
    id: 3,
    time: "09",
    display: "9:00am",
    content: ""
}, {
    id: 4,
    time: "10",
    display: "10:00am",
    content: ""
}, {
    id: 5,
    time: "11",
    display: "11:00am",
    content: ""
}, {
    id: 6,
    time: "12",
    display: "12:00pm",
    content: ""
}, {
    id: 7,
    time: "13",
    display: "1:00pm",
    content: ""
}, {
    id: 8,
    time: "14",
    display: "2:00pm",
    content: ""
}, {
    id: 9,
    time: "15",
    display: "3:00pm",
    content: ""
}, {
    id: 10,
    time: "16",
    display: "4:00pm",
    content: ""
}, {
    id: 11,
    time: "17",
    display: "5:00pm",
    content: ""
}, {
    id: 12,
    time: "18",
    display: "6:00pm",
    content: ""
}];

//DOM elements
var currentDateTimeEl = $("#currentDay");
var rowContainerEl = $(".container");

//local storage data object array
var existingEntries;

$(document).ready(function() {
    //get and format current datetime then set it on an 1 sec interval
    var currentDateTime;
    setInterval(function() {
        currentDateTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        currentDateTimeEl.text(currentDateTime);
    }, 1000);

    function generateSchedule() {
        //pull from local storage or use default object array
        existingEntries = JSON.parse(localStorage.getItem("allSchedulerEntries"));
        if (existingEntries == null) {
            existingEntries = userSchedule;
        }
        //generate each row
        var scheduleRow;
        var firstHit = false;
        var currentRowTextArea;
        var isCurrentRowTimeBeforeNow;
        for (let i = 0; i < existingEntries.length; i++) {
            const element = existingEntries[i];
            // ADD data element with ID here for comparison 
            scheduleRow = "<form class='row' data-index-number='" + element.id + "'><div class = 'col-md-2 hour'>" + element.display +
                "</div><div class = 'col-md-9 description p-0'><textarea class = 'past'>" + element.content +
                "</textarea></div><button class = 'col-md-1 save-button'><i class = 'far fa-save fa-lg'></i></button></form>";
            rowContainerEl.append(scheduleRow);
            // if the time is current (not before) it will hit the 1st statement and time after the current time will hit the else if
            //get current current textarea
            currentRowTextArea = rowContainerEl.find("[data-index-number='" +
                (i + 1) + "']").find(".description").find('textarea');
            isCurrentRowTimeBeforeNow = element.time < moment().format("HH");
            if (!isCurrentRowTimeBeforeNow && firstHit === false) {
                //this will only happen once
                firstHit = true;
                currentRowTextArea.addClass("present");
            } else if (!isCurrentRowTimeBeforeNow) {
                currentRowTextArea.addClass("future");
            }
        }
    }

    //on page load
    function init() {
        generateSchedule();
    }

    init();

    //updated object array and then save to local storage
    $(".save-button").on("click", function(event) {
        event.preventDefault();
        //get id of row
        var indexNumber = $(this).parent().attr("data-index-number");
        //get text of row
        var userEntry = $(this).parent().find(".past").val();
        //find in object array and assign user entry to it
        for (let i = 0; i < existingEntries.length; i++) {
            const element = existingEntries[i];
            if (element.id == indexNumber) {
                existingEntries[i].content = userEntry;
                break;
            }
        }
        //put in local storage
        localStorage.setItem("allSchedulerEntries", JSON.stringify(existingEntries));
    })
});
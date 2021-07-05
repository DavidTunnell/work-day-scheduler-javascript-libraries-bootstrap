//array of schedule objects
var userSchedule = [{
    id: 1,
    time: "07",
    content: "TEST112"
}, {
    id: 2,
    time: "08",
    content: "33"
}, {
    id: 3,
    time: "09",
    content: ""
}, {
    id: 4,
    time: "10",
    content: ""
}, {
    id: 5,
    time: "11",
    content: ""
}, {
    id: 6,
    time: "12",
    content: ""
}, {
    id: 7,
    time: "13",
    content: ""
}, {
    id: 8,
    time: "14",
    content: ""
}, {
    id: 9,
    time: "15",
    content: ""
}, {
    id: 10,
    time: "16",
    content: ""
}, {
    id: 11,
    time: "17",
    content: ""
}, {
    id: 12,
    time: "18",
    content: "12"
}];

//DOM elements
var currentDateTimeEl = $("#currentDay");
var rowContainerEl = $(".container");

$(document).ready(function() {
    //get and format current datetime then set it on an 1 sec interval
    var currentDateTime;
    setInterval(function() {
        currentDateTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        currentDateTimeEl.text(currentDateTime);
    }, 1000);


    function generateSchedule() {
    //7 am to 7 pm, array of objects for time
    for (let i = 0; i < userSchedule.length; i++) {
        const element = userSchedule[i];
        // var currentTime = moment('hh:mm:ss');
        // var checkedTime = moment(element.time, 'hh:mm:ss');
        // console.log(currentTime + " _ " + checkedTime);
        //if moment('2010-10-20').isBefore('2010-10-21')
        // if (moment().format('hh:mm:ss').isBefore('2010-10-21')) {
        //     console.log("a " + element.time);
        // }

        //THIS SHOULD BE COMPARISON FOR IF - THEN each timeblock is color coded to indicate whether it is in the past, present, or future*
        element.time < moment().format("HH")

        // ADD data element with ID here for comparison 
        var scheduleRow = "<form class='row' data-index-number='"+ element.id +"'><div class = 'col-md-2 hour'>" + element.time + 
        "</div><div class = 'col-md-9 description p-0'><textarea class = 'past'>" + element.content + 
        "</textarea></div><button class = 'col-md-1 save-button'><i class = 'far fa-save fa-lg'></i></button></form>";
        rowContainerEl.append(scheduleRow);
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
        console.log($(this).parent().attr("data-index-number"));
        //get text of row
        console.log($(this).parent().find(".past")[0].innerHTML);
    })

});


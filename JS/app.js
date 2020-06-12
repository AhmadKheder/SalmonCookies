'use strict'
//each location's data as objects
var locationsNames = [{ name: 'Seattle', min: 23, max: 65, avgCookiesPerCust: 6.3 },
{ name: 'Tokyo', min: 3, max: 24, avgCookiesPerCust: 1.2 },
{ name: 'Dubai', min: 11, max: 38, avgCookiesPerCust: 3.7 },
{ name: 'Paris', min: 20, max: 38, avgCookiesPerCust: 2.3 },
{ name: 'Lima', min: 2, max: 16, avgCookiesPerCust: 4.6 }
];

var locations = [];
var workingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allLocations = []
function Location(locName, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
    this.locName = locName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgCookiesPerCust = avgCookiesPerCust;//average cookies purchased per customer
    this.purchesedPerHour = [];
    this.totalPurchesed;
    allLocations.push(this);
}

//fill in purchesedPerHour[]
Location.prototype.purchesedPerHourProto = function () {
    var randomCustperH;
    var sumOfhourlyPurches = 0;
    for (var i = 0; i < workingHours.length; i++) {
        // /generat random number of cust per hour
        randomCustperH = getRandomInt(this.minCustPerHour, this.maxCustPerHour);
        //then calculate the purchesed per hour
        var Mabee3 = Math.round(this.avgCookiesPerCust * randomCustperH);
        this.purchesedPerHour.push(Mabee3);
        sumOfhourlyPurches += Mabee3;

    }
    this.purchesedPerHour.push(sumOfhourlyPurches);

}
Location.prototype.dailyPurches = function () {
    var sumOfHourlyTotals = 0;
    for (var i in this.purchesedPerHour) {
        sumOfHourlyTotals += this.purchesedPerHour[i];
    }
    this.totalPurchesed = sumOfHourlyTotals;

}

function hourlyPurches()  {
var arr = [];
    for (var hour in workingHours) {//6am ...
        var sum = 0;
        for (var location in allLocations) {//objects
            sum += allLocations[location].purchesedPerHour[hour];

        }
        arr.push(sum);
    }
    return arr;
}

//create objects
for (var i in locationsNames) {
    var objName = locationsNames[i].name;
    objName = new Location(locationsNames[i].name, locationsNames[i].min, locationsNames[i].max, locationsNames[i].avgCookiesPerCust);
    // allLocations[i].purchesedPerHourProto()
    objName.purchesedPerHourProto();
    objName.dailyPurches();

}


function showResult() {
    for (let location = 0; location < allLocations.length; location++) {
        console.log(allLocations[location].locName)
        for (let index = 0; index < workingHours.length; index++) {
            console.log(`${workingHours[index]}: ${allLocations[location].purchesedPerHour[index]}`);
        }
        console.log(`Total: ${allLocations[location].totalPurchesed}`)
    }
}
// showResult();




//helper
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function renderPage() {
  var HTot =  hourlyPurches();
    //get the table
    var table = document.getElementById('salesTable');
    //fill in working hours
    var tableRow = document.createElement('tr');
    var tableHead = document.createElement('th');

    tableHead.innerHTML = ' ###';
    tableRow.appendChild(tableHead);

    for (var hour in workingHours) {
        var tableHead1 = document.createElement('th');
        tableHead1.innerHTML = workingHours[hour];
        tableRow.appendChild(tableHead1);
    }
    var dailylable = document.createElement('th');
    dailylable.innerHTML = 'Location-Total';
    tableRow.appendChild(dailylable);
    table.appendChild(tableRow);
    //working hours filled in 


    for (var location in allLocations) {

        var tableRow = document.createElement('tr');

        var tableData = document.createElement('td');
        tableData.innerHTML = allLocations[location].locName;
        tableRow.appendChild(tableData)


        for (var i = 0; i <= workingHours.length; i++) {
            var tableData = document.createElement('td');
            tableData.innerHTML = allLocations[location].purchesedPerHour[i];

            tableRow.appendChild(tableData);
        }

        table.appendChild(tableRow);
    }

    var totalRow = document.createElement('tr');
    var hourlytotalLable = document.createElement('td');

    hourlytotalLable.innerHTML = 'Total'
    totalRow.appendChild(hourlytotalLable);
    for (var hourlytotal in HTot) {

        var totalofHour = document.createElement('td');
        totalofHour.innerHTML = HTot[hourlytotal];
        totalRow.appendChild(totalofHour);
    }
    table.appendChild(totalRow);
}
// hourlyPurches();
renderPage();
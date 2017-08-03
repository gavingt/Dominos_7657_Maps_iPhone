
//Address list
var mOriginalAddresses = [
    ["a1.jpg", "5402 E. Lincoln Dr."],
    ["a2.jpg", "5700 E. McDonald Dr."],
    ["a3.jpg", "5877 N. Granite Reef Rd."],
    ["a4.jpg", "5950 N. 78th St."],
    ["a5.jpg", "5959 N. 78th St."],
    ["a5.jpg", "5995 N. 78th St."],
    ["a6.jpg", "5998 N. 78th St."],
    ["a7.jpg", "6040 N. Scottsdale Rd."],
    ["a8.jpg", "6270 N. 78th St."],
    ["a9.jpg", "6333 N. Scottsdale Rd."],
    ["a8.jpg", "6350 N. 78th St."],
    ["a8.jpg", "6417-6464 N. 77th Way (even/odd)"],
    ["a8.jpg", "6419-6477 N. 77th Pl. (even/odd)"],
    ["a10.jpg", "6480 N. 82nd St."],
    ["a11.jpg", "7007 E. Gold Dust Ave."],
    ["a12.jpg", "7101 E. Lincoln Dr."],
    ["a13.jpg", "7200 N. Scottsdale Rd."],
    ["a14.jpg", "7222-7880 E. Gainey Ranch Rd. (even/odd)"],
    ["a15.jpg", "7301 E. Indian Bend Rd."],
    ["a16.jpg", "7330 N. Pima Rd."],
    ["a17.jpg", "7350 N. Via Paseo Del Sur"],
    ["a18.jpg", "7401 N. Scottsdale Rd."],
    ["a19.jpg", "7500 E. McCormick Pkwy."],
    ["a20.jpg", "7575 E. Indian Bend Rd."],
    ["a21.jpg", "7600 E. Lincoln Dr."],
    ["a22.jpg", "7601 E. Indian Bend Rd."],
    ["a14.jpg", "7620-7825 E. Vaquero Dr. (even/odd)"],
    ["a23.jpg", "7675 E. McDonald Dr."],
    ["a14.jpg", "7705 E. Doubletree Ranch Rd."],
    ["a24.jpg", "7860-7960 N. Hayden Rd. (even)"],
    ["a14.jpg", "7871-7875 E. Gold Dust Ave. (odd)"],
    ["a25.jpg", "7950 E. Starlight Way"],
    ["a26.jpg", "8025 E. Lincoln Dr."],
    ["a27.jpg", "8250 N. Via Paseo Del Norte"],
    ["a28.jpg", "8260 E. Arabian Trail"],
    ["a29.jpg", "8300 E. Via de Ventura"],
    ["a30.jpg", "8310 E. McDonald Dr."],
    ["a31.jpg", "8311 E. Via de Ventura"],
    ["a24.jpg", "8371-8377 E. Via de Ventura (odd)"],
    ["a32.jpg", "8649 E. Royal Palm Rd."],
    ["a32.jpg", "8651 E. Royal Palm Rd."],
    ["a33.jpg", "8653 E. Royal Palm Rd."],
    ["a34.jpg", "8787 E. Mountain View Rd."],
    ["a14.jpg", "9827-9899 N. 79th Way (odd)"],
    ["a14.jpg", "9830-10050 N. 79th Pl. (even/odd)"],
    ["a14.jpg", "9845-10125 N. 78th Pl. (even/odd)"],
    ["a35.jpg", "9850 N. 73rd St."],
    ["a36.jpg", "9880 N. Scottsdale Rd."]
];




$(document).ready(function() {
    inflateAddressList(mOriginalAddresses);
    filterAddressList();

    //when user views a map and then presses Back softnav button, search_input gets cleared automatically
    $(window).bind("pagehide", function() {
        $("#search_input").val("");
        $("#address_list").empty();
        inflateAddressList(mOriginalAddresses);
    });

    $("#search_icon").click(function() {
       $("#search_input").focus();
    });

});




function inflateAddressList(addressList) {

    addressList.forEach(function(currentAddress) {
        var currentAddressElement = document.createElement("a");
        currentAddressElement.className = ("address_list_item");
        currentAddressElement.href = "img/maps/" + currentAddress[0];
        currentAddressElement.textContent = currentAddress[1];

        $("#address_list").append(currentAddressElement);
    });
}

function filterAddressList() {
    var searchInput = $("#search_input");
    var result;
    var constraint = "";

    // Save current value of element
    searchInput.data('currentVal', searchInput.val());

    // Look for changes in the value
    searchInput.bind("propertychange change click keyup input paste", function(event){
        // If value has changed...
        if (searchInput.data('currentVal') !== searchInput.val()) {
            // Updated stored value
            searchInput.data('currentVal', searchInput.val());

            //implement algorithm here
            constraint = searchInput.data().currentVal.toLowerCase().trim();

            if (constraint.length > 0) {
                var matchesFound = [];
                mOriginalAddresses.forEach(function (originalItem) {
                    var item = originalItem[1].toLowerCase();
                    //var pattern = new RegExp(/(\d+)(?!\w) *(?:north +|east +|south +|west +|n +|e +|s +|w +|n. +|e. +|s. +|w. +)*(.*)/g);
                    var pattern = new RegExp(/(\d+)(?!\w) *(?:north +|east +|south +|west +|n +|e +|s +|w +|n. +|e. +|s. +|w. +)*(.*)/);

                    var match = pattern.exec(constraint);

                    var containsEven = false;
                    var containsOdd = false;
                    var containsEvenOdd = false;
                    if (item.includes("(even")) {
                        containsEven = true;
                    }
                    if (item.includes("odd)")) {
                        containsOdd = true;
                    }
                    if (containsEven && containsOdd) {
                        containsEvenOdd = true;
                    }

                    //user must enter a number or a number followed by a space and arbitrary text to enter the below IF statement (in other words, constraint must match RegEx)
                    if (match !== null && item.includes("-")) {
                        //user must enter only a number to enter the below IF statement, and that number must be the start of a street name for an item that also contains a "-"
                        if (item.includes(" " + constraint)) {

                            matchesFound.push(originalItem);
                        }
                        else {
                            var streetNumberEntered = match[1];
                            var numberRanges = getNumberRanges(item);  //numberRanges is a 2-element array

                            if (canBeInRange(streetNumberEntered, numberRanges[0], numberRanges[1]) && item.includes(match[2])) {

                                //this IF detects if user already entered full number, and only then do we do even/odd checking
                                if (streetNumberEntered >= numberRanges[0] && streetNumberEntered <= numberRanges[1]) {

                                    if (containsEvenOdd) {
                                        matchesFound.push(originalItem);
                                    } else if (containsEven) {
                                        if (streetNumberEntered % 2 === 0) {
                                            matchesFound.push(originalItem);
                                        }
                                    } else {
                                        //containsOdd must be true and containsEven false to land here
                                        if (streetNumberEntered % 2 !== 0) {
                                            matchesFound.push(originalItem);
                                        }
                                    }
                                } else {
                                    matchesFound.push(originalItem);
                                }
                            }
                        } //end IF/ELSE block checking addresses with dashes(-)
                    }
                    else { //if item doesn't contain a dash (or pattern not matched, likely by typing in only letters), it gets processed here
                        if (isANumber(constraint)) {
                            //if item starts with constraint or constraint matches start of street name
                            if (item.startsWith(constraint) || item.includes(" " + constraint)) {
                                matchesFound.push(originalItem);
                            }
                        }
                        else {
                            if (item.includes(constraint)) {
                                matchesFound.push(originalItem);
                            }
                        }
                    }

                }); // end FOREACH loop checking each address item

                result = matchesFound;

            }  //ends IF block with condition "constraint.length > 0"
            else {
                result = mOriginalAddresses;
            }

            $("#address_list").empty();
            inflateAddressList(result);
        } //end IF statement that checks if new input = old input
    });  //end searchInput eventListener that listens for any changes to input textbox
}




//returns true if input is a positive integer number, such as the street number for a street address
function isANumber(input) {
    var pattern = /^[0-9]+$/;
    return pattern.test(input);
}





// calculates whether testNumber can be within numberRange[0] and numberRange[1] if user keeps typing number
function canBeInRange(testNumber, numberRangeLow, numberRangeHigh) {  //testNumber is an int, numberRange is a 2-element array

    var numberRange = [numberRangeLow, numberRangeHigh];

    var testNumberDecomposed = [];
    var lowerRangeDecomposed = [];
    var upperRangeDecomposed = [];

    while (testNumber > 0) {
        testNumberDecomposed.push(testNumber % 10);
        testNumber = Math.floor(testNumber / 10);
    }
    testNumberDecomposed.reverse();

    while (numberRange[0] > 0) {
        lowerRangeDecomposed.push(numberRange[0] % 10);
        numberRange[0] = Math.floor(numberRange[0] / 10);
    }
    lowerRangeDecomposed.reverse();

    while (numberRange[1] > 0) {
        upperRangeDecomposed.push(numberRange[1] % 10);
        numberRange[1] = Math.floor(numberRange[1] / 10);
    }
    upperRangeDecomposed.reverse();

    if (testNumberDecomposed.length > upperRangeDecomposed.length) {
        return false;
    }

    var testNumberReconstructed = 0;
    var lowerRangeReconstructed = 0;
    var upperRangeReconstructed = 0;

    //if lower range and upper range both have some number of digits
    if (lowerRangeDecomposed.length === upperRangeDecomposed.length) {
        for (var i = 0; i < testNumberDecomposed.length; i++) {
            testNumberReconstructed = (testNumberReconstructed * 10) + testNumberDecomposed[i];
            lowerRangeReconstructed = (lowerRangeReconstructed * 10) + lowerRangeDecomposed[i];
            upperRangeReconstructed = (upperRangeReconstructed * 10) + upperRangeDecomposed[i];

            if (testNumberReconstructed < lowerRangeReconstructed || testNumberReconstructed > upperRangeReconstructed) {
                return false;
            }
        }
    }
    //if upper range has more digits than lower range
    else {
        for (var j = 0; j < testNumberDecomposed.length; j++) {
            if (testNumberDecomposed.length > j) {
                testNumberReconstructed = (testNumberReconstructed * 10) + testNumberDecomposed[j];
            }
            if (lowerRangeDecomposed.length > j) {
                lowerRangeReconstructed = (lowerRangeReconstructed * 10) + lowerRangeDecomposed[j];
            }
            upperRangeReconstructed = (upperRangeReconstructed * 10) + upperRangeDecomposed[j];

            var testNumberReconstructedAddedDigit = (testNumberReconstructed * 10);

            var upperRangeReconstructedAddedDigit;
            if (upperRangeDecomposed.length > j + 1) {
                upperRangeReconstructedAddedDigit = (upperRangeReconstructed * 10) + upperRangeDecomposed[j+1];
            }
            else {
                upperRangeReconstructedAddedDigit = upperRangeReconstructed;
            }

            if ( (testNumberReconstructed < lowerRangeReconstructed
                    || testNumberReconstructed > upperRangeReconstructedAddedDigit)
                && (testNumberReconstructedAddedDigit < lowerRangeReconstructed
                    || testNumberReconstructedAddedDigit > upperRangeReconstructedAddedDigit) ) {
                return false;
            }
        }
    }

    return true;
}





//gets the numbers before and after the dash and returns them as a 2-element array
function getNumberRanges(addressString) {
    var pattern = /(\d+)-(\d+) .+/;

    var match = pattern.exec(addressString);
    var results = [];
    if (match !== null) {
        results[0] = parseInt(match[1]);
        results[1] = parseInt(match[2]);
    }
    return results;

}

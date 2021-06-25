
//Parses query from Landing Page URL, then appends 
// it to the end of the API endpoint URL
let params = (new URL(document.location)).searchParams;
let model_name = params.get('model');

fetch('https://dv.stk2.pro/dev/test/api.php?model=' + model_name).then(function (response) {

    //makes clicking the "Request A Quote" Button display a popup
    document.getElementById('quote_button').addEventListener("click", function () {
        alert("You clicked the 'Request A Quote' Button!")
    });


    // If the API call was successful, parses the JSON data
    return response.json();

}).then(function (data) {

    //Adds picture of queried vehicle to header
    document.getElementById('header_img').setAttribute("src", data.img);
    

    //Populates list with Finanancing details
    document.getElementById('monthly').innerHTML = "$" + data.monthly + " <p> MONTHLY <p/>";
    document.getElementById('duration').innerHTML = data.duration + "  <p> MONTHS <p/>";
    document.getElementById('down').innerHTML = "$" + data.down.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " <p>   DOWN <p/>";
    document.getElementById('year_and_make').innerHTML = data.year + " " + data.model;


    //Iterates through list of bullet points
    //For car model, then adds them to a list in the HTML
    for (var i = 0; i < data.bullets.length; i++) {
        var bullet_point = data.bullets[i];
        var ul = document.getElementById("bullets");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(bullet_point.text));
        ul.appendChild(li);
    }
   
    // If there was an error accessing the API,
    // Displays the error state page
}).catch(function (err) {

    document.getElementById('offer').setAttribute("id", "no_offer");
    document.getElementById('no_offer').innerHTML = "Sorry, no offer found. ";

    var button = document.createElement("button");
    button.setAttribute("id", "dealer_button");
    button.setAttribute("class", "buttons");
    button.innerHTML = "FIND A DEALER";
    document.getElementById('bullets').appendChild(button);

    //Creates a pop up when "Find A Dealer" button is clicked
    document.getElementById('dealer_button').addEventListener("click", function () {
        alert("You clicked the 'Find A Dealer' Button!");
    });

    //displays picture of full Line up if there is an error
    document.getElementById('header_img').setAttribute("src", "full_lineup.png");
    document.getElementById('header_img').setAttribute("id", "full_lineup");
});


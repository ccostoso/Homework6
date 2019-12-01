var animalArr = [
    "aardvark",
    "beluga whale",
    "caterpillar",
    "donkey",
    "elephant",
    "fire ant",
    "giraffe",
    "horse",
    "iguana",
    "jackal",
    "kangaroo",
    "lamb",
    "mouse",
    "narwhal",
    "ostrich",
    "penguin",
    "quail",
    "ram",
    "snake",
    "toad",
    "umbrellabird",
    "vulture",
    "walrus",
    "x-ray fish",
    "yak",
    "zebra"
];

function createButtons() {
    $.each(animalArr, function(i, animal) {
        var button = $("<button>");
        button.addClass("btn btn-outline-info mr-1 mb-1 animal-btn");
        button.text(animal);
        button.attr("data-animal", animal.trim());
        $("#animal-buttons").append(button);
    });
};

createButtons();

$("#search-button").on("click", function(event) {
    event.preventDefault();
    
    if ($("#search-input").val()) {
        var newAnimal = $("#search-input").val().trim();
        console.log(newAnimal);
    
        animalArr.push(newAnimal);
        $("#animal-buttons").empty();
        createButtons();
    }
});

$(document).on("click", ".animal-btn", function() {
    var animalName = $(this).attr("data-animal");
    var apiKey = "x5599Pxz9ZqrZScDnfjVVBXxUvXJmkZE";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=" + apiKey + "&limit=10";
    console.log(animalName);
    console.log(queryURL);
    $("#animal-display").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $.each(response.data, function(i, ele) {
            console.log(ele);

            var animalDiv = $("<div>");
            animalDiv.attr("data-index", i);
            animalDiv.css("display", "inline-block").css("margin-right", "1rem");
            var animalImage = $("<img />").attr("data-animate", ele.images.fixed_width.url).attr("data-still", ele.images.fixed_width_still.url).attr("data-state", "still");
            animalImage.addClass("animal-image");
            animalImage.attr("src", ele.images.fixed_width_still.url);
            animalImage.css("max-width", "300px");
            var animalRating = $("<p>").html("<span class=\"font-weight-bold\">Rating: </span>" + ele.rating.toUpperCase());
            animalDiv.append(animalImage);
            animalDiv.append(animalRating);
            $("#animal-display").append(animalDiv);
        })
    })
})

$(document).on("click", ".animal-image", function(event) {
    event.preventDefault();

    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        console.log($(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }  
})
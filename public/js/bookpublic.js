$(function() {

    $("#postbook").on("submit", function(event) {
        event.preventDefault();
        
        var newBook = {
            title: $("#title").val().trim(),
            author: $("#author").val().trim(),
            year: $("#year").val().trim(),
            category: $("#genre").val().trim(),
            // review: $("#review").val().trim(),
            available: 1
            // UserId: user.id
        };

        // Send the POST request to create new book.
        $.ajax("/api/books", {
            type: "POST",
            data: newBook
        }).then(
            function() {
                console.log("added new book");
                // Reload the page
                location.reload();
            }
        );

    });

    // get data for all books to display books in html
    $.get("/api/books", function(data) {
        console.log(data);

        // empty to displaymybooks before adding new content
        $("#displaymybooks").empty();
        // if the data is not there, then return an error message
        if (!data) {
            $("#displaymybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
        }
        else {
            for (i = 0; i < data.length; i++) {
                $("#displaymybooks").append("<p>Title: " + data[i].title + " - Author: " + data[i].author + " - Year: " + data[i].year + " - Genre: " + data[i].category + "</p>");
            }
        }
    });

});
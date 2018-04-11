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

});
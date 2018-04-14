$(function() {

    $("#postbook").on("submit", function(event) {
        event.preventDefault();
        var newBook = {
            title: $("#title").val().trim(),
            author: $("#author").val().trim(),
            year: $("#year").val().trim(),
            category: $("#genre").val().trim(),
            // once we add isbn column this will capture value
            isbn: $("#isbn").val().trim()
            // available: 1
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
                // location.reload();
                $("#modalbookinfo").text(newBook.title);
                $("#mybookmodal").modal('show');
            }
        );
    });

    $("#closebookmodal").on("click", function(event) {
        location.reload();
    });
    

    // get data for books to display books in html
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
                // $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> " + data[i].title + "  -  " + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "<button class='removebookbutton' data-bookid=" + data[i].isbn + ">Remove</button>" + "</li>");
                $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> " + data[i].title + "  -  " + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</li>");
            }
        }
        $(".removebookbutton").on("click", function(event) {
            var id = $(this).data("bookid");
            console.log(id);

            $.ajax("/api/books/" + id, {
                type: "DELETE"
            }).then(
                function() {
                    console.log("deleted book");
                    // Reload the page to get the updated list
                    location.reload();
                });
        });
    });
});


// i will copy and paste this code into the book display dynamic list once we add isbn column
    // + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> "
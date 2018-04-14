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

    if ($("#displaybooks")[0]) {
        // get data for books to display books in html
        $.ajax({
            url: "/api/books",
            method: "GET",
            success: function(data) {
                console.log(data);

                // empty to displaymybooks before adding new content
                $("#displaybooks").empty();
                // if the data is not there, then return an error message
                if (!data) {
                    $("#displaybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        $("#displaybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='requestbookbutton' data-bookid=" + data[i].isbn + ">Request Book</button>" + "</li>");
                    }
                }

                $(".requestbookbutton").on("click", function() {
                    $.ajax({
                        url: "/api/exchanges",
                        method: "POST",
                        data: {
                            BookIsbn: $(this).data("bookid")
                        },
                        success: function() {
                            // Reload the page to get the updated list
                            $.ajax({
                                url: "/api/books",
                                method: "GET",
                                success: function(data) {
                                    $("#displaybooks").empty();
                                    // if the data is not there, then return an error message
                                    if (!data) {
                                        $("#displaybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
                                    }
                                    else {
                                        for (var i = 0; i < data.length; i++) {
                                            $("#displaybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='requestbookbutton' data-bookid=" + data[i].isbn + ">Request Book</button>" + "</li>");
                                        }
                                    }
                                },
                                error: function(xhr, status, error) {
                                    console.log(xhr);
                                    console.log(status);
                                    console.log(error);
                                }
                            });
                        },
                        error: function(xhr, status, error) {
                            console.log(xhr);
                            console.log(status);
                            console.log(error);
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    }

    if ($("#displaymybooks")[0]) {
        // get data for books to display my books in html
        $.ajax({
            url: "/api/books/user",
            method: "GET",
            success: function(data) {
                console.log(data);

                // empty to displaymybooks before adding new content
                $("#displaymybooks").empty();
                // if the data is not there, then return an error message
                if (!data) {
                    $("#displaymybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='removebookbutton' data-bookid=" + data[i].isbn + ">Remove</button>" + "</li>");
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
                            $.ajax({
                                url: "/api/books/user",
                                method: "GET",
                                success: function(data) {
                                    $("#displaymybooks").empty();

                                    if (!data) {
                                        $("#displaymybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
                                    }
                                    else {
                                        for (var i = 0; i < data.length; i++) {
                                            $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='removebookbutton' data-bookid=" + data[i].isbn + ">Remove</button>" + "</li>");
                                        }
                                    }
                                },
                                error: function(xhr, status, error) {
                                    console.log(xhr);
                                    console.log(status);
                                    console.log(error);
                                }
                            });
                        });
                });
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
        // $.ajax("/api/books/user", {
        //     type: "GET"
        // }).then(function(data) {
        //     console.log(data);
        //
        //     // empty to displaymybooks before adding new content
        //     $("#displaymybooks").empty();
        //     // if the data is not there, then return an error message
        //     if (!data) {
        //         $("#displaymybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
        //     }
        //     else {
        //         for (var i = 0; i < data.length; i++) {
        //             $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> " + data[i].title + "  -  " + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "<button class='removebookbutton' data-bookid=" + data[i].isbn + ">Remove</button>" + "</li>");
        //         }
        //     }
        //     $(".removebookbutton").on("click", function(event) {
        //         var id = $(this).data("bookid");
        //         console.log(id);
        //
        //         $.ajax("/api/books/" + id, {
        //             type: "DELETE"
        //         }).then(
        //             function() {
        //                 console.log("deleted book");
        //                 // Reload the page to get the updated list
        //                 location.reload();
        //             });
        //     });
        // });
    }

    if ($("#borrowedBooks")[0]) {
        // get data for books to display my books in html
        $.ajax({
            url: "/api/exchanges/user",
            method: "GET",
            success: function(data) {
                console.log(data);

                // empty to displaymybooks before adding new content
                $("#borrowedBooks").empty();
                // if the data is not there, then return an error message
                if (!data) {
                    $("#borrowedBooks").append("<h2> You haven't borrowed any books. </h2>");
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        $("#borrowedBooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='removebookbutton' data-bookid=" + data[i].id + ">Remove</button>" + "</li>");
                    }
                }
                $(".removebookbutton").on("click", function(event) {
                    var id = $(this).data("bookid");
                    console.log(id);

                    $.ajax("/api/exchanges/" + id, {
                        type: "PUT"
                    }).then(
                        function() {
                            // Reload the page to get the updated list
                            $.ajax({
                                url: "/api/exchanges/user",
                                method: "GET",
                                success: function(data) {
                                    $("#borrowedBooks").empty();
                                    // if the data is not there, then return an error message
                                    if (!data) {
                                        $("#borrowedBooks").append("<h2> You haven't borrowed any books. </h2>");
                                    }
                                    else {
                                        for (var i = 0; i < data.length; i++) {
                                            $("#borrowedBooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-M.jpg'> " + "<h3>" + data[i].title + "</h3><p>" + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "</p>" + "<button class='removebookbutton' data-bookid=" + data[i].id + ">Remove</button>" + "</li>");
                                        }
                                    }
                                },
                                error: function(xhr, status, error) {
                                    console.log(xhr);
                                    console.log(status);
                                    console.log(error);
                                }
                            });
                        });
                });
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
        // $.ajax("/api/books/user", {
        //     type: "GET"
        // }).then(function(data) {
        //     console.log(data);
        //
        //     // empty to displaymybooks before adding new content
        //     $("#displaymybooks").empty();
        //     // if the data is not there, then return an error message
        //     if (!data) {
        //         $("#displaymybooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
        //     }
        //     else {
        //         for (var i = 0; i < data.length; i++) {
        //             $("#displaymybooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> " + data[i].title + "  -  " + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "<button class='removebookbutton' data-bookid=" + data[i].isbn + ">Remove</button>" + "</li>");
        //         }
        //     }
        //     $(".removebookbutton").on("click", function(event) {
        //         var id = $(this).data("bookid");
        //         console.log(id);
        //
        //         $.ajax("/api/books/" + id, {
        //             type: "DELETE"
        //         }).then(
        //             function() {
        //                 console.log("deleted book");
        //                 // Reload the page to get the updated list
        //                 location.reload();
        //             });
        //     });
        // });
    }
});


// i will copy and paste this code into the book display dynamic list once we add isbn column
    // + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> "
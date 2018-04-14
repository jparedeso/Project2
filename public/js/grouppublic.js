$(function() {

    // display all user in a group
    $.get("/api/users", function(data) {
        console.log(data);

        // empty to displaymyusers before adding new content
        $("#groupusers").empty();
        // if the data is not there, then return an error message
        if (!data) {
            $("#groupusers").append("<h2> I'm sorry, there are no users in this group yet. </h2>");
        }
        else {
            for (i = 0; i < data.length; i++) {
                $("#groupusers").append("<li class='userlist'>" + data[i].firstName + " " + data[i].lastName + "<button id='usersbooks' data-eachusersbooks=" + data[i].id + ">See Books</button>" + "<button id='getuseremail' data-useremail=" + data[i].email + ">Contact Member</button>" + "</li>");
            }
        }
    });

    $("#usersbooks").on("click", function(event) { 
        $("#groupusers").append("<div>" + "some function to display user books" + "</div>"); 
    });

    
    // display all books for a group
    $.get("/api/books", function(data) {
        // console.log(data);

        // empty to displaymybooks before adding new content
        $("#allgroupbooks").empty();
        // if the data is not there, then return an error message
        if (!data) {
            $("#allgroupbooks").append("<h2> I'm sorry, but you haven't added any books yet. </h2>");
        }
        else {
            for (i = 0; i < data.length; i++) {
                $("#allgroupbooks").append("<li class='booklist'>" + "<img src='https://covers.openlibrary.org/b/isbn/" + data[i].isbn +"-S.jpg'> " + data[i].title + "  -  " + data[i].author + "  -  " + data[i].year + "  -  " + data[i].category + "<button id='requestbook' data-bookemail=" + data[i].UserId + ">Request Book</button>" + "</li>");
            }
        }
    });
    
});
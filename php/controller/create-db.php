<?php
     require_once(__DIR__ . "/../model/config.php");
     //  You are going back to the directory, to be directed to the model file.

     // we do this to acces the session variable
     $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
      . "id int(11) NOT NULL AUTO_INCREMENT,"
      . "title varchar(255) NOT NULL,"
      . "post text NOT NULL,"
      . "DateTime datetime NOT NULL , "
      . "PRIMARY KEY  (id))");

       
    if($query) {
         echo "Succesfully created table: $posts";
    }
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
        // we do the session var to connect to the connection variable
    }

    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "username varchar(30) NOT NULL,"
        . "email varchar (50) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "PRIMARY KEY (id))");

    if($query) {
        echo "<p> Successfully created table: users</p>";
    }
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }

     // the reason why we are making them all NOT NULL is because we want them all to put out values
     // we make the user name NOT NULL so there is no blank usernames
     // auto increment sets the id number based on the previous one
     // we make it NOT NULL because when we query the database we want to make sure there is an id that is sent
     // the create table is going to be called users because that is where we want to store the users
     // the reason why we are using the session variable is because within our session variable called connction, is where our database conncetion is stored
     // we are running a query on this database.
     // we are creating a table for posts.
     // this is a table that can store all the blog posts and save it on the data base.
     // we gived the id's numerical values
     // we have over a billion id's that we can generate
     // NOT NULL indicates that the blog post can not be empty
     // Auto increment it is going to increment the id numbers and it will handle the id's for us. The actual database handles it for us.    
     // we made a post column, and it can not be empty
     // since we are adding more than one id we need , 
     // Primary Key will let us select info from these posts, it is the way tables are connected to each other.
     // everything has to be set prior to being put in the table.
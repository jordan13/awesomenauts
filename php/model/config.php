<?php
   require_once(__DIR__ . "/Database.php");
   session_start();
   session_regenerate_id(true);
   // session regenerate regenerates the id every time the file is called on
  

   // we need to require once to link this file to the database
   // this one line is the path to all our project files
   // this now says that whenever we use the variable path, we are going to insert that part above
   $path = "/awesomenauts/php/";
   $host  = "localhost";
   $username = "root";
   $password = "root";
   $database = "awesomenauts_db";  
   // right now we are refactoring these variables
   // here in the connection variable we will have acces to the query function, open connection function, and the closed connection function
   // this database object will help us query the database
   if(!isset($_SESSION["connection"])) {
        $connection = new Database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
   // we are using our session and we want to access our session variable in our brackets
   // right now our if statement is checking wether or not our variable has been set or not
   // we add the ! to invert our boolean value
    }
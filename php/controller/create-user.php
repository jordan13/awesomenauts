<?php 
	require_once(__DIR__ . "/../model/config.php");
	// in createpost we sanitize by string, but here we sanitize for the email to sanitize the email
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

    $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

    $hashedPassword = crypt($password, $salt);


    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
       . "username = '$username',"
    	 . "password = '$hashedPassword',"
    	 . "salt = '$salt',"
       . "exp = 0, "
       . "exp1 = 0, "
       . "exp2 = 0, "
       . "exp3 = 0, "
       . "exp4 = 0");

    $_SESSION["name"] = $username;
      

  if($query){
     //Need this for Ajax
     echo "true";
  }else {
  	echo"<p>" . $_SESSION["connection"]->error . "</p>";
  }
// we are telling the crypt function to use the password and salt together

// we are telling it to use huge random numbers to create unique id's

// uniqid creates unique ids for us and makes it random 

// the minimum we should use is 5000 rounds

// we are going to split this up because php reads the $'s as variables'
   
// We are using ajax to call our files on the fly

// ajax is a part of jquery

// we need regular jquery and jquery ui

// we bind the mainmenu in indexphp so when we click it, it starts a function

// ajax is a way for us to update our database

// we set it so that if you register a new user you can go straight to playing
<?php
	require_once(__DIR__ . "/../model/config.php");
	
	$array = array (
		'exp' => '',
		'exp1' => '',
		'exp2' => '',
		'exp3' => '',
		'exp4' => '',
     );


	// this gives us access to our data base
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	// we put input post because our method is from post
	$password = filter_input (INPUT_POST, "password", FILTER_SANITIZE_STRING);
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
	// we are selecting our salt and our password from our users table where our username is the username that was sent in via the post
	if($query->num_rows == 1) {
		//num rows checks wether or not the rows are equal to 1	
		$row = $query->fetch_array();
		// we have to fetch the array stored in the quary var

		if($row["password"] === crypt($password, $row["salt"])) {
      		$_SESSION["authenticated"] = true;
      		$array["exp"] = $row["exp"];
      		$array["exp1"] = $row["exp1"];
      		$array["exp2"] = $row["exp2"];
      		$array["exp3"] = $row["exp3"];
      		$array["exp4"] = $row["exp4"];
    		$_SESSION["name"] = $username;
      		echo json_encode($array);
		}else {
			echo "Invalid username and password";
		}
	}else {
		echo "Invalid username and password";
	}
// we are editing our php code from the blog

// we are building an array in login-user.php

// an array is a series of objects

// $row is our users experience

// json lets us echo an array as a statement

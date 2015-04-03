<?php
	require_once(__DIR__ . "/../model/config.php");
	
	unset($_SESSION["authenticated"]);
   // this is the user login function
  

    session_destroy();
    // this will insure that our session has been safely clean and no info is left behind
    header("Location: " . $path . "index.php");


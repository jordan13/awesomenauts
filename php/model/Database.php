<?php
    class Database {
// when we set this to private it means we can only access this variable in this file
		private $connection;
		private $host;
		private $username;
		private $password;
		private $database;
		public $error;
// the reason the error file is public is so we can access it
// we have created instance variables and global variables, we have also set the visibility
// we wont be able to access these variables in any other file, only in these classes
// this way when we create a new object, these variables are hidden and nobody else can access them and modify them
// adding these classes makes the code easier to maintiain and easier to read
        

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        
        $this->connection = new mysqli($host, $username, $password);
    //  these variables are what you are checking for to have a succesful connection for.
    if($this->connection->connect_error) {
  	    die("<php>Error: " . $this->connection->connect_error . "</php>");
  	    // Checking for connection, and lets you know if there was an error
  	    // If there was an error the program will "die" or stop running
 	}
  
    $exists = $this->connection->select_db($database);
    // we are trying to select the databse
    // $exists is the variable we want to use in our if, else statement.
    // we add the !, because we are telling it that it does not exist.
    // the exclamation point inverts the true to false
    
    if(!$exists) {
    // we are checking wether or not we were able to connect to that data base
           $query = $this->connection->query("CREATE DATABASE $database");
           // query's are basically questions, you send questions or commands to the database,
           // we are using SQL language in the parenthesis
           // normally the action words will be in upper case
           // php will encounter the variable and it will see that this is a variable and will substitute the text
           //  this query will be executed, and will say true if it was successful and false if it was not
    if ($query) {
        // we are doing this becuase we want to output a message
            echo "<p> Succesfully created database: " . $database . "</php>"; 
              // we create this sentence and we use the dot operator to concatenate the databse
        }

    }

     else {
     	echo "<p>Database has already been created.</p>";
     	// lets you know that data base has been created and exists
      }
    
    }
    // the reason why the functions are public, is so you can access it in any file
    // we are putting all the info from the database to the construct function
    // the "this" variable is accessing the host variable up above with the private
    // we are joining all of these functions together

     public function openConnection() { 
     	// the only thing open connection has to do is it needs to create a new my sqli object and it checks if there is a connection error
        // the only thing going on in open connection is we are only checking for a connection going on.
        // if there is an error it will exit the program and let us know what the error is 
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
     
        if ($this->connection->connect_error) {
  	         die("<p>Error: " . $this->connection->connect_error . "</php>"); 
  	    }
     }

     public function closeConnection() {
      // the whole purpose of this function is to close the connection that we opened up above in the open connection
      // the reason we are doing this is because we want to make sure we can open the connection first and if there is no connection the program will then close  
      // we are checking if the variable is set, it is checking whether or not there is info set in the varianble
      // it will retrun as NULL if there is no info in the connection 
      // we now close the connection at the end 
         if(isset ($this->connection))  {
             $this->connection->close();
         }
     }

     public function query($string) {
         // this line of code below is calling on the openConnection function
         $this->openConnection();

         $query = $this->connection->query($string);
         // we use the arrow notation again because we need to access the query function
         // we have now refactored the code and placed it here with a variable and we are using the query function
         // we will now close our connection
         // this is checking wether or not this query is true or false
         // if it is false we want the error
         if(!$query) {
             $this->error = $this->connection->error;
         }

         $this->closeConnection();

     return $query;
         // we are returning the variable query because we want to know if it is true or false
       }
     }
 
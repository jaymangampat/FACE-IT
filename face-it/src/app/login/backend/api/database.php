<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the login form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the submitted username and password
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Perform a query to check if the user exists
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // User authenticated successfully
        // Redirect the user to the desired page or perform any other actions
        echo "Login successful!";
    } else {
        // Invalid username or password
        echo "Invalid credentials!";
    }
}

// Close the database connection
$conn->close();
?>

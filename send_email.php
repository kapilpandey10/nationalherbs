<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract form data
    $name = $_POST['name'];
    $address = $_POST['address'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Sender and recipient email addresses
    $to = "kapilpandey2068@gmail.com"; // Recipient email address
    $from = $email; // Sender's email address

    // Email headers
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email content
    $email_message = "Name: $name<br>";
    $email_message .= "Address: $address<br>";
    $email_message .= "Email: $email<br>";
    $email_message .= "Phone: $phone<br>";
    $email_message .= "Subject: $subject<br>";
    $email_message .= "Message: $message<br>";

    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "Mail Sent. Thank you $name, we will contact you shortly.";
        // Redirect to a thank you page
        // header('Location: thank_you.php');
        exit; // Stop further execution
    } else {
        echo "Failed to send email. Please try again later.";
    }
}
?>

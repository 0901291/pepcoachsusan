<?php
session_start();

//print_r(json_encode($_POST));
//die();

if(empty($_POST) || empty($_POST['form_token']) || empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
  $response = array(
    'code' => 400,
    'message' => 'Vul a.u.b. alle verplichte (*) velden in.',
    'success' => false,
    'status' => 1
  );
  returnResponse();
}

if(empty($_SESSION['form_tokens']) || empty($_POST['form_token']) || !in_array($_POST['form_token'], $_SESSION['form_tokens'])) {
  $response = array(
    'code' => 403,
    'message' => 'Er is iets fout gegaan...',
    'success' => false,
    'status' => 2
  );
  returnResponse();
}

if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $response = array(
    'code' => 400,
    'message' => 'Vul a.u.b. een geldig e-mailadres in.',
    'success' => false,
    'status' => 4
  );
  returnResponse();
}

$to = 'ianwensink@gmail.com';
$subject = 'Contactformulier www.pepcoachsusan.nl door '.$_POST['name'];
$message = '<div>
                <img style="display:inline-block;vertical-align:middle;" width="100" height="100" src="http://'.$_SERVER['HTTP_HOST'].'/img/logo-def-pepcoach.png">
                <h1 style="display:inline-block;vertical-align:middle;padding-left:16px;">Contactformulier www.pepcoachsusan.nl</h1>
            </div>
            <p>Zojuist is het contactformulier op www.pepcoachsusan.nl verstuurd. Hieronder vind je de gegevens:</p>
            <table>
                <tr>
                    <td>Naam:</td>
                    <td>'.$_POST['name'].'</td>
                </tr>
                <tr>
                    <td>E-mailadres:</td>
                    <td>'.$_POST['email'].'</td>
                </tr>
                <tr>
                    <td>Bericht:</td>
                    <td>'.$_POST['message'].'</td>
                </tr>
                <tr>
                    <td>Tijdstip:</td>
                    <td>'.date('H:i d-m-Y').'</td>
                </tr>
            </table>';

$headers = "From: " . strip_tags($_POST['email']) . "\r\n";
$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if(mail($to, $subject, $message, $headers)) {
  $response = array(
    'code' => 200,
    'message' => 'Het formulier is succesvol verzonden! Ik zal zo snel mogelijk contact met u opnemen.',
    'success' => true,
    'status' => 6
  );
  unset($_SESSION['form_tokens']);
  returnResponse();
}

returnResponse(true);

function returnResponse($fatal = false) {
  global $response;
  if($fatal) {
    $response = array(
      'code' => 500,
      'success' => false,
      'message' => 'Er is iets fout gegaan...',
      'status' => 3
    );
  }
  http_response_code($response['code']);
  header('Content-type: application/json');
  if(empty($_POST['ajax']) || !$_POST['ajax']) {
    $_SESSION['show_message'] = TRUE;
    $_SESSION['message'] = $response['message'];
    $_SESSION['data'] = $_POST;
    $_SESSION['success'] = $response['status'] === 6;
    header('Location: /#contact');
  }
  print_r(json_encode($response));
  die();
}

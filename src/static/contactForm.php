<?php
session_start();

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

$post_name = htmlspecialchars(strip_tags($_POST['name']));
$post_email = htmlspecialchars(strip_tags($_POST['email']));
$post_message = htmlspecialchars(strip_tags($_POST['message']));

if(!filter_var($post_email, FILTER_VALIDATE_EMAIL)) {
  $response = array(
    'code' => 400,
    'message' => 'Vul a.u.b. een geldig e-mailadres in.',
    'success' => false,
    'status' => 4
  );
  returnResponse();
}

$to = 'info@pepcoachsusan.nl';
$subject_susan = 'Contactformulier www.pepcoachsusan.nl door '.$post_name;
$subject_visitor = 'Bevestiging ingevuld contactformulier www.pepcoachsusan.nl';
$mail_text_susan = 'Zojuist is het contactformulier op www.pepcoachsusan.nl verstuurd. Hieronder vind je de gegevens:';
$mail_text_visitor = 'Zojuist heeft u het contactformulier op www.pepcoachsusan.nl ingevuld. Deze is succesvol ontvangen. Ik zal zo spoedig mogelijk contact met u opnemen. Hieronder vind u de gegevens zoals deze zijn ingevuld.';
$mail_susan = mail_text($mail_text_susan);
$mail_visitor = mail_text($mail_text_visitor);

function mail_text($mail_text = '') {
  global $post_name, $post_email, $post_message;
  return   '<div>
                <img style="display:inline-block;vertical-align:middle;" width="100" height="100" src="http://'.$_SERVER['HTTP_HOST'].'/img/logo-def-pepcoach.png">
                <h1 style="display:inline-block;vertical-align:middle;padding-left:16px;">Contactformulier www.pepcoachsusan.nl</h1>
            </div>
            <p>'.$mail_text.'</p>
            <table>
                <tr>
                    <td>Naam:</td>
                    <td>'.$post_name.'</td>
                </tr>
                <tr>
                    <td>E-mailadres:</td>
                    <td>'.$post_email.'</td>
                </tr>
                <tr>
                    <td>Bericht:</td>
                    <td>'.$post_message.'</td>
                </tr>
                <tr>
                    <td>Tijdstip:</td>
                    <td>'.date('H:i d-m-Y').'</td>
                </tr>
            </table>';
}

$headers_susan = "From: " . $post_name . " <info@pepcoachsusan.nl>\r\n";
$headers_susan .= "Reply-To: " . $post_name . " <" . $post_email . ">\r\n";
$headers_susan .= "MIME-Version: 1.0\r\n";
$headers_susan .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers_susan .= 'X-Mailer: PHP/' . phpversion();

$headers_visitor = "From: PEP coach <info@pepcoachsusan.nl>\r\n";
$headers_visitor .= "Reply-To: PEP coach <info@pepcoachsusan.nl>\r\n";
$headers_visitor .= "MIME-Version: 1.0\r\n";
$headers_visitor .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers_visitor .= 'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject_susan, $mail_susan, $headers_susan) && mail($post_email, $subject_visitor, $mail_visitor, $headers_visitor)) {
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

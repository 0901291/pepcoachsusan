<?php
session_start();

$form_token = md5(uniqid(rand(), true));
if(!isset($_SESSION['form_tokens']) || !is_array($_SESSION['form_tokens'])) {
  $_SESSION['form_tokens'] = array();
}
$_SESSION['form_tokens'][] = $form_token;

$show_form_message = !empty($_SESSION['show_message']) && $_SESSION['show_message'] && !empty($_SESSION['message']);

$form_message = '';
$form_data = array();
if($show_form_message) {
  $form_message = $_SESSION['message'];
  $form_data = $_SESSION['data'];
  unset($_SESSION['show_message']);
  unset($_SESSION['status']);
  unset($_SESSION['data']);
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welkom | PEP coach</title>
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  <link href="favicon.ico" rel="shortcut icon">
</head>
<body class="nav-hidden">
<div class="body-innerwrapper">
  <header id="header">
    <div class="header-inner container">
      <div class="row">
        <div class="col-xs-12 col-md-8 col-lg-7 main-menu-container">
          <ul class="main-menu">
            <li id="home-link">
              <a href="#home">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#aanbod">
                <span>Aanbod</span>
              </a>
            </li>
            <li>
              <a href="#werkwijze">
                <span>Werkwijze</span>
              </a>
            </li>
            <li>
              <a href="#pepcoach">
                <span>PEP coach</span>
              </a>
            </li>
            <li>
              <a href="#ervaringen">
                <span>Ervaringen</span>
              </a>
            </li>
            <li>
              <a href="#contact">
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-xs-10 col-md-4 col-lg-5 logo-container">
          <div class="circle">
            <div class="arc__container">
              <div class="arc__q arc__q--1"></div>
              <div class="arc__q arc__q--2"></div>
              <div class="arc__q arc__q--3"></div>
              <div class="arc__q arc__q--4"></div>
              <div class="arc__cover"></div>
            </div>
          </div>
          <div class="slogan-logo">Coaching, begeleiding en advies in het onderwijs</div>
        </div>
        <div id="nav-trigger-container" class="col-xs-2 visible-xs visible-sm">
          <div id="nav-trigger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main id="main">
    <section id="home" class="page">
      <div class="container">
        <div class="container--inner">
          <div id="picture-header">
            <div id="picture-header-inner">
              <img src="img/susan-intro-picture.JPG" alt="Introductiefoto van Susan Pepping, eigenaar PEP coach"/>
              <blockquote class="home-intro home-intro--mobile visible-xs-block">Coaching, begeleiding en advies in het
                onderwijs</blockquote>
              <blockquote class="home-intro home-intro--desktop hidden-xs">“Met PEP coach richt ik mij op jongeren met extra ondersteuningsbehoeften
                op alle niveaus in het voorgezet- en middelbaar beroepsonderwijs en op professionals
                die handelingsverlegenheid ervaren in de leerlingbegeleiding.”
                <cite>Susan Pepping, eigenaar PEP coach</cite>
              </blockquote>
            </div>
          </div>
          <div class="container--content">
            <div class="row">
              <div class="col center col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Coaching</h2>
                </div>
                <p>Ik coach jongeren met extra ondersteuningsbehoeften op alle niveaus in het voorgezet- en middelbaar beroepsonderwijs.</p>
              </div>
              <div class="col center col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Begeleiding</h2>
                </div>
                <p>Ik geef begeleiding aan professionals om het onderwijs voor alle jongeren zo toegankelijk mogelijk te maken en jongeren te stimuleren het beste uit zich zelf te halen.</p>
              </div>
              <div class="col center col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Advies</h2>
                </div>
                <p>Ik geef advies aan professionals die handelingsverlegenheid ervaren in de leerlingbegeleiding.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="aanbod" class="page">
      <div class="container">
        <div class="container--inner">
          <h1>Aanbod</h1>
          <div class="container--content">
            <p class="intro-paragraph">Naast coaching, begeleiding en advies ben ik te benaderen voor een opdracht als workshopleider, trainer of docent. Alle genoemde mogelijkheden zijn voorbeelden en in overleg verzorg ik een aanbod op maat.</p>
            <div class="row">
              <div class="col center  col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Coaching</h2>
                </div>
                <p>Workshops die ik kan verzorgen gaan bijvoorbeeld over studiekeuze, solliciteren,
                  verbale en non-verbale communicatie.</p>
              </div>
              <div class="col center col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Trainer</h2>
                </div>
                <p>Ik ben een gecertificeerd Empowerment trainer en maak gebruik van de Vrijbaan
                  methode. Daarnaast kan ik een training op maat verzorgen voor docenten(teams).</p>
              </div>
              <div class="col center col-xs-12 col-sm-4">
                <div class="col--header">
                  <img class="col--icon" src="img/logo-def-pepcoach.png" alt=""/>
                  <h2 class="col--heading">Docent</h2>
                </div>
                <p>Als docent sta ik ingeschreven in het lerarenregister. Ik bevoegd om in het MBO, VMBO, PRO en (V)SO lessen te verzorgen in
                  het vakgebied omgangskunde.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="werkwijze" class="page">
      <div class="container">
        <div class="container--inner">
          <h1>Werkwijze</h1>
          <div class="container--content">
            <div class="row">
              <div class="col-xs-12 col-sm-7">
                <p>Mijn denk- en werkwijze is <strong class="dif">oplossingsgericht</strong>. Door de
                  juiste vragen te stellen help ik de jongere <span class="dif">zelf</span> na te
                  denken over de <span class="dif">gewenste situatie</span>. Ik ondersteun de jongere
                  in het formuleren van doelen waar in <span class="dif">haalbare stappen</span> naar
                  toe gewerkt gaat worden.</p>
                <p>Uiteraard maken we een analyse van de oorzaken van problemen, maar dit staat niet
                  centraal. Des te meer ben ik geïnteresseerd in <span
                    class="dif">succeservaringen</span>, uitzonderingen m.b.t. de problemen,
                  mogelijkheden en de eigen kracht van de jongere, zodat er <span class="dif">verder gebouwd</span>
                  kan worden op datgene wat er (al) goed gaat.</p>
                <p>Naast deze oplossingsgerichte werkwijze ben ik ervaren in het toepassen van <span
                    class="dif">diverse andere methoden</span> en technieken en beschik ik over een
                  <span class="dif">breed scala</span> aan <span
                    class="dif">gespreksvaardigheden</span>.</p>
              </div>
              <div class="col-xs-12 col-sm-5">
                <img class="rounded-corners" src="img/gewenstesituatie-optimised.jpg" title="Op een schaal van 1 tot 10, welke stap zet jij?" alt="Op een schaal van 1 tot 10, welke stap zet jij?"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="pepcoach" class="page">
      <div class="container">
        <div class="container--inner">
          <h1>PEP coach</h1>
          <div class="container--content">
            <p class="intro-paragraph">PEP coach is de onderneming van Susan Pepping. PEP coach heeft de
              passie om het onderwijs voor alle jongeren zo toegankelijk mogelijk te maken, jongeren
              te ondersteunen in het succesvol doorlopen van hun studie en jongeren te stimuleren het
              beste uit zichzelf te halen. Dit doet PEP coach door het bieden van oplossingsgerichte
              coaching, begeleiding en advies op maat.</p>
            <div class="row">
              <div class="col-xs-12 col-sm-5">
                <h3 class="col--heading">Wie is PEP coach?</h3>
                <div id="definition">
                  <h4>Betekenis '<strong>PEP</strong> coach'</h4>
                  <p>
                    <strong>PEP</strong>•coach [<em class="pronunciation">p</em><em><span class="pronunciation">εpkotʃ</span></em>] <em>zelfst. naamw.</em>
                  </p>
                  <p>
                    <em>(de; m,v;</em> meervoud: <em><strong>PEP</strong> coaches</em>)
                  </p>
                  <ol>
                    <li>Onderneming van Susan <strong>PEP</strong>ping</li>
                    <li>Iemand die jongeren, professionals en betrokkenen oplossingsgericht coacht,
                      begeleidt en adviseert
                    </li>
                  </ol>
                  <p>
                    <strong>PEP</strong> coachen <em>(<strong>PEP</strong> coachte, heeft, is ge<strong>PEP</strong>coacht)</em>
                  </p>
                  <ol>
                    <li>Op<strong>PEP</strong>pen</li>
                    <li><strong>PEP</strong>-talk</li>
                  </ol>
                </div>
              </div>
              <div class="col-xs-12 col-sm-7">
                <h3 class="col--heading">Wie is Susan Pepping?</h3>
                <picture>
                  <source media="(min-width: 1200px)"
                          srcset="img/susan-wordcloud-large.png" />
                  <source media="(max-width: 767px)"
                          srcset="img/susan-wordcloud-small.png" />
                  <img src="img/susan-wordcloud-medium.png" alt="Wie is Susan Pepping? Woorden die mij omschrijven" title="Wie is Susan Pepping? Woorden die mij omschrijven" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="ervaringen" class="page reviews">
      <div class="container">
        <div class="container--inner">
          <h1>Ervaringen</h1>
          <div class="container--content">
            <div class="reviews">
              <div class="reviews__nav"></div>
              <ul class="reviews-container">
                <li>
                  <blockquote>
                    "Susan helpt mij met het plannen van mijn studie. Iedere week maken wij een to-do-list en zij herinnert mij aan de dingen die ik moet doen."
                  </blockquote>
                  <cite>Student MBO niveau 4</cite>
                </li>
                <li>
                  <blockquote>
                    "Susan is er voor mij als ik haar nodig heb. Ik kan haar altijd WhatsAppen, ook in het weekend en ’s avonds."
                  </blockquote>
                  <cite>Student MBO niveau 2</cite>
                </li>
                <li>
                  <blockquote>
                    "Het heeft mij geholpen om iemand te hebben om mijn verhaal tegen te doen en daardoor alles op een rijtje te krijgen."
                  </blockquote>
                  <cite>Student MBO niveau 4</cite>
                </li>
                <li>
                  <blockquote>
                    "Ik heb de samenwerking met Susan Pepping als zeer prettig ervaren. Susan is een ambulant begeleider die oog heeft voor de behoeften van de studenten die ze begeleid. Ze is gedreven en gaat zorgvuldig om met studenten. Als docent houd Susan je goed op de hoogte, krijg je accurate verslaglegging en is er altijd ruimte voor een gesprek."
                  </blockquote>
                  <cite>Docent ROC Midden Nederland</cite>
                </li>
                <li>
                  <blockquote>
                    "Susan zet studenten in hun kracht en zij is in staat om in haalbare stappen met een student naar een (eind-)doel te werken. Dit zorgt er voor dat de student een succeservaring opdoet en kan groeien in zelfverzekerd zijn."
                  </blockquote>
                  <cite>Docent ROC Midden Nederland</cite>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" class="page">
      <div class="container">
        <div class="container--inner">
          <h1>Contact</h1>
          <div class="container--content">
            <div class="row">
              <div id="contact-form" class="col-xs-12 col-sm-4">
                <p>Heeft u een vraag, een opmerking of wilt u een compliment geven? Wilt u meer weten over het aanbod van PEP coach of over de tarieven? Neem dan via het contactformulier of telefonisch contact met mij op.</p>
                <div id="contact-form--message" class="message<?php echo $show_form_message ? ($_SESSION['success'] ? ' success' : ' error') : ' hidden'; ?>">
                  <?php echo $form_message; ?>
                </div>
                <form id="contact-form--form" action="contactForm.php" method="post" class="<?php echo $show_form_message && $_SESSION['success'] ? ' hidden' : ''; ?>">
                  <div class="fieldset">
                    <label for="name">
                      <span class="required">Naam</span>
                      <span class="error-message" id="error-message--name"></span>
                    </label>
                    <input required type="text" id="name" name="name" value="<?php echo $show_form_message && !empty($form_data['name']) ? $form_data['name'] : ''; ?>">
                  </div>
                  <div class="fieldset">
                    <label for="email">
                      <span class="required">E-mailadres</span>
                      <span class="error-message" id="error-message--email"></span>
                    </label>
                    <input required type="email" id="email" name="email" value="<?php echo $show_form_message && !empty($form_data['email']) ? $form_data['email'] : ''; ?>">
                  </div>
                  <div class="fieldset">
                    <label for="message">
                      <span class="required">Bericht</span>
                      <span class="error-message" id="error-message--message"></span>
                    </label>
                    <textarea required id="message" name="message" rows="4"><?php echo $show_form_message && !empty($form_data['message']) ? $form_data['message'] : ''; ?></textarea>
                  </div>
                  <input type="hidden" name="form_token" value="<?php print $form_token ?>">
                  <div class="text-center">
                    <input class="btn btn--primary" type="submit" value="Verzenden">
                  </div>
                </form>
              </div>
              <div id="contact-picture" class="col-xs-12 col-sm-4">
                <img class="rounded-corners" src="img/susan-business-card-cropped.jpg" alt=""/>
              </div>
              <div id="contact-details" class="col-xs-12 col-sm-4">
                <p class="has-icon">
                  <svg class="svg-icon icon">
                    <use xlink:href="#phone"></use>
                  </svg>
                  <span class="text">06-12713919</span>
                </p>
                <p class="has-icon">
                  <svg class="svg-icon icon">
                    <use xlink:href="#mail"></use>
                  </svg>
                  <span class="text">info<span class="__AT_">   </span>pepcoachsusan.nl</span>
                </p>
                <p class="has-icon">
                  <svg class="svg-icon icon">
                    <use xlink:href="#linkedin-box"></use>
                  </svg>
                  <a class="text" href="http://nl.linkedin.com/in/susanpepping" target="_blank">LinkedIn</a>
                </p>
                <p>&nbsp;</p>
                <p>KvK-nummer: 61471070</p>
                <p>IBAN: NL14 RABO 0191 9001 41</p>
                <p>BTW nummer: NL 024994662B01 <br/>(voor
                  onderwijsactiviteiten factureer ik BTW vrij)</p>
                <p>
                  <a class="quality-mark" href="http://www.crkbo.nl/" title="CRKBO keurmerk" target="_blank">
                    <img src="img/CRKBO_Docent.jpg" alt="CRKBO keurmerk"/>
                  </a>
                  <a class="quality-mark" href="img/Certificaat-certificering-ambulant.pdf" title="Certificaat certificering ambulant begeleider" target="_blank">
                    <img src="img/logo_LBBO.png" alt="Certificaat certificering ambulant begeleider"/>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer class="footer">
    <div class="container">
      <p>
        <span class="footer--item">&copy; <?php print date('Y'); ?> PEP&nbsp;coach</span><span class="footer--item">06-12713919</span><span class="footer--item">info<span class="__AT_">   </span>pepcoachsusan.nl</span><span class="footer--item">All&nbsp;rights&nbsp;reserved</span><span class="footer--item"><a target="_blank" href="/img/Algemene-voorwaarden.pdf">Algemene&nbsp;Voorwaarden</a></span>
      </p>
    </div>
  </footer>
</div>
<link rel="stylesheet" href="index.css" media="none" onload="if(media!='all')media='all'">
<noscript><link rel="stylesheet" href="index.css"></noscript>
<script async src="index.js"></script>
</body>
</html>
<!-- LAST UPDATED 09/04/2016 -->

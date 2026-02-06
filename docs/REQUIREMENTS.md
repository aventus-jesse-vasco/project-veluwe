**Requirements**

**Veluwe**

<div class="joplin-table-wrapper"><table><tbody><tr><th><p><strong>Projectnaam:</strong></p></th><th><p>Veluwe</p></th></tr><tr><td><p><strong>Datum:</strong></p></td><td><p>06-02-2026</p></td></tr><tr><td><p><strong>Auteur:</strong></p></td><td><p>Jesse Nieuwenhuis, Vasco Smith</p></td></tr><tr><td><p><strong>Teamleden:</strong></p></td><td><ol><li>Vasco Smith</li><li>Jesse Nieuwenhuis</li></ol></td></tr><tr><td><p><strong>Opdrachtgever:</strong></p></td><td><p>Gemeente Apeldoorn</p></td></tr><tr><td><p><strong>Doorlooptijd</strong></p></td><td><p>Van: 06-02-2026 tot 10-04-2026</p></td></tr></tbody></table></div>

# Algemeen

## Probleemstelling

De Gemeente Apeldoorn beschikt over hoogwaardige (pre)historische schoolplaten die de archeologie en geschiedenis van de Veluwe visualiseren. Deze schoolplaten zijn momenteel alleen in statische vorm beschikbaar (digitaal of geprint), waardoor het potentieel voor interactieve en educatieve beleving niet volledig wordt benut. Jongeren in het basis- en voortgezet onderwijs hebben behoefte aan een meer engaging en interactieve manier om kennis te maken met het cultureel erfgoed van de Veluwe. De huidige vorm biedt onvoldoende mogelijkheden voor actieve participatie, spelenderwijs leren en diepgaande verkenning van de historische verhaallijnen.

## Doelstelling

De opdrachtgever wil de schoolplaat "De eerste boeren en hun grafheuvelritueel" transformeren naar een interactieve digitale toepassing die:

- De archeologie en geschiedenis van de Veluwe beleefbaar maakt voor inwoners, met name leerlingen in het basis- en voortgezet onderwijs
- Toegankelijk is op verschillende platforms (webapplicatie, digibord, digitale activiteitentafels)
- Alle 10 verhaallijnen op een speelse en educatieve manier presenteert
- Minimaal 3 verhaallijnen volledig uitwerkt met interactieve elementen zoals spelletjes, filmpjes en informatiekaders
- Dient als pilot voor de digitalisering van de overige schoolplaten over de Veluwe

## Leerdoelen van het team

- Beter begrijppen hoe laravel en andere frameworks om laravel heen werken
- Kennis opdoen over cultureel erfgoed en historische educatie
- Samenwerken met een externe opdrachtgever(gemeente)
- Algemene vaardigheden en designs maken

# Product requirements

## Deliverables

- Werkbare interactieve applicatie (web, digibord, activiteitentafel)
- Minimaal 3 volledig uitgewerkte verhaallijnen met interactieve elementen
- Technische documentatie en gebruikershandleiding
- Broncode in Git repository
- Presentatie eindproduct aan opdrachtgever

## Overzicht van functionaliteiten

**1\. Epic: Platformonafhankelijke basis**

1.1. Als gebruiker kan ik de applicatie openen in een webbrowser zodat ik geen software hoef te installeren (Must have)

1.2. Als gebruiker kan ik de applicatie gebruiken op een digibord zodat ik het in de klas kan inzetten (Must have)

1.3. Als gebruiker kan ik de applicatie bedienen met touch-input zodat het intuïtief werkt (Must have)

**2\. Epic: Hoofdnavigatie**

2.1. Als gebruiker zie ik de schoolplaat met klikbare hotspots zodat ik verhaallijnen kan selecteren (Must have)

2.2. Als gebruiker kan ik terugkeren naar het hoofdmenu zodat ik tussen verhaallijnen kan schakelen (Must have)

**3\. Epic: Verhaallijn 1 - De grafheuvel**

3.1. Als leerling kan ik een interactieve animatie zien van het bouwen van een grafheuvel zodat ik begrijp hoe deze ontstond (Must have)

3.2. Als leerling kan ik een spel spelen met voorwerpen uit grafheuvels zodat ik deze leuk kan leren kennen (Should have)

3.3. Als leerling kan ik achtergrondinformatie lezen over grafheuvels zodat ik de context begrijp (Must have)

**4\. Epic: Verhaallijn 2 - Grafrituelen**

4.1. Als leerling kan ik een interactief verhaal volgen over een begrafenisceremonie zodat ik de rituelen begrijp (Must have)

4.2. Als leerling kan ik een quiz maken over grafrituelen zodat ik mijn kennis kan testen (Should have)

**5\. Epic: Verhaallijn 3 - Kleding**

5.1. Als leerling kan ik een dress-up game spelen met historische kledingstukken zodat ik spelenderwijs leer (Must have)

5.2. Als leerling kan ik informatie lezen over materialen en technieken zodat ik begrijp hoe kleding gemaakt werd (Must have)

**6\. Epic: Overige verhaallijnen (toekomstig)**

6.1. Als beheerder zie ik placeholders voor de 7 resterende verhaallijnen zodat uitbreiding mogelijk is (Should have)

## Overige eisen en wensen

**Technische eisen:**

- Responsive design
- Touch-optimized interface
- Laadtijd maximaal 5 seconden
- Cross-browser compatibiliteit

**Gebruiksvriendelijkheid:**

- Toegankelijk voor leeftijd 8-14 jaar
- Taalgebruik Nederlands
- Duidelijke visuele feedback bij interacties

**Content eisen:**

- Inhoudelijk correcte informatie
- Gebruik van de hoogwaardige schoolplaat als centraal element
- Alle 10 verhaallijnen aanwezig

## Out-of-scope

- Volledige uitwerking van alle 10 verhaallijnen
- Native mobiele apps
- Content Management System
- Gebruikersaccounts en voortgangsregistratie
- Meertalige ondersteuning
- AR/VR
- Hosting en onderhoud na oplevering

# Projectmanagement

**Scrumboard:** _GitHub Projects_

**Git repository:** _GitHub_

**Communicatie:**

- E-mail met opdrachtgever Masja Parlevliet en Janneke Zuyderwyk
- _Discord voor intern teamoverleg_

**Documentatie:** _Word_

**Design:** _Figma_

**Planning:** _Word_

**Definition of Done**

Een user story is Done wanneer:

**Functioneel:**

- Alle acceptatiecriteria zijn geïmplementeerd en getest
- De functionaliteit werkt op alle drie de platforms (web, digibord, activiteitentafel)
- Touch-interactie werkt correct en responsief

**Technisch:**

- Code is gereviewed door minimaal één teamlid
- Code voldoet aan de afgesproken coding standards
- Unit tests zijn geschreven en slagen (indien van toepassing)
- Er zijn geen kritieke bugs of errors
- Code is gecommit naar de Git repository met duidelijke commit message

**Kwaliteit:**

- De functionaliteit is getest door minimaal twee teamleden
- De functionaliteit is getest met een gebruiker uit de doelgroep (indien mogelijk)
- De interface is gebruiksvriendelijk en intuïtief
- Teksten zijn gecontroleerd op spelling en grammatica
- Inhoudelijke correctheid is gevalideerd (eventueel met opdrachtgever)

**Documentatie:**

- Technische documentatie is bijgewerkt
- Gebruikersinstructies zijn toegevoegd (indien nodig)
- Wijzigingen zijn gedocumenteerd in de release notes

**Opdrachtgever:**

- Demo is gegeven aan product owner/opdrachtgever (bij relevante stories)
- Feedback van opdrachtgever is verwerkt

**Definition of Fun**

**Werkafspraken team:**

- We communiceren open en respectvol met elkaar
- We helpen elkaar bij problemen en vieren successen samen
- We houden ons aan afgesproken deadlines en sprint commitments
- Bij verhindering geven we minimaal 24 uur van tevoren door
- We komen voorbereid naar meetings en standups

**Samenwerking:**

- Daily standup van maximaal 15 minuten aan het begin van elke werkdag
- Sprint planning aan het begin van elke sprint (tweewekelijks)
- Sprint review en retrospective aan het einde van elke sprint
- Pair programming bij complexe functionaliteit
- Code reviews binnen 24 uur na pull request

**Werkomgeving:**

- We zorgen voor een positieve en gemotiveerde werksfeer
- Pauzes nemen we samen om team cohesie te bevorderen
- We spelen regelmatig de applicatie zelf om gemotiveerd te blijven
- Muziek tijdens programmeren is toegestaan met koptelefoon

**Experimenten en leren:**

- We durven nieuwe technologieën uit te proberen
- Fouten maken mag, daar leren we van
- We delen kennis met elkaar (knowledge sharing sessies)
- We vragen om hulp wanneer we meer dan 30 minuten vastlopen

**Work-life balance:**

- We respecteren elkaars tijd buiten schooluren
- Overwerk is uitzondering, niet regel
- We plannen realistisch en communiceren tijdig over capaciteit

**Vragen en antwoorden**

Hoe moet het eruitzien?

Moet het toegankelijk zijn?

Hoeveel pagina's zijn er nodig?

Welke kleurensamenstelling gebruiken we?
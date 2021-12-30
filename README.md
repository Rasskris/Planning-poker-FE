# Planning Poker

<p>Planning poker, also known as “scrum poker” and “pointing poker”, is a gamified technique that development teams use to estimate the effort of project management tasks.</p>

<p>
 <img width="600" alt="Dealer start game" src="https://user-images.githubusercontent.com/62946911/147386311-e47d3e80-6255-4e2b-9590-bcb906d19e3b.gif">
 <img width="600" alt="Round started" src="https://user-images.githubusercontent.com/62946911/147386390-da6389ef-dcfc-4082-9599-c0f89bed5b2a.gif">
</p>

:link: [Back-end repository](https://github.com/Rasskris/Planning-Poker-BE)

:link: [Deploy](https://pp-fe.herokuapp.com/)

## Tech stack

<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="30" height="30"/> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="30" height="30"/> 
  <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="30" height="30"/> 
  <img src="https://user-images.githubusercontent.com/62946911/147670564-f2c8bf84-c543-4981-b7e4-9a41ba60ecc7.png" alt="socket-io" width="30" height="30"/>
  <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="30" height="30"/>
</p>

## App overview

**User can have one of the three roles**

<table>
  <tr>
    <th></th>
    <th>Dealer</th>
    <th>Player</th>
    <th>Observer</th>
  </tr>
  <tr align="center">
    <td align="left">Setting up the game session</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>
  <tr align="center">
    <td align="left">Kick teammates without vote</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>
  <tr align="center">
    <td align="left">Open vote to kick teammates</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>
  <tr align="center">
    <td align="left">Create/delete issue card</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>
   <tr align="center">
    <td align="left">Admit/reject newcomer after start game</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
   </tr>
   <tr align="center">
    <td align="left">Read/send chat messages</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
   </tr>
   <tr align="center">
    <td align="left">Have vote at game round</td>
    <td>depending on settings</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>
</table>


**:heavy_exclamation_mark: Dealer should:**

<img width="600" alt="dealer panel" src="https://user-images.githubusercontent.com/62946911/147751756-c6649e89-12f1-481e-aed2-eb3d999b45a4.png">

🔪 **Kick player by player/observer**

<img width="600" alt="Снимок экрана 2021-12-30 в 16 05 13" src="https://user-images.githubusercontent.com/62946911/147754596-ff69de5b-7c7f-4228-8a0b-45934728923e.png">


:speech_balloon: **Discuss the story/issue**

<img width="499" alt="Снимок экрана 2021-12-30 в 16 50 01" src="https://user-images.githubusercontent.com/62946911/147757759-32149852-2dac-4288-b297-2cb3649ab1c0.png">

:game_die: **Game page**

- Dealer select current issue and click button `Run round`
- After that the timer begins counting down
- Each player must choose the card
> if the user has not chosen a card, then by default he is assigned a card `unknown`

<img width="900" alt="round" src="https://user-images.githubusercontent.com/62946911/147755288-7856823c-d87c-4870-acd8-6a1aec795880.png">

Admit/reject feature

<img width="900" alt="admit/reject feature" src="https://user-images.githubusercontent.com/62946911/147760860-4b66703b-8158-4df2-883b-bcfb95c70866.png">

:bar_chart: **Statistics page**

statistics of the all rounds

<img width="470" alt="statistics" src="https://user-images.githubusercontent.com/62946911/147755850-6e454784-2725-437d-b92c-2e13c894503d.png">


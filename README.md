# **Gioco del Lotto**
A **NodeJS CLI Lottery App**, based on the **Italian Lotto®** System. The App is the final project for the Programming Course by [TomorrowDevs](https://www.tomorrowdevs.com/ "TomorrowDevs").
---------------
#### Table of Contents  
- [Some information about Lotto](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#some-information-about-lotto)
- [More about the project](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#more-about-the-project)
  - [The Ticket Class](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-ticket-class)
  - [The LottoGame Class](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-lottogame-class)
- [How to Play](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#how-to-play-video_game)
---
## Some information about Lotto  :slot_machine:
Italian Lotto is a lottery game whose history dates back hundreds of years. Results consist of ten regional draws and a national draw, with five numbers drawn from each wheel. 
The ten regional wheels are named after the following cities: Bari, cagliari, Firenze, Genoa, Milan, Naples, Palermo, Rome, Turin, Venice.
To play, you have to choose one to ten numbers from a ball range of 1 to 90. Next you have to choose which of the 11 wheels you would like to bet on. It is possible to select more than one wheel. There is also an option to bet on all wheels. Then select the type of bet you would like to place and how much you would like to bet.
The largest prize available is €6 million, which you can win by choosing and correctly matching five numbers from a €1 bet, although a host of other prizes are available depending on how you play.

For more information, please visit:
- [Lotto - Come si gioca](https://www.sisal.it/lotto/come-si-gioca)
- [Televideo - Lotto](https://www.servizitelevideo.rai.it/televideo/pub/pagina.jsp?p=786&s=0&r=Nazionale&idmenumain=0)
---------------
## More about the project :floppy_disk:
The project is built on NodeJS, mainly using OOP model. Being a replica of the original **Lotto®** System, the software is able to **generate new Tickets**, to **simulate a Lottery Draw** and to **calculate prizes** in the case of a winning ticket. Built using [Prompts](https://github.com/terkelg/prompts), the software helps the user generating new tickets and creating new game instances, thanks to an easy-to-use CLI. However, multiple tickets generation or game instances generation are also possible through simple code declaration. It's possible to see your tickets in a nice ASCII formatted illustration.

### The Ticket Class
Used to generate new Ticket Objects, this Class, allows the user to select the properties of his own Tickets in the Object Declaration.

```javascript
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`);
```
- The first parameter of the Class Constructor is the type of winning combination to be assigned to the Ticket:
  - *Ambata*: one winning number
  - *Ambo*: two winning numbers
  - *Terno*: three winning numbers
  - *Quaterna*: four winning numbers
  - *Cinquina*: five winning numbers
  
  The argument must be a **string** containing **ONE** type of winning combination.

- The second parameter is the number of the numbers the user would like to place his virtual bet on.
  Is possible to choose from 1 up to 10 numbers. The argument **must** be a **number** and **must** be greater than the **type of winning combination**     declared, otherwise the Object declaration will be **void**.

- The third parameter is the "Ruota" on which the virtual bet will be placed. It's possible to enter from 1 to 10 cities ('Bari', 'Cagliari', 'Firenze',   'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia') or 'Tutte', to choose all of them. Argument **must** be a **string**, proper formatting is
  not fundamental.
  
It's possible to see the generated Ticket calling the `.print()` method.
```javascript
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`);
console.log(ticket.print());
```
![Schermata 2023-04-13 alle 15 32 05](https://user-images.githubusercontent.com/109867120/231775029-c6bd5c1f-ad9e-445e-a026-468304cf80a2.png)  

### The LottoGame Class
Use this Class to create a new game instance.
```javascript
const gameInstance = new LottoGame();
```
All it takes to start the declared  game instance is the call of the `.start()` method and the launch of the software in the terminal.
```javascript
const gameInstance = new LottoGame();
gameInstance.start();
```
It's possible to initiate a game instance with your own tickets (up to 5), simply passing them as constructor arguments.
```javascript
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`);
const gameInstance = new LottoGame(ticket);
gameInstance.start();
```
The Class is mainly composed by private methods that validate inputs and guarantee the proper functioning of the game instance.

------
## How to play :video_game:
### How to generate Tickets
- Once the **repository** has been cloned or downloaded, and all necessary **dependencies** installed, all the user has to do to start a game istance is   open the repository in his terminal, and then launch the `node main.js` command.

  ![start a new game istance](https://user-images.githubusercontent.com/109867120/231706680-70db9e38-eed4-4ead-ae88-8611a6fb094f.png)

- The software will asks if any Lotto Ticket has already been bought (*passed as argument of the Constructor*, see [*The Ticket Class*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-ticket-class) and [*The LottoGame Class*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-lottogame-class) for more info) (if so, answer 'Yes' then see [*How to print Tickets*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#how-to-print-tickets)).

  ![Schermata 2023-04-13 alle 16 03 10](https://user-images.githubusercontent.com/109867120/231783730-6056510a-5d77-4c3c-8af9-9a31d4592a66.png)
  
- Answering **'No'**, the software reply with a short message, then proceed asking us how many Tickets we would like to buy (*generate*).

  ![Schermata 2023-04-13 alle 16 15 33](https://user-images.githubusercontent.com/109867120/231787261-feb179c1-f6ad-4c4a-9d95-6bc983b34cc1.png)
  
- Let's pretend we only want to buy **1** Ticket (**as can be seen it's possible to choose to generate up to 5 Tickets**). Now we have to choose the type   of winning combination we would like to place our virtual bet on (see [*The Ticket Class*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-ticket-class) for info).

  ![Schermata 2023-04-13 alle 16 29 23](https://user-images.githubusercontent.com/109867120/231792232-e5cf2907-e696-40fe-b571-1e78aebf503b.png)

- Now it's time to choose on how many numbers we would like to place our virtual bet on. Having chosen "**Terno**" as winning combination, the prompt 
  will only allows me to choose from numbers greater than 3 (see [*The Ticket Class*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-ticket-class) for info).

  ![Schermata 2023-04-13 alle 16 34 59](https://user-images.githubusercontent.com/109867120/231793847-661369e9-80e4-473e-b5c2-29ac3e826586.png)

- One more last thing to do before we can finally see our Ticket is to choose on wich "**Ruota**" we would like to bet.
- 
  ![Schermata 2023-04-13 alle 16 46 05](https://user-images.githubusercontent.com/109867120/231802857-8029b146-95a6-41cf-ab44-c08ec0538747.png)
  
- Answering "Yes", we'll place the bet on every "Ruota".
- Answering "No", we'll have the possibility to choose our favorite "Ruote" (it's possible to select more than on "Ruota", see [*The Ticket Class*](https://github.com/salvatorequagliariello/lotto-game/edit/main/README.md#the-ticket-class) for info)

  ![Schermata 2023-04-13 alle 16 47 04](https://user-images.githubusercontent.com/109867120/231803671-f313b5fc-f2cd-4687-aaa0-0503130c5771.png)
  

### How to print Tickets
Now that we have our Tickets it's possible to see a printed ASCII version of them by answering "Yes" to this prompt.

![Schermata 2023-04-13 alle 17 13 11](https://user-images.githubusercontent.com/109867120/231805077-cac0111f-8708-4843-9143-27a8f6f8a746.png)

Here is the result!

![Schermata 2023-04-13 alle 17 16 03](https://user-images.githubusercontent.com/109867120/231805853-4015f6b9-cdb8-450a-8ef2-82509bf7adcc.png)

----
# **Gioco del Lotto**
A **NodeJS CLI Lottery App**, based on the **Italian Lotto®** System. The App is the final project for the Programming Course by [TomorrowDevs](https://www.tomorrowdevs.com/ "TomorrowDevs").
---------------
#### Table of Contents  
- [Some information about Lotto](https://github.com/salvatorequagliariello/lotto-game#some-information-about-lotto--slot_machine)
- [More about the project](https://github.com/salvatorequagliariello/lotto-game#more-about-the-project-floppy_disk)
  - [The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)
  - [The LottoGame Class](https://github.com/salvatorequagliariello/lotto-game#the-lottogame-class)
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
<br>
<br>
### The Ticket Class
Used to generate new Ticket Objects, this Class, allows the user to select the properties of his own Tickets in the Object Declaration.

```javascript
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
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
  
- The fourth parameter is the Bet Amount. Bet amount must be greater than 0 and less than 200, in €0.50 increments (according to the Italian Lotto Rules). Every passed value that will not follow this rule, will be rounded to the nearest valid number.
  
It's possible to see the generated Ticket calling the `.print()` method.
```javascript
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
console.log(ticket.print());
```

![Schermata 2023-04-25 alle 11 01 06](https://user-images.githubusercontent.com/109867120/234228694-f0af32e5-d399-48d6-83c7-272e223c0822.png)
<br>
<br>
### The LottoDraw Class
Class that allows the User to create new Draw Objects. A Draw Object mimics the functioning of a real draw, by using its properties as `Ruote` and a set of numbers as their own values.
In order to grant the succesful creation of a Draw Object, it's required to declare it passing 4 arguments to the Contructor.
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
```
- The first parameter is the **`Ruote`** names. An *Array* of *Strings* whose elements will be used as propertis of the declared *Object*.

- The second parameter is the number of drawn numbers per `Ruota`. It determines how many numbers will be drawn. **MUST** be a valid *Integer*.

- The third parameter is the MAX Number to be drawn. **MUST** be a valid *Integer*.

- The third parameter is the MIN Number to be drawn. **MUST** be a valid *Integer* and **MUST** be less than the MAX Number.

It's possible to see the generated Draw Object calling the `.print()` method.
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
console.log(draw.print());
```
![Schermata 2023-04-25 alle 11 58 31](https://user-images.githubusercontent.com/109867120/234242858-fc887cff-a6e1-401e-ac6a-54535864790a.png)
<br>
<br>
### The PrizeCalculator Function
Function that compare an Array of Tickets and a Draw Object to determine the presence of a Winning Combniantion, then calculates any prize according to the *Type* of tickets, the number of *Ruote* choosed, the played *Numbers* and the *Bet* amount (see *[The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)* for further details).
<br>
<br>
### The LottoGame Class
Use this Class to create a new game instance.
```javascript
const gameInstance = new LottoGame();
```
All it takes to start the declared game instance is the call of the `.start()` method and the launch of the software in the terminal.
```javascript
const gameInstance = new LottoGame();
gameInstance.start();
```
It's possible to initiate a game instance with your own Tickets (up to 5) and your own Draw, simply passing them as constructor arguments (the Ticket argument **MUST** be passed as an *Array*).
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
const gameInstance = new LottoGame([ticket], draw);
gameInstance.start();
```
The Class is mainly composed by private methods that validate inputs and guarantee the proper functioning of the game instance.

------
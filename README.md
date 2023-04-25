# **Gioco del Lotto**
A **NodeJS CLI Lottery App**, based on the **Italian Lotto®** System. The App is the final project for the Programming Course by [TomorrowDevs](https://www.tomorrowdevs.com/ "TomorrowDevs").
---------------
#### Table of Contents  
- [Some information about Lotto](https://github.com/salvatorequagliariello/lotto-game#some-information-about-lotto--slot_machine)
- [More about the project](https://github.com/salvatorequagliariello/lotto-game#more-about-the-project-floppy_disk)
  - [The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)
  - [The LottoDraw Class](https://github.com/salvatorequagliariello/lotto-game#the-lottodraw-class)
  - [The PrizeCalculator Function](https://github.com/salvatorequagliariello/lotto-game#the-prizecalculator-function)
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
Class that allows the User to create new Draw Objects. A Draw Object mimics the functioning of a real lottery draw, by using its properties as *Ruote* and a set of numbers as their own values.
In order to grant the succesful creation of a Draw Object, it's required to declare it passing 4 arguments to the Contructor.
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
```
- The first parameter is the **`Ruote`** names. An *Array* of *Strings* whose elements will be used as propertis of the declared *Object*.

- The second parameter is the number of drawn numbers per *Ruote*. It determines how many numbers will be drawn. **MUST** be a valid *Integer*.

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
The Function returns a *Prize Object* containing details abount any win and any winning Tickets.
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
const ticketTwo = new Ticket(`ambata`, 10, `tutte`, 10);
const checkWin = prizeCalculator(draw, [ticket, ticketTwo]);
console.log(checkWin);
// Log:
{
  totalAmountWon: 1.12,
  winningTickets: [
    Ticket {
      type: [Object],
      numbers: [Array],
      cities: [Array],
      bet: 10,
      id: 8112,
      wonAmount: 1.12,
      winningDetails: [Object]
    }
  ]
}
```
A *Prize* Object is composed of two properties, `totalAmountWon` (set as 0 if there are no winning Tickets) and a `winningTickets` Array (set as *empty* if there are no winning Tickets) containing details about any possible winning Ticket.
<br>
<br>
It's possible to print a nice ASCII decorated representation of a Prize Object using the `.printWin()` Function, located in the `./src/utils` folder.
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
const ticketTwo = new Ticket(`ambata`, 10, `tutte`, 10);
const checkWin = prizeCalculator(draw, [ticket, ticketTwo]);
const niceAsciiString = printWin(checkWin);
console.log(niceAsciiString);
```
![Schermata 2023-04-25 alle 14 30 05](https://user-images.githubusercontent.com/109867120/234276617-26175ca2-b65c-4e27-9c2e-243e43ec3d6a.png)
<br>

If there are no winning Tickets, the Function will return a different String.
<br>
<br>
![Schermata 2023-04-25 alle 14 39 13](https://user-images.githubusercontent.com/109867120/234278656-68ac1f90-82fe-45d5-a15e-471fa55b8f0e.png)
<br>
<br>
### The LottoGame Class
Use this Class to create a new game instance.
```javascript
const gameInstance = new LottoGame();
```
It's possible to initiate a game instance with your own [Tickets](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class) (up to 5) and your own [Draw](https://github.com/salvatorequagliariello/lotto-game#the-lottodraw-class), simply passing them as constructor arguments (the Ticket argument **MUST** be passed as an *Array*).
```javascript
const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
const gameInstance = new LottoGame([ticket], draw);
```
There are several Methods you can use on your LottoGame Object.

 - `.printTickets()` <br>
   Can only be called if the LottoGame Object has been declared with almost a Ticket Object in the Contrusctor.
   Uses the `.print()` Ticket Method on every Ticket Passed into the Contructor (see *[The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)* for further details).
   ```
   const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
   const gameInstance = new LottoGame([ticket]);
   const ticketString = gameInstance.printTickets();
   console.log(ticketString);
   ```
   ![Schermata 2023-04-25 alle 15 03 01](https://user-images.githubusercontent.com/109867120/234284931-8901e44f-d079-4547-8e67-2bc011103fa9.png)
 
 - `.doDraw()` <br>
    Creates a [LottoDraw](https://github.com/salvatorequagliariello/lotto-game#the-lottodraw-class) Object and set it as a property of the LottoGame Object. If the LottoGame Object
    has been declared passing a Draw Object in the Contructor, this will be **OVERRIDDEN**. The results can be seen using the `.drawResults` property. <br>
    ```
    const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
    const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
    const gameIstanceDrawResults = gameInstance.drawResults;
    console.log(gameInstanceDrawResults);
   
   // Log:
   LottoDraw {
      bari: [ 53, 35, 6, 70, 28 ],
      cagliari: [ 45, 64, 48, 86, 32 ],
      firenze: [ 84, 28, 7, 34, 62 ],
      genova: [ 11, 46, 90, 72, 32 ],
      milano: [ 22, 47, 19, 36, 5 ],
      napoli: [ 2, 47, 85, 1, 22 ],
      palermo: [ 50, 89, 75, 27, 62 ],
      roma: [ 37, 30, 74, 17, 74 ],
      torino: [ 36, 72, 73, 26, 2 ],
      venezia: [ 80, 33, 89, 41, 65 ]
    }
   ```
   
- `.printDraw()` <br>
  Can only be called if the LottoGame Object has been declared with a Draw Object in the Contrusctor or if the `.doDraw()` method as already been called.
  Uses the `.print()` method of the [LottoDraw](https://github.com/salvatorequagliariello/lotto-game#the-lottodraw-class) Class to print the Draw results.
  ```
  const ticket = new Ticket(`terno`, 5, `cagliari, milano, torino`, 1);
  const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
  const gameInstanceDrawResultsString = gameInstance.printDraw();
  console.log(gameInstanceDrawResultsString);
  ```
  ![Schermata 2023-04-25 alle 15 41 31](https://user-images.githubusercontent.com/109867120/234295464-901e9695-e62a-43ef-85cf-252dbb17e29c.png)

- `.checkWin()` <br>
  Can only be called if the LottoGame Object has been declared with a Draw Object (or if the `.doDraw()` method as already been called) and at least one Ticket Object in the Contrusctor.
  Calls the [.prizeCalculator](https://github.com/salvatorequagliariello/lotto-game#the-prizecalculator-function) Function to compare the Tickets and the Draw and searh for winning numbers.
  Returns a Prize Object and set it as value of the LottoGame Object `prizeObj` value.
  ```
  const ticket = new Ticket(`ambata`, 10, `tutte`, 1);
  const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
  const gameInstance = new LottoGame([ticket], draw);
  const gameIstanceCheckResults = gameInstance.checkWin();
  console.log(gameIstanceCheckResults);
  // Log: 
  {
  totalAmountWon: 0.11,
  winningTickets: [
    Ticket {
      type: [Object],
      numbers: [Array],
      cities: [Array],
      bet: 1,
      id: 8735,
      wonAmount: 0.11,
      winningDetails: [Object]
      }
    ]
  }
  ```
  
- `.printCheckWinResults()` <br>
  Can only be called after the `.checkWin()` Method. Uses the `printWin()` function to return a nice ACII representation of a Prize Object.
  ```
  const ticket = new Ticket(`ambata`, 10, `tutte`, 1);
  const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
  const gameInstance = new LottoGame([ticket], draw);
  const gameIstanceCheckResults = gameInstance.checkWin();
  const gameIstanceCheckResultsString = gameInstance.printCheckWinResults();
  console.log(gameIstanceCheckResultsString);
  ```
  ![Schermata 2023-04-25 alle 16 12 05](https://user-images.githubusercontent.com/109867120/234304062-d64e2e4b-3b2b-4df7-bd02-31b74538168f.png)


All it takes to start the CLI of a declared game instance is the call of the `.start()` method and the launch of the software in the terminal.
```javascript
const gameInstance = new LottoGame();
gameInstance.start();
```
------
## How to play :video_game:
If the LottoGame object has been declared with at least one Ticket Object passed into the Contructor, then jump to .
<br>
### How to generate Tickets
- Once the **repository** has been cloned or downloaded, and all necessary **dependencies** installed, all the user has to do to start a game istance is  open the repository in his terminal, and then launch the `node main.js` command.

  ![start a new game istance](https://user-images.githubusercontent.com/109867120/231706680-70db9e38-eed4-4ead-ae88-8611a6fb094f.png)
  
### How to navigate the menu :pager:

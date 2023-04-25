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
- [How to play](https://github.com/salvatorequagliariello/lotto-game#how-to-play-video_game)
  - [How to generate Tickets](https://github.com/salvatorequagliariello/lotto-game#how-to-generate-tickets)
  - [How to navigate the menu](https://github.com/salvatorequagliariello/lotto-game#how-to-navigate-the-menu-pager)
  
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
The project is built on NodeJS, mainly using OOP model. Being a replica of the original **Lotto®** System, the software is able to **generate new Tickets**, to **simulate a Lottery Draw** and to **calculate prizes** in the case of a winning ticket. Built using [Prompts](https://github.com/terkelg/prompts), the software helps the user generating new tickets and creating new game instances, thanks to an easy-to-use CLI. However, multiple tickets generation or game instances generation are also possible through simple code declaration. It's possible to see your tickets in a nice ASCII formatted illustration. <br> <br>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitLab CI](https://img.shields.io/badge/gitlab%20ci-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
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
If the LottoGame object has been declared with at least one Ticket Object passed into the Contructor, then jump to *[How to navigate the menu](https://github.com/salvatorequagliariello/lotto-game#how-to-navigate-the-menu-pager)*.
<br>
### How to generate Tickets
- Once the **repository** has been cloned or downloaded, and all necessary **dependencies** installed, all the user has to do to start a game istance is  open the repository in his terminal, and then launch the `node main.js` command.

  ![start a new game istance](https://user-images.githubusercontent.com/109867120/231706680-70db9e38-eed4-4ead-ae88-8611a6fb094f.png)
  
- If the instance has been started with no Tickets passed into the Contructor, the first thing the software will ask will be the Number of [Tickets](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class) to generate.

  ![Schermata 2023-04-25 alle 16 51 07](https://user-images.githubusercontent.com/109867120/234316076-22581264-72dd-401c-ab69-7da64fa96385.png)

- Let's pretend we only want to buy **1** Ticket (**as can be seen it's possible to generate up to 5 Tickets**). Now we have to decide the amount of our Bet! It's posbbile to enter value from 1 up to 200, with increments of 0.50, but i think 5 would be the right amount for our Bet!
  
  ![Schermata 2023-04-25 alle 16 53 53](https://user-images.githubusercontent.com/109867120/234317313-6f6ad16c-fe35-4a49-9711-6f6d7e81fc54.png)

- Then we have to choose the type of winning combination we would like to place our virtual bet on (see *[The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)* for  more info).
  
  ![Schermata 2023-04-25 alle 16 58 27](https://user-images.githubusercontent.com/109867120/234318107-6d950b3d-d03b-417b-8b51-a85a5f7924e5.png)
  
- It's time to decide on how many numbers we would like to place our virtual bet on. Having chosen "**Terno**" as winning combination, the prompt 
  will only allow me to choose from numbers greater than 3!
  
  ![Schermata 2023-04-25 alle 17 01 06](https://user-images.githubusercontent.com/109867120/234319068-0a4739af-76d4-4a2d-a422-c833fb2783cb.png)

- One more last thing to do before we can finally have our Ticket is to choose on wich "**Ruota**" we would like to bet.
  
  ![Schermata 2023-04-25 alle 17 03 08](https://user-images.githubusercontent.com/109867120/234319701-1df73593-db7b-45b4-9bb1-515c448b5a49.png)
  
- Answering "Yes", we'll place the bet on every "Ruota".
- Answering "No", we'll have the possibility to choose our favorite "Ruote" (it's possible to select more than on "Ruota", see *[The Ticket Class](https://github.com/salvatorequagliariello/lotto-game#the-ticket-class)* for  more info).

  ![Schermata 2023-04-25 alle 17 11 21](https://user-images.githubusercontent.com/109867120/234322149-cbc2a19a-b213-4c61-ae28-4fb94c867416.png)

Now that we have our precious Ticket, we can finally see what we can do with it!

### How to navigate the menu :pager:

The main menu is dynamic and its prompts will change according to what we already done!. <br>
With at least one Ticket generated (or passed into the Constructor), we have two options, we can choose to partecipate to a Draw (generate a [Draw](https://github.com/salvatorequagliariello/lotto-game#the-lottodraw-class) Object) or see our Tickets (print them)!

  ![Schermata 2023-04-25 alle 17 15 06](https://user-images.githubusercontent.com/109867120/234323784-53b07e74-f25f-45fd-bfa9-8674fb7f0211.png)
  
   - Choosing to see our Tickets will print our Tickets in the console:

     ![Schermata 2023-04-25 alle 17 19 23](https://user-images.githubusercontent.com/109867120/234324353-2b27d18b-eb6a-455c-9f3d-95782d30ca38.png)

   - While choosing to partecipate to a Draw will generate a Draw Object and let us check for winning numbers in our Tickets (this will be the starting point of the software if the LottoGame Object has      been declarated passing at least one Ticket and a Draw Object)!
    
     ![Schermata 2023-04-25 alle 17 31 25](https://user-images.githubusercontent.com/109867120/234327823-ae84596b-8c67-469f-a2b8-681e346d7b5a.png)

  - Before we search for winning numbers, let's see the draw results ('See the draw results' line)!
    
    ![Schermata 2023-04-25 alle 17 34 40](https://user-images.githubusercontent.com/109867120/234328757-1e9aa026-5401-4808-9071-7a031e787735.png)

  - Well to me those seems some pretty lucky numbers! It's time to check if we have some winning numbers ('Check if my Ticket won.' line)!
    
    ![Schermata 2023-04-25 alle 17 38 25](https://user-images.githubusercontent.com/109867120/234329761-83a9541b-602a-4c5c-8cff-99c279995919.png)

  - Oh, no! I didn't win anything! But i'm sure you'll be luckier!
  
Download the project and try your luck! :moneybag:

# Car Park App

* A car park has a payment machine that accepts only cash – notes and coins.
* It's a max stay 24-hour car park, so cars cannot stay longer than this duration or they get towed!
* It costs £3.00 for the first hour, and then 1p for every extra min stayed.
* Coins are 1p, 2p, 5p, 10p, 20p, 50p and £1; Notes can be £5, £10, and £20

This is a single page react app that takes the time the car enters the car park and the time it exits as inputs, it calculates and outputs the parking charge and then takes payment in as an input. It then calculates the output change using the least amount of coins/notes.

## Test examples
```
Time in: 9:06
Time out: 10:17
Payment In: £5

Output cost: £3.11
output change: £1, 50p, 20p, 10p, 5p, 2p, 2p
```

## App Screenshot

<img width="624" alt="Screenshot 2021-04-09 at 15 10 04" src="https://user-images.githubusercontent.com/71889577/114192673-abdb4800-9945-11eb-837f-bc12d58a3328.png">


## Installing and running the app
Clone the current repository:
```
$ git clone https://github.com/savannaelbey/reactCoinChange.git
```

Navigate to the directory:

```
$ cd reactCoinChange
```

Install the project dependencies.

```
npm install
```

Start the project.

```
npm start
```

A web browser should automatically open [http://localhost:3000](http://localhost:3000).

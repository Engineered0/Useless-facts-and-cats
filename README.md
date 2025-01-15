# Useless Facts and Cats Game 🐱🧠

A fun, interactive web game that challenges players to distinguish between true and false useless facts while earning adorable cat images as rewards!

---

## Features
- 🎲 **Random useless fact generation**
- 🤔 **True/False fact guessing**
- 📈 **Score tracking**
- 🔥 **Streak system**
- 🐱 **Random cat image rewards**

---

## Tech Stack
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI Components**

---

## How to Play
1. **Read** the randomly generated useless fact.
2. **Guess** whether the fact is true or false.
3. **Earn points** for correct guesses.
4. **Maintain a streak** to challenge yourself.
5. **Collect cute cat images** with each correct guess!

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

## Game Logic

The game's core logic is implemented in the `useUselessFactsGame` custom hook:

### Fact Generation
- Fetches a true fact from an API.
- Randomly decides to keep it true or generate a false version.

### Guessing Mechanism
- Players select 'True' or 'False'.

### Scoring System
- **Correct guess:** +1 point, streak increases.
- **Incorrect guess:** No points, streak resets to 0.

### Cat Image Reward
- A new cat image is fetched and displayed after each correct guess.

### Game Flow
- A new fact is loaded after each guess.
- The game continues indefinitely, challenging players to achieve high scores and long streaks.

This simple yet engaging logic creates an addictive gameplay loop, combining trivia with cute animal rewards!

---

## Hackathon Challenge

Created for the **MLH Beginner Week Hackathon**, this project demonstrates:
- 🔗 **API integration**
- 🎮 **Interactive game logic**
- 📱 **Responsive design**
- 🐾 **Fun user experience**

---

## Future Improvements
- Add difficulty levels.
- Implement a global leaderboard.
- Create more fact modification strategies.



### Installation
```bash
git clone https://github.com/Engineered0/useless-facts-cats-game.git
cd useless-facts-cats-game
npm install
npm run dev


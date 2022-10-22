# MathFlow

Intelligent tutoring system for math. I designed & built the app.

- Personalized adaptive learning
- 10x shorter feedback loop
- 100x cheaper than a human tutor

## Demo

https://user-images.githubusercontent.com/46352445/197336346-ebcd5f22-dc31-46de-88d3-82330f54de55.mp4

Live app: https://mathflow-45dc3.firebaseapp.com/

## Post mortem

I wrote a post-mortem about the business case & why it failed: https://teemu-helenius.fi/blog/mathflow/

## Technical overview

### Frontend

The frontend is developed with React + TypeScript. The src/ includes the relevant source code for frontend and is self-describing.

Features:
- On home screen user can continue the learning session where he left last time. See the first [prototype layout](https://github.com/Temez1/mathflow/issues/1)
- Learning session automatically gives user more challenging exercies and topics as the user gets better (Adaptive learning). See [the issue](https://github.com/Temez1/mathflow/issues/2) for details about the algorithm.

### Backend

The backend is developed with Firebase. The project utilizes
- Authentication with Google provider
- Firestore for storing user's skill levels per topic.
- Hosting for the frontend SPA

## Development

Install dependencies `npm i`

Start local development `npm run dev`

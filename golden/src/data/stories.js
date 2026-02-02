// src/data/stories.js
import japnese from "../assets/japnese.jpg";
import american from "../assets/american.jpg";
import italy from "../assets/italy.webp";

const storiesData = [
  {
    id: 1,
    name: "Emily Johnson",
    location: "New York, USA",
    message:
      "This trip completely changed how I see the world. Everything was perfectly planned, and the local experiences were unforgettable.",
    photo: american,
  },
  {
    id: 2,
    name: "Luca Romano",
    location: "Rome, Italy",
    message:
      "From start to finish, it felt like a dream. The guides were knowledgeable and incredibly friendly. Highly recommended!",
    photo: italy,
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    location: "Tokyo, Japan",
    message:
      "I loved every moment of this journey. It was safe, well-organized, and full of beautiful memories I’ll cherish forever.",
    photo: japnese,
  },
];

export default storiesData;

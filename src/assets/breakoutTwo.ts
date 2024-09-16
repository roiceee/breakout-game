import { BreakoutType } from "../types/round-type";

const breakoutTwo: BreakoutType = {
  title: "This is a title 2",
  rounds: [
    {
      title: "Identify the Objectboom",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Carefully examine the image provided and identify the word that best describes the object or concept depicted. Think about what this item is commonly known as.",
      hintText: "It's something you use daily.",
      roundType: "word",
      answer: "toothbrush",
    },
    {
      title: "Solve the Math Problem",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Look closely at the mathematical problem presented in the image and solve it by applying the appropriate operations. Input your final answer in the field provided.",
      hintText: "Think basic arithmetic.",
      roundType: "number",
      answer: "42",
    },
    {
      title: "Choose the Correct Option",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Observe the image and choose the correct option from the provided choices that best describes or relates to the subject matter shown. Consider all possible interpretations before selecting your answer.",
      hintText: "It's a mode of transport.",
      roundType: "multiple-choice",
      choices: {
        a: "Car",
        b: "Bicycle",
        c: "Boat",
        d: "Plane",
      },
      answer: "b",
    },
    {
      title: "Identify the Sweet Treat",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Analyze the image and identify the word that accurately represents the item or concept displayed. Think about common associations and popular terms that fit the description.",
      hintText: "It’s sweet and cold.",
      roundType: "word",

      answer: "icecream",
    },
    {
      title: "Count the Total",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Examine the image and calculate the total number represented by the objects or figures shown. Add up all the elements you can see to arrive at the correct total.",
      hintText: "Sum up the visible items.",
      roundType: "number",
      answer: "15",
    },
    {
      title: "Garden Item Choice",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Take a good look at the image and select the correct answer from the multiple-choice options provided. Consider how each option relates to the image before making your choice.",
      hintText: "This is commonly found in a garden.",
      roundType: "multiple-choice",
      choices: {
        a: "Tree",
        b: "Car",
        c: "Lamp",
        d: "Shovel",
      },
      answer: "d",
    },
    {
      title: "Name the Writing Tool",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Carefully observe the image and determine the word that best fits the description of the object or concept shown. Think about what this item is commonly called.",
      hintText: "It’s used for writing.",
      roundType: "word",
      answer: "pencil",
    },
    {
      title: "Count the Stars",
      imageUrl: "https://via.placeholder.com/1000x700",
      instruction:
        "Study the image closely and solve the problem by identifying and counting the relevant objects. Enter the correct number in the provided space.",
      hintText: "Count the stars in the image.",
      roundType: "number",
      answer: "7",
    },
  ],
};

export default breakoutTwo;

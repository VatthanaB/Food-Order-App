import React, { useEffect, useState } from "react";
import classes from "./AvaibleMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Pad Thai",
//     description: "Classic Thai stir-fried noodles",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Banh Mi",
//     description: "Vietnamese sandwich with grilled meats",
//     price: 9.99,
//   },
//   {
//     id: "m3",
//     name: "Satay Skewers",
//     description: "Indonesian grilled skewers with peanut sauce",
//     price: 12.5,
//   },
//   {
//     id: "m4",
//     name: "Mango Sticky Rice",
//     description: "Thai dessert with sweet mango and sticky rice",
//     price: 7.99,
//   },
//   {
//     id: "m5",
//     name: "Pho",
//     description: "Traditional Vietnamese noodle soup",
//     price: 10.49,
//   },
//   {
//     id: "m6",
//     name: "Laksa",
//     description: "Spicy Malaysian coconut noodle soup",
//     price: 13.99,
//   },
//   {
//     id: "m7",
//     name: "Som Tum",
//     description: "Thai green papaya salad",
//     price: 8.99,
//   },
//   {
//     id: "m8",
//     name: "Nasi Goreng",
//     description: "Indonesian fried rice with vegetables and chicken",
//     price: 11.5,
//   },
// ];

const AvaibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-training-27430-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        setHttpError("Something went wrong!");
        throw new Error("Failed to fetch meals.");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.error(error);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaibleMeals;

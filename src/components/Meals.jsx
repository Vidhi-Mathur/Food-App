import React from "react"
import Error from "./Error"
import MealItem from "./MealItem"
import useHttp from "../hooks/useHttp"

const reqConfig = {}
export default function Meals(){
    const {data: meals, isLoading, error} = useHttp('http://localhost:3000/meals', reqConfig, [])

    if(isLoading){
        return <p className="center">Fetching Meals...</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error}/>
    }

    return (
    <ul id="meals">
        {meals.map(meal => (
            <MealItem key={meal.id} meal={meal} />
        ))}
    </ul>
    )
}
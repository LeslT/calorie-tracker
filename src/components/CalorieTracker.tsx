import { useMemo } from "react"
import type { Activity } from "../types"

type CalorieTrackerForm = {
    activities : Activity[]
}
export default function CalorieTracker({activities}: CalorieTrackerForm) {
   
    const caloriesConsumed = useMemo(()=> activities.reduce((total, activity) => activity.category === 1 ? +activity.calories + total : total, 0) , [activities])
    const caloriesBurned = useMemo(()=> activities.reduce((total, activity) => activity.category === 2 ?  +activity.calories + total : total, 0) , [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calories Resum
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className="font-black text-6xl text-orange">
            {caloriesConsumed}
          </span>
          Consumed
        </p>
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className="font-black text-6xl text-orange">
            {caloriesBurned}
          </span>
          Burned
        </p>
      </div>
    </>
  );
}

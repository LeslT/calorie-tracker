import { categories } from "../data/categories";
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
  dispatch : Dispatch<ActivityActions>
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
}

export default function Form({dispatch, state} : FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    // const isNumberField = ['category','calories'].includes(e.target.id)
    setActivity({
        ...activity,
        [e.target.id]: e.target.value
    })
  }

  useEffect(()=>{
    if(state.activeId){
      const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity);

    }

  },[state.activeId])

  const isValidActivity = () => {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "save-activity", payload: { newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <select
          id="category"
          value={activity.category}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          onChange={ handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Activity:
        </label>
        <input
          type="text"
          id="name"
          value={activity.name}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="ex. Food, juice, salad, execise, bike"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories:
        </label>
        <input
          type="number"
          id="calories"
          value={activity.calories}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calories. ex. 300, 200"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 disabled:opacity-10 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value={activity.category === 1 ? 'Save Food' : 'Save Exercise'}
        disabled={!isValidActivity()}
      />
    </form>
  );
}

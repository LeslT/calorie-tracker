import { Activity } from "../types"


//Describe lo que pasa en el reducer
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity} } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }


//El type del state
export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//El estado
export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeId: ''
}

export const activityReducer = ( state: ActivityState, action: ActivityActions ) => {

    if(action.type === 'save-activity'){
        //Este codigo manejala logica para actualizar el state
        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities= state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

        }else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter( activiy => activiy.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state

}
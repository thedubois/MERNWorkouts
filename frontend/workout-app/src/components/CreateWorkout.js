import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";

const CreateWorkout = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
        } else {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            console.log('workout added')
            console.log(json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}   
                required={true}
            />
            
            <label>Exercise Load:</label>
            <input 
                type="number" 
                onChange={(e) => {setLoad(e.target.value)}}
                value={load}   
                required={true}
            />
            
            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => {setReps(e.target.value)}}
                value={reps}   
                required={true}
            />
            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default CreateWorkout;
import React from 'react';

const UserForm = ({userName, stateName, handleSubmit, handleChange}) => {
    return (
        <form id='todo-form' onSubmit={handleSubmit}>
        <div>            
            <label htmlFor='userName'>Name:</label>
            <input name='userName' onChange={handleChange} value={userName} />
        </div>

        <div>
            <label htmlFor='stateName'>
                State Abbreviation:
            </label>
            <input name='stateName' onChange={handleChange} value={stateName} />
        </div>

        <button type='submit'>Submit</button>
    </form>
    )
}

export default UserForm
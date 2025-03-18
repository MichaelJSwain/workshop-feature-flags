import { useState } from 'react';
import './ProjectView.css'

const experiments = [
    {
      id: Math.random() * 10000,
      name: "exp-1",
      type: "a/b",
      status: "paused"
    },
    {
      id: Math.random() * 10000,
      name: "exp-2",
      type: "a/b",
      status: "paused"
    },
    {
      id: Math.random() * 10000,
      name: "exp-3",
      type: "a/b",
      status: "paused"
    }
  ];

export const ProjectView = () => {
    const [searchText, setSearchText] = useState('');

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <div className='project-view'>
           {/* ProjectView Component */}
            <div>
        
            <div className='project-view-header'>
                <h1>Flags</h1>
                <p>Flags are decision points in your code and rules are used to run experiments and rollouts</p>
            </div>

            {/* toolbar */}
            <div className='toolbar'>
                <div className='toolbar_left'>
                <input onChange={(e) => handleChange(e)} placeholder='Search by name or key' value={searchText}></input>
                </div>
                <div className='toolbar_right'>
                <button>Create New Flag...</button>
                </div>
            </div>
            </div>
        </div>
    )
}
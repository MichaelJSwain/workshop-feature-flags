import { useEffect, useState } from 'react';
import './ProjectView.css'
import axios from 'axios';

export const ProjectView = () => {
    const [flags, setFlags] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchFlags = () => {
        axios.get('http://localhost:8080/api/26487234/flags')
            .then(res => {
                console.log(res);
                if (res.data?.length) {
                    setFlags(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onExperimentStateChange = (flag, status) => {
        console.log(flag, status);

        axios.patch(`http://localhost:8080/api/48923489/flags/${flag.id}`)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchFlags();
    }, []);

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

            {/* table */}
            <div className="project-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flags.map(flag => {
                            return <tr key={flag.id}>
                                <td>{flag.name}</td>
                                <td>{flag.type}</td>
                                <td>{flag.status}</td>
                                <td>
                                    <button onClick={(e) => onExperimentStateChange(flag, e.target.textContent === "start" ? "running" : "paused")}>{flag.status === "running" ? "pause" : "start"}</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
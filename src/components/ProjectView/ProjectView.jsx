import { useEffect, useState } from 'react';
import './ProjectView.css'
import axios from 'axios';

export const ProjectView = () => {
    const [flags, setFlags] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isShowingFlagForm, setIsShowingFlagForm] = useState(false);
    const [nameInputText, setNameInputText] = useState('');
    const [keyInputText, setKeyInputText] = useState('');
    const [descInputText, setDescInputText] = useState('');

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

        axios.patch(`http://localhost:8080/api/48923489/flags/${flag.id}`)
        .then(res => {
            console.log(res);
            
            // update ui
            const updatedFlags = flags.map(f => flag.id === f.id ? {...flag, status: status} : {...f});
            setFlags(updatedFlags);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchFlags();
    }, []);

    const handleChange = (e) => {
        const {id} = e.target;

        if (id === 'search') {
            setSearchText(e.target.value);
        } else if (id === 'name') {
            setNameInputText(e.target.value);
        } else if (id === 'key') {
            setKeyInputText(e.target.value);
        } else if (id === 'description') {
            setDescInputText(e.target.value);
        }
        
    }

    const handleButtonClick = () => {
        setIsShowingFlagForm(true);
    }

    const handleCreateFlag = async (e) => {
        e.preventDefault();
        console.log("creating flag...");

        // update backend
         axios.post(`http://localhost:8080/api/48923489/flags`, {
            name: nameInputText,
            key: keyInputText,
            description: descInputText
        })
        .then(res => {
            const flagList = res.data.data;

             // update ui
             setFlags(flagList);
        })
        .catch(error => {
            console.log(error);
        })

       
        
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
                <input onChange={(e) => handleChange(e)} placeholder='Search by name or key' value={searchText} id='search'></input>
                </div>
                <div className='toolbar_right'>
                <button onClick={handleButtonClick}>Create New Flag...</button>
                </div>
            </div>
            </div>

            {/* placeholder form to create a flag */}
            {
                isShowingFlagForm && 
                <div style={{width: 'fit-content'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <button style={{background: 'none'}} onClick={() => setIsShowingFlagForm(false)}>X</button>
                    </div>
                    <form onSubmit={handleCreateFlag} >
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' placeholder='Add name' value={nameInputText} onChange={(e) => handleChange(e)}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                            <label htmlFor='key'>Key:</label>
                            <input id='key' placeholder='Add key' value={keyInputText} onChange={(e) => handleChange(e)}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                            <label htmlFor='description'>Description:</label>
                            <input id='description' placeholder='Add description' value={descInputText} onChange={(e) => handleChange(e)}></input>
                        </div>
                        <div style={{marginTop: '15px', display: 'flex', justifyContent: 'flex-end'}}>
                            <button style={{background: 'none', marginRight: '15px'}}>Cancel</button>
                            <button>Save</button>
                        </div>
                    </form>
                </div>
            }

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
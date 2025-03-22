import { useEffect, useState } from 'react';
import './ProjectView.css'
import axios from 'axios';
import { createPortal } from 'react-dom';
import { TableRow } from '../TableRow';

export const ProjectView = () => {
    const [flags, setFlags] = useState([]);
    const [filteredFlags, setFilteredFlags] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingFlagForm, setIsShowingFlagForm] = useState(false);
    const [nameInputText, setNameInputText] = useState('');
    const [keyInputText, setKeyInputText] = useState('');
    const [descInputText, setDescInputText] = useState('');
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [isShowingTooltip, setIsShowingTooltip] = useState(false);

    const fetchFlags = () => {
        axios.get('http://localhost:8080/api/26487234/flags')
            .then(res => {
                const fetchedFlags = res.data?.length ? res.data : [];
                setFlags(fetchedFlags);
                setFilteredFlags(fetchedFlags);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onExperimentStateChange = (flag) => {

        axios.patch(`http://localhost:8080/api/48923489/flags/${flag.id}`)
        .then(res => {
            console.log(res);
            
            // update ui
            const updatedFlags = flags.map(f => flag.id === f.id ? {...flag, status: flag.status === 'running' ? 'paused' : 'running'} : {...f});
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
        // setIsShowingFlagForm(true);
        setIsShowingModal(true)
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
            console.log('flag list = ', flagList);
             // update ui
             setFlags(flagList);
        })
        .catch(error => {
            console.log(error);
        })

       
        
    }

    const handleDeleteFlag = (flag) => {
        axios.delete(`http://localhost:8080/api/48923489/flags/${flag.id}`)
        .then(res => {
            console.log(res);
            // update ui
            setFlags(res.data);
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    const handleFilterFlags = () => {
        console.log(flags);
        const res = flags.filter(f => (f.name.includes(searchText) || f.key.includes(searchText)));
        setFilteredFlags(res);
    }

    useEffect(() => {
        console.log("use effect triggered by change to search text");
        handleFilterFlags();
    }, [searchText]);

    return (
        <div className='project-view'>
            {isShowingModal && createPortal(
                <div style={{position: 'fixed', height: '100vh', width: '100vw'}}>
                    <div style={{ background: 'rgba(0,0,0,.5)', position: 'absolute', zIndex: '-1', height: '100%', width: '100%'}}></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
<div style={{width: 'fit-content', height: 'fit-content', padding: '20px', background: 'lightgrey', borderRadius: '5px'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <button style={{background: 'none'}} onClick={() => setIsShowingModal(false)}>X</button>
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
                            <button onClick={() => setIsShowingModal(false)} style={{background: 'none', marginRight: '15px'}}>Cancel</button>
                            <button>Save</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>, 
                document.getElementById('react_portal')
            )}

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

            {/* table */}
            <div className="project-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlags.map(flag => {
                            return <TableRow key={flag.id} flag={flag} handleExperimentStateChange={onExperimentStateChange} handleDeleteFlag={handleDeleteFlag} />
                        })}
                    </tbody>
                </table>
            </div>
        </div> 
    )
}
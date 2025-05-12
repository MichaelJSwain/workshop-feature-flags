import { useEffect, useState } from 'react';
import './ProjectView.css'
import { createPortal } from 'react-dom';
import { TableRow } from '../../components/TableRow';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { createFlag, deleteFlag, fetchFlags, toggleFlagStatus } from '../../services/flagService';
import { useLoading } from '../../hooks/useLoading';
import { LoadingView } from '../../components/LoadingView/LoadingView';

export const ProjectView = () => {
    const [flags, setFlags] = useState([]);
    const [filteredFlags, setFilteredFlags] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isShowingFlagForm, setIsShowingFlagForm] = useState(false);
    const [nameInputText, setNameInputText] = useState('');
    const [keyInputText, setKeyInputText] = useState('');
    const [descInputText, setDescInputText] = useState('');
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [isShowingTooltip, setIsShowingTooltip] = useState(false);
    const {isLoading, withLoading} = useLoading();

    const getFlags = async () => {
        const fetchedFlags = await withLoading(() => fetchFlags());
         
        if (!fetchedFlags) {
            // show error message to user if no flags were returned
            // e.g. setIsShowingMessage(true)
            // ...
        }

        setFlags(fetchedFlags);
    }

    const onExperimentStateChange = async (flag) => {
        const toggledFlag = await withLoading(() => toggleFlagStatus(flag.id));
        
        if (!toggledFlag) {
            // show error message to user if no flags were returned
            // e.g. setIsShowingMessage(true)
            // ...
        }
       
        getFlags();
    }

    useEffect(() => {
        getFlags();
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

    const handleCreateFlag = async () => {
        const createdFlag = await withLoading(() => createFlag(nameInputText, keyInputText, descInputText));

        if (!createdFlag) {
              // show error message to user if the flag wasn't created
            // e.g. setIsShowingMessage(true)
            // ...
        }

        getFlags();
    }

    const handleDeleteFlag = async (flag) => {
        const deletedFlag = await withLoading(() => deleteFlag(flag.id));
        
        if (!deletedFlag) {
              // show error message to user if the flag wasn't deleted
            // e.g. setIsShowingMessage(true)
            // ...
        }

        getFlags();
    }

    const handleFilterFlags = () => {
        const res = flags.filter(f => (f.name.includes(searchText) || f.key.includes(searchText)));
        setFilteredFlags(res);
    }

    useEffect(() => {
        console.log("use effect triggered by change to search text");
        handleFilterFlags();
    }, [searchText]);

    useEffect(() => {
        setFilteredFlags(flags);
    }, [flags]);

    return (
        <div className='project-view'>
            {isShowingModal && 
            createPortal(
                <Modal closeFunc={() => setIsShowingModal(false)} submitFunc={handleCreateFlag} header="Create Flag" cta="Create">
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' placeholder='Add name' value={nameInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='key'>Key:</label>
                            <input id='key' placeholder='Add key' value={keyInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='description'>Description:</label>
                            <input id='description' placeholder='Add description' value={descInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                </Modal>, 
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
                    <Button style="highlight" onClick={handleButtonClick}>Create New Flag...</Button>
                </div>
            </div>
            </div>

            {/* table */}
            {isLoading && <LoadingView></LoadingView>}

            {!!flags.length && <div className="project-container">
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
            </div>}

            {(!isLoading && !flags.length && !filteredFlags.length) && <div>You haven't created any flags yet. Get started by clicking the 'Create new flag...' button</div>}
            {(!isLoading && !!flags.length && !filteredFlags.length) && <div>No matching flags were found for your search term. Try again?</div>}
        </div> 
    )
}
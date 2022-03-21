import React, { useState } from "react";
import { api, useMountedRef } from '../util/util.js';

function CreateUser() {

    const mounted = useMountedRef();
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ wasCreated, setWasCreated ] = useState(false);
    const [ requestSubmitted, setRequestSubmitted ] = useState(false);
    const [ requestReceived, setRequestReceived ] = useState(false);

    function handleCreateUser() {
        setRequestSubmitted(true);

        api("users", {method:"PUT", body: JSON.stringify({firstName,lastName,phoneNumber})})
        .then(response =>  {
            if(!mounted.current) return;

            if(response.response.ok) 
                setWasCreated(true);

            setTimeout(() => {
                setRequestReceived(true);
            }, 1500);
        })
        .catch(e => {
            setTimeout(() => {
                if(mounted.current)
                    setRequestReceived(true);
            }, 1500);
        });
    }

    function resetState() {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setWasCreated(false);
        setRequestSubmitted(false);
        setRequestReceived(false);
    }

    return (
        !requestSubmitted ? (
            <div className="input">
                <label htmlFor="fistName">First Name</label>
                <input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"/>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text"/>
                <button onClick={handleCreateUser} disabled={requestSubmitted}>Create User</button>
            </div> ) :
        !requestReceived ? (
            <div className="p-10" >Creating User ...</div> ) :
        !wasCreated ? (
            <div className="p-10">
                <label htmlFor="ok">User was not created.</label>
                <button htmlFor="ok" className="button" onClick={resetState}>OK</button>
            </div> ) : 
        (
            <div className="p-10">
                <label htmlFor="ok1">User Created</label>
                <button name="ok1" className="button" onClick={resetState}>OK</button>
            </div>
        )
    );
}

export default CreateUser;
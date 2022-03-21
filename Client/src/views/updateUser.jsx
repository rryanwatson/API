import React, { useState } from "react";
import { api, useMountedRef } from '../util/util.js';

function UpdateUser() {

    const mounted = useMountedRef();
    const [ userID, setUserID ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ wasUpdated, setWasUpdated ] = useState(false);
    const [ requestSubmitted, setRequestSubmitted ] = useState(false);
    const [ requestReceived, setRequestReceived ] = useState(false);

    function handleCreateUser() {
        setRequestSubmitted(true);

        let requestData = {};
        if(firstName != "") requestData.firstName = firstName;
        if(lastName != "") requestData.lastName = lastName;
        if(phoneNumber != "") requestData.phoneNumber = phoneNumber;

        api("users/" + userID, {method:"PUT", body: JSON.stringify(requestData)})
        .then(response =>  {
            if(!mounted.current) return;

            if(response.response.ok) 
                setWasUpdated(true);

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
        setWasUpdated(false);
        setRequestSubmitted(false);
        setRequestReceived(false);
        setUserID("");
    }

    return (
        !requestSubmitted ? (
            <div className="input">
                <label htmlFor="userId">User ID</label>
                <input name="userId" value={userID} onChange={(e) => setUserID(e.target.value)} type="text"/>
                <label htmlFor="fistName">First Name</label>
                <input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"/>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text"/>
                <button onClick={handleCreateUser} disabled={requestSubmitted}>Update User</button>
            </div> ) :
        !requestReceived ? (
            <div className="p-10">Updating User ...</div> ) :
        !wasUpdated ? (
            <div className="p-10">
                <label htmlFor="ok">User was not updated</label>
                <button className="button" name="ok" onClick={resetState}>OK</button>
            </div> ) : 
        (
            <div className="p-10">
                <label htmlFor="ok1">User Updated</label>
                <button className="button" name="ok1" onClick={resetState}>OK</button>
            </div>
        )
    );
}

export default UpdateUser;
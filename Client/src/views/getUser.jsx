import React, { useState } from "react";
import { api, useMountedRef } from '../util/util.js';

function GetUser() {

    const mounted = useMountedRef();
    const [ userId, setUserID ] = useState("");
    const [ requestReceived, setRequestReceived ] = useState(false);
    const [ requestSubmitted, setRequestSubmitted ] = useState(false);
    const [ user, setUser ] = useState(null);

    function handleGetUser() {
        setRequestSubmitted(true);

        api("users/" + userId, {method:"GET"})
        .then(r => {
            if(!mounted.current) return;

            if(r.response.ok) 
                setUser(r.responseData);

            setTimeout(() => {
                setRequestReceived(true);
            }, 1500);
        })
        .catch((e) => {
            setTimeout(() => {
                if(mounted.current)
                    setRequestReceived(true);
            }, 1500);
        });
    }

    return (
        !requestSubmitted ? (
            <div className="input">
                <label htmlFor="userId">User Id</label>
                <input name="userId" type="text" value={userId} onChange={(e) => setUserID(e.target.value)}/>
                <button onClick={handleGetUser} disabled={requestSubmitted}>Get User</button>
            </div> ) :
        !requestReceived ? (
            <div className="p-10">Fetching User ...</div> ) :
        (
            user ? (
                <div className="user">{`ID: ${user.userId} FirstName: ${user.firstName} LastName: ${user.lastName} Phone: ${user.phoneNumber}`}</div>
            ) : <div className="p-10"> Problem getting user</div>
        )
    );
}

export default GetUser;
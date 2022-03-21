import React, { useEffect, useState } from "react";
import {api, useMountedRef} from "../util/util.js";


function GetUsers() {

    const mounted = useMountedRef();
    const [ requestReceived, setRequestReceived] = useState(false);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        api("users")
        .then(r => {
            if(!mounted.current) return;

            console.log(r.response);

            if(r.response.ok)
                setUsers(r.responseData);

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
    },[]);

    return (
        !requestReceived ? (
            <div className="p-10">Fetching Users ...</div> ) :
        (
            <div className="userList">
                {
                    users.map((v) => (
                        <div key={v.userId}>{`ID: ${v.userId} FirstName: ${v.firstName} LastName: ${v.lastName} Phone: ${v.phoneNumber}`}</div>
                    ))
                }
            </div>
        )
    );
}

export default GetUsers;
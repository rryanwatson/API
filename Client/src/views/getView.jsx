import React from "react";

import GetUsers from "./getUsers.jsx";
import GetUser from "./getUser.jsx";
import DeleteUser from "./deleteUser.jsx";
import UpdateUser from "./updateUser.jsx";
import CreateUser from "./createUser.jsx";

import { VIEWS } from "../constants/views.js";

function GetView({showWhich}) {

    switch (showWhich) {
        case VIEWS.CreateUser:
            return <CreateUser/>;
        case VIEWS.GetUser:
            return <GetUser/>;
        case VIEWS.GetUsers:
            return <GetUsers/>;
        case VIEWS.DeleteUser:
            return <DeleteUser/>;
        case VIEWS.UpdateUser:
            return <UpdateUser/>;
        default: 
            return <h4>View Not Implemented</h4>
    }
}

export default GetView;
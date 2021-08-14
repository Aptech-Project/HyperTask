import React from 'react';
import Box from '@material-ui/core/Box';
import { Icon } from '@material-ui/core';
function CheckLogin() {
    return (
        <div>
            <Box display="flex" p={2} bgcolor="rgba(255, 176, 5, 0.2)" style={{ borderRadius: '5px' }}>
                <Icon className="text-20" style={{ color: 'orange' }}>warning</Icon>&nbsp;&nbsp;&nbsp;
                <span className="font-medium" style={{ color: 'rgba(146, 83, 7, 1)' }}><b>Login Faill!!</b> Check your Username/Email and Password</span>
            </Box><br></br>
        </div >
    );
}
export default CheckLogin;
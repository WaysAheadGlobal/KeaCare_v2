import React, { useContext } from 'react'
import { Snackbar, Alert as Alert_ } from '@mui/material'
import AlertContext from './AlertContext'

export default function Alert() {

    const { alert, setAlert } = useContext(AlertContext);

    return (
        <>
            <Snackbar
                open={alert.open}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top"
                }}
                autoHideDuration={3000}
                onClose={() => {
                    setAlert({
                        ...alert,
                        open: false
                    });
                }}
            >
                <Alert_
                    variant="filled"
                    translate="yes"
                    severity={alert.type}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert_>
            </Snackbar>
        </>
    )
}

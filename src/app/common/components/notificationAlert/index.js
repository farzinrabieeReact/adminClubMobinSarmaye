import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from "./../../../../redux/notificationAlert";
import { ToastContainer, toast } from 'react-toastify';




export function NotificationAlert() {
    const dispatch = useDispatch()
    let reducer_notification = useSelector(state => state.reducer_notificationAlert)

    useEffect(() => {
        if (reducer_notification.status) {
            toast[reducer_notification.typeAlert](reducer_notification.textAlert, {
                position: toast.POSITION.BOTTOM_RIGHT,
                onClose: () => dispatch({ type: actionTypes.close })
            });
        }
    }, [reducer_notification]) //eslint-disable-line react-hooks/exhaustive-deps


    // if (!reducer_notification.typeAlert) return null

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
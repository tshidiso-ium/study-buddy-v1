import React from 'react'
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

export default function MessageAlert(message) {
  return (

        <Alert severity={message.message.alertType}>
          <AlertTitle>{message.message.messageType}</AlertTitle>
          {message.message.message}
        </Alert>
  )
}
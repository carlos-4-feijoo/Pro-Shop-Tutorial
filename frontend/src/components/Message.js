import React from 'react'
import { Alert } from 'react-bootstrap'

function Message(variant) {
    console.log(variant)
    return (
        <Alert 
            variant={variant.variant}
        >
            {variant.children}
        </Alert>
    )
}

export default Message

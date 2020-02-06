import React from 'react'
import Confirmation from './confirmation'
import { useSelector } from 'react-redux'

export const modalTypes = {
    CONFIRMATION: 'CONFIRMATION',
}

const MODAL_COMPONENTS = {
    CONFIRMATION: Confirmation,
}

const ModalRoot = () => {
    const { type, props } = useSelector(state => state.modals)

    if (!type) {
        return null
    }

    const Modal = MODAL_COMPONENTS[type]

    return Modal ? <Modal {...props} /> : null
}

export default ModalRoot

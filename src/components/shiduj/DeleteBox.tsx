import React from 'react'

interface DeleteBoxProps {
    title: string;
    message: string;
    onCancelClicked: (option: boolean) => void;
    onConfirmClicked: () => void;
}

export const DeleteBox: React.FC<DeleteBoxProps> = ({title, message, onCancelClicked, onConfirmClicked}) => {
  return (
    <div className="delete-modal">
        <div className="delete-box">
        <div className="text-container">
            <h1>{ title }</h1>
            <p>{ message }</p>
        </div>
        </div>
        <div className="button-area">
            <button className="btn button-cancel" onClick={() => onCancelClicked(false)}>Cancel</button>
            <button className="btn button-update" onClick={ onConfirmClicked }>Confirm</button>
        </div>
    </div>
  )
}

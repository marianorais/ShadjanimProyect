import React from 'react'
import { MdDragHandle } from 'react-icons/md';

export const SectionHeader = () => {
    return (
        <div className="sections-header">
            <h4>Drag  </h4>&nbsp; <MdDragHandle className="sections-header__icon" />&nbsp;  <h4> to move any section</h4>
        </div>
    )
}

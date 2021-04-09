import "../../styles/AudioModalRipper.css"
import React, { useEffect, useState } from 'react';

function AudioModalRipper() {
console.log("Heyyyyyyyyyy BAbbbyyyy")
    return(
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    );
}
export default AudioModalRipper;
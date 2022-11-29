import React from 'react'; 
import PropTypes from 'prop-types';


const GlobalAlert = ({ type , message, onClose, show }) => {
    return show ? <div className={`alert alert-custom alert-light-${type} fade show mb-5`} role="alert">
    <div className="alert-icon">
        <i class="fas fa-exclamation-triangle"></i>
    </div>
    <div className="alert-text">{message}</div>
    <div className="alert-close">
        <button type="button" className="close">
            <span aria-hidden="true">
                <i class="far fa-times-circle"></i>
            </span>
        </button>
    </div>
</div> : null
}

GlobalAlert.propTypes  = {
    type:PropTypes.string,
    message:PropTypes.string,
    onClose:PropTypes.func,
    show:PropTypes.bool.isRequired
}


export default GlobalAlert;
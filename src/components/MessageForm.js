import React from 'react';

const MessageForm = ({ handleSubmit, handleKeyDown, handleChange, values, errors, user}) => {
    return (
        <form className="message-form-container" onSubmit={handleSubmit}>
            <div className="message-form">
                <div>
                    <img 
                        src={user.photoURL}
                        alt="Image profil"
                        className="profil-picture"
                    />
                </div>
                <textarea
                    onKeyDown={handleKeyDown} 
                    onChange={handleChange}
                    name='message' 
                    value={values.message}
                    placeholder="Quoi de neuf ?" 
                />
            </div>
            { errors.message && <p className='error-text'>{ errors.message }</p> }
            <footer>
                <p>{280 - values.message.length}</p>
                <button type='submit' disabled={values.message.length > 280 || values.message.length === 0}>Tweeter</button>
            </footer>
        </form>
    );
}

export default MessageForm;

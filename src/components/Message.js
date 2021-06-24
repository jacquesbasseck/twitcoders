import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import {
    FiHeart,
    FiX,
    FiMessageCircle,
    FiUpload,
    FiRefreshCw
} from 'react-icons/fi'
import {formatDistanceToNow} from 'date-fns'
import { fr } from 'date-fns/locale'
import IconContainer from './IconContainer';

const Message = ({id, message}) => {
    const { user, firebase } = useContext(FirebaseContext)
    const isOwner = user && user.uid === message.postedBy.id
    const [isLike, SetisLike] = useState(false)

    useEffect(() => {
        if (user) {
            const isLike = message.likes.some(like => like.likeBy.id === user.uid)
            SetisLike(isLike)
        }
    }, [])

    const handleLike = () => {
        SetisLike(prevIsLike => !prevIsLike)
        const likeRef = firebase.db.collection('messages').doc(message.id)
        if (!isLike) {
            const like = {likeBy: {id: user.uid, name: user.displayName}}
            const updatedLikes = [...message.likes, like]
            likeRef.update({likes: updatedLikes})
        } else {
            const updatedLikes = message.likes.filter(like => like.likeBy.id !== user.uid)
            likeRef.update({ likes: updatedLikes })
        }
    }

    const handleDelete = () => {
        const messageRef = firebase.db.collection('messages').doc(message.id)
        messageRef.delete()
    }

    return (
        <div className='message-container'>
            <div>
                <img
                    src={message.photo}
                    alt="Image profil"
                    className="profil-picture"
                />
            </div>
            <div className="message">
                <header>
                    <h3>{message.postedBy.name}</h3>
                    <span>. {formatDistanceToNow(message.createdAt, {locale: fr})}</span>
                </header>
                <p>{message.message}</p>
                {user && (<footer>
                    <IconContainer color='blue'>
                        <FiMessageCircle />
                    </IconContainer>
                    <IconContainer color='green'>
                        <FiRefreshCw />
                    </IconContainer>
                    <IconContainer 
                        color='red' 
                        count={message.likes.length}
                        onClick={handleLike}
                        isLike={isLike}
                    >
                        <FiHeart />
                    </IconContainer>
                    <IconContainer color='blue'>
                        <FiUpload />
                    </IconContainer>
                    { isOwner &&
                    (
                    <IconContainer onClick={handleDelete} color='red'>
                        <FiX />
                    </IconContainer>
                    )
                    }
                </footer>)}
            </div>
        </div>
    );
}

export default Message;

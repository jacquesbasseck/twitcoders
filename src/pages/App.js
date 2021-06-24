import React, { useEffect } from 'react'
import Header from '../components/Header'
import Message from '../components/Message'
import '../styles/App.css'
import CreateMessage from '../components/CreateMessage'

import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../hooks/useAuth'
import MessageList from '../components/MessageList'

const App = () => {
    const user = useAuth()
    return (
        <FirebaseContext.Provider value={{ user, firebase }}>
            <div className='app'>
                <Header />
                <CreateMessage />
                <MessageList />
            </div>
        </FirebaseContext.Provider>
    )
}

export default App

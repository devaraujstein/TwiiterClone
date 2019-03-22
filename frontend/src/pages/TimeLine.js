import React, {Component} from 'react'
import TwitterLogo from '../twitter.svg'
import api from '../services/api'
import './Timeline.css'
import Tweet from '../components/Tweet'
import socket from 'socket.io-client'

export default class TimeLine extends Component{
    state = {
        tweets : [],
        newTweet : ''
    }

    async componentDidMount(){
        this.SubscribeToEvents()
        const response = await api.get('tweets')
        this.setState({tweets : response.data})
    }

    SubscribeToEvents = () => {
        const io = socket('http://localhost:3000')

        io.on('tweet',data => {
            this.setState({tweets : [data,...this.state.tweets]})
        })
        io.on('like',data => {
            this.setState({tweets : this.state.tweets.map(tweet => {
               return tweet._id === data._id ? data : tweet
            })})
        })

        
    }

    handleInputChange = (e) => {
        this.setState({newTweet : e.target.value})
    }
    handleNewTweet = async e => {
        if(e.keyCode !== 13 ) return

        const content = this.state.newTweet
        const author = localStorage.getItem('@goTwitter:username')

        await api.post('tweets',{content,author})

        this.setState({newTweet : ''})
    }
    render(){
        return (
            <div className = 'timeline-wrapper'>
                <img src = {TwitterLogo} height ={24} alt = 'GoTwiiter'/>
                <form>
                    <textarea 
                    value = {this.state.newTweet}
                    onChange = {this.handleInputChange}
                    onKeyDown = {this.handleNewTweet}
                    placeholder = 'O que está acontecendo'
                    />
                </form>
                <ul className='tweet-list'>
                    {this.state.tweets.map(tweet => (
                        <Tweet key = {tweet.id} tweet = {tweet}/>
                    ))}
                </ul>
                
            </div>
        )
    }
}
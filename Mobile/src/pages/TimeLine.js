import React,{Component} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api'
import socket from 'socket.io-client'
import Tweet from '../components/Tweets'
import {View,StyleSheet,TouchableOpacity,Text,FlatList} from 'react-native'

export default class TimeLine extends Component{
    static navigationOptions = ({navigation}) => ({
        title : 'Inicio',
        headerRight : (
            <TouchableOpacity onPress = {() => {navigation.navigate('NewTweet')}}>
                <Icon style = {{marginRight : 10}} name='add-circle-outline' size = {24} color='#4BB0EE'/>
            </TouchableOpacity>
        )
    })
    
    state = {
        tweets : [],
    }
    async componentDidMount(){
        this.SubscribeToEvents()
        const response = await api.get('tweets')
        this.setState({tweets : response.data})
    }

    SubscribeToEvents = () => {
        const io = socket('http://192.168.0.105:3000/')

        io.on('tweet',data => {
            this.setState({tweets : [data,...this.state.tweets]})
        })
        io.on('like',data => {
            this.setState({tweets : this.state.tweets.map(tweet => {
               return tweet._id === data._id ? data : tweet
            })})
        })

        
    }
    
    render(){
        return <View style = {styles.container}>
                    <FlatList 
                        data = {this.state.tweets}
                        keyExtractor = {tweet => tweet._id}  
                        renderItem = {({item}) => <Tweet tweet = {item}/>}  
                    />
                </View>
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  
import { createSwitchNavigator,createStackNavigator,createAppContainer} from 'react-navigation'

import login from './pages/login'
import TimeLine from './pages/TimeLine'
import NewTweet from './pages/NewTweet'
const routes = createAppContainer(createSwitchNavigator({
    login,
    App : createStackNavigator({
        TimeLine,
        NewTweet
    }),
}))

export default routes
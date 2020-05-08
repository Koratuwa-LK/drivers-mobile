import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard';
import Newbookings from '../screens/newbookings';

const Deliverynav = createStackNavigator({
    Dashboard: Dashboard,
    Newbookings: Newbookings
}, {
    defaultNavigationOptions : {
        headerStyle: {
            backgroundColor: /* '#f4511e' */ Platform.OS === 'android' ? /* '#d303fc' */'#94cc3f' : '#d303fc',
          },
          headerTintColor: 'white',
          headerTitleStyle: { 
          },
          headerTitleAlign: 'center'
         
    }
})



export default createAppContainer(Deliverynav);
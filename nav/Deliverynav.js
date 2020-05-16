import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard';
import Newbookings from '../screens/newbookings';
import MapScreenview from '../screens/MapScreenView';
import Confirmed from '../screens/confirmedscreen';
import MapconfirmedScreenview from '../screens/Mapconfirmedscreen';
import Journeyscreen from '../screens/journeyscreen';

const Deliverynav = createStackNavigator({
    Dashboard: Dashboard,
    Newbookings: Newbookings,
    Mapview: MapScreenview,
    Confirmed: Confirmed,
    Mapconfirmedview: MapconfirmedScreenview,
    Mapjourneyview: Journeyscreen
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
import AuthLoadingScreen from '../../screens/auth/AuthLoadingView';
import LoginScreen from '../../screens/auth/login/LoginView';
import SignUpScreen from '../../screens/auth/signup/SignupView';
import UserFindTabs from '../../screens/auth/userfind/index';


const StackNavigationData = [
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'Loading',
    component: AuthLoadingScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: {
      gestureEnabled: true,
    },
  },
  {
    name: 'UserFind',
    component: UserFindTabs,
    options: {
      gestureEnabled: true,
    },
  },

]

export default StackNavigationData;
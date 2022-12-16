import Main from "./screens/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider >
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App

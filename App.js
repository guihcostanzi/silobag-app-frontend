import { StatusBar, SafeAreaView } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { estilosApp } from './styles/estilosGlobais';

export default function App() {
  return (
    <SafeAreaView style={estilosApp.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <AppNavigator />
    </SafeAreaView>
  );
}
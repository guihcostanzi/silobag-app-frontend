import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListagemBags from '../screens/ListagemBags/index.js';
import CadastroEdicaoBag from '../screens/CadastroEdicaoBag/index.js';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListagemBags"  screenOptions={{
          headerShown: false, // Remove completamente o header
        }}>
        {/* Tela de Listagem de Bags */}
        <Stack.Screen
          name="ListagemBags"
          component={ListagemBags}
          options={{ title: 'Silobag App' }}
        />
        {/* Tela de Cadastro e Edição de Bag */}
        <Stack.Screen
          name="CadastroEdicaoBag"
          component={CadastroEdicaoBag}
          options={({ route }) => ({
            title: route.params?.bag ? 'Editar Bag' : 'Cadastrar Bag',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
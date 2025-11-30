import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  
  //Tela de sucesso
  containerSucesso: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  textoSucesso: {
    fontSize: 80,
    marginBottom: 20,
  },
  
  mensagemSucesso: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  subMensagem: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  
  cabecalho: {
    marginBottom: 24,
  },
  
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  
  subtitulo: {
    fontSize: 14,
    color: '#888',
  },
  
  formulario: {
    flex: 1,
  },
  
  grupoInput: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  
  inputErro: {
    borderColor: '#f44336',
    borderWidth: 1,
  },
  
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
    minHeight: 48,
  },
  
  picker: {
    color: '#fff',
    backgroundColor: 'transparent',
    height: 48,
  },
  
  textoErro: {
    fontSize: 12,
    color: '#f44336',
    marginTop: 4,
  },
  
  dica: {
    fontSize: 12,
    color: '#888',
    marginTop: -15,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  
  botoesAcao: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  
  botaoCancelar: {
    flex: 1,
    height: 48,
    minHeight: 48,
  },
  
  botaoSalvar: {
    flex: 1,
    height: 48,
    minHeight: 48,
  },
});
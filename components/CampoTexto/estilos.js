import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  obrigatorio: {
    color: '#f44336',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 15,
    minHeight: 48,
  },
  containerFocado: {
    borderColor: '#e5c745ff',
    backgroundColor: '#121212',
  },
  containerErro: {
    borderColor: '#f44336',
    backgroundColor: '#1f0f0f',
  },
  containerDesabilitado: {
    backgroundColor: '#0a0a0a',
    borderColor: '#222',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
    // Remove borda duplicada
    outlineWidth: 0,
    borderWidth: 0,
  },
  inputMultiline: {
    paddingVertical: 15,
    textAlignVertical: 'top',
  },
  inputDesabilitado: {
    color: '#666',
  },
  botaoSenha: {
    padding: 8,
    marginLeft: 8,
  },
  textoSenha: {
    fontSize: 18,
  },
  contador: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  erro: {
    fontSize: 14,
    color: '#f44336',
    marginTop: 5,
  },
});
import { StyleSheet, Dimensions } from "react-native";

const larguraTela = Dimensions.get("window").width;
const larguraBotaoBase = larguraTela / 4;

export const estilosBotao = StyleSheet.create({
  botao: {
    flex: 1,
    backgroundColor: "#333333",
    height: Math.floor(larguraBotaoBase - 10), // Altura base
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(larguraBotaoBase / 2), // Deixar circular
    margin: 5,
    minWidth: 70, // Tamanho mínimo para botões menores
  },
  botaoDuplo: {
    width: (larguraTela / 2) - 10,
    flex: 0,
    alignItems: "center",
  },
  botaoSecundario: {
    backgroundColor: "#a6a6a6",
  },
  botaoDestaque: {
    backgroundColor: "#3687f0",
  },
  texto: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
  },
  textoSecundario: {
    color: "#060606",
  },
  // Novo estilo para botões de ação na aplicação, como "Salvar", "Excluir"
  botaoAcaoPrimario: {
    backgroundColor: '#28a745', // Verde para Salvar/Adicionar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  textoAcaoPrimario: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoAcaoSecundario: {
    backgroundColor: '#dc3545', // Vermelho para Excluir
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  textoAcaoSecundario: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoAcaoNeutro: {
    backgroundColor: '#6c757d', // Cinza para Voltar/Cancelar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  textoAcaoNeutro: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
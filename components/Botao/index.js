import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import { estilosBotao } from "./estilosBotao";

// Propriedades:
// onPress: função a ser executada ao pressionar
// texto: o texto exibido no botão
// tipo: pode ser 'secundario', 'destaque', 'acaoPrimario', 'acaoSecundario', 'acaoNeutro'
// ehDuplo: booleano para botões que ocupam o dobro do espaço
export function Botao({ onPress, texto, tipo, style, textStyle }) {
  const estilosContainer = [estilosBotao.botao];
  const estilosTexto = [estilosBotao.texto];

  if (tipo === "secundario") {
    estilosContainer.push(estilosBotao.botaoSecundario);
    estilosTexto.push(estilosBotao.textoSecundario);
  } else if (tipo === "destaque") {
    estilosContainer.push(estilosBotao.botaoDestaque);
  } else if (tipo === "acaoPrimario") {
    estilosContainer.push(estilosBotao.botaoAcaoPrimario);
    estilosTexto.push(estilosBotao.textoAcaoPrimario);
  } else if (tipo === "acaoSecundario") {
    estilosContainer.push(estilosBotao.botaoAcaoSecundario);
    estilosTexto.push(estilosBotao.textoAcaoSecundario);
  } else if (tipo === "acaoAlternativo") {
    estilosContainer.push(estilosBotao.botaoAcaoAlternativo);
    estilosTexto.push(estilosBotao.textoAcaoNeutro);
  } else if (tipo === "acaoNeutro") {
    estilosContainer.push(estilosBotao.botaoAcaoNeutro);
    estilosTexto.push(estilosBotao.textoAcaoNeutro);
  }
  else if (tipo === "invisivel") {
    estilosContainer.push(estilosBotao.invisivel);
    estilosTexto.push(estilosBotao.invisivel);
  }

  // Permite sobrescrever estilos via props
  if (style) {
    estilosContainer.push(style);
  }
  if (textStyle) {
    estilosTexto.push(textStyle);
  }

  return (
    <TouchableOpacity onPress={onPress} style={estilosContainer} activeOpacity={0.7}>
      <Text style={estilosTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}
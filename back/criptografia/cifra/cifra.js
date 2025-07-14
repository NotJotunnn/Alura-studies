const mensagemSecreta = "alura"

const cifrarMensagem = (mensagem, movimentos) => {
  const mensagemFinal = mensagem.split('').map(caractere => {
    const codigoCaractere = caractere.charCodeAt(0)
    return String.fromCharCode(codigoCaractere + movimentos)
  })

  return mensagemFinal.join('')
}

const decifrarMensagem = (mensagem, movimentos) => {
  const mensagemFinal = mensagem.split('').map(caractere => {
    const codigoCaractere = caractere.charCodeAt(0)
    return String.fromCharCode(codigoCaractere - movimentos)
  })

  return mensagemFinal.join('')
}

console.log(decifrarMensagem(cifrarMensagem(mensagemSecreta, 4), 4), cifrarMensagem(mensagemSecreta, 4))
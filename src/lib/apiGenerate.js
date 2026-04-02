/**
 * apiGenerate.js
 * Cliente do backend que fala com a OpenAI.
 * Em producao, a chave fica no servidor e nunca no frontend.
 */

export async function getApiStatus() {
  const response = await fetch('/api/status')

  if (!response.ok) {
    throw new Error('Nao foi possivel consultar o status da API')
  }

  return response.json()
}

export async function generateAgentWithLLM(userInput) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Erro ${response.status} ao gerar blueprint`)
  }

  return data.result
}

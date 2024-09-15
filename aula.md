# Peças da linguagem
- Comentários (//)
- Declaração de variáveis (const, let)
- Operadores (atribuição, concatenação, matemáticos, lógicos)
- Tipos de dados (string, number, boolean)
- Estrutura de dados (functions, object, array)
- Controle de fluxo (if/else)
- Estrutura de repetição (for, while)

## Tipos de dados
- String (texto) : "" '' ``
- Number (Número) : Inteiros e decimais

## Escopo e variáveis
- Variáveis globais : Fora do escopo
- Variáveis locais : Dentro do escopo ({})
- let : Tipo mutável de variável (let nome_variavel = valor_variavel)
- const : Contante, não muda o seu valor (cons nome_variavel = valor_variavel)

## Operadores
- = : Atribuição de valor
- + : Concatenação de valores
- == != >= <= > < : Comparação de valores

## Arrays
- Lista []
- Copiar elementos de um array para o outro array: [...nome_outro_array]

## Objetos
-   let nome = {
        variável1: x,
        variável2: y,
    }
- Acessar valor do objeto : nome_objeto.valor

## Função
- Named function : function nome() {}
- Arrow function : const nome = () => {}

## Print
console.log()

## Estrutura de repetição
- While (){}

## Condicionais
- Switch = Controle de fluxo
    const funcao = () => {
        let opcao = x,y ou z
        switch(opcao){
            case x :
                //faz algo
            case y :
                //faz algo
            case z : 
                //faz algo
        }
    }
- If e else

## Módulos em Node.js
- Biblioteca "inquirer" para criar prompts interativos (Perguntas para o usuário)
    const { select, input, checkbox } = require('@inquirer/prompts')

## Programação assíncrona e Promises
- Uso de funções assíncronas (o await faz com que o código espere e rode outras coisas antes)
(const nome = async() => {})
(const opcao = await select({
    message: a,
    choices: [
        {
            name: x,
            value: y
        },
        {
            name: z,
            value: w
        },
    ]
}))


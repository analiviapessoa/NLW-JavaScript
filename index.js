const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem-vindo ao app!";

let metas

const CarregarMetas = async() => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas =[]
    }
}

const SalvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const CadastrarMetas = async() => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length==0){
        mensagem = "A meta não pode ser vazia."
        return CadastrarMetas()
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso."
}

const ListarMetas = async() => {
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar a etapa.",
        choices: [...metas],
        instructions: false
    })
    
    metas.forEach((m) => {
        m.checked = false
    })
    
    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return 
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)."
}

const MetasRealizadas = async() =>{
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        mensagem = "Não existem metas realizadas :("
        return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas] 
    })
}

const MetasAbertas = async() => {
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }

    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if (abertas.length == 0){
        mensagem = "Não existem metas abertas :)"
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const DeletarMetas = async() => {
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensadeletar = await checkbox({
        message: "Selecione uma meta para deletar:",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (metasDesmarcadas.length == 0){
        console.log("Nenhum item para deletar")
        return
    }

    itensadeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso."
}

const MostrarMensagem = () => {
    console.clear();

    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async() => {
    await CarregarMetas()
    while (true){
        MostrarMensagem()
        await SalvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar" :
                await CadastrarMetas()
                await SalvarMetas()
                console.log(metas)
                break
            case "listar" :
                await ListarMetas()
                await SalvarMetas()
                break
            case "realizadas" :
                await MetasRealizadas()
                break
            case "abertas" :
                await MetasAbertas()
                break
            case "deletar" :
                await DeletarMetas()
                await SalvarMetas()
                break
            case "sair" :
                console.log("Até a próxima")
                return
        }
    }
}

start()
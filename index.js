const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "Tomar 2 litros de água por dia",
    checked: false
}

let metas = [ meta ]

const CadastrarMeta = async() => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length==0){
        console.log("A meta não pode ser vazia.")
        return CadastrarMeta()
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const start = async() => {
    while (true){
        
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar" :
                console.log("vamos cadastrar")
                await CadastrarMeta()
                console.log(metas)
                break
            case "listar" :
                console.log("vamos listar")
                break
            case "sair" :
                console.log("Até a próxima")
                return
        }
    }
}

start()
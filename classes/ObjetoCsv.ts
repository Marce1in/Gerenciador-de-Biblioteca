import fs from "fs"
import path from 'node:path';

//Eu demorei HORAS, para descobrir como declarar um tipo desses.
//Isso é o tipo genérico de um construtor de uma classe
type Construtor<T extends {} = {}> = new (...args: any[]) => T
//Providễnciado por esse lindo arigo:
// https://www.simonholywell.com/post/typescript-constructor-type/


//Essa classe tem como objetivo transformar os campos de uma array
//de objetos em um arquivo csv e vise-versa
export default class ObjetoCsv {

    static csvParaObjetos<T>(construtor: Construtor, caminhoDiretorio: string, nomeArquivo: string): T[]{
        const campos: string[] = this._obterCamposConstrutor(construtor)

        let csv: string;
        try {
            csv = this._obterCsv(caminhoDiretorio, nomeArquivo)
        }
        catch (erro){
            console.warn(`${nomeArquivo} em ${caminhoDiretorio} não encontrado. nenhum dado será carregado...`)
            return []
        }



        return []
    }

    static objetosParaCsv(objetos: object[], CaminhoDiretorio: string, nomeArquivo: string){
        if (!this._validarNome(nomeArquivo)){
            throw Error(`Nome do arquivo ${nomeArquivo} não contém .csv no final >:(`)
        }
        else if (objetos.length <= 0){
            console.warn(`Nenhum dado a ser salvo em ${nomeArquivo}`)
            return
        }

        const headerCsv: string[] = Object.keys(objetos[0])

        let csv: string

        try {
            csv = this._obterCsv(CaminhoDiretorio, nomeArquivo)
        }
        catch (erro){
            try {
                this._criarCsv(headerCsv, CaminhoDiretorio, nomeArquivo)
                csv = this._obterCsv(CaminhoDiretorio, nomeArquivo)
            }
            catch (erro){
                console.error(`Algo de muito errado aconteceu durante a obtenção de ${nomeArquivo} em ${path.resolve(__dirname, CaminhoDiretorio)}`)
                throw erro
            }
        }

        csv += objetos.map(obj => Object.values(obj).join(",")).join("\n");

        fs.writeFileSync(
            path.resolve(
                __dirname,
                path.join(CaminhoDiretorio, nomeArquivo),
            ),
            csv
        )
    }

    private static _obterCsv(caminhoDiretorio: string, nomeArquivo: string): string{
        let dadosSalvos: string;
        try{
            dadosSalvos = fs.readFileSync(
                path.resolve(
                    __dirname,
                    path.join(caminhoDiretorio, nomeArquivo)
                ),
                'utf8'
            )
        }
        catch (error){
            throw error
        }

        return dadosSalvos
    }

    private static _criarCsv(headerCsv: string[], caminhoDiretorio: string, nomeArquivo: string){
        fs.writeFileSync(
            path.resolve(
                __dirname,
                path.join(caminhoDiretorio, nomeArquivo)
            ),
            headerCsv.join(",") + "\n"
        )
    }

    //Verifica se o nome do arquivo tem .csv no final
    private static _validarNome(nomeArquivo: string): boolean{
        if (nomeArquivo.endsWith(".csv"))
            return true
        else
            return false
    }

    private static _obterCamposConstrutor(construtor: Construtor): string[]{
        //Se o objeto precisa de parâmetros para ser criada ou não, não faz
        //diferença, eu só quero saber qual o nome dos campos
        const classe: object = new construtor
        const campos: string[] = Object.keys(classe)

        return campos
    }
}

import fs from "fs"
import path from 'node:path';

//Eu demorei HORAS, para descobrir como declarar um tipo desses.
//Isso é o tipo genérico de um construtor de uma classe
type Construtor<T extends {} = {}> = new (...args: any[]) => T
//Providễnciado por esse lindo artigo:
// https://www.simonholywell.com/post/typescript-constructor-type/


/*
Essa classe tem como objetivo transformar os campos de uma array
de objetos em um arquivo csv e vise-versa
*/
export default class ObjetoCsv {

    //Esse é o código mais nojento da minha vida. Mas funciona... de algum jeito.
    static csvParaObjetos<T>(construtor: Construtor, caminhoDiretorio: string, nomeArquivo: string, tipoHeader: string): T[]{
        const campos: string[] = this._obterCamposConstrutor(construtor)
        const tipos: string[] = tipoHeader.split(",")

        let csv: string;
        try {
            csv = this._obterCsv(caminhoDiretorio, nomeArquivo)
        }
        catch (erro){
            console.warn(`${nomeArquivo} em ${caminhoDiretorio} não encontrado. nenhum dado será carregado...`)
            return []
        }

        const objetos: object[] = []
        const csvSplit: string[] = csv.split("\n")

        csvSplit.forEach((obj, i) => {
            if (i == 0){
                return
            }

            const objeto: object = new construtor

            const valores = obj.split(",")

            for (let i = 0; i < campos.length; i++) {
                const campo = campos[i];
                const valor = valores[i];
                const tipo = tipos[i];

                if (tipo === "s") {
                    (objeto as any)[campo] = valor;
                } else if (tipo === "n") {
                    (objeto as any)[campo] = Number(valor);
                } else if (tipo === "b") {
                    (objeto as any)[campo] = valor === "true";
                } else if (tipo === "d") {
                    (objeto as any)[campo] = valor ? new Date(valor) : undefined;
                }
            }


            objetos.push(objeto)
        })

        objetos.pop()

        return objetos as T[]
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

        let csv: string = headerCsv.join(",") + "\n"
        csv += objetos.map(obj => Object.values(obj).join(",")).join("\n") + "\n";

        console.log(csv)

        fs.writeFileSync(
            path.resolve(
                __dirname,
                path.join(CaminhoDiretorio, nomeArquivo),
            ),
            csv
        )
    }

    //Verifica se o nome do arquivo tem .csv no final
    private static _validarNome(nomeArquivo: string): boolean{
        if (nomeArquivo.endsWith(".csv"))
            return true
        else
            return false
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

    private static _obterCamposConstrutor(construtor: Construtor): string[]{
        //Se o objeto precisa de parâmetros para ser criada ou não, não faz
        //diferença, eu só quero saber qual o nome dos campos
        const classe: object = new construtor
        const campos: string[] = Object.keys(classe)

        return campos
    }
}

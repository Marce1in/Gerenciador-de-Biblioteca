import Pessoa from "../classes/Pessoa"

let pessoa: Pessoa;

beforeAll(() => {
    pessoa = new Pessoa("marcelo", "avenida do fulano", "40028922")
})

describe("Testando a classe Pessoas", () => {
    it("nome é setado corretamente", () => {
        expect(pessoa.nome).toBe("marcelo")
    })
    it("endereço é setado corretamente", () => {
        expect(pessoa.endereco).toBe("avenida do fulano")
    })
    it("telefone é setado corretamente", () => {
        expect(pessoa.telefone).toBe("40028922")
    })
})

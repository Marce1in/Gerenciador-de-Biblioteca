import Membro from "../classes/Membro"

let membro: Membro;

beforeAll(() => {
    membro = new Membro("1","marcelo", "avenida do fulano", "40028922")
})

describe("Testando a classe Membros", () => {
    it("nome é setado corretamente", () => {
        expect(membro.matricula).toBe("1")
    })
    it("nome é setado corretamente", () => {
        expect(membro.nome).toBe("marcelo")
    })
    it("endereço é setado corretamente", () => {
        expect(membro.endereco).toBe("avenida do fulano")
    })
    it("telefone é setado corretamente", () => {
        expect(membro.telefone).toBe("40028922")
    })
})

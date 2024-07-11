import Emprestimo from "../classes/Emprestimo";
import Livro from "../classes/Livro"

let livro: Livro;

beforeAll(() => {
    livro = new Livro("Os casos de teste","marcelo", "1410", 2004)
})

describe("Testando se todos valores da classe livro são setados corretamente durante a criação", () => {
    it("autor é setado corretamente", () => {
        expect(livro.autor).toBe("marcelo")
    })
    it("titulo é setado corretamente", () => {
        expect(livro.titulo).toBe("Os casos de teste")
    })
    it("ISBN é setado corretamente", () => {
        expect(livro.ISBN).toBe("1410")
    })
    it("anoPublicacao é setado corretamente", () => {
        expect(livro.anoPublicacao).toBe(2004)
    })
    it("reservado é setado corretamente para false", () => {
        expect(livro.reservado).toBe(false)
    })
})

describe("Testando os métodos da classe Livro", () => {
    it("reservar deve setar o reservado para true", () => {
        livro.reservar("1")

        expect(livro.reservado).toBe(true)
    })
    it("devolver deve setar o reservado para false", () => {
        livro.devolver()

        expect(livro.reservado).toBe(false)
    })
    it("reservar deve retornar um Emprestimo com os campos corretos", () => {
        const emprestimo: Emprestimo = livro.reservar("1")

        const dataAtual = new Date()
        const dataMaisUmMes = new Date()

        dataMaisUmMes.setMonth(dataMaisUmMes.getMonth() + 1)

        expect(emprestimo.dataEmprestimo).toMatchObject(dataAtual)
        expect(emprestimo.dataDevolucao).toBeUndefined()
        expect(emprestimo.dataExpiracao).toMatchObject(dataMaisUmMes)
        expect(emprestimo.encerrado).toBe(false)
        expect(emprestimo.atrasado).toBe(false)
        expect(emprestimo.ISBNLivro).toBe("1410")
        expect(emprestimo.matriculaMembro).toBe("1")
    })
    it("reservar deve jogar um erro se o livro já estiver reservado", () => {
        expect(() => livro.reservar("1")).toThrow()
    })
})

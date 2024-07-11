import Emprestimo from "../classes/Emprestimo";
import Livro from "../classes/Livro";

let emprestimo: Emprestimo;
let data: Date

beforeAll(() => {
    data = new Date()
    emprestimo = new Emprestimo("1","14102004", data, data)
})

describe("Testando se todos valores são setados corretamente durante a criação do Emprestimo", () => {
    it("A data de quando o Emprestimo foi feito é setado corretamente", () => {
        expect(emprestimo.dataEmprestimo).toMatchObject(data)
    })
    it("A data do Emprestimo de quando foi feita a devolução é undefined", () => {
        expect(emprestimo.dataDevolucao).toBeUndefined
    })
    it("A data de Expiração é setada corretamente", () => {
        expect(emprestimo.dataExpiracao).toMatchObject(data)
    })
    it("O status encerrado é marcado como false", () => {
        expect(emprestimo.encerrado).toBe(false)
    })
    it("O status de atrasado é marcado como false", () => {
        expect(emprestimo.encerrado).toBe(false)
    })
    it("O ISBN é setado corretamente", () => {
        expect(emprestimo.ISBNLivro).toBe("14102004")
    })
    it("A matrícula do membro é setada corretamente", () => {
        expect(emprestimo.matriculaMembro).toBe("1")
    })
})

describe("Testando os métodos da classe Emprestimo", () => {
    it("devolver deve setar as variáveis corretamente e chamar livro.devolver", () => {
        const livro = new Livro("", "", "", NaN)

        emprestimo.devolver(livro)

        expect(emprestimo.dataDevolucao == data)
        expect(emprestimo.encerrado).toBe(true)
        expect(livro.reservado).toBe(false)
    })

    it("renovar deve setar a dataExpiracao para mais um mês", () => {
        emprestimo.renovar()

        const dataMaisUmMes: Date = data
        dataMaisUmMes.setMonth(data.getMonth() + 1)

        expect(emprestimo.dataExpiracao).toMatchObject(dataMaisUmMes)
    })
})

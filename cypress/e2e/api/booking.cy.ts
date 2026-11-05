/// <reference types="cypress" />
import * as utils from "../../support/utilsApi"

describe("Restful-Booker API", () => {
  let authToken: any
  let dados: any
  let crTest: any
  let bookingId: number
  let bookingTestId: number
  let urlApi = "https://restful-booker.herokuapp.com"

  const staticBooking = {
    firstname: "Carlos",
    lastname: "Silva",
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
      checkin: "2027-06-01",
      checkout: "2027-06-10",
    },
    additionalneeds: "Lunch",
  }

  before(() => {
    dados = utils.generateDados()
    utils.createBooking(dados).then((response) => {
      bookingId = response.body.bookingid
    })

    utils.authLogin("admin", "password123").then((response) => {
      authToken = response.token
      expect(authToken).to.be.a("string").and.not.be.empty
    })
  })

  it("TC01 - Health Check", () => {
    utils.apiRequest("GET", `${urlApi}/ping`).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.eq("Created")
    })
  })

  it("TC02 - Autenticacao com sucesso", () => {
    utils.authLogin("admin", "password123").then((response) => {
      expect(response).to.have.property("token").and.not.be.empty
    })
  })

  it("TC03 - Autenticacao usuario invalido", () => {
    utils.authLogin("admi", "password123").then((response) => {
      expect(response).to.have.property("reason", "Bad credentials")
    })
  })

  it("TC04 - Autenticacao senha invalida", () => {
    utils.authLogin("admin", "passwod123").then((response) => {
      expect(response).to.have.property("reason", "Bad credentials")
    })
  })

  it("TC05 - Autenticacao campos em branco/vazios", () => {
    utils.authLogin("", "").then((response) => {
      expect(response).to.have.property("reason", "Bad credentials")
    })
  })

  it("TC06 - Autenticacao requisicao sem corpo", () => {
    utils.apiRequest("POST", `${urlApi}/auth`, {}).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  })
  it("TC06 - Cenario de erro status code incorreto", () => {
    utils.apiRequest("POST", `${urlApi}/auth`, {}).then((response) => {
      expect(response.status).to.eq(500)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  })

  it("TC07 - Listar todas reservas", () => {
    utils.apiRequest("GET", `${urlApi}/booking`).then((response) => {
      expect(response.body).not.be.empty
      expect(response.body).to.have.length.greaterThan(0)
    })
  })

  it("TC08 - Reserva inexistente", () => {
    utils.apiRequest("GET", `${urlApi}/979874723`).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it("TC09 - Criar Reserva campo invalido", () => {
    crTest = utils.generateDados()
    cy.request({
      method: "POST",
      url: `${urlApi}/booking`,
      body: {
        lastname: dados.lastname,
        totalprice: dados.totalprice,
        depositpaid: dados.depositpaid,
        bookingdates: {
          checkin: dados.bookingdates.checkin,
          checkout: dados.bookingdates.checkout,
        },
        additionalneeds: dados.additionalneeds,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })

  it("TC10 - Criar Reserva", () => {
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      utils.expectResponse(response.body.booking, crTest)
    })
  })

  it("TC11 - Pesquisar reserva", () => {
    utils
      .apiRequest("GET", `${urlApi}/booking/${bookingId}`)
      .then((response) => {
        utils.expectResponse(response.body, dados)
      })
  })

  it("TC12 - Alterar completamente reserva", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils
        .alterBookingCom(bookingTestId, authToken, staticBooking)
        .then((res) => {
          utils.expectResponse(res.body, staticBooking)
        })
    })
  })

  it("TC13 - Alterar completamente reserva token invalido", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils.alterBookingCom(bookingTestId, "sda", staticBooking).then((res) => {
        expect(res.status).to.eq(403)
      })
    })
  })

  it("TC14 - Alterar completamente reserva id invalido", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      utils.alterBookingCom(`s213`, authToken, staticBooking).then((res) => {
        expect(res.status).to.eq(405)
      })
    })
  })

  it("TC15 - Alterar parcialmente reserva", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils
        .alterBookingPar(bookingTestId, authToken, staticBooking)
        .then((res) => {
          expect(res.body).to.have.property(
            "firstname",
            staticBooking.firstname,
          )
          expect(res.body).to.have.property("lastname", staticBooking.lastname)
          expect(res.body).to.have.property("totalprice", crTest.totalprice)
          expect(res.body).to.have.property("depositpaid", crTest.depositpaid)
          expect(res.body.bookingdates).to.have.property(
            "checkin",
            "2027-01-01",
          )
          expect(res.body.bookingdates).to.have.property(
            "checkout",
            "2027-02-01",
          )
          expect(res.body).to.have.property(
            "additionalneeds",
            crTest.additionalneeds,
          )
        })
    })
  })

  it("TC16 - Alterar parcialmente reserva token invalido", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils.alterBookingPar(bookingTestId, "sda", staticBooking).then((res) => {
        expect(res.status).to.eq(403)
      })
    })
  })

  it("TC17 - Alterar parcialmente reserva id invalido", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils.alterBookingPar(123934, authToken, staticBooking).then((res) => {
        expect(res.status).to.eq(405)
      })
    })
  })

  it("TC18 - Excluir reserva", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = response.body.bookingid
      utils.deleteBooking(bookingTestId, authToken).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body).to.eq(`Created`)
      })
    })
  })

  it("TC19 - Excluir reserva param invalido", () => {
    crTest = ""
    crTest = utils.generateDados()
    utils.createBooking(crTest).then((response) => {
      bookingTestId = 1230927
      utils.deleteBooking(bookingTestId, authToken).then((res) => {
        expect(res.status).to.eq(405)
      })
    })
  })
})

/// <reference types="cypress" />

import { createApprovedUser } from '../support/generate'

describe('SignUp User', () => {
  it('Deverá criar um novo usuário aprovado', () => {
    const user = createApprovedUser()

    cy.visit('/cadastro')
    cy.get('#onetrust-accept-btn-handler').click()
    cy.get('[data-id=txt_fullname]').focus().type(user.name)
    cy.get('[data-id=txt_birth_dt]').focus().type(user.birth_dt)
    cy.get('[data-id=txt_cpf]').focus().type(user.cpf)
    cy.get('[data-id=cbo_occupation]').select(user.occupation)
    cy.get('[data-id=txt_salary]').focus().type(user.salary)

    cy.get('body').then(($body) => {
      if ($body.find('[data-id=rdo_bank_account__negative]').length > 0) {
        cy.get('[data-id=rdo_bank_account__negative]').check()
      }
    })

    cy.get('[data-id=rdo_declared_credit_restrictions_no]').check()

    cy.get('[data-id=cbo_purpose]').select(user.lending_purpose)
    cy.get('body').then(($body) => {
      if ($body.find('[data-id=cbo_sub_purpose]').length > 0) {
        cy.get('[data-id=cbo_sub_purpose]').select(user.lending_sub_purpose)
      }
    })

    cy.get('[data-id=txt_desired_lending_amount]')
      .focus()
      .type(user.desired_lending_amount)
    cy.get('[data-id=txt_email]').focus().type(user.email)
    cy.get('[data-id=txt_phone]').focus().type(user.mobile_number)
    cy.get('[data-id=txt_password]').focus().type(user.password)
    cy.get('[data-id=chk_accept_receive_emails]').check()
    cy.get('[data-id=chk_accepts_terms]').check()

    cy.get('[data-id=submit_form]').click()
  })
})

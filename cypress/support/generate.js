import { build } from '@jackfranklin/test-data-bot'

const cpfGenerator = {
  digit() {
    return Math.round(Math.random() * 9)
  },
  cpf() {
    function mod(dividendo, divisor) {
      return Math.round(dividendo - Math.floor(dividendo / divisor) * divisor)
    }
    const n1 = this.digit()
    const n2 = this.digit()
    const n3 = this.digit()
    const n4 = this.digit()
    const n5 = this.digit()
    const n6 = this.digit()
    const n7 = this.digit()
    const n8 = this.digit()
    const n9 = this.digit()
    let d1 =
      n9 * 2 +
      n8 * 3 +
      n7 * 4 +
      n6 * 5 +
      n5 * 6 +
      n4 * 7 +
      n3 * 8 +
      n2 * 9 +
      n1 * 10
    d1 = 11 - mod(d1, 11)
    if (d1 >= 10) d1 = 0
    let d2 =
      d1 * 2 +
      n9 * 3 +
      n8 * 4 +
      n7 * 5 +
      n6 * 6 +
      n5 * 7 +
      n4 * 8 +
      n3 * 9 +
      n2 * 10 +
      n1 * 11
    d2 = 11 - mod(d2, 11)
    if (d2 >= 10) d2 = 0
    return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2
  }
}

export const createApprovedUser = build('User', {
  fields: {
    name: 'Fake User EndToEnd',
    birth_dt: '01011990',
    cpf: cpfGenerator.cpf(),
    occupation: 'REGISTERED_PRIVATE',
    salary: '3000000',
    declared_credit_restrictions_false: 'true',
    lending_purpose: 'divida',
    lending_sub_purpose: 'PCRE',
    desired_lending_amount: '300000',
    email: '',
    mobile_number: '12345678900',
    password: '123456',
    accept_receive_emails: 'false',
    accepts_terms: 'true'
  },
  postBuild: (user) => ({
    ...user,
    email: `e2e+${user.cpf}@provu.com.br`
  })
})

export const createNegativeUser = build('User', {
  fields: {
    name: 'Fake User EndToEnd',
    birth_dt: '01011990',
    cpf: cpfGenerator.cpf(),
    occupation: 'STUDENT',
    salary: '300000',
    declared_credit_restrictions_false: 'true',
    lending_purpose: 'divida',
    lending_sub_purpose: 'PCRE',
    desired_lending_amount: '30000',
    email: '',
    mobile_number: '12345678900',
    password: '123456',
    accept_receive_emails: 'false',
    accepts_terms: 'true'
  },
  postBuild: (user) => ({
    ...user,
    email: `e2e+${user.cpf}@provu.com.br`
  })
})

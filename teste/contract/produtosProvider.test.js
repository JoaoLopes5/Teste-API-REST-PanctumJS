const pactum = require('pactum');
const { reporter, flow , mock} = pactum;
const pf = require('pactum-flow-plugin');
pactum.request.setBaseUrl('http://lojaebac.ebaconline.art.br');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-Produtos';
  pf.config.projectName = 'Loja EBAC Produtos';
pf.config.version = `1.0.0-${Date.now()}`;
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
});

// global after
after(async () => {
  await reporter.end();
});


let token;
beforeEach(async () => {
    token = await flow("Token")
    .post('http://lojaebac.ebaconline.art.br/public/authUser')
    .withJson({
        "email": "admin@admin.com",
        "password":'admin123'
    })
    .returns('data.token')
})

it('Deve adicionar produtos com sucesso', async () => {
  id = await flow("Produtos")
    .post('/api/addProduct')
    .withHeaders('authorization', token)
    .withBody({
  "name": "samsung",
  "price": "1500",
  "quantity": "2"
})
    .expectStatus(200)
    .expectJson('success',true)
    .returns('data._id')
});

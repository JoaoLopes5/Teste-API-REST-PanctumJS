const pactum = require('pactum');
const { reporter, flow, handler, mock } = pactum;
const pf = require('pactum-flow-plugin');
pactum.request.setBaseUrl('http://lojaebac.ebaconline.art.br');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-produtos';
  pf.config.projectName = 'Loja EBAC Produtos';
  pf.config.version = `1.0.0-${Date.now()}`;
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000); 
});

// global after
after(async () => {
  await reporter.end();
  await mock.stop();
});


handler.addInteractionHandler('Produtos Response', () => {
  return {
    request: {
      method: 'POST',
      path: '/api/addProduct',
      body: {
        "name": "samsung",
        "price": "1500",
        "quantity": "2"
      }
    },
    response: {
      status: 200,
      body: {
        success: true,
        message: 'product added',
        data: {
          _id: 'fake-id-123',
          name: 'Celular'
        }
      }
    }
  };
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


it('Deve adicionar produto com sucesso', async () => {
  id = await flow("Produtos")
  .useInteraction('Produtos Response')
    .post('http://localhost:4000/api/addProduct')
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

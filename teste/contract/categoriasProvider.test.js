const pactum = require('pactum');
const { reporter, flow , mock} = pactum;
const pf = require('pactum-flow-plugin');
pactum.request.setBaseUrl('http://lojaebac.ebaconline.art.br');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-Categorias';
  pf.config.projectName = 'Loja EBAC Categorias';
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

it('Deve adicionar categoria com sucesso', async () => {
  id = await flow("Categoria")
    .post('/api/addCategory')
    .withHeaders('authorization', token)
    .withBody({
         "name": "categoria"
    })
    .expectStatus(200)
    .expectJson('success',true)
    .returns('data._id')
});

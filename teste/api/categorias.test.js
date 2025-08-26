const { spec, request } = require('pactum');
request.setBaseUrl('http://lojaebac.ebaconline.art.br')
let id;
let token;
beforeEach(async () => {
    token = await spec()
    .post('http://lojaebac.ebaconline.art.br/public/authUser')
    .withJson({
        "email": "admin@admin.com",
        "password":'admin123'
    })
    .inspect()
    .returns('data.token')
})


it('Deve adicionar categoria com sucesso', async () => {
  id = await spec()
    .post('/api/addCategory')
    .withHeaders('authorization', token)
    .withBody({
         "name": "categoria"
    })
    .expectStatus(200)
    .expectJson('success',true)
    .returns('data._id')
});
it('Deve editar categoria com sucesso', async () => {
    await spec()
    .put('/api/editCategory/:id')
    .withHeaders('authorization', token)
    .withPathParams('id',id)
    .withJson({"name": "categoria editada"})
    .expectStatus(502)
    
});
//it('Deve deletar uma categoria com sucesso',async () => {
  //  await spec()
    //.delete('/api/deleteCategory/:id')
    //.withHeaders('authorization', token)
    //.withPathParams('id',id)
   // .expectStatus(502)
    
//});
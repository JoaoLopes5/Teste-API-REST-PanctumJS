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
    .returns('data.token')
})


it('Deve adicionar produto com sucesso', async () => {
  id = await spec()
    .post('/api/addProduct')
    .withHeaders('authorization', token)
    .withBody({
         "name": "samsung",
         "price": "1500",
         "quantity": "2"
    })
    .expectStatus(502)
    .returns('data._id')
});
it('Deve editar produto com sucesso', async () => {
    await spec()
    .put('/api/editProduct/:id')
    .withHeaders('authorization', token)
    .withPathParams('id',id)
    .withJson({
        "name": "iphone",
        "price": "5000",
        "quantity": "1"
    })
    .expectStatus(502)
    
});
// it('Deve deletar um produto com sucesso',async () => {
//     await spec()
//     .delete('/api/deleteProduct/:id')
//     .withHeaders('authorization', token)
//     .withPathParams('id',id)
//     .expectStatus(502)
    
// });
# Criar enquete

> ## Caso de sucesso

- [x] 1 Recebe uma requisição do tipo **POST** na rota **/api/surveys**
- [x] 2 Valida se a requisição foi feita por um **admin**
- [x] 3 Valida dados obrigatórios **question** e **answers**
- [x] 4 **Cria** uma enquete com os dados fornecidos
- [x] 5 Retorna **204**, sem dados

> ## Exceções

- [x] 1 Retorna erro **404** se a API não existir
- [x] 2 Retorna erro **403** se o usuário não for admin
- [x] 3 Retorna erro **400** se question ou answers não forem fornecidos pelo client
- [x] 4 Retorna erro **500** se der erro ao tentar criar a enquete

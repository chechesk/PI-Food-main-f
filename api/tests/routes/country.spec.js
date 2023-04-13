/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');


const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  image: 'https://www.cocinacaserayfacil.net/wp-content/uploads/2017/06/Arepa-de-pollo.jpg',
  summary: "400g de harina de maíz. Según las personas que me siguen en las redes sociales, la mejor marca para ello es la marca p.a.n (muy fácil de encontrar en España) 400 ml de agua   2 pechugas de pollo   1 aguacate   1 cebolla   Unas cucharadas de mayonesa Cilantro sal y pimienta Aceite de oliva",
  healthscore: '99',
  steps: 'Para preparar las arepas, ponemos el agua tibia en un cuenco y le añadimos una pizca de sal. Después añadimos la harina, poco a poco, hasta obtener una masa muy suave, que apenas se pegue a las manos pero, que tampoco quede seca. La trabajamos un poco y hacemos 4 bolas con ella. Cada bola pesará cerca de 250g. Dejamos reposar la masa, tapada, 10 minutos.',
  createdInDb: 'true',
  diets: 'low fodmap',
};

describe('http://localhost:3001/recipe', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET http://localhost:3001', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

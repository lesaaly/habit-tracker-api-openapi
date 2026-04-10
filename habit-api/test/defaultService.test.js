const { expect } = require('chai');

const DefaultService = require('../services/DefaultService');

describe('DefaultService', () => {
  it('habitsGET возвращает пустой список по умолчанию', async () => {
    const result = await DefaultService.habitsGET();
    expect(result).to.have.property('code', 200);
    expect(result).to.have.property('payload');
    expect(result.payload).to.be.an('array').that.is.empty;
  });

  it('habitsPOST создаёт привычку и возвращает 201', async () => {
    const result = await DefaultService.habitsPOST({ name: 'Drink water' });
    expect(result).to.have.property('code', 201);
    expect(result).to.have.property('payload');
    expect(result.payload).to.include({
      name: 'Drink water',
      streak: 0,
    });
    expect(result.payload).to.have.property('id').that.is.a('number');
    expect(result.payload).to.have.property('created_at').that.is.a('string');
  });
});

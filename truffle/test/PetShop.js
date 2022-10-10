const PetShop = artifacts.require('./PetShop.sol')
const petId = 1

contract('PetShop', function (accounts) {
  it('Pet should be adopted successful.', function () {
    let shop
    return PetShop.deployed()
      .then(instance => {
        shop = instance
        return shop.adopt(petId)
      })
      .then(() => {
        return shop.isAdopted(petId)
      })
      .then(adopted => {
        assert.equal(adopted, true, 'Adopt failed!')
      })
  })

  it('Adopted Pets should be matched.', function () {
    return PetShop.deployed()
      .then(instance => {
        return instance.getAdoptedPets()
      })
      .then(pets => {
        assert.equal(pets[0].toString(10), petId, `Pet's status err.`)
      })
  })
})

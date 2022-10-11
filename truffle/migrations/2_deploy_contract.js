const PetShow = artifacts.require("./PetShop.sol");

module.exports = function (deployer) {
  deployer.deploy(PetShow);
};

// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract PetShop {

    // define struct of the pet
    struct Pet {
        address adopter;
        bool adopted;
    }

    // define hashmap for pets
    mapping (uint=>Pet) pets;
    // define variable for adoped pet list
    uint[] public adoptedPetList;

    // define event
    event AdoptedEvent(uint petId, address adopter);

    // define an adoped method.
    // store petId as key and Pet as value in map named pets.
    // store petId in adoptedPetList.
    // notify front-end by emitting event.
    // return true
    function adopt(uint petId) public returns (bool) {
        pets[petId] = Pet({ adopter: msg.sender, adopted: true });
        adoptedPetList.push(petId);
        emit AdoptedEvent(petId, msg.sender);
        return true;
    }

    // return pet's adopted status
    function isAdopted(uint petId) public view returns (bool) {
        return pets[petId].adopted;
    }

    function getAdoptedPets() public view returns (uint[] memory) {
        return adoptedPetList;
    }
}

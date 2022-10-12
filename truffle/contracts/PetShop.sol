// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract PetShop {

    // Define struct of the pet
    struct Pet {
        address adopter;
        bool adopted;
    }

    // Define hashmap for pets
    mapping (uint => Pet) pets;
    // Define variable for adoped pet list
    uint[] public adoptedPetList;

    // Define event
    event AdoptedEvent(uint petId, address adopter);

    // Define an adoped method.
    // Store petId as key and Pet as value in map named pets.
    // Store petId in adoptedPetList.
    // Notify front-end by emitting event.
    // Return true
    function adopt(uint petId) public {
        pets[petId] = Pet({ adopter: msg.sender, adopted: true });
        adoptedPetList.push(petId);
        emit AdoptedEvent(petId, msg.sender);
    }

    // Return pet's adopted status
    function isAdopted(uint petId) public view returns (bool) {
        return pets[petId].adopted;
    }

    // Return adopted pets
    function getAdoptedPets() public view returns (uint[] memory) {
        return adoptedPetList;
    }
}

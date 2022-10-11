<template>
  <div class="pets-page">
    <div class="pet-title">Devie's Pet Shop</div>
    <div class="pet-list">
      <template v-for="pet in pets" :key="pet.id">
        <div class="pet-item-container">
          <div class="pet-item">
            <div class="pet-item-head">{{ pet.name }}</div>
            <div class="pet-item-body">
              <img :src="getAssetUrl(pet.picture)" />
              <p>
                <strong>Breed</strong>:
                <span>{{ pet.breed }}</span>
              </p>
              <p>
                <strong>Age</strong>:
                <span>{{ pet.age }}</span>
              </p>
              <p>
                <strong>Location</strong>:
                <span>{{ pet.location }}</span>
              </p>
              <div class="pet-btns">
                <n-button size="small" :disabled="pet.status === 'Adopted'" @click="adoptHanlder(pet)">
                  {{ pet.status }}
                </n-button>
                <n-button type="primay" tertiary size="small">Details</n-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pets',
}
</script>

<script setup>
import petData from './pet-data'
import { ref } from 'vue'
import { useAssets } from '@hooks/index'
import { ethStore } from '@stores/index'
import { NButton } from 'naive-ui'

const pets = ref(petData || [])
const { getAssetUrl } = useAssets()

// Update pet's status
function _updatePetStatus(pet) {
  try {
    const adopted = ethStore.contracts['PetShop'].methods.isAdopted(pet.id).call()
    pet.status = pet.status === 'Adopt' ? 'Adopted' : 'Adopt'
  } catch (err) {
    console.error(err)
  }
}

// Define adopted method
async function adoptHanlder(pet) {
  try {
    if (ethStore.contracts['PetShop'].isAdopted(pet.id).call()) {
      return
    }
    // 1.Call the adopt method of smart contract
    await ethStore.contracts['PetShop'].methods.adopt(pet.id).send({ from: ethStore.account, gas: 1000000 })

    // 2.Excute _updatePetStatus() method
    _updatePetStatus(pet)
  } catch (err) {
    console.error(err)
  }
}
</script>

<style lang="less" scoped>
@import url('./pets.less');
</style>

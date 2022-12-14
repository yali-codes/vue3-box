<template>
  <div class="pets-page">
    <div class="pet-title">
      <span>Devie's Pet Shop</span>
      <n-button size="small" type="primary" @click="$router.back()">Back</n-button>
    </div>
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
                <n-button size="small" :disabled="pet.statusText === 'Adopted'" @click="adoptHanlder(pet)">
                  {{ pet.statusText }}
                </n-button>
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
import { onMounted, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useAssets } from '@hooks/index'
import { ethStore } from '@stores/index'
import { $message } from '@libs/global-api'

const pets = ref(petData || [])
const { getAssetUrl } = useAssets()

onMounted(() => {
  _markAdoptedPets()
  _monitorBlockEvent()
})

function _monitorBlockEvent() {
  ethStore.contracts['PetShop'].events.AdoptedEvent({ filter: {}, fromBlock: 'latest' }, err => {
    if (err) return
    _markAdoptedPets()
  })
}

async function _markAdoptedPets() {
  const adoptedPetIds = await ethStore.contracts['PetShop'].methods.getAdoptedPets().call()
  if (adoptedPetIds.length) {
    const tempAdoptedPetIds = adoptedPetIds.map(petId => Number(petId))
    pets.value.forEach(pet => (tempAdoptedPetIds.includes(pet.id) ? (pet.statusText = 'Adopted') : 'Adopt'))
  }
}

// Define adopted method
async function adoptHanlder(pet) {
  try {
    // Judge whether the pet has been adopted
    if (await ethStore.contracts['PetShop'].methods.isAdopted(pet.id).call()) {
      return
    }

    // Call the adopt method of smart contract
    await ethStore.contracts['PetShop'].methods.adopt(pet.id).send({ from: ethStore.account, gas: 1000000 })

    // Pop-up success message
    $message.success('Adopt successfully!')
  } catch (err) {
    console.error(err)
  }
}
</script>

<style lang="less" scoped>
@import url('./pets.less');
</style>

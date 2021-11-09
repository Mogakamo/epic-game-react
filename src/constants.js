const CONTRACT_ADDRESS = '0x16F2B76d1eeC7D00764b69F133B202599Cc5E0F4'

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  }
}

export {CONTRACT_ADDRESS, transformCharacterData}
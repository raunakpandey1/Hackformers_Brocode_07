require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    }
  },
    paths: {
    artifacts: "./src/artifacts",
  }
};

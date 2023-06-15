import { ethers, run, network } from "hardhat"
import { SimpleStorage } from "../typechain-types"

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const address = await simpleStorage.getAddress()
    console.log(`Deployed to: ${address}`)
    // We only verify on a testnet!
    // if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //     // 6 blocks is sort of a guess
    //     await simpleStorage.deploymentTransaction
    //     await verify(simpleStorage.address, [])
    // }
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        // If is not local network:
        console.log("Waiting for block confirmations...")
        await simpleStorage.deploymentTransaction()?.wait(6)
        await verify(address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log("currentValue: ", currentValue)

    // Update current value
    const transactionResponse = await simpleStorage.store(24)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log("updatedValue: ", updatedValue)
}

async function verify(contractAddress: string, args: any) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified.")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

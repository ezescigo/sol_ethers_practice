import { ethers } from "ethers";
import fs from "fs-extra";
import * as dotenv from "dotenv";

async function main() {
  dotenv.config();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  // const pv = process?.env.PRIVATE_KEY ?? "";
  const encryptedJsonKey = await ethers.encryptKeystoreJson(
    wallet,
    process.env.PRIVATE_KEY_PASSWORD ?? ""
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

main();

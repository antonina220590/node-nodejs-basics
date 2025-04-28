import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const folder_path = path.join(__currentFolderPath, folder_name);
const file_name = "fileToCalculateHashFor.txt";
const file_path = path.join(folder_path, file_name);
const error_message = "FS operation failed";

const calculateHash = async () => {
  try {
    await fs.promises.access(file_path, fs.constants.R_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(error_message);
    }
    throw error;
  }

  const file_stream = fs.createReadStream(file_path);
  const hash = crypto.createHash("sha256");

  try {
    await pipeline(file_stream, hash);
    const hash_hex = hash.digest("hex");
    return hash_hex;
  } catch (error) {
    console.error(`Error during hash calculation pipeline: ${error.message}`);
    if (error.code === "ENOENT") {
      throw new Error(error_message);
    }
    throw error;
  }
};

(async () => {
  try {
    const result = await calculateHash();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
})();

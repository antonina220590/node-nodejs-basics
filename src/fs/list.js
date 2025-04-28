import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const error_message = "FS operation failed";
const folder_path = path.join(__currentFolderPath, folder_name);

const list = async () => {
  try {
    const files = await fs.readdir(folder_path);
    console.log(files);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      throw new Error(error_message);
    } else {
      console.error(`Error reading directory: ${error.message}`);
      throw error;
    }
  }
};

try {
  await list();
} catch (error) {
  console.error(error.message);
}

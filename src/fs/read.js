import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const file_to_read = "fileToRead.txt";
const folder_name = "files";
const error_message = "FS operation failed";

const folder_path = path.join(__currentFolderPath, folder_name);
const file_path = path.join(folder_path, file_to_read);

const read = async () => {
  try {
    const content = await fs.readFile(file_path, { encoding: "utf8" });
    console.log(content);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      throw new Error(error_message);
    } else {
      console.error(`Error reading file: ${error.message}`);
      throw error;
    }
  }
};

try {
  await read();
} catch (error) {
  console.error(error.message);
}

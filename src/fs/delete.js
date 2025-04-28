import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const target_file = "fileToRemove.txt";
const error_message = "FS operation failed";

const folder_path = path.join(__currentFolderPath, folder_name);
const target_file_path = path.join(folder_path, target_file);

const remove = async () => {
  try {
    await fs.unlink(target_file_path);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(error_message);
    } else {
      console.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  }
};

try {
  await remove();
} catch (error) {
  console.error(error.message);
}

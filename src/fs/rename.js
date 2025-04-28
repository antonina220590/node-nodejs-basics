import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const folder_name = "files";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_path = path.join(__currentFolderPath, folder_name);

const wrong_name = "wrongFilename.txt";
const correct_name = "properFilename.md";
const error_message = "FS operation failed";

const wrong_path = path.join(folder_path, wrong_name);
const correct_path = path.join(folder_path, correct_name);

const rename = async () => {
  try {
    await fs.access(correct_path, fs.constants.F_OK);
    throw new Error(error_message);
  } catch (error) {
    if (error.message === error_message) {
      throw error;
    } else if (error.code !== "ENOENT") {
      console.error(`Error checking destination path access: ${error.message}`);
      throw error;
    }
  }

  try {
    await fs.access(wrong_path, fs.constants.F_OK);
  } catch (error) {
    console.error(`Error accessing source file: ${error.message}`);
    throw new Error(error_message);
  }

  try {
    await fs.rename(wrong_path, correct_path);
  } catch (error) {
    console.error(`Failed to rename file: ${error.message}`);
    throw error;
  }
};

try {
  await rename();
} catch (error) {
  console.error(error.message);
}

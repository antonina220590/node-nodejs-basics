import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const original_folder_name = "files";
const target_folder_name = "files_copy";
const error_message = "FS operation failed";

const original_folder_path = path.join(
  __currentFolderPath,
  original_folder_name
);
const target_folder_path = path.join(__currentFolderPath, target_folder_name);

const copy = async () => {
  try {
    await fs.access(target_folder_path, fs.constants.F_OK);
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
    await fs.access(original_folder_path, fs.constants.F_OK);
  } catch (error) {
    throw new Error(error_message);
  }

  try {
    await fs.cp(original_folder_path, target_folder_path, { recursive: true });
  } catch (error) {
    console.error(`Failed to copy folder: ${error.message}`);
    throw new Error(error_message);
  }
};

try {
  await copy();
} catch (error) {
  console.error(error.message);
}

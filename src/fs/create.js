import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
console.log("filename", __currentFilePath);
const __currentFolderPath = path.dirname(__currentFilePath);
console.log("dirname", __currentFolderPath);

const folder_name = "files";
const file_name = "fresh.txt";

const targetFolderPath = path.join(__currentFolderPath, folder_name);
console.log("folderPath", targetFolderPath);
const targetFilePath = path.join(targetFolderPath, file_name);
console.log("filePath", targetFilePath);

const create = async () => {
  try {
    await mkdir(targetFolderPath, { recursive: true });
    await writeFile(targetFilePath, "");
  } catch (error) {
    console.error(`Creating file error: ${error.message}`);
  }
};

await create();

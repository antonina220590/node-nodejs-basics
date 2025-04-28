import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const file_name = "fresh.txt";
const file_content = "I am fresh and young";
const error_message = "FS operation failed";

const targetFolderPath = path.join(__currentFolderPath, folder_name);
const targetFilePath = path.join(targetFolderPath, file_name);

const create = async () => {
  try {
    await mkdir(targetFolderPath, { recursive: true });
    await writeFile(targetFilePath, file_content, {
      flag: "wx",
      encoding: "utf8",
    });
    console.log(
      `File ${file_name} created successfully in ${targetFolderPath}`
    );
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error(error_message);
    } else {
      console.error(`An unexpected error: ${error.message}`);
      throw error;
    }
  }
};

try {
  await create();
} catch (error) {
  console.error(error.message);
}

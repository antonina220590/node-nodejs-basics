import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const file_name = "fileToWrite.txt";

const folder_path = path.join(__currentFolderPath, folder_name);
const file_path = path.join(folder_path, file_name);

const write = () => {
  try {
    fs.mkdirSync(folder_path, { recursive: true });
  } catch (mkdirError) {
    console.error(
      `Error creating directory ${folder_path}: ${mkdirError.message}`
    );
    process.exit(1);
  }
  const writableStream = fs.createWriteStream(file_path);

  writableStream.on("error", (error) => {
    console.error(`Error writing to file: ${error.message}`);
  });

  writableStream.on("finish", () => {
    console.log(`Finished writing data from stdin to ${file_name}`);
  });

  process.stdin.pipe(writableStream);
  process.stdin.on("error", (err) => {
    console.error(`Error reading from stdin: ${err.message}`);
  });
};

write();

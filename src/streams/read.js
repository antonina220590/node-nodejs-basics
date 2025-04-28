import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const file_name = "fileToRead.txt";

const folder_path = path.join(__currentFolderPath, folder_name);
const file_path = path.join(folder_path, file_name);

const readFileStream = () => {
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(file_path, { encoding: "utf8" });

    let dataReceived = false;
    readableStream.on("data", (chunk) => {
      dataReceived = true;
    });

    readableStream.on("error", (err) => {
      console.error(`Error reading file: ${err.message}`);
      reject(err);
    });

    readableStream.on("end", () => {
      console.log("Stream ended");
      if (!dataReceived) {
        console.log("file might be empty");
      }
      resolve();
    });
    readableStream.pipe(process.stdout);
  });
};

(async () => {
  try {
    await readFileStream();
  } catch (error) {
    console.error(error.message);
  }
})();

import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const file_path = path.join(__currentFolderPath, folder_name);

const origin_file = "archive.gz";
const target_file = "fileToCompress.txt";
const origin_path = path.join(file_path, origin_file);
const target_path = path.join(file_path, target_file);

const decompress = async () => {
  try {
    await fs.promises.mkdir(file_path, { recursive: true });
  } catch (mkdirError) {
    console.error(`Error creating directory`);
    throw mkdirError;
  }
  const source_stream = fs.createReadStream(origin_path);
  const gunzip_stream = zlib.createGunzip();
  const destination_stream = fs.createWriteStream(target_path);

  try {
    await pipeline(source_stream, gunzip_stream, destination_stream);
  } catch (error) {
    console.error("Decompression failed:", error.message);
    if (error.code === "ENOENT" && error.path === target_path) {
      console.error(`Error Detail: Source archive not found at ${file_path}`);
    }
    if (error.code === "Z_DATA_ERROR" || error.code === "Z_BUF_ERROR") {
      console.error(
        `Error Detail: Input file is likely not a valid Gzip archive.`
      );
    }
    throw error;
  }
};

(async () => {
  try {
    await decompress();
  } catch (error) {
    console.error("Decompression failed");
  }
})();

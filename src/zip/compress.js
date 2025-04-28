import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentFolderPath = path.dirname(__currentFilePath);
const folder_name = "files";
const file_path = path.join(__currentFolderPath, folder_name);

const origin_file = "fileToCompress.txt";
const target_file = "archive.gz";
const origin_path = path.join(file_path, origin_file);
const target_path = path.join(file_path, target_file);

const compress = async () => {
  try {
    await fs.promises.mkdir(file_path, { recursive: true });
  } catch (mkdirError) {
    console.error(`Error: ${mkdirError.message}`);
  }
  const source_stream = fs.createReadStream(origin_path);
  const gzip_stream = zlib.createGzip();
  const destination_stream = fs.createWriteStream(target_path);

  try {
    await pipeline(source_stream, gzip_stream, destination_stream);
  } catch (error) {
    console.error("Compression failed:", error.message);
    if (error.code === "ENOENT" && error.path === origin_path) {
      console.error(`Error: Source file not found at ${origin_path}`);
    }
  }
};

compress();

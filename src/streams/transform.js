import { Transform } from "node:stream";
class ReverseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const chunkString = chunk.toString("utf8");
    let reversedString;
    if (chunkString.endsWith("\n")) {
      reversedString =
        chunkString.slice(0, -1).split("").reverse().join("") + "\n";
    } else {
      reversedString = chunkString.split("").reverse().join("");
    }
    this.push(reversedString);
    callback();
  }
}

const transform = () => {
  const reverseStream = new ReverseTransform();
  process.stdin.pipe(reverseStream).pipe(process.stdout);

  process.stdin.on("error", (err) => console.error("Stdin Error:", err));
  reverseStream.on("error", (err) => console.error("Transform Error:", err));
  process.stdout.on("error", (err) => console.error("Stdout Error:", err));
  reverseStream.on("finish", () => {
    console.log("Transformation finished");
  });
};

transform();

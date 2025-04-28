const parseArgs = () => {
  const args = process.argv.slice(2);
  const pairs = [];

  for (let i = 0; i < args.length; i += 2) {
    const prefixKey = args[i];
    const value = args[i + 1];

    if (prefixKey && prefixKey.startsWith("--")) {
      const key = prefixKey.slice(2);
      pairs.push(`${key} is ${value}`);
    }
  }
  const output = pairs.join(", ");
  console.log(output);
};

parseArgs();

const prefix = "RSS_";
const parseEnv = () => {
  const envObj = process.env;
  const envKeys = Object.keys(envObj);
  const filteredKeys = envKeys.filter((key) => key.startsWith(prefix));
  const pairs = filteredKeys.map((key) => {
    const value = envObj[key];
    return `${key}=${value}`;
  });
  const output = pairs.join("; ");
  console.log(output);
};

parseEnv();

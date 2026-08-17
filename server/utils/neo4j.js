import neo4j from "neo4j-driver";

export const toPlainObject = (value) =>
  JSON.parse(
    JSON.stringify(value, (_, item) =>
      typeof item === "bigint" || neo4j.isInt(item) ? Number(item) : item,
    ),
  );

export const records = (result, key) =>
  result.records
    .map((record) => toPlainObject(record.get(key)))
    .filter((item) => item?.id && item?.name);

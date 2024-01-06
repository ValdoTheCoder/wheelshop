import {
  createTables,
  insertStockIntoDatabase,
  insertWheelsIntoDatabase,
  scrapeWeb,
} from "./utils.js";

export const initialize = async (db) => {
  try {
    await createTables(db);

    const { wheelBase, stock } = await scrapeWeb("all");

    await insertWheelsIntoDatabase(db, wheelBase);
    await insertStockIntoDatabase(db, stock);
  } catch (error) {
    console.error("Error:", error);
  }
};

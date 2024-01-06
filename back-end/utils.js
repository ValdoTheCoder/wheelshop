import puppeteer from "puppeteer";
import {
  ACTIVE_COUNT_QUERY,
  CREATE_ACTIVE_TABLE,
  CREATE_NOTES_TABLE,
  CREATE_STOCK_TABLE,
  CREATE_WHEELS_TABLE,
} from "./queries.js";

const URL =
  "https://wheels2020.com/index.php?cat=all&lang=EN&size=&holes=&range=&et=&design=&color=&select_wheels=Search";

export const TIME_CONFIG = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

export const updateStock = async (db, code, amount, time) => {
  const query =
    "INSERT INTO stock (code, amount, updatedTime)  VALUES (?, ?, ?)";
  db.run(query, [code, amount, time]);
};

export const getStockUpdateTime = (db) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT updatedTime FROM stock LIMIT 1", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getTotalCount = (db) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS total FROM wheels", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getActiveCount = (db) => {
  return new Promise((resolve, reject) => {
    db.get(ACTIVE_COUNT_QUERY, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export async function insertWheelsIntoDatabase(db, data) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      `INSERT INTO wheels
      (fullString, code, designCode, colorCode, size, width, holes, pcd, et, cb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    db.serialize(() => {
      data.forEach((entry) => {
        stmt.run(
          entry.fullString,
          entry.code,
          entry.designCode,
          entry.colorCode,
          entry.size,
          entry.width,
          entry.holes,
          entry.pcd,
          entry.et,
          entry.cb
        );
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

export async function insertStockIntoDatabase(db, data) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO stock (code, amount, updatedTime) VALUES (?, ?, ?)"
    );
    const time = new Date().toLocaleString("default", TIME_CONFIG);

    db.serialize(() => {
      data.forEach((entry) => {
        stmt.run(entry.code, entry.amount, time);
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

export const createTables = async (db) => {
  db.exec(CREATE_WHEELS_TABLE);
  db.exec(CREATE_STOCK_TABLE);
  db.exec(CREATE_NOTES_TABLE);
  db.exec(CREATE_ACTIVE_TABLE);
};

export const scrapeWeb = async (required) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(URL);

    const wheels = await page.$$(".ratlankis");

    const wheelBase = [];
    const stock = [];

    for (const wheel of wheels) {
      const title = await wheel.$$eval(".description_div > font", (elements) =>
        elements
          .map((element) => element.textContent)
          .join()
          .trim()
      );
      const splitTitle = title.split(" ");
      const code = splitTitle[splitTitle.length - 1];

      if (splitTitle.length < 9) continue;

      if (required === "wheels" || required === "all") {
        const dimensions = splitTitle[0].split("x");
        const holeParams = splitTitle[1].split("X");

        const fullString = title.split("\n")[0];
        const designCode = splitTitle[5];
        const colorCode = splitTitle[6].startsWith("(")
          ? splitTitle[7].endsWith(")")
            ? splitTitle[8]
            : splitTitle[7]
          : splitTitle[6];
        const size = dimensions[0];
        const width = dimensions[1];
        const holes = holeParams[0];
        const pcd = holeParams[1];
        const et = splitTitle[3];
        const cb = splitTitle[4];

        wheelBase.push({
          fullString,
          code,
          designCode,
          colorCode,
          size,
          width,
          holes,
          pcd,
          et,
          cb,
        });
      }

      if (required === "stock" || required === "all") {
        const amount_text = await wheel.$$eval(".kiekis", (elements) =>
          elements
            .map((el) => el.textContent)
            .join()
            .split(" ")
        );

        const amount = amount_text[amount_text.length - 1];
        stock.push({
          code,
          amount,
        });
      }
    }

    await browser.close();

    if (required === "stock") {
      return { stock };
    } else if (required === "wheels") {
      return { wheelBase };
    } else if (required === "all") {
      return { wheelBase, stock };
    } else {
      console.error("Wrong keyword for scraping");
      throw new Error("Wrong keyword");
    }
  } catch (err) {
    console.error(err);
  }
};

scrapeWeb("wheels");

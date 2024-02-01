export const JOINED_TABLES_QUERY = `
SELECT w.*, s.amount, n.notes, a.isActive
FROM wheels w
LEFT JOIN stock s ON w.code = s.code
LEFT JOIN active a ON w.code = a.code
LEFT JOIN notes n ON w.code = n.code`;

export const JOINED_TABLES_COUNT_QUERY = `
SELECT COUNT(*) as total FROM wheels w
LEFT JOIN stock s ON w.code = s.code
LEFT JOIN active a ON w.code = a.code
LEFT JOIN notes n ON w.code = n.code`;

export const ACTIVATE_QUERY = `INSERT OR REPLACE INTO active (code, isActive) VALUES (?, ?);`;

export const NOTE_QUERY =
  "INSERT OR REPLACE INTO notes (code, notes) VALUES (?, ?)";

export const ACTIVE_COUNT_QUERY = `
SELECT
SUM(case when isActive = "ACTIVE" then 1 else 0 end) AS activeTotal,
SUM(case when isActive = "SUSPENDED" then 1 else 0 end) AS suspendedTotal
FROM active;`;

export const GET_JOINED_ENTRY_BY_CODE = `${JOINED_TABLES_QUERY} WHERE w.code = ?`;

export const DELETE_INACTIVE_WHEELS = `
DELETE FROM wheels WHERE modifier IS NULL 
AND
NOT EXISTS (
  SELECT 1
  FROM active
  WHERE wheels.code = active.code
);
`;

export const UPDATE_QUERY = `
UPDATE wheels SET 
designCode = ?,
colorCode = ?,
size = ?,
width = ?,
holes = ?,
pcd = ?,
et = ?,
cb = ?
WHERE code = ?`;

export const CREATE_WHEEL_QUERY = `
INSERT INTO wheels (fullString, code, designCode, colorCode, size, width, holes, pcd, et, cb, modifier)
VALUES (?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, "CUSTOM");
`;

export const CREATE_WHEELS_TABLE = `
CREATE TABLE IF NOT EXISTS wheels (
id INTEGER PRIMARY KEY,
fullString TEXT NOT NULL,
code TEXT NOT NULL UNIQUE,
designCode TEXT NOT NULL,
colorCode TEXT NOT NULL,
size TEXT NOT NULL,
width TEXT NOT NULL,
holes TEXT NOT NULL,
pcd TEXT,
et TEXT NOT NULL,
cb TEXT NOT NULL,
modifier TEXT);`;

export const CREATE_STOCK_TABLE = `
CREATE TABLE IF NOT EXISTS stock (
code TEXT UNIQUE NOT NULL,
amount TEXT NOT NULL,
updatedTime TEXT NOT NULL);`;

export const CREATE_NOTES_TABLE = `
CREATE TABLE IF NOT EXISTS notes (
code TEXT UNIQUE NOT NULL,
notes TEXT);`;

export const CREATE_ACTIVE_TABLE = `
CREATE TABLE IF NOT EXISTS active (
code TEXT UNIQUE NOT NULL,
isActive TEXT);`;

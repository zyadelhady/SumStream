import fs from "fs/promises";
import { Mutex } from "async-mutex";

const sumFilePath = "./sum.txt";
const mutex = new Mutex();

// Initialize file if not exists
export async function initSumFile() {
  try {
    await fs.access(sumFilePath);
  } catch {
    await fs.writeFile(sumFilePath, "0", "utf8");
  }
}

// Read current sum
async function readSum(): Promise<number> {
  const content = await fs.readFile(sumFilePath, "utf8");
  return Number(content) || 0;
}

// Write new sum
async function writeSum(sum: number): Promise<void> {
  await fs.writeFile(sumFilePath, String(sum), "utf8");
}

// Safely update the sum
export async function updateSum(addition: number): Promise<number> {
  return await mutex.runExclusive(async () => {
    const currentSum = await readSum();
    const newSum = currentSum + addition;
    await writeSum(newSum);
    return newSum;
  });
}

export async function getCurrentSum(): Promise<number> {
  return await mutex.runExclusive(async () => {
    return await readSum();
  });
}

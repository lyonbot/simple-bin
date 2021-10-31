import redis = require('redis')
import { gzip, gunzip } from 'zlib'
import { promisify } from "util";

const client = redis.createClient({
  host: 'redis',
  port: 6379,
})

const LIFETIME = 600
const id2Key = (id: string) => `sbin_item_${id}`

export const gzipAsync = promisify(gzip)
export const gunzipAsync = promisify(gunzip)
export const GET = promisify(client.get).bind(client);
export const SETEX = promisify(client.setex).bind(client);

export interface TempMessage {
  value: string;
  modifiedAt: number
}

export const getTempMessage = async (id: string): Promise<null | TempMessage> => {
  const rawStr = await GET(id2Key(id))
  if (!rawStr) return null

  const jsonStr = (await gunzipAsync(Buffer.from(rawStr, 'latin1'))).toString('utf-8');
  return JSON.parse(jsonStr)
}

export const setTempMessage = async (id: string, value: string) => {
  const data: TempMessage = { value, modifiedAt: Date.now() }
  const compressedText = await gzipAsync(Buffer.from(JSON.stringify(data), 'utf-8'))
  await SETEX(id2Key(id), LIFETIME, compressedText.toString('latin1'))
}

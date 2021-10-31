import { ServerRoute } from "@hapi/hapi";
import * as Boom from '@hapi/boom';
import { getTempMessage, setTempMessage } from "../services/tempMessage";

export const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/api/messages/{msgId}',
    async handler(req, h) {
      const { msgId } = req.params

      const result = await getTempMessage(msgId)
      if (!result) return { found: false }

      return { found: true, ...result }
    }
  },
  {
    method: 'POST',
    path: '/api/messages/{msgId}',
    async handler(req, h) {
      const { msgId } = req.params
      const { value } = req.payload as { value: string };

      if (typeof value !== 'string') throw Boom.badRequest('value must be string')

      await setTempMessage(msgId, value)
      return { success: true }
    }
  },
]
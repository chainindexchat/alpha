// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { myContainer } from "@/server/container/inversify.config";
import { TYPES } from "@/server/container/types";
import ChainIndexApi from "@/server/controllers/chainindexApi";

import type { NextApiRequest, NextApiResponse } from "next";

const chainindexApi = myContainer.get<ChainIndexApi>(TYPES.ChainIndexApi)
type Data = {
  message: string;
  data?: Record<string, any>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { url = '', method = "GET", body } = req;
    const decodedUrl = decodeURIComponent(url)
    const [, apiPath] = decodedUrl.split(/^\/api\/chainindex/);
    /* MAKE REQUEST TO BACKEND HERE */
    console.log(method, url, apiPath, body)

    const response = await chainindexApi.request({
      context: { req, res },
      method,
      apiPath,
      body,
    });

    if (response.status >= 400) {
      res.status(response.status).json(response);
    } else { res.status(200).json(response); }
  } catch (e) { console.log(e); return res.status(500).json({ message: "there was an error!" }) }
}

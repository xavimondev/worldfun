import type { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'services'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}

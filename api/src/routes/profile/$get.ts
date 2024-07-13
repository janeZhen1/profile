import { GetObjectCommand, SpaceClient } from '@did-space/client';
import { streamToString } from '@did-space/core';
import type { Request, Response } from 'express';
import { authService, wallet } from '../../libs/auth';

export default async function $get(req: Request, res: Response) {
  const { user } = await authService.getUser(req.user?.did as string);
  if (!user?.didSpace?.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({
    wallet,
    // @ts-ignore
    endpoint: user.didSpace.endpoint,
  });
  try {
    const { data } = await spaceClient.send(
      new GetObjectCommand({
        key: 'profile.json',
      }),
    );
    return res.json({ profile: JSON.parse(await streamToString(data)) });
  } catch (error) {
    if (error.message.includes('404')) {
      return res.json({
        profile: {
          username: '',
          email: '',
          phone: '',
        },
      });
    }
    // console.error(error);
    return res.status(400).send(error.message);
  }
}

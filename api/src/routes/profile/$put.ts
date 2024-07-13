import { PutObjectCommand, SpaceClient } from '@did-space/client';
import type { Request, Response } from 'express';
import { isObject } from 'lodash';
import { authService, wallet } from '../../libs/auth';

export default async function $put(req: Request, res: Response) {
  if (!isObject(req.body.user)) {
    throw new Error('UserInfo must be an object');
  }

  const { user } = await authService.getUser(req.user?.did as string);
  if (!user?.didSpace?.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({
    wallet,
    // @ts-ignore
    endpoint: user.didSpace.endpoint,
  });
  await spaceClient.send(
    new PutObjectCommand({
      key: 'profile.json',
      data: JSON.stringify(req.body.user),
    }),
  );

  return res.send();
}

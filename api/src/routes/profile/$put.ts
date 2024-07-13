import { PutObjectCommand, SpaceClient } from '@did-space/client';
import type { Request, Response } from 'express';
import { isEmpty, isObject, isString } from 'lodash';
import { authService, wallet } from '../../libs/auth';

export default async function $put(req: Request, res: Response) {
  if (!isObject(req.body.user)) {
    throw new Error('UserInfo must be an object');
  }

  if (isEmpty(req.body.user.username) || !isString(req.body.user.username)) {
    throw new Error('username must be an string and required');
  }

  if (isEmpty(req.body.user.email) || !isString(req.body.user.email)) {
    throw new Error('email must be an string and required');
  }

  if (isEmpty(req.body.user.phone) || !isString(req.body.user.phone)) {
    throw new Error('phone must be an string and required');
  }

  if (!/\S+@\S+\.\S+/.test(req.body.user.email)) {
    throw new Error('Email is invalid');
  }

  if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(req.body.user.phone)) {
    throw new Error('Phone number is invalid');
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

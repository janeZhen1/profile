import { ProfileData } from './modal';

function ProfileInfo({ user }: { user: ProfileData }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-2xl text-white">{user?.username || '--'}</div>
      <div className="text-sm text-white">
        {' '}
        <b>email: </b>
        {user?.email || '--'}
      </div>
      <div className="text-sm text-white">
        {' '}
        <b>phone: </b>
        {user?.phone || '--'}
      </div>
    </div>
  );
}

export default ProfileInfo;

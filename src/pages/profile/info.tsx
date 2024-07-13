import { ProfileData } from './modal';

function ProfileInfo({ user }: { user: ProfileData }) {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="w-[100px] md:w-[170px] aspect-square rounded-full border-2 border-[#eb196e] mx-auto overflow-hidden mb-6">
        <img
          src={
            user?.avatar || 'https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png'
          }
          className="w-full h-full object-cover"
          alt="avatar"
        />
      </div>

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

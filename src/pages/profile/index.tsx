import { useState } from 'react';

import ProfileEdit from './edit';
import './index.css';
import ProfileInfo from './info';
import { ProfileData } from './modal';

function Profile() {
  const [user, setUser] = useState<ProfileData>({
    username: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  });
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (editUser: ProfileData) => {
    setUser(editUser);
    setEditing(false);
  };

  return (
    <div className="mx-auto w-full max-w-[360px] p-5 md:p-14  shadow-2xl mt-20 rounded-md bg-[#222831] flex flex-col items-center gap-10 ">
      <img
        src="https://img.keaitupian.cn/uploads/upimg/1601432924978286.png"
        className="rounded-full border-2 border-[#eb196e]"
        width="170"
        alt="avatar"
      />
      {editing ? <ProfileEdit user={user} onProfileUpdate={handleSave} /> : <ProfileInfo user={user} />}

      {!editing ? (
        <button type="button" className="draw-border w-full p-4 rounded-none font-bold mt-4" onClick={handleEdit}>
          EDIT
        </button>
      ) : null}
    </div>
  );
}

export default Profile;

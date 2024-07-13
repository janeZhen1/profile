import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import { useSessionContext } from '../../contexts/session';
import axios from '../../libs/api';
import RequiredLogin from '../required-login';
import ProfileEdit from './edit';
import './index.css';
import ProfileInfo from './info';
import { ProfileData } from './modal';

function Profile() {
  const [user, setUser] = useState<ProfileData>({ username: '', email: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { session } = useSessionContext();

  const fetchProfile = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response: AxiosResponse<{ profile: ProfileData }, any> = await axios.get('/api/profile');
      setUser(response.data.profile);
    } catch (error) {
      console.error(error);
      setUser({ username: '', email: '', phone: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  useEffect(() => {
    if (editing) return;
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  if (!session.user) {
    return <RequiredLogin />;
  }

  return (
    <div className="mx-auto w-full max-w-[360px] p-5 md:p-14  shadow-2xl mt-20 rounded-md bg-[#222831] flex flex-col items-center gap-4 relative">
      {editing ? <ProfileEdit user={user} onProfileUpdate={handleSave} /> : <ProfileInfo user={user} />}
      {loading && <div className="text-slate-600 text-base">Data refreshing...</div>}

      {!editing ? (
        <button
          type="button"
          className="draw-border w-full p-4 rounded-none font-bold mt-4 is-loading"
          onClick={handleEdit}>
          EDIT
        </button>
      ) : null}
    </div>
  );
}

export default Profile;

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../libs/api';
import './index.css';
import { ProfileData } from './modal';

function ProfileEdit({ user, onProfileUpdate }: { user: ProfileData; onProfileUpdate: () => void }) {
  const [editUser, setEditUser] = useState<ProfileData>(user);
  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!editUser.username) {
      newErrors.username = 'Username is required';
    }

    if (!editUser.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!editUser.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(editUser.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSave = async () => {
    if (loading) return;
    try {
      setLoading(true);
      if (validate()) {
        await axios.put('/api/profile', {
          user: editUser,
        });
        toast.success('Update profile successfully');
        onProfileUpdate();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="input-box">
        <label htmlFor="username">NAME:</label>
        <input type="text" name="username" id="username" value={editUser?.username} onChange={handleChange} required />
        {errors.username && <p className="text-red-500 text-sm text-left">{errors.username}</p>}
      </div>
      <div className="input-box">
        <label htmlFor="email">EMAIL:</label>
        <input type="email" name="email" id="email" value={editUser?.email} onChange={handleChange} required />
        {errors.email && <p className="text-red-500 text-sm text-left">{errors.email}</p>}
      </div>
      <div className="input-box">
        <label htmlFor="phone">PHONE:</label>
        <input type="tel" name="phone" id="phone" value={editUser?.phone} onChange={handleChange} required />
        {errors.phone && <p className="text-red-500 text-sm text-left">{errors.phone}</p>}
      </div>
      <button type="button" className="draw-border w-full p-4  rounded-none font-bold" onClick={handleSave}>
        {loading ? 'Loading...' : 'SAVE'}
      </button>
    </div>
  );
}

export default ProfileEdit;

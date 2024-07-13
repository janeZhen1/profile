import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

function Avatar({ avatar, updateAvatar }: { avatar?: string; updateAvatar: (avatar: string) => void }) {
  const [editAvatar, setEditAvatar] = useState<string>(avatar || '');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size > 1048576) {
      // 1MB = 1048576 bytes
      toast.error('File size exceeds 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setEditAvatar(e.target?.result as string);
      updateAvatar(e.target?.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'] },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} className="w-full mb-4">
      <input {...getInputProps()} />
      <div className="w-[170px] h-[170px] rounded-full border-2 border-[#eb196e] mx-auto overflow-hidden">
        {editAvatar ? (
          <img src={editAvatar} className="w-full h-full object-cover" alt="avatar" />
        ) : (
          <div className="w-full h-full bg-white text-slate-400 flex items-center justify-center cursor-pointer">
            Upload
          </div>
        )}
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  avatar: '',
};

export default Avatar;

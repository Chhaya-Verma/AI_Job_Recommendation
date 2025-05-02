// src/utils/uploadProfileImage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadProfileImage = async (file: File, userId: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

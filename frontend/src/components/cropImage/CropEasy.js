import { useState } from "react";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";

import toast from "react-hot-toast";
import { updateUserAvatar } from "@services/user";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userActions } from "@store/reducers/userReducer";

const CropEasy = ({ photo, setOpenCrop, refetch }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [avatarKey, setAvatarKey] = useState(Date.now());
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const mutation = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateUserAvatar({
        token: token,
        formData: formData,
      });
    },
    onError: (error) => {
      toast.error("Failed to update Avatar. Please try again.");
      console.error(error);
    },
    onSuccess: (data) => {
      // Update local state immediately after a successful mutation
      const updatedData = { ...userState.userInfo, avatar: data.avatar }; // Assuming data.avatar is the new avatar URL
      dispatch(userActions.setUserInfo(updatedData));

      // Get the existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("account")) || {};

      // Merge the new data with the existing data
      const mergedData = { ...existingData, ...updatedData };

      // Update local storage with the merged data
      localStorage.setItem("account", JSON.stringify(mergedData));

      // Dispatch and show success toast
      dispatch(userActions.setUserInfo(mergedData));

      setAvatarKey(Date.now());
      toast.success("Avatar updated successfully");
      refetch();
    },
  });

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      if (!photo || !photo.url || !croppedAreaPixels) {
        toast.error(
          "Invalid photo data. Please select a valid photo and crop area."
        );
        return;
      }

      const croppedImg = await getCroppedImg(photo.url, croppedAreaPixels);
      const file = new File([croppedImg.file], `${photo.file?.name}`, {
        type: photo?.file?.type,
      });
      const formData = new FormData();
      formData.append("avatar", file);

      // Trigger the mutation with the token and formData
      mutation.mutate({ token: userState.userInfo.token, formData: formData });
      // Close the crop modal
      setOpenCrop(false);
    } catch (error) {
      toast.error("Failed to update Avatar. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      key={avatarKey}
      className="fixed z-[1000] inset-0  flex justify-center p-5 overflow-auto bg-slate-900 backdrop-filter backdrop-blur-xl bg-opacity-10"
    >
      <div className="bg-slate-200 h-fit w-full sm:max-w-[350px] p-5 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <h2 className="font-semibold text-white text-center mb-2">
          Crop Image
        </h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg text-slate-700 hover:text-white border border-red-500 text-sm hover:opacity-70 hover:bg-red-600 "
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-white bg-green-600 text-sm hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;

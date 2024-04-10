import { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import Confirmation from "./Confirmation";
import CropEasy from "@components/cropImage/CropEasy";
import { deleteAvatar } from "@services/user";
import { userActions } from "@store/reducers/userReducer";

const AvatarComponent = ({ avatar, refetch }) => {
  const { userInfo } = useSelector((state) => state.user);
  const imageUrl = `http://localhost:4000/uploads/${avatar}`;
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: file ? URL.createObjectURL(file) : null, file });
    setOpenCrop(true);
  };
  const { mutate: mutateDelete, isLoading: loadingDelete } = useMutation({
    mutationFn: ({ token }) => {
      return deleteAvatar({ token });
    },
    onSuccess: (data) => {
      const updatedData = { ...userInfo, avatar: data.avatar };
      dispatch(userActions.setUserInfo(updatedData));
      const existingData = JSON.parse(localStorage.getItem("account")) || {};
      const mergedData = { ...existingData, ...updatedData };
      localStorage.setItem("account", JSON.stringify(mergedData));
      dispatch(userActions.setUserInfo(mergedData));
      toast.success(data.message);
      setConfirmationModal(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleConfirmDelete = () => {
    mutateDelete({ token: userInfo.token });
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy
            refetch={refetch}
            photo={photo}
            setOpenCrop={setOpenCrop}
          />,
          document.getElementById("portal")
        )}

      {confirmationModal && (
        <Confirmation
          onCancel={() => setConfirmationModal(false)}
          onConfirm={handleConfirmDelete}
          loadingDelete={loadingDelete}
          message={"Are you sure you want to delete avatar?"}
        />
      )}

      <div className="w-full flex items-center justify-center my-4 gap-x-5">
        <div className="relative w-16 h-16 rounded-full outline outline-offset-2 outline-w outline-primary overflow-hidden">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={imageUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={() => setConfirmationModal(true)}
          type="button"
          className="border text-white rounded-lg px-4 py-2 bg-red-500 hover:opacity-70"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default AvatarComponent;

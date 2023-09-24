import { FC, useState, useRef } from "react";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { IimageInputData } from "../../../interfaces/imageInputData";
import "./index.scss";

interface IfileInput {
  handleImageData: (data: IimageInputData) => void;
  handleWipeImageData: () => void;
}

const FileInput: FC<IfileInput> = ({
  handleImageData,
  handleWipeImageData,
}) => {
  const [image, setImage] = useState("");
  const inputRef = useRef<any>();

  const handleInputClick = () => {
    inputRef.current.click();
  };

  const handleChosenImage = (e: any) => {
    const filesList = e.target.files[0];

    if (filesList) {
      setImage(URL.createObjectURL(filesList));
      handleImageData({
        imageName: filesList.name,
        image: filesList,
      });
    }
  };

  const removePreview = () => {
    setImage("");
    handleWipeImageData();
    inputRef.current.value = null;
  };

  return (
    <div className="upload__container">
      {image.length > 0 ? (
        <div className="upload__imagePreview">
          <button
            type="button"
            className="upload__imagePreview__close"
            onClick={removePreview}
          >
            <Close />
          </button>
          <img src={image} alt="Profile picture preview" />
        </div>
      ) : (
        <div className="upload__choose">
          <AddPhotoAlternate
            fontSize="large"
            color="primary"
            onClick={handleInputClick}
          />
          <p>Click on the icon above and choose a picture</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        name="fileUpload"
        ref={inputRef}
        className="upload__input"
        onChange={handleChosenImage}
      />
    </div>
  );
};

export default FileInput;

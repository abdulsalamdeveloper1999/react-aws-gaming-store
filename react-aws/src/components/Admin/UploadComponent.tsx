import { Upload } from "lucide-react";
import { useRef, useState, type ChangeEventHandler } from "react";
import "./UploadComponent.css";
import { fileToDataString } from "./utils";

function UploadComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewImageSrc, setPreviewImageSrc] = useState<string>();

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setPreviewImageSrc(await fileToDataString(file));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,

        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "200px",
          marginLeft: "20px",
          marginRight: "20px",
          flexDirection: "column",
          border: "2px dashed #D1D5DA",
          padding: "10px",
          borderRadius: "12px",
          borderColor: "#D1D5DA",
          alignItems: "center",
          display: "flex",
        }}
      >
        {previewImageSrc == null ? (
          <>
            <Upload color="#9BA3AF" size={40} />
            <h3>Drag & drop images here</h3>
            <p>or</p>
            <p style={{ color: "#D1D5DA" }}>
              Supports: JPG, PNG, WebP (Max 5MB each)
            </p>
          </>
        ) : (
          <img
            style={{ width: "50vw", height: "200px", borderRadius: "12px" }}
            src={previewImageSrc}
            alt=""
          />
        )}
      </div>

      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChangeFile}
        accept="image/*"
      />
      <button className="uplaodButton" onClick={handleButtonClick}>
        Browse Files
      </button>
    </div>
  );
}

export default UploadComponent;

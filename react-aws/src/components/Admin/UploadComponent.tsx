import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import { Upload } from "lucide-react";
import "./UploadComponent.css";
import { fileToDataString } from "./utils";

interface UploadComponentProps {
  onFileSelect: (file: File) => void;
  resetSignal: boolean;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  onFileSelect,
  resetSignal,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImageSrc, setPreviewImageSrc] = useState<string>();
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (resetSignal) {
      setPreviewImageSrc(undefined);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [resetSignal]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB");
      return;
    }

    try {
      const dataString = await fileToDataString(file);
      setPreviewImageSrc(dataString);
      onFileSelect(file);
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error processing file. Please try again.");
    }
  };

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileSelect(file);
    }
  };

  return (
    <div className="upload-component">
      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""} ${
          previewImageSrc ? "has-image" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {!previewImageSrc ? (
          <div className="upload-content">
            <Upload className="upload-icon" size={40} />
            <h3 className="upload-title">Drag & drop images here</h3>
            <p className="upload-or">or</p>
            <p className="upload-hint">
              Supports: JPG, PNG, WebP (Max 5MB each)
            </p>
          </div>
        ) : (
          <img className="preview-image" src={previewImageSrc} alt="Preview" />
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleChangeFile}
        accept="image/*"
        className="file-input"
      />

      <button
        type="button"
        className="upload-button"
        onClick={handleButtonClick}
      >
        Browse Files
      </button>
    </div>
  );
};

export default UploadComponent;

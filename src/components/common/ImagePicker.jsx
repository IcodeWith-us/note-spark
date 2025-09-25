import useImagePicker from "@/hooks/useImagePicker";
function ImagePicker({ onImageSelect, filePreview }) {
  const { getRootProps, getInputProps } = useImagePicker({
    onImageSelect,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-md p-4 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      {!filePreview ? (
        <p className="text-gray-500">Click or drag & drop an image</p>
      ) : (
        <img
          src={filePreview}
          alt="Preview"
          className="w-full h-auto object-cover rounded-md"
        />
      )}
    </div>
  );
}

export default ImagePicker;






import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FloaraCheck() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  // Function to capture a photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      // Set canvas dimensions equal to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame from the video onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image as a Data URL and display it as a preview
      const dataUrl = canvas.toDataURL('image/png');
      setImagePreviewUrl(dataUrl);
    }
  };

  
  // Function to handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://your-api-endpoint.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadedImage(data.imageUrl); // Assuming API returns the uploaded image URL
          alert('Image uploaded successfully!');
        } else {
          console.error('Error uploading the image');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  return (
    <>
      <main className="regiserBack Flora py-10 mx-auto flex flex-col items-center flex-grow">
        <motion.h2
          className="homeFont text-center mt-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          FloraCheck
        </motion.h2>

        <p className="mt-6 text-center text-xl text-white max-w-3xl">
          “This section highlights the integration of advanced AI technology, offering users two powerful ways to engage with the system. Users can either capture a live photo using the device's camera or upload an existing image from their collection. Leveraging AI-driven analysis, the application processes these images to extract meaningful insights, whether for identifying plant diseases, providing care recommendations, or other intelligent predictions...”
        </p>



        <div className="mt-12 Upload">

          {/* Camera Section */}
          <div className="relative border-dashed border-2 border-white p-12 text-center rounded-lg shadow-md">
            <div className="absolute inset-0 bg-white bg-opacity-25 rounded-lg"></div>
            <div className="relative z-10">
              <div className="text-green-700 text-4xl mb-4">
                <i className="fas fa-camera"></i>
              </div>
              <h3 className="text-2xl text-green-700 mb-4">Take a photo</h3>
              <button
                onClick={startCamera}
                className="bg-green-700 text-white px-4 py-2 rounded-lg mb-4"
              >
                Open Camera
              </button>
              {/* Capture Button */}
              <button onClick={capturePhoto} className="bg-green-700 ms-4 mx-auto text-white px-4 py-2 rounded-lg">Capture Photo</button>

              {/* Video Feed */}
              <video
                ref={videoRef}
                className="w-full h-48 object-cover rounded-lg mb-4"
                autoPlay
                playsInline
                style={{ display: imagePreviewUrl ? 'none' : 'block' }}
              ></video>


              {/* Canvas for Capturing Photo */}
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              ></canvas>

              {/* Image Preview */}
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Captured Preview"
                  className="mt-4 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="relative border-dashed border-2 border-white p-12 mt-10 text-center rounded-lg shadow-md">
            <div className="absolute inset-0 bg-white bg-opacity-25 rounded-lg"></div>
            <div className="relative z-10">
          <div className="mt-12 text-center">
            <h3 className="text-2xl text-green-700 mb-4">Upload an Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded Image"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
          </div>
          </div>
        </div>
      </main>
    </>
  );
}

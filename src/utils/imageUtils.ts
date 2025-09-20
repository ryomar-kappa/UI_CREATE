// Image processing utility functions

// Validate image file type
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};

// Validate image file size (default max: 5MB)
export const isValidImageSize = (file: File, maxSizeInMB: number = 5): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Convert file to base64 string
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Resize image to fit constraints
export const resizeImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

// Simulate image analysis API call
export const analyzeImage = async (file: File): Promise<{
  skinType: string;
  confidenceScore: number;
  ageEstimate: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

  // Mock analysis results
  const skinTypes = ['dry', 'oily', 'normal', 'combination', 'sensitive'];
  const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];

  return {
    skinType: randomSkinType,
    confidenceScore: 0.8 + Math.random() * 0.2, // 80-100%
    ageEstimate: 20 + Math.floor(Math.random() * 40), // 20-60
  };
};

// Get image preview URL
export const getImagePreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// Cleanup image preview URL
export const cleanupImagePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
export const optimizeImage = async (file: File) => {
  return new Promise<File>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const MAX_SIZE = 200; 
      let width = img.width;
      let height = img.height;

      if (width > height && width > MAX_SIZE) {
        height = (height * MAX_SIZE) / width;
        width = MAX_SIZE;
      } else if (height > MAX_SIZE) {
        width = (width * MAX_SIZE) / height;
        height = MAX_SIZE;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);

          const optimizedFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
            type: "image/webp",
          });

          resolve(optimizedFile);
        },
        "image/webp",
        0.75 // calidad
      );
    };
  });
};

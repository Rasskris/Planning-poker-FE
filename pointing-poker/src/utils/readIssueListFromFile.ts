export const readFileAsync = async (input: HTMLInputElement) => {
  return new Promise((resolve, reject) => {
    if (!input.files) {
      return;
    }

    const reader = new FileReader();
    const file = input.files[0];

    reader.readAsText(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
  });
};

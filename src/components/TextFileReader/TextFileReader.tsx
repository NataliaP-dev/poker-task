import React from 'react';

interface TextFileReaderProps {
  onComplete?: (text: string) => void;
}

export const TextFileReader = ({ onComplete }: TextFileReaderProps) => {
  const showFile = (e: any) => {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert("Your browser is too old to support HTML5 File API");
      return;
    }

    const file = e?.target?.files[0];
    const reader = new FileReader();
    const textFile = /text.*/;

    if (file.type.match(textFile)) {
      reader.onload = (event) => {
        onComplete?.(event.target?.result as string);
      }
    } else {
      alert("It doesn't seem to be a text file!");
    }
    reader.readAsText(file);
  };

  return (
    <div>
      <div id="show-text">Choose text File</div>
      <input type="file" accept='*.txt' onChange={showFile} />
    </div>
  );
};

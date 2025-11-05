import React, { useCallback, useState } from "react";

const App: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("PDF 파일을 드래그하세요");

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file || file.type !== "application/pdf") {
      setStatus("PDF 파일만 올려주세요 ⚠️");
      return;
    }

    setFileName(file.name);
    setStatus("업로드 중... 🚀");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://example.com/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("업로드 완료 ✅");
      } else {
        setStatus("업로드 실패 ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("에러 발생 ❌");
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f2f2f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "3px dashed #aaa",
        color: "#333",
        fontFamily: "sans-serif",
      }}
    >
      <h1>{status}</h1>
      {fileName && <p>파일: {fileName}</p>}
    </div>
  );
};

export default App;